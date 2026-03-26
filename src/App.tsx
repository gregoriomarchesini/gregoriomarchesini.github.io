import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import Publications from "./pages/Publications.tsx";
import Blog from "./pages/Blog.tsx";
import Projects from "./pages/Projects.tsx";
import Coding from "./pages/Coding.tsx";
import CV from "./pages/CV.tsx";
import Teaching from "./pages/Teaching.tsx";
import ArtGallery from "./pages/ArtGallery.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/publications" element={<Publications />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/coding" element={<Coding />} />
          <Route path="/cv" element={<CV />} />
          <Route path="/teaching" element={<Teaching />} />
          <Route path="/art-gallery" element={<ArtGallery />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
