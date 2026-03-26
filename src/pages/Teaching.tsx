import { motion } from "framer-motion";
import { ExternalLink, BookOpen } from "lucide-react";
import Layout from "@/components/Layout";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.4, ease: "easeOut" as const },
  }),
};

interface Reference {
  title: string;
  authors: string;
  url?: string;
  type: "book" | "article";
}

interface Section {
  heading: string;
  refs: Reference[];
}

const sections: Section[] = [
  {
    heading: "Multi-Agent Systems",
    refs: [
      { title: "Graph Theoretic Methods in Multiagent Networks", authors: "Mehran Mesbahi, Magnus Egerstedt", url: "https://press.princeton.edu/books/hardcover/9780691140612/graph-theoretic-methods-in-multiagent-networks", type: "book" },
    ],
  },
  {
    heading: "Game Theory",
    refs: [
      { title: "Dynamic Non-cooperative Game Theory", authors: "Tamer Başar, Geert Jan Olsder", type: "book" },
      { title: "Game Theory", authors: "Drew Fudenberg, Jean Tirole", type: "book" },
      { title: "Algorithmic Game Theory", authors: "Noam Nisan, Tim Roughgarden, Eva Tardos, Vijay V. Vazirani", url: "https://www.cs.cmu.edu/~sandholm/cs15-892F13/algorithmic-game-theory.pdf", type: "book" },
      { title: "Iterative LQR (iLQR)", authors: "Sanjiban Choudhury (Cornell CS6756)", url: "https://www.cs.cornell.edu/courses/cs6756/2022fa/assets/slides_notes/lec6_slides.pdf", type: "article" },
      { title: "Potential iLQR: A Potential-Minimizing Controller for Planning Multi-Agent Interactive Trajectories", authors: "Talha Kavuncu, Ayberk Yaraneri, Negar Mehr", url: "https://arxiv.org/abs/2107.04926", type: "article" },
      { title: "Efficient Iterative Linear-Quadratic Approximations for Nonlinear Multi-Player General-Sum Differential Games", authors: "David Fridovich-Keil et al.", url: "https://ieeexplore.ieee.org/abstract/document/9197129", type: "article" },
    ],
  },
  {
    heading: "Optimization and Optimal Control",
    refs: [
      { title: "Convex Analysis", authors: "R. Tyrrell Rockafellar", type: "book" },
      { title: "Convex Optimization", authors: "Stephen Boyd, Lieven Vandenberghe", url: "https://web.stanford.edu/~boyd/cvxbook/", type: "book" },
      { title: "Numerical Optimization", authors: "Jorge Nocedal, Stephen Wright", type: "book" },
      { title: "Optimal Control: An Introduction to the Theory and Its Applications", authors: "Donald E. Kirk", type: "book" },
      { title: "A Primer on Monotone Operator Methods", authors: "Stephen Boyd", url: "https://web.stanford.edu/~boyd/papers/pdf/prox_algs.pdf", type: "article" },
      { title: "Distributed Convex Optimization in Networks", authors: "Giuseppe Notarstefano, Ivano Notarnicola", url: "https://ieeexplore.ieee.org/document/8635882", type: "article" },
    ],
  },
  {
    heading: "Formal Methods and Temporal Logics",
    refs: [
      { title: "Formal Methods for Discrete-Time Dynamical Systems", authors: "Calin Belta, Boyan Yordanov, Ebru Aydin Gol", type: "book" },
      { title: "Control Barrier Functions for Signal Temporal Logic Tasks", authors: "L. Lindemann, D.V. Dimarogonas", url: "https://ieeexplore.ieee.org/abstract/document/8404080", type: "article" },
      { title: "Monitoring Temporal Properties Of Continuous Signals", authors: "O. Maler, D. Nickovic", type: "article" },
    ],
  },
  {
    heading: "Discrete Optimization",
    refs: [
      { title: "Submodular Function Maximization", authors: "A. Krause", type: "article" },
      { title: "Learning with Submodular Functions: A Convex Optimization Perspective", authors: "F. Bach", type: "article" },
      { title: "The Design of Approximation Algorithms", authors: "D.P. Williamson & D.B. Shmoys", type: "book" },
    ],
  },
  {
    heading: "Some Interesting Readings",
    refs: [
      { title: "A Stroke of Genius: Striving for Greatness in All You Do", authors: "R. W. Hamming", type: "book" },
    ],
  },
];

const Teaching = () => (
  <Layout>
    <section className="container py-16 md:py-24 max-w-3xl">
      <motion.h1 initial="hidden" animate="visible" custom={0} variants={fadeUp} className="text-4xl font-bold mb-3">
        Teaching
      </motion.h1>
      <motion.p initial="hidden" animate="visible" custom={1} variants={fadeUp} className="text-muted-foreground font-body mb-12 max-w-2xl leading-relaxed">
        For students willing to pursue research projects with me, here you can find a list of articles and books that have shaped my education. I highly recommend using these references as starting points! 🥇
      </motion.p>

      <div className="space-y-10">
        {sections.map((section, si) => (
          <motion.div key={section.heading} initial="hidden" animate="visible" custom={si + 2} variants={fadeUp}>
            <h2 className="text-lg font-bold mb-4 text-primary">{section.heading}</h2>
            <div className="space-y-3">
              {section.refs.map((ref) => (
                <div key={ref.title} className="flex gap-3 items-start border-l-2 border-border pl-4 py-1">
                  <BookOpen size={14} className="text-muted-foreground mt-1 shrink-0" />
                  <div>
                    <p className="text-sm font-semibold leading-snug">
                      {ref.url ? (
                        <a href={ref.url} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors inline-flex items-center gap-1">
                          {ref.title} <ExternalLink size={11} />
                        </a>
                      ) : (
                        ref.title
                      )}
                    </p>
                    <p className="text-xs text-muted-foreground font-body italic">{ref.authors}</p>
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-body">{ref.type}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  </Layout>
);

export default Teaching;
