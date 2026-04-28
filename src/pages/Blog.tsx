import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { blogPosts } from "@/content/collections";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.45, ease: "easeOut" as const },
  }),
};

const Blog = () => (
  <Layout>
    <section className="container py-16 md:py-24 max-w-3xl">
      <motion.h1 initial="hidden" animate="visible" custom={0} variants={fadeUp} className="text-4xl font-bold mb-2">
        Blog
      </motion.h1>
      <motion.p initial="hidden" animate="visible" custom={1} variants={fadeUp} className="text-muted-foreground font-body italic mb-12">
        Not all those who wonder are lost…
      </motion.p>

      <div className="space-y-8">
        {blogPosts.map((post, i) => (
          <motion.div
            key={post.title}
            initial="hidden"
            animate="visible"
            custom={i + 2}
            variants={fadeUp}
          >
            <Link
              to={`/blog/${post.year}/${post.slug}`}
              className="block border-l-2 border-primary/30 pl-6 py-2 group hover:border-primary transition-colors"
            >
              <h2 className="text-lg font-bold group-hover:text-primary transition-colors">
                {post.title}
              </h2>
              <p className="text-sm text-muted-foreground font-body mt-1">
                {post.date} · {post.readTime}
              </p>
              <div className="flex gap-2 mt-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-primary/10 px-3 py-0.5 text-xs font-medium text-primary font-body">
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  </Layout>
);

export default Blog;
