import { motion } from "framer-motion";
import { Mail, MapPin, GraduationCap, Briefcase, Award, Globe } from "lucide-react";
import Layout from "@/components/Layout";
import { cvContent } from "@/content/siteContent";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.45, ease: "easeOut" as const },
  }),
};

const CV = () => (
  <Layout>
    <section className="container py-16 md:py-24 max-w-3xl">
      <motion.div initial="hidden" animate="visible" custom={0} variants={fadeUp} className="mb-8">
        <h1 className="text-4xl font-bold">Curriculum Vitae</h1>
        <div className="flex flex-wrap gap-4 mt-3 text-sm font-body text-muted-foreground">
          <span className="flex items-center gap-1.5"><Mail size={14} className="text-primary" /> {cvContent.contact.email}</span>
          <span className="flex items-center gap-1.5"><MapPin size={14} className="text-primary" /> {cvContent.contact.location}</span>
          <span className="flex items-center gap-1.5"><Globe size={14} className="text-primary" /> {cvContent.contact.languages}</span>
        </div>
      </motion.div>

      {/* Education */}
      <motion.div initial="hidden" animate="visible" custom={1} variants={fadeUp} className="mb-10">
        <h2 className="text-xl font-bold flex items-center gap-2 mb-4"><GraduationCap size={20} className="text-primary" /> Education</h2>
        <div className="space-y-4">
          {cvContent.education.map((e) => (
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
          {cvContent.work.map((w) => (
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
          {cvContent.certificates.map((c) => (
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
          <p className="text-xs text-primary font-semibold font-body">{cvContent.volunteer.period}</p>
          <p className="font-bold text-sm">{cvContent.volunteer.role} — <a href={cvContent.volunteer.url} target="_blank" rel="noreferrer" className="text-primary hover:underline">{cvContent.volunteer.org}</a></p>
          <p className="text-sm text-muted-foreground font-body">{cvContent.volunteer.description}</p>
        </div>
      </motion.div>
    </section>
  </Layout>
);

export default CV;
