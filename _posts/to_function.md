---
layout: post
title: opti.to_function for faster MPC 
date: 2015-03-15 16:40:16
description: march & april, looking forward to summer
tags: coding mpc
categories: sample-posts
---

# Running faster MPC

When dealing with nonlinear Model Predicive Control (MPC), there is often a question on how to make the code faster.

A few main key factors are essential to speed up your solution time.

1) **Warm-starting**
2) **Use `to_function()` to save your mpc controller** 

The process of warm staring consists on letting the solver save the previous solution as the initial guess for the next iteration. Indeed, in problems like MPC, where the same optimization problem is solved repeateadly for many iterations, it is critical to reuse as much computation as possible.

On the other hand, the use of the method `to_function` from `Opti` is always suggested to speed0up your MPC code. We can have a look at an example


{::nomarkdown}
{% assign jupyter_path = 'assets/jupyter/base_mpc.ipynb' | relative_url %}
{% capture notebook_exists %}{% file_exists assets/jupyter/base_mpc.ipynb %}{% endcapture %}
{% if notebook_exists == 'true' %}
  {% jupyter_notebook jupyter_path %}
{% else %}
  <p>Sorry, the notebook you are looking for does not exist.</p>
{% endif %}
{:/nomarkdown}
