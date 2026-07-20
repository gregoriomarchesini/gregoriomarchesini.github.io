import { useMemo } from "react";
import { renderInline } from "@/lib/markdown";

interface InlineMarkdownProps {
  content: string;
  className?: string;
}

/**
 * Renders a single line of markdown (links, bold, italic, code) without the
 * block-level `prose` wrapper — for page intros that keep their own typography.
 */
const InlineMarkdown = ({ content, className = "" }: InlineMarkdownProps) => {
  const html = useMemo(() => renderInline(content), [content]);

  return (
    <span
      className={`[&_a]:text-primary hover:[&_a]:underline ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default InlineMarkdown;
