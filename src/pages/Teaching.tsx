import { motion } from "framer-motion";
import { ExternalLink, BookOpen, Play } from "lucide-react";
import Layout from "@/components/Layout";
import { teachingPage } from "@/content/collections";
import InlineMarkdown from "@/templates/InlineMarkdown";

const { title, intro, sections: teachingSections } = teachingPage;

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.4, ease: "easeOut" as const },
  }),
};

function extractYoutubeId(url: string): string | null {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&?/]+)/);
  return match?.[1] ?? null;
}

const Teaching = () => (
  <Layout>
    <section className="container py-16 md:py-24 max-w-3xl">
      <motion.h1 initial="hidden" animate="visible" custom={0} variants={fadeUp} className="text-4xl font-bold mb-3">
        {title}
      </motion.h1>
      <motion.p initial="hidden" animate="visible" custom={1} variants={fadeUp} className="text-muted-foreground font-body mb-12 max-w-2xl leading-relaxed">
        <InlineMarkdown content={intro} />
      </motion.p>

      <div className="space-y-10">
        {teachingSections.map((section, si) => (
          <motion.div key={section.heading} initial="hidden" animate="visible" custom={si + 2} variants={fadeUp}>
            <h2 className="text-lg font-bold mb-4 text-primary">{section.heading}</h2>
            <div className="space-y-4">
              {section.refs.map((ref) => {
                const videoId = ref.type === "video" && ref.url ? extractYoutubeId(ref.url) : null;
                
                if (ref.type === "video" && videoId && ref.url) {
                  return (
                    <div key={ref.title} className="border border-border rounded-lg overflow-hidden bg-card">
                      <a href={ref.url} target="_blank" rel="noreferrer" className="block group relative">
                        <div className="relative aspect-video bg-black overflow-hidden">
                          <img
                            src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                            alt={ref.title}
                            className="w-full h-full object-cover group-hover:opacity-75 transition-opacity"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90">
                              <Play size={20} className="fill-red-600 text-red-600 ml-0.5" />
                            </div>
                          </div>
                        </div>
                      </a>
                      <div className="p-4">
                        <a href={ref.url} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">
                          <p className="text-sm font-semibold leading-snug">{ref.title}</p>
                        </a>
                        <p className="text-xs text-muted-foreground font-body italic mt-1">{ref.authors}</p>
                        {ref.description && (
                          <p className="text-xs text-muted-foreground mt-3 leading-relaxed">{ref.description}</p>
                        )}
                        {!ref.description && (
                          <p className="text-xs text-muted-foreground mt-3 italic opacity-50">[Add description here]</p>
                        )}
                      </div>
                    </div>
                  );
                }
                
                return (
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
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  </Layout>
);

export default Teaching;
