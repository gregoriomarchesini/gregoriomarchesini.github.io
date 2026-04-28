import { Navigate, useParams } from "react-router-dom";
import { projects } from "@/content/collections";
import ProjectPageTemplate from "@/templates/ProjectPageTemplate";

const ProjectPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find((entry) => entry.slug === slug);

  if (!project) return <Navigate to="/projects" replace />;

  return <ProjectPageTemplate {...project} />;
};

export default ProjectPost;
