import { Navigate, useParams } from "react-router-dom";
import { blogPosts } from "@/content/collections";
import BlogPostTemplate from "@/templates/BlogPostTemplate";

const BlogPost = () => {
  const { year, slug } = useParams<{ year: string; slug: string }>();
  const post = blogPosts.find((p) => p.year === year && p.slug === slug);

  if (!post) return <Navigate to="/blog" replace />;

  return <BlogPostTemplate {...post} />;
};

export default BlogPost;
