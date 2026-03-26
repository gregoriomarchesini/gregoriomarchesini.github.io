import { motion } from "framer-motion";
import { Github } from "lucide-react";
import Layout from "@/components/Layout";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.45, ease: "easeOut" as const },
  }),
};

const repos = [
  {
    name: "stl_rrt_py",
    url: "https://github.com/gregoriomarchesini/stl_rrt_py",
    description: "Sampling-based motion planning under Signal Temporal Logic specifications.",
  },
  {
    name: "multiagent-STL-symware",
    url: "https://github.com/gregoriomarchesini/multiagent-STL-symware",
    description: "Multi-agent coordination under STL tasks using the SymAware framework.",
  },
  {
    name: "neuromorphic_project",
    url: "https://github.com/gregoriomarchesini/neuromorphic_project",
    description: "Neuromorphic computing experiments and implementations.",
  },
];

const Coding = () => (
  <Layout>
    <section className="container py-16 md:py-24 max-w-3xl">
      <motion.h1 initial="hidden" animate="visible" custom={0} variants={fadeUp} className="text-4xl font-bold mb-4">
        Coding
      </motion.h1>
      <motion.a
        href="https://github.com/gregoriomarchesini"
        target="_blank"
        rel="noreferrer"
        initial="hidden"
        animate="visible"
        custom={1}
        variants={fadeUp}
        className="inline-flex items-center gap-2 text-primary hover:underline font-body text-sm mb-12"
      >
        <Github size={16} /> github.com/gregoriomarchesini
      </motion.a>

      <div className="space-y-6">
        {repos.map((repo, i) => (
          <motion.a
            key={repo.name}
            href={repo.url}
            target="_blank"
            rel="noreferrer"
            initial="hidden"
            animate="visible"
            custom={i + 2}
            variants={fadeUp}
            className="block border border-border rounded-lg p-5 hover:shadow-md hover:border-primary/40 transition-all bg-card group"
          >
            <h2 className="font-bold font-body group-hover:text-primary transition-colors">{repo.name}</h2>
            <p className="text-sm text-muted-foreground font-body mt-1">{repo.description}</p>
          </motion.a>
        ))}
      </div>
    </section>
  </Layout>
);

export default Coding;
