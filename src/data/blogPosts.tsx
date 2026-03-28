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

export const posts: BlogPost[] = [
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
          that echo through time — quotes that capture something essential about courage, love, loss, and the choices that define us.
        </p>
        <p>
          Acting, at its best, is a form of truth-telling. An actor steps into someone else's skin and illuminates a piece of
          the shared human experience. When that performance is extraordinary, it transcends the screen and becomes a reference
          point — a shorthand for an emotion too large to name.
        </p>
        <blockquote className="border-l-4 border-primary/50 pl-4 italic text-muted-foreground">
          "Get busy living, or get busy dying." — <em>The Shawshank Redemption</em>
        </blockquote>
        <p>
          These words, spoken in a prison yard, reach across decades and circumstances. They are not merely dialogue; they are
          a philosophy compressed into nine words. Acting makes philosophy accessible, visceral, and impossible to ignore.
        </p>
        <blockquote className="border-l-4 border-primary/50 pl-4 italic text-muted-foreground">
          "You is kind, you is smart, you is important." — <em>The Help</em>
        </blockquote>
        <p>
          Some lines are a gift from one generation to the next. They become what a parent says to a child, what a teacher
          says to a student, what a friend says to a friend in a dark hour. The actor who first delivered them could not have
          known how far they would travel.
        </p>
        <p>
          This is why acting matters. Not just as craft or as art, but as a form of cultural inheritance — a way of passing
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
          These three changes alone can cut solve time by 3–10× in typical robotics MPC applications.
        </p>
      </div>
    ),
  },
];
