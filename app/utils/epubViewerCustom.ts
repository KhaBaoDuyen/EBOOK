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

  // Trang đã style
   
  const styledPages = pages.map((page) => `
    <div class="book-page" style="text-align:justify;line-height:1.8;">
      ${page
      .replace(/<h[1-6][^>]*>\s*mục\s*lục\s*<\/h[1-6]>/gi,
        `<h2 style="text-align:center;font-weight:bold;font-size:1.6em;margin:1.5rem 0;">MỤC LỤC</h2>`)
      .replace(/<(h[1-6]|p|div)[^>]*>\s*(phần\s*\d+[^<]*)<\/\1>/gi,
        `<h2 style="text-align:center;font-weight:bold;font-size:1.5em;margin:2rem 0;">$2</h2>`)
      .replace(/<(h[1-6]|p|div)[^>]*>\s*(chương\s*\d+[^<]*)<\/\1>/gi,
        `<h2 style="text-align:center;font-weight:bold;font-size:1.4em;margin:2rem 0;">$2</h2>`)}
    </div>`);

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
  const temp = document.createElement("div");
  temp.style.position = "absolute";
  temp.style.visibility = "hidden";
  temp.style.width = "700px";
  temp.style.lineHeight = "1.6";
  temp.style.fontSize = "18px";
  temp.style.textAlign = "justify";
  temp.style.padding = "1rem 2rem";
  temp.style.boxSizing = "border-box";
  document.body.appendChild(temp);

  const tokens = html.split(/(<[^>]+>|[^<]+)/g).filter(Boolean);
  const pages: string[] = [];
  let buffer = "";

  for (const tok of tokens) {
    temp.innerHTML = buffer + tok;
    if (temp.scrollHeight > containerHeight) {
      if (buffer.trim()) pages.push(buffer);
      buffer = tok;
    } else {
      buffer += tok;
    }
  }
  if (buffer.trim()) pages.push(buffer);
  document.body.removeChild(temp);
  return pages;
}
