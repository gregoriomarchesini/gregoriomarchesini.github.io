import { useMemo } from "react";
import { renderMarkdown } from "@/lib/markdown";

interface MarkdownContentProps {
  content: string;
  className?: string;
}

const MarkdownContent = ({ content, className = "" }: MarkdownContentProps) => {
  const html = useMemo(() => renderMarkdown(content), [content]);

  return (
    <div
      className={`prose prose-neutral max-w-none
        prose-headings:font-display prose-headings:font-bold prose-headings:text-foreground
        prose-h1:mb-6 prose-h1:mt-0
        prose-h2:mb-4 prose-h2:mt-14
        prose-h3:mb-3 prose-h3:mt-10
        prose-h4:mb-2 prose-h4:mt-8
        prose-p:my-5 prose-p:text-foreground/85 prose-p:leading-7
        prose-ul:my-6 prose-ol:my-6
        prose-li:my-1 prose-li:marker:text-primary
        prose-a:text-primary prose-a:no-underline hover:prose-a:underline
        prose-strong:text-foreground
        prose-code:rounded prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:text-foreground
        prose-pre:my-8 prose-pre:overflow-x-auto prose-pre:rounded-lg prose-pre:border prose-pre:border-border prose-pre:bg-muted
        prose-blockquote:my-8 prose-blockquote:border-l-2 prose-blockquote:border-primary/30 prose-blockquote:pl-4 prose-blockquote:text-muted-foreground
        prose-table:my-8 prose-table:w-full prose-table:table-fixed prose-table:border-collapse
        prose-thead:border-b prose-thead:border-border
        prose-th:px-4 prose-th:py-3 prose-th:text-left prose-th:font-semibold prose-th:text-foreground
        prose-td:px-4 prose-td:py-3 prose-td:align-top prose-td:text-foreground/85
        prose-tr:border-b prose-tr:border-border/70
        prose-hr:my-10
        prose-img:my-8 prose-img:w-full prose-img:rounded-lg
        [&_.chip-grid]:my-6 [&_.chip-grid]:flex [&_.chip-grid]:flex-wrap [&_.chip-grid]:gap-3
        [&_.chip]:inline-flex [&_.chip]:rounded-full [&_.chip]:bg-primary/10 [&_.chip]:px-4 [&_.chip]:py-2 [&_.chip]:text-sm [&_.chip]:font-medium [&_.chip]:text-primary
        dark:prose-invert ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default MarkdownContent;
