import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Layout from "@/components/Layout";
import InlineMarkdown from "@/templates/InlineMarkdown";
import MarkdownContent from "@/templates/MarkdownContent";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.45, ease: "easeOut" as const },
  }),
};

interface ProjectPageTemplateProps {
  title: string;
  subtitle?: string;
  student?: string;
  company?: string;
  content: string;
}

const ProjectPageTemplate = ({
  title,
  subtitle,
  student,
  company,
  content,
}: ProjectPageTemplateProps) => (
  <Layout>
    <section className="container max-w-3xl py-16 md:py-24">
      <motion.div initial="hidden" animate="visible" custom={0} variants={fadeUp}>
        <Link
          to="/projects"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft size={16} />
          Back to Projects
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

      {subtitle && (
        <motion.p
          initial="hidden"
          animate="visible"
          custom={2}
          variants={fadeUp}
          className="mb-8 text-muted-foreground"
        >
          {subtitle}
        </motion.p>
      )}

      {(student || company) && (
        <motion.div
          initial="hidden"
          animate="visible"
          custom={3}
          variants={fadeUp}
          className="mb-10 grid gap-4 rounded-lg border border-border bg-card p-5 sm:grid-cols-2"
        >
          {student && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">Student</p>
              <p className="mt-1 text-sm text-foreground/85">{student}</p>
            </div>
          )}
          {company && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">Supported by</p>
              <p className="mt-1 text-sm text-foreground/85">
                <InlineMarkdown content={company} />
              </p>
            </div>
          )}
        </motion.div>
      )}

      <motion.div initial="hidden" animate="visible" custom={4} variants={fadeUp}>
        <MarkdownContent content={content} />
      </motion.div>
    </section>
  </Layout>
);

export default ProjectPageTemplate;
