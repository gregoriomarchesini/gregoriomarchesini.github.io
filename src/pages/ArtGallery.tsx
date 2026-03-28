import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, X } from "lucide-react";
import Layout from "@/components/Layout";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const BASE = "https://raw.githubusercontent.com/gregoriomarchesini/gregoriomarchesini.github.io/main/assets/img/gallery";

const artworks = [
  { title: "The gymnast", image: `${BASE}/acrobat.jpg`, spotify: "https://open.spotify.com/track/0xGSeBsG4V8Scc5YqpZQ66" },
  { title: "The bear", image: `${BASE}/BEAR.jpeg`, spotify: "https://open.spotify.com/track/7FwBtcecmlpc1sLySPXeGE" },
  { title: "Moonflower", image: `${BASE}/flower.JPG`, spotify: "https://open.spotify.com/track/0xGSeBsG4V8Scc5YqpZQ66" },
  { title: "Jump", image: `${BASE}/jump.JPG`, spotify: "https://open.spotify.com/track/7N3PAbqfTjSEU1edb2tY8j" },
  { title: "Medusa", image: `${BASE}/medusa.JPG`, spotify: "https://open.spotify.com/track/6PdWPdgPoVCT9WLFMVnhxx" },
  { title: "Memories in the wind", image: `${BASE}/indian.JPG`, spotify: "https://open.spotify.com/track/3YfS47QufnLDFA71FUsgCM" },
  { title: "When the party is over", image: `${BASE}/portrait.jpg`, spotify: "https://open.spotify.com/track/7rLokcIMP9p8fl0iROdVfC" },
  { title: "Don't look back", image: `${BASE}/portrait_1.JPG`, spotify: "https://open.spotify.com/track/7ppPZa3TRUSGKaks9wH7VT" },
  { title: "When the party is over", image: `${BASE}/side_portrait.jpg`, spotify: "https://open.spotify.com/track/43zdsphuZLzwA9k4DJhU0I" },
  { title: "Spiderman and Gwen", image: `${BASE}/spiderman.jpg`, spotify: "https://open.spotify.com/track/3vWzyGTu6Ovo1GdrcJqH6e" },
  { title: "Stockholm", image: `${BASE}/stockholm.jpeg`, spotify: "https://open.spotify.com/track/5pfJsMwoRYKampPay8amX0" },
  { title: "Smoking", image: `${BASE}/timoty.jpg`, spotify: "https://open.spotify.com/track/6PdWPdgPoVCT9WLFMVnhxx" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const },
  }),
};

const ArtGallery = () => {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <Layout>
      <section className="container py-16 md:py-24 max-w-5xl">
        <motion.h1 initial="hidden" animate="visible" custom={0} variants={fadeUp} className="text-4xl font-bold mb-4">
          Art Gallery
        </motion.h1>
        <motion.p initial="hidden" animate="visible" custom={1} variants={fadeUp} className="text-muted-foreground font-body text-lg mb-12 max-w-2xl">
          In my free time I enjoy drawing and taking pictures around Stockholm with my reflex. Here you can find some of my sketches and photos with an associated Spotify link to the song I was listening to the most while drawing or walking around the city. I mainly take inspiration from movie scenes… maybe you will guess some of them.
        </motion.p>

        {/* Masonry-style grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
          {artworks.map((art, i) => (
            <motion.div
              key={art.title + i}
              initial="hidden"
              animate="visible"
              custom={i + 2}
              variants={fadeUp}
              className="break-inside-avoid group cursor-pointer"
              onClick={() => setSelected(i)}
            >
              <div className="relative rounded-xl overflow-hidden border border-border bg-card shadow-sm hover:shadow-lg transition-shadow duration-300">
                <img
                  src={art.image}
                  alt={art.title}
                  loading="lazy"
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <h3 className="text-white font-semibold text-sm">{art.title}</h3>
                  <a
                    href={art.spotify}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1.5 text-[#1DB954] text-xs mt-1 hover:underline"
                  >
                    <Music size={12} />
                    Listen on Spotify
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative max-w-3xl w-full max-h-[90vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute -top-10 right-0 text-white/70 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
              <img
                src={artworks[selected].image}
                alt={artworks[selected].title}
                className="max-h-[75vh] w-auto rounded-xl shadow-2xl object-contain"
              />
              <div className="mt-4 text-center">
                <h2 className="text-white text-xl font-semibold">{artworks[selected].title}</h2>
                <a
                  href={artworks[selected].spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#1DB954] mt-2 hover:underline"
                >
                  <Music size={16} />
                  Listen on Spotify
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default ArtGallery;
