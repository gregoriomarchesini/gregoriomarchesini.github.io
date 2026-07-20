import { describe, expect, it } from "vitest";
import { parseRecordSections, sectionItems, singleItem } from "@/lib/recordList";

describe("parseRecordSections", () => {
  it("ignores intro prose before the first heading", () => {
    const sections = parseRecordSections("Some intro with a [link](https://x.com).\n\n## Papers\n\n- title: A\n");

    expect(sections).toHaveLength(1);
    expect(sections[0].heading).toBe("Papers");
  });

  it("groups records under their section and keeps order", () => {
    const sections = parseRecordSections(`
## Books

- title: One
  authors: Alice

- title: Two
  authors: Bob

## Videos

- title: Three
  link: https://youtu.be/abc
`);

    expect(sections.map((s) => s.heading)).toEqual(["Books", "Videos"]);
    expect(sections[0].items).toEqual([
      { title: "One", authors: "Alice" },
      { title: "Two", authors: "Bob" },
    ]);
    expect(sections[1].items[0].link).toBe("https://youtu.be/abc");
  });

  it("tolerates a missing space after the colon", () => {
    const [section] = parseRecordSections("## S\n\n- title:Linear Systems\n  authors:Panos J. Antsaklis\n");

    expect(section.items[0]).toEqual({
      title: "Linear Systems",
      authors: "Panos J. Antsaklis",
    });
  });

  it("keeps colons that appear inside a value", () => {
    const [section] = parseRecordSections("## S\n\n- title: Planning: A Forward Invariance Approach\n");

    expect(section.items[0].title).toBe("Planning: A Forward Invariance Approach");
  });

  it("keeps records that are missing optional fields", () => {
    const [section] = parseRecordSections("## S\n\n- title: No authors here\n");

    expect(section.items).toHaveLength(1);
  });
});

describe("section helpers", () => {
  const sections = parseRecordSections("## Contact\n\n- email: a@b.c\n  location: Stockholm\n");

  it("looks sections up case-insensitively", () => {
    expect(sectionItems(sections, "contact")).toHaveLength(1);
    expect(singleItem(sections, "Contact").email).toBe("a@b.c");
  });

  it("throws a named error when a section is missing", () => {
    expect(() => sectionItems(sections, "Work")).toThrow(/## Work/);
  });
});
