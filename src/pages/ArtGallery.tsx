import { motion } from "framer-motion";
import { ImageIcon } from "lucide-react";
import Layout from "@/components/Layout";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.45, ease: "easeOut" as const },
  }),
};

const ArtGallery = () => (
  <Layout>
    <section className="container py-16 md:py-24 max-w-3xl">
      <motion.h1 initial="hidden" animate="visible" custom={0} variants={fadeUp} className="text-4xl font-bold mb-4">
        Art Gallery
      </motion.h1>
      <motion.div
        initial="hidden"
        animate="visible"
        custom={1}
        variants={fadeUp}
        className="flex flex-col items-center justify-center py-20 text-center"
      >
        <ImageIcon size={48} className="text-muted-foreground/40 mb-4" />
        <p className="text-muted-foreground font-body text-lg">Coming soon</p>
        <p className="text-muted-foreground/60 font-body text-sm mt-1">
          A collection of art and creative works will be displayed here.
        </p>
      </motion.div>
    </section>
  </Layout>
);

export default ArtGallery;
