---
title: SToMP: Speech To Motion Planning for an Industrial Manipulator under LLM-Generated STL
subtitle: thesis project
category: thesis
slug: 5_project
img: /assets/img/publication_preview/stomp_image_small_a.png
order: 1
student: Laura Rocio Marques Aguilar
company: ABB
---

Specifying complex, time-constrained manipulation tasks for robotic manipulators typically demands specialized expertise, which increases barriers to entry for nonexpert robot programmers or operators. This work presents the Speech to Motion Planner (SToMP), an end-to-end pipeline that bridges unstructured natural language and physically executed trajectories for robotic manipulators.

The pipeline consists of two principal stages: a Large Language Model front-end that translates natural language task descriptions into Signal Temporal Logic formulas, and a Space-Time Rapidly-exploring Random Tree planner that synthesizes trajectories provably satisfying those formulas. The planner operates directly in a combined space-time search domain, reasoning simultaneously over the manipulator's joint configuration and the explicit temporal windows imposed by the specification. To remain tractable on a high-dimensional manipulator, the planner samples in task space and propagates robustness information forward through the tree so that the satisfaction status of a candidate trajectory can be assessed incrementally. Goal-biased sampling, a robustness-aware parent-selection heuristic, and continuous validation of each edge against both temporal constraints and collisions steer the search toward trajectories that satisfy the task deadline while preserving the formal guarantees.

The Large Language Model front-end is selected through a two-stage evaluation that focuses on failure profiles rather than headline success rates, distinguishing between structural errors that a deterministic validator can catch and silent semantic misinterpretations that evade structural checks. The evaluation yields a configuration that pairs Claude 4.5 Opus in extended-thinking mode with a validator applied to every output.

SToMP is evaluated on pick-and-place manipulation tasks that span single-goal, sequential, disjunctive, and concurrent variants, exposing the temporal ordering and time-window constraints that motivate the use of formal specification languages. The system is first validated in a PyBullet simulation environment across the task suite and subsequently demonstrated on physical hardware, where the synthesized trajectories are executed on a Franka Emika Panda arm and a dual-arm ABB YuMi.

The video below shows the SToMP pipeline in action, translating a spoken task description into a Signal Temporal Logic specification and executing the resulting trajectory on physical manipulator hardware.

@[youtube](https://www.youtube.com/watch?v=mVjRDhXUrCo)