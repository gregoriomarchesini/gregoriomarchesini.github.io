import { optionalList, parseFrontmatter, requiredField } from "@/lib/frontmatter";

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

const aboutPages = import.meta.glob("./pages/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

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

const aboutSource = aboutPages["./pages/about.md"];

if (!aboutSource) {
  throw new Error("Missing about page content: ./pages/about.md");
}

export const aboutPage = parseAboutPage(aboutSource);

export const blogPosts: BlogPostDocument[] = Object.values(blogFiles)
  .map(parseBlogPost)
  .sort((a, b) => Date.parse(b.date) - Date.parse(a.date));

export const projects: ProjectDocument[] = Object.values(projectFiles)
  .map(parseProject)
  .sort((a, b) => a.order - b.order);
