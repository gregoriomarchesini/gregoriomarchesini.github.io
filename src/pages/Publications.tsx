import { motion } from "framer-motion";
import { FileText, ExternalLink } from "lucide-react";
import Layout from "@/components/Layout";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.45, ease: "easeOut" as const },
  }),
};

interface Paper {
  title: string;
  authors: string;
  venue: string;
  year: number;
  arxivUrl?: string;
  doiUrl?: string;
  previewImg?: string;
}

const papers: Paper[] = [
  {
    title: "Sampling-Based Planning Under STL Specifications: A Forward Invariance Approach",
    authors: "Gregorio Marchesini, Siyuan Liu, Lars Lindemann, and Dimos V. Dimarogonas",
    venue: "Preprint",
    year: 2025,
    arxivUrl: "https://arxiv.org/abs/2506.10739",
    previewImg: "https://gregoriomarchesini.github.io/assets/img/publication_preview/ISS_inspection.png",
  },
  {
    title: "A Communication Consistent Approach to Signal Temporal Logic Task Decomposition in Multi-Agent Systems",
    authors: "G. Marchesini, S. Liu, L. Lindemann, and D.V. Dimarogonas",
    venue: "Preprint",
    year: 2024,
    arxivUrl: "https://arxiv.org/abs/2410.12563",
    previewImg: "https://gregoriomarchesini.github.io/assets/img/publication_preview/drone_image_small_a.png",
  },
  {
    title: "Decentralized Control of Multi-Agent Systems Under Acyclic Spatio-Temporal Task Dependencies",
    authors: "G. Marchesini, S. Liu, L. Lindemann, and D.V. Dimarogonas",
    venue: "CDC 2024",
    year: 2024,
    doiUrl: "https://doi.org/10.1109/CDC56724.2024.10885877",
    previewImg: "https://gregoriomarchesini.github.io/assets/img/publication_preview/treegraph.png",
  },
];

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
        Publications
      </motion.h1>
      <motion.p
        initial="hidden"
        animate="visible"
        custom={1}
        variants={fadeUp}
        className="text-muted-foreground font-body mb-12"
      >
        See{" "}
        <a href="https://scholar.google.com/citations?user=XMflop0AAAAJ" target="_blank" rel="noreferrer" className="text-primary hover:underline">
          Google Scholar
        </a>{" "}
        for a complete list.
      </motion.p>

      <div className="space-y-10">
        {papers.map((paper, i) => (
          <motion.article
            key={paper.title}
            initial="hidden"
            animate="visible"
            custom={i + 2}
            variants={fadeUp}
            className="grid md:grid-cols-[160px_1fr] gap-6 border-l-2 border-primary/30 pl-6"
          >
            {paper.previewImg && (
              <img
                src={paper.previewImg}
                alt={paper.title}
                loading="lazy"
                className="rounded-md border border-border w-full md:w-40 object-cover"
              />
            )}
            <div className="space-y-2">
              <h2 className="text-lg font-bold leading-snug">{paper.title}</h2>
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
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  </Layout>
);

export default Publications;
