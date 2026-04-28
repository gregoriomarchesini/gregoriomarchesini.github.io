import { motion } from "framer-motion";
import { ExternalLink, BookOpen } from "lucide-react";
import Layout from "@/components/Layout";
import { teachingSections } from "@/content/siteContent";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.4, ease: "easeOut" as const },
  }),
};

const Teaching = () => (
  <Layout>
    <section className="container py-16 md:py-24 max-w-3xl">
      <motion.h1 initial="hidden" animate="visible" custom={0} variants={fadeUp} className="text-4xl font-bold mb-3">
        Teaching
      </motion.h1>
      <motion.p initial="hidden" animate="visible" custom={1} variants={fadeUp} className="text-muted-foreground font-body mb-12 max-w-2xl leading-relaxed">
        For students willing to pursue research projects with me, here you can find a list of articles and books that have shaped my education. I highly recommend using these references as starting points! 🥇
      </motion.p>

      <div className="space-y-10">
        {teachingSections.map((section, si) => (
          <motion.div key={section.heading} initial="hidden" animate="visible" custom={si + 2} variants={fadeUp}>
            <h2 className="text-lg font-bold mb-4 text-primary">{section.heading}</h2>
            <div className="space-y-3">
              {section.refs.map((ref) => (
                <div key={ref.title} className="flex gap-3 items-start border-l-2 border-border pl-4 py-1">
                  <BookOpen size={14} className="text-muted-foreground mt-1 shrink-0" />
                  <div>
                    <p className="text-sm font-semibold leading-snug">
                      {ref.url ? (
                        <a href={ref.url} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors inline-flex items-center gap-1">
                          {ref.title} <ExternalLink size={11} />
                        </a>
                      ) : (
                        ref.title
                      )}
                    </p>
                    <p className="text-xs text-muted-foreground font-body italic">{ref.authors}</p>
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-body">{ref.type}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  </Layout>
);

export default Teaching;
