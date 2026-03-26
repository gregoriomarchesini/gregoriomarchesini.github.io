import { motion } from "framer-motion";
import { Mail, MapPin, GraduationCap, Briefcase, Award, Globe } from "lucide-react";
import Layout from "@/components/Layout";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.45, ease: "easeOut" as const },
  }),
};

const education = [
  { period: "2023 – present", degree: "PhD", institution: "KTH Royal Institute of Technology", field: "Decision and Control Systems", location: "Stockholm, Sweden" },
  { period: "2020 – 2023", degree: "Master", institution: "KTH Royal Institute of Technology", field: "Space Engineering", location: "Stockholm, Sweden" },
  { period: "2018 – 2020", degree: "Bachelor", institution: "University of Bologna", field: "Aerospace Engineering", location: "Bologna, Italy" },
];

const work = [
  { period: "2022 – 2023", role: "Research Assistant", org: "KTH, Dept. of Space and Plasma Physics", description: "Analysis of Lyman Alpha radiation features from Ganymede, Neptune and Uranus under Prof. Lorenz Roth." },
  { period: "2021", role: "AOCS Engineer", org: "MIST Satellite", description: "Implemented calibration algorithms for the on-board magnetometer." },
  { period: "2020", role: "Internship", org: "C.I.R.I Aerospace, Forlì, Italy", description: "Wavelet Decomposition for recovering temporal doppler shift in Deep Space communications." },
];

const certificates = [
  { title: "Modelling, Motion Planning and Control for Underactuated Mechanical Systems", issuer: "KTH", year: "2024" },
  { title: "EECI Course: Formal Methods for Multi-Agent Feedback Control Systems", issuer: "International Graduate School on Control", year: "2023" },
];

const CV = () => (
  <Layout>
    <section className="container py-16 md:py-24 max-w-3xl">
      <motion.div initial="hidden" animate="visible" custom={0} variants={fadeUp} className="mb-8">
        <h1 className="text-4xl font-bold">Curriculum Vitae</h1>
        <div className="flex flex-wrap gap-4 mt-3 text-sm font-body text-muted-foreground">
          <span className="flex items-center gap-1.5"><Mail size={14} className="text-primary" /> gremar@kth.se</span>
          <span className="flex items-center gap-1.5"><MapPin size={14} className="text-primary" /> Stockholm, Sweden</span>
          <span className="flex items-center gap-1.5"><Globe size={14} className="text-primary" /> Italian · English</span>
        </div>
      </motion.div>

      {/* Education */}
      <motion.div initial="hidden" animate="visible" custom={1} variants={fadeUp} className="mb-10">
        <h2 className="text-xl font-bold flex items-center gap-2 mb-4"><GraduationCap size={20} className="text-primary" /> Education</h2>
        <div className="space-y-4">
          {education.map((e) => (
            <div key={e.period} className="border-l-2 border-primary/30 pl-5">
              <p className="text-xs text-primary font-semibold font-body">{e.period}</p>
              <p className="font-bold text-sm">{e.degree} — {e.institution}</p>
              <p className="text-sm text-muted-foreground font-body">{e.field} · {e.location}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Work */}
      <motion.div initial="hidden" animate="visible" custom={2} variants={fadeUp} className="mb-10">
        <h2 className="text-xl font-bold flex items-center gap-2 mb-4"><Briefcase size={20} className="text-primary" /> Work Experience</h2>
        <div className="space-y-4">
          {work.map((w) => (
            <div key={w.period} className="border-l-2 border-primary/30 pl-5">
              <p className="text-xs text-primary font-semibold font-body">{w.period}</p>
              <p className="font-bold text-sm">{w.role} — {w.org}</p>
              <p className="text-sm text-muted-foreground font-body">{w.description}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Certificates */}
      <motion.div initial="hidden" animate="visible" custom={3} variants={fadeUp} className="mb-10">
        <h2 className="text-xl font-bold flex items-center gap-2 mb-4"><Award size={20} className="text-primary" /> Certificates</h2>
        <div className="space-y-3">
          {certificates.map((c) => (
            <div key={c.title} className="border-l-2 border-primary/30 pl-5">
              <p className="font-bold text-sm">{c.title}</p>
              <p className="text-xs text-muted-foreground font-body">{c.issuer} · {c.year}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Volunteer */}
      <motion.div initial="hidden" animate="visible" custom={4} variants={fadeUp}>
        <h2 className="text-xl font-bold flex items-center gap-2 mb-4">🤝 Volunteer</h2>
        <div className="border-l-2 border-primary/30 pl-5">
          <p className="text-xs text-primary font-semibold font-body">2022 – 2023</p>
          <p className="font-bold text-sm">Social Media and Events Manager — <a href="https://euroavia.eu/" target="_blank" rel="noreferrer" className="text-primary hover:underline">Euroavia</a></p>
          <p className="text-sm text-muted-foreground font-body">Lead organizer of events, research project presentations and social media management.</p>
        </div>
      </motion.div>
    </section>
  </Layout>
);

export default CV;
