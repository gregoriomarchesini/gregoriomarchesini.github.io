import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { projects, projectsPage } from "@/content/collections";
import InlineMarkdown from "@/templates/InlineMarkdown";
import MarkdownContent from "@/templates/MarkdownContent";

const { title, intro } = projectsPage;

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.45, ease: "easeOut" as const },
  }),
};

const Projects = () => (
  <Layout>
    <section className="container py-16 md:py-24 max-w-4xl">
      <motion.h1 initial="hidden" animate="visible" custom={0} variants={fadeUp} className="text-4xl font-bold mb-2">
        {title}
      </motion.h1>

      <motion.div
        initial="hidden"
        animate="visible"
        custom={1}
        variants={fadeUp}
        className="mb-12"
      >
        <MarkdownContent content={intro} className="prose-p:my-3 prose-p:text-muted-foreground" />
      </motion.div>

      {["thesis", "explore"].map((cat) => (
        <div key={cat} className="mb-12">
          <motion.h2
            initial="hidden"
            animate="visible"
            custom={2}
            variants={fadeUp}
            className="text-sm font-body font-semibold tracking-wider uppercase text-primary mb-6"
          >
            {cat}
          </motion.h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {projects
              .filter((p) => p.category === cat)
              .map((project, i) => (
                <motion.div
                  key={project.title}
                  initial="hidden"
                  animate="visible"
                  custom={i + 3}
                  variants={fadeUp}
                  className="group overflow-hidden rounded-lg border border-border bg-card transition-shadow hover:shadow-lg"
                >
                  <Link to={`/projects/${project.slug}`}>
                    <img
                      src={project.img}
                      alt={project.title}
                      loading="lazy"
                      className="h-40 w-full object-cover"
                    />
                    <div className="p-4">
                      <h3 className="flex items-center gap-1.5 text-sm font-bold leading-snug transition-colors group-hover:text-primary">
                        {project.title}
                        <ExternalLink size={12} className="shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
                      </h3>
                      {(project.student || project.company) && (
                        <p className="mt-2 text-xs font-body leading-5 text-muted-foreground">
                          {project.student && (
                            <span className="text-foreground/85">{project.student}</span>
                          )}
                          {project.student && project.company && <br />}
                          {project.company && <InlineMarkdown content={project.company} />}
                        </p>
                      )}
                      {project.status && (
                        <span className="mt-2 inline-block rounded-full bg-primary/10 px-3 py-0.5 text-xs font-medium text-primary font-body">
                          {project.status}
                        </span>
                      )}
                    </div>
                  </Link>
                </motion.div>
              ))}
          </div>
        </div>
      ))}
    </section>
  </Layout>
);

export default Projects;
