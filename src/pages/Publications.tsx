import { motion } from "framer-motion";
import { FileText, ExternalLink } from "lucide-react";
import Layout from "@/components/Layout";
import { publicationsPage } from "@/content/collections";
import InlineMarkdown from "@/templates/InlineMarkdown";

const { title, intro, groups } = publicationsPage;

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    // Capped: the list is long enough that an uncapped stagger would leave the
    // last entries blank for over a second after load.
    transition: { delay: Math.min(i, 8) * 0.08, duration: 0.45, ease: "easeOut" as const },
  }),
};

/**
 * First stagger slot of each group, so the fade-in stays continuous across
 * section boundaries. Slots 0 and 1 belong to the page title and intro; each
 * group then consumes one slot for its heading plus one per paper.
 */
const slotOf = groups.reduce<number[]>((slots, _, i) => {
  const previous = i === 0 ? 2 : slots[i - 1] + groups[i - 1].papers.length + 1;
  return [...slots, previous];
}, []);

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

      <div className="space-y-14">
        {groups.map((group, g) => (
          <section key={group.heading}>
            <motion.h2
              initial="hidden"
              animate="visible"
              custom={slotOf[g]}
              variants={fadeUp}
              className="text-sm font-semibold uppercase tracking-[0.15em] text-muted-foreground border-b border-border pb-2 mb-8"
            >
              {group.heading}
            </motion.h2>

            <div className="space-y-10">
              {group.papers.map((paper, i) => {
                const primaryUrl =
                  paper.ieeeUrl ?? paper.doiUrl ?? paper.arxivUrl ?? paper.url;

                return (
                  <motion.article
                    key={paper.title}
                    initial="hidden"
                    animate="visible"
                    custom={slotOf[g] + 1 + i}
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
                      <h3 className="text-lg font-bold leading-snug">
                        {primaryUrl ? (
                          <a href={primaryUrl} target="_blank" rel="noreferrer" className="hover:text-primary hover:underline">
                            {paper.title}
                          </a>
                        ) : (
                          paper.title
                        )}
                      </h3>
                      <p className="text-sm text-muted-foreground font-body">
                        <InlineMarkdown
                          content={paper.authors}
                          className="[&_strong]:font-semibold [&_strong]:text-foreground"
                        />
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
                        {/* IEEE papers link straight to Xplore; the DOI resolves
                            to the same page, so only one of the two is shown. */}
                        {paper.ieeeUrl ? (
                          <a href={paper.ieeeUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-primary hover:underline">
                            <ExternalLink size={14} /> IEEE Xplore
                          </a>
                        ) : (
                          paper.doiUrl && (
                            <a href={paper.doiUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-primary hover:underline">
                              <ExternalLink size={14} /> DOI
                            </a>
                          )
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
        ))}
      </div>
    </section>
  </Layout>
);

export default Publications;
