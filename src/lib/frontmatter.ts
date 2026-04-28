export interface ParsedFrontmatter {
  attributes: Record<string, string>;
  body: string;
}

export function parseFrontmatter(raw: string): ParsedFrontmatter {
  const normalized = raw.replace(/\r\n/g, "\n").trim();

  if (!normalized.startsWith("---\n")) {
    return { attributes: {}, body: normalized };
  }

  const end = normalized.indexOf("\n---\n", 4);
  if (end === -1) {
    return { attributes: {}, body: normalized };
  }

  const frontmatter = normalized.slice(4, end).trim();
  const body = normalized.slice(end + 5).trim();
  const attributes: Record<string, string> = {};

  for (const line of frontmatter.split("\n")) {
    const separator = line.indexOf(":");
    if (separator === -1) continue;

    const key = line.slice(0, separator).trim();
    const value = line.slice(separator + 1).trim();
    attributes[key] = value;
  }

  return { attributes, body };
}

export function requiredField(attributes: Record<string, string>, key: string): string {
  const value = attributes[key];

  if (!value) {
    throw new Error(`Missing required frontmatter field: ${key}`);
  }

  return value;
}

export function optionalList(value?: string): string[] {
  if (!value) return [];

  return value
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);
}
