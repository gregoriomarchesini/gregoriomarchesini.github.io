import { motion } from "framer-motion";
import { Mail, MapPin, ExternalLink, Github } from "lucide-react";
import Layout from "@/components/Layout";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.5, ease: "easeOut" as const },
  }),
};

const researchInterests = [
  "Formal Methods",
  "Multi-Agent Systems",
  "Graph Theory",
  "Predictive Control",
  "Robotics",
  "Signal Temporal Logic",
];

const news = [
  {
    date: "Jun 2025",
    text: 'Our latest publication "Sampling-Based Planning Under STL Specifications: A Forward Invariance Approach" is now available.',
    link: "https://arxiv.org/abs/2506.10739",
  },
  {
    date: "Apr 2025",
    text: 'Our latest publication "A Communication Consistent Approach to Signal Temporal Logic Task Decomposition in Multi-Agent Systems" is now available.',
    link: "https://arxiv.org/abs/2410.12563",
  },
];

const Index = () => (
  <Layout>
    <section className="container py-16 md:py-24">
      <div className="grid md:grid-cols-[280px_1fr] gap-12 md:gap-16 items-start">
        {/* Profile image */}
        <motion.div
          initial="hidden"
          animate="visible"
          custom={0}
          variants={fadeUp}
        >
          <img
            src="https://gregoriomarchesini.github.io/assets/img/me.JPG"
            alt="Gregorio Marchesini"
            width={512}
            height={640}
            className="w-full rounded-lg shadow-lg object-cover"
          />
          <div className="mt-6 flex flex-col gap-2 text-sm font-body text-muted-foreground">
            <span className="flex items-center gap-2">
              <MapPin size={15} className="text-primary shrink-0" />
              Malvinas Väg 10, Floor 6, SE-100 44 Stockholm
            </span>
            <a href="https://github.com/gregoriomarchesini" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-primary hover:underline">
              <Github size={15} />
              GitHub
            </a>
            <a href="https://scholar.google.com/citations?user=XMflop0AAAAJ" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-primary hover:underline">
              <ExternalLink size={15} />
              Google Scholar
            </a>
          </div>
        </motion.div>

        {/* Info */}
        <div className="space-y-8">
          <motion.div initial="hidden" animate="visible" custom={1} variants={fadeUp}>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Gregorio Marchesini
            </h1>
            <p className="mt-2 text-lg text-muted-foreground font-body">
              Ph.D. Student · Decision and Control Systems
            </p>
            <p className="text-muted-foreground font-body">
              KTH Royal Institute of Technology, EECS
            </p>
          </motion.div>

          <motion.div initial="hidden" animate="visible" custom={2} variants={fadeUp}>
            <h2 className="text-xl font-bold mb-3">About</h2>
            <p className="text-foreground/80 font-body leading-relaxed max-w-2xl">
              I am a Ph.D. student at the division of Decision and Control Systems (
              <a href="https://www.kth.se/is/dcs/division-of-decision-and-control-systems-1.788078" target="_blank" rel="noreferrer" className="text-primary hover:underline">DCS</a>
              ) at <strong>KTH Royal Institute of Technology</strong>, Stockholm, Sweden.
              I am supervised by Prof.{" "}
              <a href="https://people.kth.se/~dimos/" target="_blank" rel="noreferrer" className="text-primary hover:underline">Dimos V. Dimarogonas</a> (KTH) and Prof.{" "}
              <a href="https://viterbigradadmission.usc.edu/doctoral/faculty-research/profile/?lname=Lindemann&fname=Lars" target="_blank" rel="noreferrer" className="text-primary hover:underline">Lars Lindemann</a> (USC).
            </p>
            <p className="mt-4 text-foreground/80 font-body leading-relaxed max-w-2xl">
              Mostly guided by a strong passion for mathematics and its application in robotics systems, my main research interests are in <strong>formal methods</strong> for <strong>multi-agent</strong> systems planning and control, <strong>graph theory</strong>, <strong>predictive control</strong> and <strong>robotics</strong>. During my PhD I will develop solutions for multi-agent planning and control under signal temporal logic tasks and sensing constraints. I am currently associated with the{" "}
              <a href="https://www.symaware.eu/" target="_blank" rel="noreferrer" className="text-primary hover:underline">SymAware</a> European project.
            </p>
          </motion.div>

          <motion.div initial="hidden" animate="visible" custom={3} variants={fadeUp}>
            <h2 className="text-xl font-bold mb-3">Research Interests</h2>
            <div className="flex flex-wrap gap-2">
              {researchInterests.map((interest) => (
                <span
                  key={interest}
                  className="rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary font-body"
                >
                  {interest}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div initial="hidden" animate="visible" custom={4} variants={fadeUp}>
            <h2 className="text-xl font-bold mb-3">News</h2>
            <ul className="space-y-3 font-body text-sm text-foreground/80">
              {news.map((item) => (
                <li key={item.date} className="flex gap-4">
                  <span className="text-primary font-semibold shrink-0 w-20">{item.date}</span>
                  <span>
                    {item.text}{" "}
                    <a href={item.link} target="_blank" rel="noreferrer" className="text-primary hover:underline">
                      [arXiv]
                    </a>
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div initial="hidden" animate="visible" custom={5} variants={fadeUp}>
            <blockquote className="border-l-2 border-primary/30 pl-4 italic text-muted-foreground font-display text-sm leading-relaxed">
              "… That you are here—that life exists and identity, That the powerful play goes on, and you may contribute a verse."
              <br />
              <span className="not-italic text-xs mt-1 block">— Walt Whitman</span>
            </blockquote>
          </motion.div>
        </div>
      </div>
    </section>
  </Layout>
);

export default Index;
