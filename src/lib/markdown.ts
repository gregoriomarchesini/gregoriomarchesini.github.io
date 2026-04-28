function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function extractYoutubeId(input: string): string {
  const trimmed = input.trim();
  const match = trimmed.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&?/]+)/);
  return match?.[1] ?? trimmed;
}

function isYoutubeUrl(input: string): boolean {
  return /(?:youtube\.com\/watch\?v=|youtu\.be\/)/.test(input.trim());
}

function renderYouTubeEmbed(input: string): string {
  const videoId = extractYoutubeId(input);
  return `
    <div class="my-8 overflow-hidden rounded-lg border border-border">
      <div class="aspect-video">
        <iframe
          class="h-full w-full"
          src="https://www.youtube.com/embed/${videoId}"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  `;
}

function renderYouTubePreview(url: string, label?: string): string {
  const videoId = extractYoutubeId(url);
  const safeUrl = escapeHtml(url.trim());
  const safeLabel = escapeHtml(label?.trim() || "Watch on YouTube");

  return `
    <a
      href="${safeUrl}"
      target="_blank"
      rel="noreferrer"
      class="group my-8 block overflow-hidden rounded-lg border border-border bg-card no-underline"
    >
      <div class="relative">
        <img
          src="https://img.youtube.com/vi/${videoId}/hqdefault.jpg"
          alt="${safeLabel}"
          class="h-auto w-full transition-transform duration-300 group-hover:scale-[1.01]"
        />
        <div class="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors group-hover:bg-black/10">
          <div class="flex h-16 w-16 items-center justify-center rounded-full bg-white/92 text-red-600 shadow-lg">
            <svg viewBox="0 0 24 24" class="h-8 w-8 fill-current" aria-hidden="true">
              <path d="M8 5v14l11-7z"></path>
            </svg>
          </div>
        </div>
      </div>
      <div class="px-4 py-3 text-sm text-muted-foreground">
        ${safeLabel}
      </div>
    </a>
  `;
}

function renderIframeEmbed(input: string): string {
  const src = escapeHtml(input.trim());
  return `
    <div class="my-8 overflow-hidden rounded-lg border border-border">
      <iframe
        class="h-[560px] w-full bg-background"
        src="${src}"
        title="Embedded content"
        loading="lazy"
      ></iframe>
    </div>
  `;
}

function renderInline(markdown: string): string {
  const codeTokens: string[] = [];
  let text = markdown.replace(/`([^`]+)`/g, (_, code: string) => {
    const token = `__CODE_TOKEN_${codeTokens.length}__`;
    codeTokens.push(`<code>${escapeHtml(code)}</code>`);
    return token;
  });

  text = escapeHtml(text);
  text = text.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="rounded-lg border border-border" />');
  text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  text = text.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  text = text.replace(/(^|[^\*])\*([^*]+)\*/g, "$1<em>$2</em>");

  for (let i = 0; i < codeTokens.length; i += 1) {
    text = text.replace(`__CODE_TOKEN_${i}__`, codeTokens[i]);
  }

  return text;
}

function isUnorderedList(line: string): boolean {
  return /^[-*]\s+/.test(line);
}

function isOrderedList(line: string): boolean {
  return /^\d+\.\s+/.test(line);
}

function isTableRow(line: string): boolean {
  return /^\|(.+)\|$/.test(line.trim());
}

function isTableDivider(line: string): boolean {
  return /^\|(?:\s*:?-{3,}:?\s*\|)+$/.test(line.trim());
}

function parseTableCells(line: string): string[] {
  return line
    .trim()
    .slice(1, -1)
    .split("|")
    .map((cell) => cell.trim());
}

function isBlockBoundary(line: string): boolean {
  return (
    line.trim() === "" ||
    /^#{1,6}\s+/.test(line) ||
    /^```/.test(line) ||
    /^:::\s*chips\s*$/.test(line.trim()) ||
    /^:::\s*$/.test(line.trim()) ||
    /^>\s?/.test(line) ||
    isTableRow(line) ||
    isUnorderedList(line) ||
    isOrderedList(line) ||
    /^@\[(youtube|iframe)\]\((.+)\)$/.test(line.trim()) ||
    /^---+$/.test(line.trim())
  );
}

export function renderMarkdown(markdown: string): string {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const html: string[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];
    const trimmed = line.trim();

    if (!trimmed) {
      index += 1;
      continue;
    }

    if (/^@\[(youtube|iframe)\]\((.+)\)$/.test(trimmed)) {
      const match = trimmed.match(/^@\[(youtube|iframe)\]\((.+)\)$/);
      if (match) {
        html.push(match[1] === "youtube" ? renderYouTubeEmbed(match[2]) : renderIframeEmbed(match[2]));
      }
      index += 1;
      continue;
    }

    if (/^---+$/.test(trimmed)) {
      html.push("<hr />");
      index += 1;
      continue;
    }

    if (/^:::\s*chips\s*$/.test(trimmed)) {
      const items: string[] = [];
      index += 1;

      while (index < lines.length && !/^:::\s*$/.test(lines[index].trim())) {
        const item = lines[index].trim();
        if (item) items.push(item.replace(/^[-*]\s+/, "").trim());
        index += 1;
      }

      if (index < lines.length) index += 1;

      html.push(`
        <div class="chip-grid">
          ${items.map((item) => `<span class="chip">${renderInline(item)}</span>`).join("")}
        </div>
      `);
      continue;
    }

    if (index + 1 < lines.length && isTableRow(line) && isTableDivider(lines[index + 1])) {
      const headerCells = parseTableCells(line);
      index += 2;

      const rows: string[] = [];
      while (index < lines.length && isTableRow(lines[index])) {
        const cells = parseTableCells(lines[index]);
        rows.push(`<tr>${cells.map((cell) => `<td>${renderInline(cell)}</td>`).join("")}</tr>`);
        index += 1;
      }

      html.push(`
        <table>
          <thead>
            <tr>${headerCells.map((cell) => `<th>${renderInline(cell)}</th>`).join("")}</tr>
          </thead>
          <tbody>
            ${rows.join("")}
          </tbody>
        </table>
      `);
      continue;
    }

    if (/^```/.test(trimmed)) {
      const language = trimmed.slice(3).trim();
      const buffer: string[] = [];
      index += 1;

      while (index < lines.length && !/^```/.test(lines[index].trim())) {
        buffer.push(lines[index]);
        index += 1;
      }

      if (index < lines.length) index += 1;

      const code = escapeHtml(buffer.join("\n"));
      const className = language ? ` class="language-${language}"` : "";
      html.push(`<pre><code${className}>${code}</code></pre>`);
      continue;
    }

    const heading = line.match(/^(#{1,6})\s+(.+)$/);
    if (heading) {
      const level = heading[1].length;
      html.push(`<h${level}>${renderInline(heading[2].trim())}</h${level}>`);
      index += 1;
      continue;
    }

    if (/^>\s?/.test(line)) {
      const buffer: string[] = [];
      while (index < lines.length && /^>\s?/.test(lines[index])) {
        buffer.push(lines[index].replace(/^>\s?/, ""));
        index += 1;
      }

      html.push(`<blockquote>${renderMarkdown(buffer.join("\n"))}</blockquote>`);
      continue;
    }

    if (isUnorderedList(line)) {
      const items: string[] = [];
      while (index < lines.length && isUnorderedList(lines[index])) {
        items.push(`<li>${renderInline(lines[index].replace(/^[-*]\s+/, "").trim())}</li>`);
        index += 1;
      }

      html.push(`<ul>${items.join("")}</ul>`);
      continue;
    }

    if (isOrderedList(line)) {
      const items: string[] = [];
      while (index < lines.length && isOrderedList(lines[index])) {
        items.push(`<li>${renderInline(lines[index].replace(/^\d+\.\s+/, "").trim())}</li>`);
        index += 1;
      }

      html.push(`<ol>${items.join("")}</ol>`);
      continue;
    }

    const paragraph: string[] = [];
    while (index < lines.length && !isBlockBoundary(lines[index])) {
      paragraph.push(lines[index].trim());
      index += 1;
    }

    const paragraphText = paragraph.join(" ").trim();
    const youtubeLinkOnly = paragraphText.match(/^\[([^\]]+)\]\((https?:\/\/[^)]+)\)$/);

    if (youtubeLinkOnly && isYoutubeUrl(youtubeLinkOnly[2])) {
      html.push(renderYouTubePreview(youtubeLinkOnly[2], youtubeLinkOnly[1]));
      continue;
    }

    html.push(`<p>${renderInline(paragraphText)}</p>`);
  }

  return html.join("\n");
}
