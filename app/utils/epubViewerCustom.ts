import ePub from "epubjs";

function basename(href: string) {
  try {
    const u = href.split("#")[0];
    const parts = u.split("/");
    return parts[parts.length - 1];
  } catch { return href; }
}

export async function loadEpubContent(filePath: string, containerHeight = 800) {
  const book = ePub(filePath);
  await book.ready;

  const toc = await book.loaded.navigation;
  const chapters = toc.toc.map((item: any) => ({
    id: item.id,
    href: item.href,
    label: item.label,
    subitems: item.subitems || [],
  }));

  const spine: any = await book.loaded.spine;
  const spineItems = Array.isArray(spine) ? spine : spine.items;

  const validSpineItems = spineItems.slice(1);

  const allHtml: string[] = [];
  let isFirst = true;

  for (const item of validSpineItems) {
    try {
      const raw = await book.load(item.href);
      let html = "";

      if (raw instanceof Document) {
        html = raw.documentElement.outerHTML;
      } else if (typeof raw === "string") {
        html = raw;
      } else if (typeof (raw as any).toString === "function") {
        html = (raw as any).toString();
      }

      html = html
        .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
        .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
        .replace(/<meta[^>]*>/gi, "")
        .replace(/<link[^>]*>/gi, "")
        .replace(/@page[^}]+}/g, "")
        .replace(/font-family:[^;]+;?/gi, "")
        .replace(/margin[^;]+;?/gi, "")
        .replace(/padding[^;]+;?/gi, "");

      const dom = new DOMParser().parseFromString(html, "text/html");

      dom.body.insertAdjacentHTML(
        "afterbegin",
        `<span class="__spine-start" data-spine="${item.href}"></span>`
      );

      dom.body.querySelectorAll<HTMLElement>("[id]").forEach((el) => {
        const id = el.getAttribute("id");
        if (!id) return;
        el.insertAdjacentHTML(
          "beforebegin",
          `<span class="__anchor" data-spine="${item.href}" data-anchor="${id}"></span>`
        );
      });

      dom.body.querySelectorAll<HTMLAnchorElement>("a[href]").forEach((a) => {
        const href = a.getAttribute("href") || "";
        const span = dom.createElement("span");
        span.className = "chapter-link";
        span.setAttribute("data-href", href);
        span.innerHTML = a.innerHTML;
        a.replaceWith(span);
      });

      let cleaned = dom.body.innerHTML;

      const hasSection = /<(h[1-6]|p|div)[^>]*>\s*(mục\s*lục|phần\s*\d+|chương\s*\d+)/i.test(cleaned);
      cleaned = hasSection && !isFirst
        ? `<!--pagebreak--><div class="chapter-section">${cleaned}</div>`
        : `<div class="chapter-section">${cleaned}</div>`;

      allHtml.push(cleaned);
      isFirst = false;
    } catch (err) {
      console.warn("Lỗi đọc chương:", (item as any).href, err);
    }
  }

  const normalized = allHtml.join(" ")
    .replace(/\s*<!--pagebreak-->\s*/gi, "<page-split>")
    .replace(/(?:<page-split>)+/gi, "<page-split>");

  const segments = normalized.split("<page-split>").map(s => s.trim()).filter(Boolean);

  const pages: string[] = [];
  for (const seg of segments) {
    paginateByHeight(seg, containerHeight).forEach(p => p.trim() && pages.push(p));
  }


  const styledPages = pages.map((page) => `
  <div class="book-page" style="text-align:justify;line-height:1.9;font-family:'Times New Roman',serif;font-size:19px;">
    ${page
      // CHƯƠNG
      .replace(
        /<(h[1-6]|p|div)[^>]*>\s*(chương\s*\d+[^<]*)<\/\1>/gi,
        `<h2 style="text-align:center;font-weight:bold;font-size:1.6em;margin:2.5rem 0;color:#222;">$2</h2>`
      )
      // PHẦN
      .replace(
        /<(h[1-6]|p|div)[^>]*>\s*(phần\s*\d+[^<]*)<\/\1>/gi,
        `<h2 style="text-align:center;font-weight:bold;font-size:1.5em;margin:2.2rem 0;color:#222;">$2</h2>`
      )
      // MỤC LỤC
      .replace(
        /<h[1-6][^>]*>\s*mục\s*lục\s*<\/h[1-6]>/gi,
        `<h2 style="text-align:center;font-weight:bold;font-size:1.7em;margin:2rem 0;">MỤC LỤC</h2>`
      )
      .replace(/<p([^>]*)>/gi, `<p$1 style="margin:1rem 0;">`)
    }
  </div>
`);


  const anchorIndex: Record<string, number> = {};
  styledPages.forEach((html, idx) => {
    html.replace(
      /<span[^>]+class="__spine-start"[^>]+data-spine="([^"]+)"[^>]*><\/span>/gi,
      (_m, spineHref) => {
        if (anchorIndex[spineHref] == null) anchorIndex[spineHref] = idx;
        const base = basename(spineHref);
        if (anchorIndex[base] == null) anchorIndex[base] = idx;
        return _m;
      }
    );
    html.replace(
      /<span[^>]+class="__anchor"[^>]+data-spine="([^"]+)"[^>]+data-anchor="([^"]+)"[^>]*><\/span>/gi,
      (_m, spineHref, aid) => {
        const keys = [
          `${spineHref}#${aid}`,
          `${basename(spineHref)}#${aid}`,
          `#${aid}`
        ];
        keys.forEach(k => { if (anchorIndex[k] == null) anchorIndex[k] = idx; });
        return _m;
      }
    );
    html.replace(
      /<span[^>]+class="chapter-link"[^>]+data-href="([^"]+)"[^>]*>(.*?)<\/span>/gi,
      (_m, href) => {
        const [p, frag] = href.split("#");
        if (p) {
          if (anchorIndex[p] == null) anchorIndex[p] = idx;
          const base = basename(p);
          if (anchorIndex[base] == null) anchorIndex[base] = idx;
          if (frag) {
            const keys = [`${p}#${frag}`, `${base}#${frag}`, `#${frag}`];
            keys.forEach(k => { if (anchorIndex[k] == null) anchorIndex[k] = idx; });
          }
        } else if (frag) {
          const k = `#${frag}`;
          if (anchorIndex[k] == null) anchorIndex[k] = idx;
        }
        return _m;
      }
    );
  });

  return { pages: styledPages, chapters, anchorIndex };
}

function paginateByHeight(html: string, containerHeight: number): string[] {
  const frame = document.createElement("div");
  frame.style.position = "absolute";
  frame.style.visibility = "hidden";
  frame.style.width = "640px";
  frame.style.lineHeight = "1.9";
  frame.style.fontSize = "19px";
  frame.style.fontFamily = "'Times New Roman', serif";
  frame.style.textAlign = "justify";
  frame.style.padding = "2rem 2.5rem";
  frame.style.boxSizing = "border-box";
  frame.style.wordBreak = "break-word";
  frame.style.whiteSpace = "normal";
  document.body.appendChild(frame);

  const pages: string[] = [];
  let buffer = "";

  // ✳️ Chia đoạn theo khối (p/div/br)
  const segments = html
    .split(/(<\/p>|<\/div>|<br\s*\/?>)/gi)
    .map((s) => s.trim())
    .filter(Boolean);

  for (const seg of segments) {
    const block = seg.endsWith("</p>") ? seg : `<p>${seg}</p>`;
    frame.innerHTML = buffer + block;

    if (frame.scrollHeight > containerHeight - 40) {
       frame.innerHTML = block;
      if (frame.scrollHeight > containerHeight - 40) {
        const sentences = block.split(/(?<=[.!?。？！])\s+/g);
        let temp = "";
        for (const sentence of sentences) {
          frame.innerHTML = temp + sentence;
          if (frame.scrollHeight > containerHeight - 40) {
            pages.push(temp.trim());
            temp = sentence;
          } else {
            temp += " " + sentence;
          }
        }
        if (temp.trim()) pages.push(temp.trim());
        buffer = "";
      } else {
        pages.push(buffer.trim());
        buffer = block;
      }
    } else {
      buffer += block;
    }
  }

  if (buffer.trim()) pages.push(buffer.trim());
  document.body.removeChild(frame);

   return pages.map(
    (p) => `
      <div style="
        height:${containerHeight}px;
        padding:2rem 2.5rem;
        font-size:19px;
        line-height:1.8;
        font-family:'Times New Roman',serif;
        text-align:justify;
        color:#1A1A1A;
        box-sizing:border-box;">
        ${p}
      </div>`
  );
}
