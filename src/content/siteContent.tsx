import { ReactNode } from "react";

export interface BlogPost {
  title: string;
  date: string;
  readTime: string;
  tags: string[];
  year: string;
  slug: string;
  content: ReactNode;
}

export interface Project {
  title: string;
  category: string;
  status?: string;
  img: string;
  url: string;
}

export interface Paper {
  title: string;
  authors: string;
  venue: string;
  year: number;
  arxivUrl?: string;
  doiUrl?: string;
  previewImg?: string;
}

export interface Repo {
  name: string;
  url: string;
  description: string;
}

export interface Reference {
  title: string;
  authors: string;
  url?: string;
  type: "book" | "article";
}

export interface TeachingSection {
  heading: string;
  refs: Reference[];
}

export const homeContent = {
  profile: {
    image: "/assets/img/me.JPG",
    name: "Gregorio Marchesini",
    role: "Ph.D. Student · Decision and Control Systems",
    institution: "KTH Royal Institute of Technology, EECS",
    location: "Malvinas Väg 10, Floor 6, SE-100 44 Stockholm",
    githubUrl: "https://github.com/gregoriomarchesini",
    scholarUrl: "https://scholar.google.com/citations?user=XMflop0AAAAJ",
  },
  about: [
    <>
      I am a Ph.D. student at the division of Decision and Control Systems (
      <a href="https://www.kth.se/is/dcs/division-of-decision-and-control-systems-1.788078" target="_blank" rel="noreferrer" className="text-primary hover:underline">DCS</a>
      ) at <strong>KTH Royal Institute of Technology</strong>, Stockholm, Sweden.
      I am supervised by Prof.{" "}
      <a href="https://people.kth.se/~dimos/" target="_blank" rel="noreferrer" className="text-primary hover:underline">Dimos V. Dimarogonas</a> (KTH) and Prof.{" "}
      <a href="https://ee.ethz.ch/the-department/faculty/professors/person-detail.MzY4OTYz.TGlzdC80MTEsMTA1ODA0MjU5.html" target="_blank" rel="noreferrer" className="text-primary hover:underline">Lars Lindemann</a> (ETH).
    </>,
    <>
      Mostly guided by a strong passion for mathematics and its application in robotics systems, my main research interests are in <strong>formal methods</strong> for <strong>multi-agent</strong> systems planning and control, <strong>graph theory</strong>, <strong>predictive control</strong> and <strong>robotics</strong>. During my PhD I will develop solutions for multi-agent planning and control under signal temporal logic tasks and sensing constraints. I am currently associated with the{" "}
      <a href="https://www.symaware.eu/" target="_blank" rel="noreferrer" className="text-primary hover:underline">SymAware</a> European project.
    </>,
  ],
  researchInterests: [
    "Formal Methods",
    "Multi-Agent Systems",
    "Graph Theory",
    "Predictive Control",
    "Robotics",
    "Signal Temporal Logic",
  ],
  news: [
    {
      date: "Jun 2025",
      text: 'Our latest publication "Sampling-Based Planning Under STL Specifications: A Forward Invariance Approach" is now available.',
      link: "https://arxiv.org/abs/2506.10739",
    },
    {
      date: "Apr 2025",
      text: 'Our latest publication "A Communication Consistent Approach to Signal Temporal Logic Task Decomposition in Multi-Agent Systems" is now available.',
      link: "https://arxiv.org/abs/2410.12563",
    },
  ],
  quote: {
    text: "… That you are here—that life exists and identity, That the powerful play goes on, and you may contribute a verse.",
    author: "Walt Whitman",
  },
};

export const blogPosts: BlogPost[] = [
  {
    title: "When acting is a legacy for future generations",
    date: "June 06, 2025",
    readTime: "3 min read",
    tags: ["quotes"],
    year: "2025",
    slug: "movies-clips",
    content: (
      <div className="space-y-6">
        <p>
          Cinema has always been a mirror of the human condition. Beyond entertainment, the greatest films leave behind lines
          that echo through time - quotes that capture something essential about courage, love, loss, and the choices that define us.
        </p>
        <p>
          Acting, at its best, is a form of truth-telling. An actor steps into someone else's skin and illuminates a piece of
          the shared human experience. When that performance is extraordinary, it transcends the screen and becomes a reference
          point - a shorthand for an emotion too large to name.
        </p>
        <blockquote className="border-l-4 border-primary/50 pl-4 italic text-muted-foreground">
          "Get busy living, or get busy dying." - <em>The Shawshank Redemption</em>
        </blockquote>
        <p>
          These words, spoken in a prison yard, reach across decades and circumstances. They are not merely dialogue; they are
          a philosophy compressed into nine words. Acting makes philosophy accessible, visceral, and impossible to ignore.
        </p>
        <blockquote className="border-l-4 border-primary/50 pl-4 italic text-muted-foreground">
          "You is kind, you is smart, you is important." - <em>The Help</em>
        </blockquote>
        <p>
          Some lines are a gift from one generation to the next. They become what a parent says to a child, what a teacher
          says to a student, what a friend says to a friend in a dark hour. The actor who first delivered them could not have
          known how far they would travel.
        </p>
        <p>
          This is why acting matters. Not just as craft or as art, but as a form of cultural inheritance - a way of passing
          forward what it means to be human.
        </p>
      </div>
    ),
  },
  {
    title: "Tricks for faster MPC in Casadi",
    date: "May 04, 2025",
    readTime: "1 min read",
    tags: ["coding", "mpc"],
    year: "2025",
    slug: "to-function",
    content: (
      <div className="space-y-6">
        <p>
          Model Predictive Control (MPC) is a powerful framework for optimal control of dynamical systems, but real-time
          implementation can be slow if not coded carefully. Here are a few tricks I have found useful when working with
          CasADi.
        </p>
        <h2 className="text-xl font-bold mt-8">1. Convert Python functions to CasADi functions</h2>
        <p>
          Instead of calling Python logic inside the solver loop, wrap everything into a <code>casadi.Function</code>.
          This lets CasADi trace the computation graph once and reuse it efficiently.
        </p>
        <pre className="bg-muted rounded-md p-4 overflow-x-auto text-sm font-mono">
          {`import casadi as ca

x = ca.MX.sym('x', 2)
u = ca.MX.sym('u', 1)

# Define dynamics as a CasADi function
f = ca.Function('f', [x, u], [A @ x + B @ u])`}
        </pre>
        <h2 className="text-xl font-bold mt-8">2. Use reshape instead of Python loops</h2>
        <p>
          Python loops over CasADi symbolic variables are extremely slow because each iteration adds a new node to the
          computation graph. Use <code>ca.reshape</code>, <code>ca.horzcat</code>, and <code>ca.vertcat</code> to
          build the full decision-variable vector at once.
        </p>
        <h2 className="text-xl font-bold mt-8">3. Compile to C for production</h2>
        <p>
          CasADi supports code-generation to C, which can give an order-of-magnitude speed-up over the interpreted
          Python path. Once your MPC problem is set up, call:
        </p>
        <pre className="bg-muted rounded-md p-4 overflow-x-auto text-sm font-mono">
          {`solver.generate_dependencies("mpc_solver.c")
# Then compile and load the shared library`}
        </pre>
        <p>
          These three changes alone can cut solve time by 3-10x in typical robotics MPC applications.
        </p>
      </div>
    ),
  },
];

export const projects: Project[] = [
  {
    title: "Multi-agent Coordination Under Spatio-Temporal And Communication Constraints",
    category: "thesis",
    img: "/assets/img/publication_preview/drone_image_small_a.png",
    url: "/projects/1_project/",
  },
  {
    title: "A Differential Game Framework for Multi-Agent Coordination under Signal Temporal Logic Specifications",
    category: "thesis",
    img: "/assets/img/enrico_image.png",
    url: "/projects/4_project/",
  },
  {
    title: "Optimal Control for Enhanced Flight Performance of a Tilt-Rotor Drone",
    category: "thesis",
    img: "/assets/img/drone_with_tree.png",
    url: "/projects/5_project/",
  },
  {
    title: "Exploring multi-agent planning",
    category: "explore",
    status: "Open for application",
    img: "/assets/img/gpt_drones.png",
    url: "/projects/2_project/",
  },
  {
    title: "Orbital Stations Simulator in ROS2",
    category: "explore",
    status: "Open for application",
    img: "/assets/img/ISS_gpt.png",
    url: "/projects/3_project/",
  },
];

export const papers: Paper[] = [
  {
    title: "Sampling-Based Planning Under STL Specifications: A Forward Invariance Approach",
    authors: "Gregorio Marchesini, Siyuan Liu, Lars Lindemann, and Dimos V. Dimarogonas",
    venue: "Preprint",
    year: 2025,
    arxivUrl: "https://arxiv.org/abs/2506.10739",
    previewImg: "/assets/img/publication_preview/ISS_inspection.png",
  },
  {
    title: "A Communication Consistent Approach to Signal Temporal Logic Task Decomposition in Multi-Agent Systems",
    authors: "G. Marchesini, S. Liu, L. Lindemann, and D.V. Dimarogonas",
    venue: "Preprint",
    year: 2024,
    arxivUrl: "https://arxiv.org/abs/2410.12563",
    previewImg: "/assets/img/publication_preview/drone_image_small_a.png",
  },
  {
    title: "Decentralized Control of Multi-Agent Systems Under Acyclic Spatio-Temporal Task Dependencies",
    authors: "G. Marchesini, S. Liu, L. Lindemann, and D.V. Dimarogonas",
    venue: "CDC 2024",
    year: 2024,
    doiUrl: "https://doi.org/10.1109/CDC56724.2024.10885877",
    previewImg: "/assets/img/publication_preview/treegraph.png",
  },
];

export const repos: Repo[] = [
  {
    name: "stl_rrt_py",
    url: "https://github.com/gregoriomarchesini/stl_rrt_py",
    description: "Sampling-based motion planning under Signal Temporal Logic specifications.",
  },
  {
    name: "multiagent-STL-symware",
    url: "https://github.com/gregoriomarchesini/multiagent-STL-symware",
    description: "Multi-agent coordination under STL tasks using the SymAware framework.",
  },
  {
    name: "neuromorphic_project",
    url: "https://github.com/gregoriomarchesini/neuromorphic_project",
    description: "Neuromorphic computing experiments and implementations.",
  },
];

export const teachingSections: TeachingSection[] = [
  {
    heading: "Multi-Agent Systems",
    refs: [
      { title: "Graph Theoretic Methods in Multiagent Networks", authors: "Mehran Mesbahi, Magnus Egerstedt", url: "https://press.princeton.edu/books/hardcover/9780691140612/graph-theoretic-methods-in-multiagent-networks", type: "book" },
    ],
  },
  {
    heading: "Game Theory",
    refs: [
      { title: "Dynamic Non-cooperative Game Theory", authors: "Tamer Basar, Geert Jan Olsder", type: "book" },
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

export const cvContent = {
  contact: {
    email: "gremar@kth.se",
    location: "Stockholm, Sweden",
    languages: "Italian · English",
  },
  education: [
    { period: "2023 – present", degree: "PhD", institution: "KTH Royal Institute of Technology", field: "Decision and Control Systems", location: "Stockholm, Sweden" },
    { period: "2020 – 2023", degree: "Master", institution: "KTH Royal Institute of Technology", field: "Space Engineering", location: "Stockholm, Sweden" },
    { period: "2018 – 2020", degree: "Bachelor", institution: "University of Bologna", field: "Aerospace Engineering", location: "Bologna, Italy" },
  ],
  work: [
    { period: "2022 – 2023", role: "Research Assistant", org: "KTH, Dept. of Space and Plasma Physics", description: "Analysis of Lyman Alpha radiation features from Ganymede, Neptune and Uranus under Prof. Lorenz Roth." },
    { period: "2021", role: "AOCS Engineer", org: "MIST Satellite", description: "Implemented calibration algorithms for the on-board magnetometer." },
    { period: "2020", role: "Internship", org: "C.I.R.I Aerospace, Forli, Italy", description: "Wavelet Decomposition for recovering temporal doppler shift in Deep Space communications." },
  ],
  certificates: [
    { title: "Modelling, Motion Planning and Control for Underactuated Mechanical Systems", issuer: "KTH", year: "2024" },
    { title: "EECI Course: Formal Methods for Multi-Agent Feedback Control Systems", issuer: "International Graduate School on Control", year: "2023" },
  ],
  volunteer: {
    period: "2022 – 2023",
    role: "Social Media and Events Manager",
    org: "Euroavia",
    url: "https://euroavia.eu/",
    description: "Lead organizer of events, research project presentations and social media management.",
  },
};
