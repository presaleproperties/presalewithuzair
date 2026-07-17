// Shared markdown renderer used by both the public BlogPost page and the admin editor preview.
// Keeps output structurally identical so the editor preview matches what buyers see.

export function renderMarkdown(content: string): string {
  const trimmed = content.trim();
  if (
    trimmed.startsWith("<") &&
    (trimmed.startsWith("<p") ||
      trimmed.startsWith("<h") ||
      trimmed.startsWith("<ul") ||
      trimmed.startsWith("<ol") ||
      trimmed.startsWith("<div") ||
      trimmed.startsWith("<blockquote") ||
      trimmed.startsWith("<table") ||
      trimmed.startsWith("<figure"))
  ) {
    return trimmed
      .replace(/<h1(\s[^>]*)?>/g, '<h1$1 class="blog-h1">')
      .replace(/<h2(\s[^>]*)?>/g, '<h2$1 class="blog-h2">')
      .replace(/<h3(\s[^>]*)?>/g, '<h3$1 class="blog-h3">')
      .replace(/<h4(\s[^>]*)?>/g, '<h4$1 class="blog-h3">')
      .replace(/<p(\s[^>]*)?>/g, '<p$1 class="blog-p">')
      .replace(/<ul(\s[^>]*)?>/g, '<ul$1 class="blog-ul">')
      .replace(/<ol(\s[^>]*)?>/g, '<ol$1 class="blog-ol">')
      .replace(/<blockquote(\s[^>]*)?>/g, '<blockquote$1 class="blog-pullquote">');
  }

  const escapeHtml = (text: string) =>
    text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

  const inline = (text: string): string => {
    const escaped = escapeHtml(text);
    return escaped
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.+?)\*/g, "<em>$1</em>")
      .replace(/`(.+?)`/g, '<code class="blog-code">$1</code>');
  };

  const lines = content.split("\n");
  const html: string[] = [];
  let inList = false;
  let listType = "";
  let firstParagraphDone = false;
  let inTable = false;
  let tableRows: string[][] = [];

  const closeList = () => {
    if (inList) {
      html.push(listType === "ul" ? "</ul>" : "</ol>");
      inList = false;
      listType = "";
    }
  };
  const closeTable = () => {
    if (inTable && tableRows.length > 0) {
      html.push("<table>");
      tableRows.forEach((cols, i) => {
        if (i === 0) {
          html.push("<thead><tr>");
          cols.forEach((c) => html.push(`<th>${inline(c.trim())}</th>`));
          html.push("</tr></thead><tbody>");
        } else {
          html.push("<tr>");
          cols.forEach((c) => html.push(`<td>${inline(c.trim())}</td>`));
          html.push("</tr>");
        }
      });
      html.push("</tbody></table>");
      inTable = false;
      tableRows = [];
    }
  };

  lines.forEach((line) => {
    if (line.trim().startsWith("|") && line.trim().endsWith("|")) {
      const cells = line.trim().slice(1, -1).split("|");
      if (cells.every((c) => /^[\s\-:]+$/.test(c))) return;
      if (!inTable) {
        closeList();
        inTable = true;
      }
      tableRows.push(cells);
      return;
    }
    if (inTable) closeTable();
    if (/^(-{3,}|\*{3,}|_{3,})$/.test(line.trim())) {
      closeList();
      html.push("<hr />");
      return;
    }
    if (line.startsWith("> ")) {
      closeList();
      html.push(`<blockquote class="blog-pullquote">${inline(line.slice(2))}</blockquote>`);
      return;
    }
    if (line.startsWith("# ")) {
      closeList();
      html.push(`<h1 class="blog-h1">${inline(line.slice(2))}</h1>`);
      return;
    }
    if (line.startsWith("## ")) {
      closeList();
      html.push(`<h2 class="blog-h2">${inline(line.slice(3))}</h2>`);
      return;
    }
    if (line.startsWith("### ")) {
      closeList();
      html.push(`<h3 class="blog-h3">${inline(line.slice(4))}</h3>`);
      return;
    }
    if (line.startsWith("#### ")) {
      closeList();
      html.push(`<h3 class="blog-h3">${inline(line.slice(5))}</h3>`);
      return;
    }
    if (line.startsWith("- ") || line.startsWith("* ")) {
      if (!inList || listType !== "ul") {
        closeList();
        html.push('<ul class="blog-ul">');
        inList = true;
        listType = "ul";
      }
      html.push(`<li>${inline(line.slice(2))}</li>`);
      return;
    }
    if (line.match(/^\d+\.\s/)) {
      if (!inList || listType !== "ol") {
        closeList();
        html.push('<ol class="blog-ol">');
        inList = true;
        listType = "ol";
      }
      html.push(`<li>${inline(line.slice(line.indexOf(" ") + 1))}</li>`);
      return;
    }
    if (line.trim() === "") {
      closeList();
      return;
    }
    closeList();
    if (!firstParagraphDone) {
      firstParagraphDone = true;
      html.push(`<p class="blog-p blog-dropcap">${inline(line)}</p>`);
    } else {
      html.push(`<p class="blog-p">${inline(line)}</p>`);
    }
  });
  closeList();
  closeTable();
  return html.join("");
}
