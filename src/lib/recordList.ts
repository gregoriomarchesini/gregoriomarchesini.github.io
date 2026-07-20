export type RecordItem = Record<string, string>;

export interface RecordSection {
  heading: string;
  items: RecordItem[];
}

const HEADING = /^#{1,6}\s+(.+)$/;
const ITEM_START = /^-\s*([A-Za-z][\w-]*)\s*:\s*(.*)$/;
const FIELD = /^([A-Za-z][\w-]*)\s*:\s*(.*)$/;

/**
 * Parses the `## Heading` + `- key: value` record-list format used by the page
 * markdown files in src/content/pages.
 *
 * Everything before the first heading is treated as intro prose and ignored —
 * pass the body from parseFrontmatter and render that part separately.
 */
export function parseRecordSections(body: string): RecordSection[] {
  const sections: RecordSection[] = [];
  let section: RecordSection | null = null;
  let item: RecordItem | null = null;

  const commit = () => {
    if (section && item && Object.keys(item).length > 0) {
      section.items.push(item);
    }
    item = null;
  };

  for (const line of body.replace(/\r\n/g, "\n").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    const heading = trimmed.match(HEADING);
    if (heading) {
      commit();
      if (section) sections.push(section);
      section = { heading: heading[1].trim(), items: [] };
      continue;
    }

    if (!section) continue;

    const start = trimmed.match(ITEM_START);
    if (start) {
      commit();
      item = { [start[1]]: start[2].trim() };
      continue;
    }

    const field = trimmed.match(FIELD);
    if (field && item) {
      item[field[1]] = field[2].trim();
    }
  }

  commit();
  if (section) sections.push(section);

  return sections;
}

/** Items of the named section. Throws if the section is missing. */
export function sectionItems(sections: RecordSection[], heading: string): RecordItem[] {
  const match = sections.find(
    (section) => section.heading.toLowerCase() === heading.toLowerCase(),
  );

  if (!match) {
    throw new Error(`Missing markdown section: ## ${heading}`);
  }

  return match.items;
}

/** The single record of the named section. Throws if the section is missing or empty. */
export function singleItem(sections: RecordSection[], heading: string): RecordItem {
  const [first] = sectionItems(sections, heading);

  if (!first) {
    throw new Error(`Section "## ${heading}" must contain one entry`);
  }

  return first;
}
