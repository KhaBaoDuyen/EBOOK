import ePub from "epubjs";

export async function loadEpubContent(filePath: string) {
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
  const allHtml: string[] = [];
  let isFirst = true;

  for (const item of spineItems) {
    try {
      const doc: unknown = await book.load(item.href);
      let html = "";

      if (doc instanceof Document) {
        const body = doc.querySelector("body");
        html = body ? body.innerHTML : doc.documentElement.innerHTML;
      } else if (typeof doc === "string") {
        html = doc;
      } else if (typeof (doc as any).toString === "function") {
        html = (doc as any).toString();
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

      const isSection =
        /<h[1-3][^>]*>\s*(mục\s*lục|chương\s*\d+|phần\s*\d+)/i.test(html);

      html =
        isSection && !isFirst
          ? `<!--pagebreak--><div class="chapter-section">${html}</div>`
          : `<div class="chapter-section">${html}</div>`;

      allHtml.push(html);
      isFirst = false;
    } catch (err) {
      console.warn("Lỗi đọc chương:", item.href, err);
    }
  }

  const joined = allHtml.join(" ");
  const wordsPerPage = 200;
  const tokens = joined.split(/(\s+)/);
  const pages: string[] = [];
  let buffer = "";
  let count = 0;

  for (const token of tokens) {
    if (token.includes("<!--pagebreak-->")) {
      if (buffer.trim()) pages.push(buffer);
      buffer = token.replace("<!--pagebreak-->", "");
      count = 0;
      continue;
    }
    buffer += token;
    if (!token.startsWith("<") && /\S/.test(token)) count++;
    if (count >= wordsPerPage) {
      pages.push(buffer);
      buffer = "";
      count = 0;
    }
  }
  if (buffer.trim()) pages.push(buffer);

  const styledPages = pages.map(
    (page) => `
      <div class="book-page" style="text-align:justify;line-height:1.8;">
        ${page
          .replace(
            /<h[1-3][^>]*>\s*(mục\s*lục)\s*<\/h[1-3]>/gi,
            `<h2 style="text-align:center;font-weight:bold;font-size:1.4em;margin:1rem 0;">MỤC LỤC</h2>`
          )
          .replace(
            /<h[1-3][^>]*>\s*(chương\s*\d+[^<]*)<\/h[1-3]>/gi,
            `<h2 style="text-align:center;font-weight:bold;font-size:1.3em;margin:1.5rem 0;">$1</h2>`
          )
          .replace(
            /<h[1-3][^>]*>\s*(phần\s*\d+[^<]*)<\/h[1-3]>/gi,
            `<h2 style="text-align:center;font-weight:bold;font-size:1.3em;margin:1.5rem 0;">$1</h2>`
          )}
      </div>`
  );

  return { pages: styledPages, chapters };
}
