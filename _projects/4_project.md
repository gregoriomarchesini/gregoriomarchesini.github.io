---
layout: page
title: A Differential Game Framework for Multi-Agent Coordination under Signal Temporal Logic Specifications
description: thesis project
img: assets/img/publication_preview/drone_image_small_a.jpg
importance: 1
category: thesis
related_publications: false
---

**Master Student** : *Enrico Dozzi*

**Supervisor**     : *Gregorio Marchesini*

In an increasingly connected world, the growing deployment of networked
autonomous agents has intensified the need for scalable methods to manage
inter-agent coordination in shared environments. This thesis addresses the
problem of multi-agent control synthesis under Signal Temporal Logic (STL)
specifications, which provide a formal language to express complex spatial and
temporal tasks. However, existing approaches face key limitations: Mixed-
Integer Linear Programming (MILP)-based solvers, while expressive, suffer
from poor scalability due to the exponential growth in binary variables;
Control Barrier Function (CBF)-based methods are computationally eﬀicient
but struggle to handle complex STL specifications, especially disjunctions.
To overcome these limitations, we propose a novel hybrid Model Predictive
Control (MPC) framework that integrates centralized and decentralized
decision-making. The centralized MPC layer plans trajectories that satisfy
individual STL tasks that do not require coordination. When conflicts arise due
to shared tasks, a decentralized layer resolves them through a sequence of STL
games, a game-theoretic extension of differential games where agent strategies
are coupled by shared STL specifications. Both layers encode STL constraints
using time-varying sets defined by CBFs, which guarantee satisfaction of
temporal requirements over time.
Disjunctive STL conditions are handled eﬀiciently through the intro-
duction of a minimal number of binary variables, resulting in significantly
improved computational performance. Numerical simulations demonstrate
that our hybrid architecture achieves comparable STL satisfaction degree
while reducing solver time and binary complexity compared to state-of-the-
art MILP-based methods.

</div>