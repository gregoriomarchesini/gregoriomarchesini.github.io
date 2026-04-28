import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Layout from "@/components/Layout";
import MarkdownContent from "@/templates/MarkdownContent";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.45, ease: "easeOut" as const },
  }),
};

interface BlogPostTemplateProps {
  title: string;
  date: string;
  readTime?: string;
  tags: string[];
  content: string;
}

const BlogPostTemplate = ({ title, date, readTime, tags, content }: BlogPostTemplateProps) => (
  <Layout>
    <section className="container max-w-3xl py-16 md:py-24">
      <motion.div initial="hidden" animate="visible" custom={0} variants={fadeUp}>
        <Link
          to="/blog"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft size={16} />
          Back to Blog
        </Link>
      </motion.div>

      <motion.h1
        initial="hidden"
        animate="visible"
        custom={1}
        variants={fadeUp}
        className="mb-2 text-4xl font-bold"
      >
        {title}
      </motion.h1>

      <motion.p
        initial="hidden"
        animate="visible"
        custom={2}
        variants={fadeUp}
        className="mb-4 mt-1 text-sm text-muted-foreground"
      >
        {date}
        {readTime ? ` · ${readTime}` : ""}
      </motion.p>

      <motion.div
        initial="hidden"
        animate="visible"
        custom={3}
        variants={fadeUp}
        className="mb-10 flex flex-wrap gap-2"
      >
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-primary/10 px-3 py-0.5 text-xs font-medium text-primary"
          >
            {tag}
          </span>
        ))}
      </motion.div>

      <motion.div initial="hidden" animate="visible" custom={4} variants={fadeUp}>
        <MarkdownContent content={content} />
      </motion.div>
    </section>
  </Layout>
);

export default BlogPostTemplate;
