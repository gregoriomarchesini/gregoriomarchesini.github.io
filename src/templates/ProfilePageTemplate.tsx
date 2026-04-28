import { motion } from "framer-motion";
import { ExternalLink, Github, MapPin } from "lucide-react";
import Layout from "@/components/Layout";
import MarkdownContent from "@/templates/MarkdownContent";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.5, ease: "easeOut" as const },
  }),
};

interface ProfilePageTemplateProps {
  title: string;
  role: string;
  institution: string;
  image: string;
  location: string;
  githubUrl: string;
  scholarUrl: string;
  content: string;
}

const ProfilePageTemplate = ({
  title,
  role,
  institution,
  image,
  location,
  githubUrl,
  scholarUrl,
  content,
}: ProfilePageTemplateProps) => (
  <Layout>
    <section className="container py-16 md:py-24">
      <div className="grid items-start gap-12 md:grid-cols-[280px_1fr] md:gap-16">
        <motion.aside initial="hidden" animate="visible" custom={0} variants={fadeUp}>
          <img
            src={image}
            alt={title}
            width={512}
            height={640}
            className="w-full rounded-lg object-cover shadow-lg"
          />
          <div className="mt-6 flex flex-col gap-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <MapPin size={15} className="shrink-0 text-primary" />
              {location}
            </span>
            <a href={githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-primary hover:underline">
              <Github size={15} />
              GitHub
            </a>
            <a href={scholarUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-primary hover:underline">
              <ExternalLink size={15} />
              Google Scholar
            </a>
          </div>
        </motion.aside>

        <div className="space-y-8">
          <motion.div initial="hidden" animate="visible" custom={1} variants={fadeUp}>
            <h1 className="text-4xl font-bold leading-tight md:text-5xl">{title}</h1>
            <p className="mt-2 text-lg text-muted-foreground">{role}</p>
            <p className="text-muted-foreground">{institution}</p>
          </motion.div>

          <motion.div initial="hidden" animate="visible" custom={2} variants={fadeUp}>
            <MarkdownContent content={content} />
          </motion.div>
        </div>
      </div>
    </section>
  </Layout>
);

export default ProfilePageTemplate;
