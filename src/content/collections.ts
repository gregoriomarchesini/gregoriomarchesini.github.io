import { optionalList, parseFrontmatter, requiredField } from "@/lib/frontmatter";
import {
  parseRecordSections,
  sectionItems,
  singleItem,
  type RecordItem,
} from "@/lib/recordList";

import aboutRaw from "./pages/about.md?raw";
import codingRaw from "./pages/coding.md?raw";
import cvRaw from "./pages/cv.md?raw";
import publicationsRaw from "./pages/publications.md?raw";
import teachingRaw from "./pages/teaching.md?raw";

export interface AboutPage {
  title: string;
  role: string;
  institution: string;
  image: string;
  location: string;
  githubUrl: string;
  scholarUrl: string;
  content: string;
}

export interface BlogPostDocument {
  title: string;
  date: string;
  readTime?: string;
  tags: string[];
  year: string;
  slug: string;
  content: string;
}

export interface ProjectDocument {
  title: string;
  subtitle?: string;
  category: string;
  slug: string;
  img: string;
  order: number;
  status?: string;
  student?: string;
  supervisor?: string;
  content: string;
}

export interface Paper {
  title: string;
  authors: string;
  venue: string;
  year: number;
  arxivUrl?: string;
  doiUrl?: string;
  previewImg?: string;
}

export interface Repo {
  name: string;
  url: string;
  description: string;
}

export interface Reference {
  title: string;
  authors: string;
  url?: string;
  type: "book" | "article" | "video";
  description?: string;
}

export interface TeachingSection {
  heading: string;
  refs: Reference[];
}

export interface CvEducation {
  period: string;
  degree: string;
  institution: string;
  field: string;
  location: string;
}

export interface CvWork {
  period: string;
  role: string;
  org: string;
  description: string;
}

export interface CvCertificate {
  title: string;
  issuer: string;
  year: string;
}

export interface CvVolunteer {
  period: string;
  role: string;
  org: string;
  url: string;
  description: string;
}

const blogFiles = import.meta.glob("./blog/**/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

const projectFiles = import.meta.glob("./projects/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

function parseAboutPage(raw: string): AboutPage {
  const { attributes, body } = parseFrontmatter(raw);

  return {
    title: requiredField(attributes, "title"),
    role: requiredField(attributes, "role"),
    institution: requiredField(attributes, "institution"),
    image: requiredField(attributes, "image"),
    location: requiredField(attributes, "location"),
    githubUrl: requiredField(attributes, "githubUrl"),
    scholarUrl: requiredField(attributes, "scholarUrl"),
    content: body,
  };
}

function parseBlogPost(raw: string): BlogPostDocument {
  const { attributes, body } = parseFrontmatter(raw);

  return {
    title: requiredField(attributes, "title"),
    date: requiredField(attributes, "date"),
    readTime: attributes.readTime,
    tags: optionalList(attributes.tags),
    year: requiredField(attributes, "year"),
    slug: requiredField(attributes, "slug"),
    content: body,
  };
}

function parseProject(raw: string): ProjectDocument {
  const { attributes, body } = parseFrontmatter(raw);

  return {
    title: requiredField(attributes, "title"),
    subtitle: attributes.subtitle,
    category: requiredField(attributes, "category"),
    slug: requiredField(attributes, "slug"),
    img: requiredField(attributes, "img"),
    order: Number(attributes.order ?? "999"),
    status: attributes.status,
    student: attributes.student,
    supervisor: attributes.supervisor,
    content: body,
  };
}

/** Splits a page file into its frontmatter, intro prose and record sections. */
function parsePage(raw: string) {
  const { attributes, body } = parseFrontmatter(raw);
  const intro = body.split(/^#{1,6}\s+/m)[0].trim();

  return { attributes, intro, sections: parseRecordSections(body) };
}

function parsePaper(item: RecordItem): Paper {
  return {
    title: requiredField(item, "title"),
    authors: requiredField(item, "authors"),
    venue: requiredField(item, "venue"),
    year: Number(requiredField(item, "year")),
    arxivUrl: item.arxiv,
    doiUrl: item.doi,
    previewImg: item.preview,
  };
}

function parseRepo(item: RecordItem): Repo {
  return {
    name: requiredField(item, "name"),
    url: requiredField(item, "url"),
    description: requiredField(item, "description"),
  };
}

const REFERENCE_TYPES = ["book", "article", "video"] as const;

function parseReference(item: RecordItem): Reference {
  const url = item.link || undefined;
  const declared = REFERENCE_TYPES.find((type) => type === item.type?.toLowerCase());

  return {
    title: requiredField(item, "title"),
    authors: item.authors ?? "",
    url,
    // `type:` is optional — inferred from the link when it isn't given.
    type: declared ?? (!url ? "book" : /youtu(?:be\.com|\.be)\//.test(url) ? "video" : "article"),
    description: item.description || undefined,
  };
}

export const aboutPage = parseAboutPage(aboutRaw);

export const publicationsPage = (() => {
  const { attributes, intro, sections } = parsePage(publicationsRaw);

  return {
    title: requiredField(attributes, "title"),
    intro,
    papers: sectionItems(sections, "Papers").map(parsePaper),
  };
})();

export const codingPage = (() => {
  const { attributes, intro, sections } = parsePage(codingRaw);

  return {
    title: requiredField(attributes, "title"),
    githubUrl: requiredField(attributes, "githubUrl"),
    intro,
    repos: sectionItems(sections, "Repositories").map(parseRepo),
  };
})();

export const cvPage = (() => {
  const { attributes, intro, sections } = parsePage(cvRaw);
  const contact = singleItem(sections, "Contact");
  const volunteer = singleItem(sections, "Volunteer");

  return {
    title: requiredField(attributes, "title"),
    intro,
    contact: {
      email: requiredField(contact, "email"),
      location: requiredField(contact, "location"),
      languages: requiredField(contact, "languages"),
    },
    education: sectionItems(sections, "Education").map<CvEducation>((item) => ({
      period: requiredField(item, "period"),
      degree: requiredField(item, "degree"),
      institution: requiredField(item, "institution"),
      field: requiredField(item, "field"),
      location: requiredField(item, "location"),
    })),
    work: sectionItems(sections, "Work").map<CvWork>((item) => ({
      period: requiredField(item, "period"),
      role: requiredField(item, "role"),
      org: requiredField(item, "org"),
      description: requiredField(item, "description"),
    })),
    certificates: sectionItems(sections, "Certificates").map<CvCertificate>((item) => ({
      title: requiredField(item, "title"),
      issuer: requiredField(item, "issuer"),
      year: requiredField(item, "year"),
    })),
    volunteer: {
      period: requiredField(volunteer, "period"),
      role: requiredField(volunteer, "role"),
      org: requiredField(volunteer, "org"),
      url: requiredField(volunteer, "url"),
      description: requiredField(volunteer, "description"),
    } satisfies CvVolunteer,
  };
})();

export const teachingPage = (() => {
  const { attributes, intro, sections } = parsePage(teachingRaw);

  return {
    title: requiredField(attributes, "title"),
    intro,
    sections: sections.map<TeachingSection>((section) => ({
      heading: section.heading,
      refs: section.items.map(parseReference),
    })),
  };
})();

export const blogPosts: BlogPostDocument[] = Object.values(blogFiles)
  .map(parseBlogPost)
  .sort((a, b) => Date.parse(b.date) - Date.parse(a.date));

export const projects: ProjectDocument[] = Object.values(projectFiles)
  .map(parseProject)
  .sort((a, b) => a.order - b.order);
