---
title: Tricks for faster MPC in Casadi
date: May 04, 2025
readTime: 2 min read
tags: coding, mpc
year: 2025
slug: to-function
---

# Running faster MPC

When dealing with nonlinear Model Predictive Control (MPC), there is often a question of how to make the code faster. I will consider the general-purpose optimization library `casadi`.

A few key factors are essential to speed up your solution time:

1. **Warm-starting**
2. **Use `to_function()` to save your MPC controller**

The process of warm starting consists of letting the solver save the previous solution as the initial guess for the next iteration. In problems like MPC, where the same optimization problem is solved repeatedly for many iterations, it is critical to reuse as much computation as possible.

On the other hand, the use of the method `to_function` from `Opti` is always suggested to speed up your MPC code. We can have a look at an example below.

@[iframe](/assets/jupyter/base_mpc.ipynb.html)
