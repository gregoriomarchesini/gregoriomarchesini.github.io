import { motion } from "framer-motion";
import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Layout from "@/components/Layout";
import { posts } from "@/data/blogPosts";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.45, ease: "easeOut" as const },
  }),
};

const BlogPost = () => {
  const { year, slug } = useParams<{ year: string; slug: string }>();
  const post = posts.find((p) => p.year === year && p.slug === slug);

  if (!post) return <Navigate to="/blog" replace />;

  return (
    <Layout>
      <section className="container py-16 md:py-24 max-w-3xl">
        <motion.div initial="hidden" animate="visible" custom={0} variants={fadeUp}>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft size={16} />
            Back to Blog
          </Link>
        </motion.div>

        <motion.h1
          initial="hidden"
          animate="visible"
          custom={1}
          variants={fadeUp}
          className="text-4xl font-bold mb-2"
        >
          {post.title}
        </motion.h1>

        <motion.p
          initial="hidden"
          animate="visible"
          custom={2}
          variants={fadeUp}
          className="text-sm text-muted-foreground font-body mt-1 mb-4"
        >
          {post.date} · {post.readTime}
        </motion.p>

        <motion.div
          initial="hidden"
          animate="visible"
          custom={3}
          variants={fadeUp}
          className="flex gap-2 mb-10"
        >
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-primary/10 px-3 py-0.5 text-xs font-medium text-primary font-body"
            >
              {tag}
            </span>
          ))}
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          custom={4}
          variants={fadeUp}
          className="font-body text-base leading-relaxed text-foreground"
        >
          {post.content}
        </motion.div>
      </section>
    </Layout>
  );
};

export default BlogPost;
