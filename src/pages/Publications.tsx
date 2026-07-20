import { motion } from "framer-motion";
import { FileText, ExternalLink } from "lucide-react";
import Layout from "@/components/Layout";
import { publicationsPage } from "@/content/collections";
import InlineMarkdown from "@/templates/InlineMarkdown";

const { title, intro, papers } = publicationsPage;

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.45, ease: "easeOut" as const },
  }),
};

const Publications = () => (
  <Layout>
    <section className="container py-16 md:py-24 max-w-4xl">
      <motion.h1
        initial="hidden"
        animate="visible"
        custom={0}
        variants={fadeUp}
        className="text-4xl font-bold mb-2"
      >
        {title}
      </motion.h1>
      <motion.p
        initial="hidden"
        animate="visible"
        custom={1}
        variants={fadeUp}
        className="text-muted-foreground font-body mb-12"
      >
        <InlineMarkdown content={intro} />
      </motion.p>

      <div className="space-y-10">
        {papers.map((paper, i) => {
          const primaryUrl = paper.doiUrl ?? paper.arxivUrl ?? paper.url;

          return (
            <motion.article
              key={paper.title}
              initial="hidden"
              animate="visible"
              custom={i + 2}
              variants={fadeUp}
              className={`border-l-2 border-primary/30 pl-6${
                paper.previewImg ? " grid md:grid-cols-[160px_1fr] gap-6" : ""
              }`}
            >
              {paper.previewImg &&
                (primaryUrl ? (
                  <a href={primaryUrl} target="_blank" rel="noreferrer">
                    <img
                      src={paper.previewImg}
                      alt={paper.title}
                      loading="lazy"
                      className="rounded-md border border-border w-full md:w-40 object-cover"
                    />
                  </a>
                ) : (
                  <img
                    src={paper.previewImg}
                    alt={paper.title}
                    loading="lazy"
                    className="rounded-md border border-border w-full md:w-40 object-cover"
                  />
                ))}
              <div className="space-y-2">
                <h2 className="text-lg font-bold leading-snug">
                  {primaryUrl ? (
                    <a href={primaryUrl} target="_blank" rel="noreferrer" className="hover:text-primary hover:underline">
                      {paper.title}
                    </a>
                  ) : (
                    paper.title
                  )}
                </h2>
                <p className="text-sm text-muted-foreground font-body">
                  {paper.authors}
                </p>
                <p className="text-sm font-body">
                  <span className="font-semibold text-primary">{paper.venue}</span>
                  {" · "}{paper.year}
                </p>

                <div className="flex flex-wrap gap-3 text-sm font-body pt-1">
                  {paper.arxivUrl && (
                    <a href={paper.arxivUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-primary hover:underline">
                      <FileText size={14} /> arXiv
                    </a>
                  )}
                  {paper.doiUrl && (
                    <a href={paper.doiUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-primary hover:underline">
                      <ExternalLink size={14} /> DOI
                    </a>
                  )}
                  {paper.url && (
                    <a href={paper.url} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-primary hover:underline">
                      <ExternalLink size={14} /> Link
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  </Layout>
);

export default Publications;
