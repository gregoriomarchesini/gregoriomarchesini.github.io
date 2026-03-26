import { motion } from "framer-motion";
import { FileText, Video, ExternalLink } from "lucide-react";
import Layout from "@/components/Layout";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.45, ease: "easeOut" },
  }),
};

interface Paper {
  title: string;
  authors: string;
  venue: string;
  year: number;
  pdfUrl?: string;
  videoUrl?: string;
  projectUrl?: string;
}

const papers: Paper[] = [
  {
    title: "A Novel Approach to Visual Representation Learning",
    authors: "Your Name, Collaborator A, Collaborator B",
    venue: "CVPR 2026",
    year: 2026,
    pdfUrl: "#",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    projectUrl: "#",
  },
  {
    title: "Efficient Transformers for Dense Prediction Tasks",
    authors: "Your Name, Collaborator C",
    venue: "NeurIPS 2025",
    year: 2025,
    pdfUrl: "#",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    title: "Self-Supervised Learning with Limited Annotations",
    authors: "Collaborator D, Your Name, Collaborator E",
    venue: "ICCV 2025",
    year: 2025,
    pdfUrl: "#",
  },
  {
    title: "Multimodal Reasoning in Open-World Environments",
    authors: "Your Name, Collaborator F",
    venue: "ICML 2024",
    year: 2024,
    pdfUrl: "#",
    projectUrl: "#",
  },
];

const Publications = () => (
  <Layout>
    <section className="container py-16 md:py-24 max-w-3xl">
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
        Selected papers. See{" "}
        <a href="https://scholar.google.com" target="_blank" rel="noreferrer" className="text-primary hover:underline">
          Google Scholar
        </a>{" "}
        for a full list.
      </motion.p>

      <div className="space-y-10">
        {papers.map((paper, i) => (
          <motion.article
            key={paper.title}
            initial="hidden"
            animate="visible"
            custom={i + 2}
            variants={fadeUp}
            className="border-l-2 border-primary/30 pl-6 space-y-3"
          >
            <div>
              <h2 className="text-lg font-bold leading-snug">{paper.title}</h2>
              <p className="text-sm text-muted-foreground font-body mt-1">
                {paper.authors}
              </p>
              <p className="text-sm font-body">
                <span className="font-semibold text-primary">{paper.venue}</span>
                {" · "}{paper.year}
              </p>
            </div>

            <div className="flex flex-wrap gap-3 text-sm font-body">
              {paper.pdfUrl && (
                <a href={paper.pdfUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-primary hover:underline">
                  <FileText size={14} /> PDF
                </a>
              )}
              {paper.videoUrl && (
                <span className="flex items-center gap-1.5 text-primary">
                  <Video size={14} /> Video below
                </span>
              )}
              {paper.projectUrl && (
                <a href={paper.projectUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-primary hover:underline">
                  <ExternalLink size={14} /> Project
                </a>
              )}
            </div>

            {paper.videoUrl && (
              <div className="aspect-video rounded-lg overflow-hidden bg-card border border-border mt-2">
                <iframe
                  src={paper.videoUrl}
                  title={`Video for ${paper.title}`}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}
          </motion.article>
        ))}
      </div>
    </section>
  </Layout>
);

export default Publications;
