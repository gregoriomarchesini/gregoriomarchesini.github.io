import { motion } from "framer-motion";
import { Mail, MapPin, ExternalLink } from "lucide-react";
import Layout from "@/components/Layout";
import profileImg from "@/assets/profile-placeholder.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.5, ease: "easeOut" as const },
  }),
};


const researchInterests = [
  "Machine Learning",
  "Computer Vision",
  "Natural Language Processing",
  "Reinforcement Learning",
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
            src={profileImg}
            alt="Profile photo"
            width={512}
            height={640}
            className="w-full rounded-lg shadow-lg"
          />
        </motion.div>

        {/* Info */}
        <div className="space-y-8">
          <motion.div initial="hidden" animate="visible" custom={1} variants={fadeUp}>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Your Name
            </h1>
            <p className="mt-2 text-lg text-muted-foreground font-body">
              Assistant Professor of Computer Science
            </p>
            <p className="text-muted-foreground font-body">
              University Name, Department
            </p>
          </motion.div>

          <motion.div initial="hidden" animate="visible" custom={2} variants={fadeUp} className="flex flex-wrap gap-4 text-sm font-body">
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <Mail size={16} className="text-primary" />
              your.email@university.edu
            </span>
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <MapPin size={16} className="text-primary" />
              Office 123, CS Building
            </span>
            <a href="https://scholar.google.com" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-primary hover:underline">
              <ExternalLink size={16} />
              Google Scholar
            </a>
          </motion.div>

          <motion.div initial="hidden" animate="visible" custom={3} variants={fadeUp}>
            <h2 className="text-xl font-bold mb-3">About</h2>
            <p className="text-foreground/80 font-body leading-relaxed max-w-2xl">
              I am a researcher focused on developing novel methods at the intersection of machine learning and computer vision. 
              My work aims to build intelligent systems that can understand and interact with the visual world. 
              Previously, I completed my PhD at University Name and was a postdoctoral researcher at Lab Name.
            </p>
          </motion.div>

          <motion.div initial="hidden" animate="visible" custom={4} variants={fadeUp}>
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

          <motion.div initial="hidden" animate="visible" custom={5} variants={fadeUp}>
            <h2 className="text-xl font-bold mb-3">News</h2>
            <ul className="space-y-2 font-body text-sm text-foreground/80">
              <li className="flex gap-3">
                <span className="text-primary font-semibold shrink-0">Mar 2026</span>
                Paper accepted at CVPR 2026!
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-semibold shrink-0">Jan 2026</span>
                Gave an invited talk at Workshop Name.
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-semibold shrink-0">Sep 2025</span>
                Joined University Name as Assistant Professor.
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  </Layout>
);

export default Index;
