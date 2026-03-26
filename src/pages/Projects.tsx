import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Layout from "@/components/Layout";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.45, ease: "easeOut" as const },
  }),
};

interface Project {
  title: string;
  category: string;
  status?: string;
  img: string;
  url: string;
}

const projects: Project[] = [
  {
    title: "Multi-agent Coordination Under Spatio-Temporal And Communication Constraints",
    category: "thesis",
    img: "https://gregoriomarchesini.github.io/assets/img/publication_preview/drone_image_small_a.jpg",
    url: "https://gregoriomarchesini.github.io/projects/1_project/",
  },
  {
    title: "A Differential Game Framework for Multi-Agent Coordination under Signal Temporal Logic Specifications",
    category: "thesis",
    img: "https://gregoriomarchesini.github.io/assets/img/enrico_image.png",
    url: "https://gregoriomarchesini.github.io/projects/4_project/",
  },
  {
    title: "Optimal Control for Enhanced Flight Performance of a Tilt-Rotor Drone",
    category: "thesis",
    img: "https://gregoriomarchesini.github.io/assets/img/drone_with_tree.png",
    url: "https://gregoriomarchesini.github.io/projects/5_project/",
  },
  {
    title: "Exploring multi-agent planning",
    category: "explore",
    status: "Open for application",
    img: "https://gregoriomarchesini.github.io/assets/img/gpt_drones.png",
    url: "https://gregoriomarchesini.github.io/projects/2_project/",
  },
  {
    title: "Orbital Stations Simulator in ROS2",
    category: "explore",
    status: "Open for application",
    img: "https://gregoriomarchesini.github.io/assets/img/ISS_gpt.png",
    url: "https://gregoriomarchesini.github.io/projects/3_project/",
  },
];

const Projects = () => (
  <Layout>
    <section className="container py-16 md:py-24 max-w-4xl">
      <motion.h1 initial="hidden" animate="visible" custom={0} variants={fadeUp} className="text-4xl font-bold mb-12">
        Projects
      </motion.h1>

      {["thesis", "explore"].map((cat) => (
        <div key={cat} className="mb-12">
          <motion.h2
            initial="hidden"
            animate="visible"
            custom={1}
            variants={fadeUp}
            className="text-sm font-body font-semibold tracking-wider uppercase text-primary mb-6"
          >
            {cat}
          </motion.h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {projects
              .filter((p) => p.category === cat)
              .map((project, i) => (
                <motion.a
                  key={project.title}
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  initial="hidden"
                  animate="visible"
                  custom={i + 2}
                  variants={fadeUp}
                  className="group rounded-lg border border-border overflow-hidden hover:shadow-lg transition-shadow bg-card"
                >
                  <img
                    src={project.img}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-bold text-sm leading-snug group-hover:text-primary transition-colors flex items-center gap-1.5">
                      {project.title}
                      <ExternalLink size={12} className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h3>
                    {project.status && (
                      <span className="inline-block mt-2 rounded-full bg-primary/10 px-3 py-0.5 text-xs font-medium text-primary font-body">
                        {project.status}
                      </span>
                    )}
                  </div>
                </motion.a>
              ))}
          </div>
        </div>
      ))}
    </section>
  </Layout>
);

export default Projects;
