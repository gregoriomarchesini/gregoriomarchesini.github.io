---
layout: page
title: Optimal Control for Enhanced Flight Performance of a Tilt-Rotor Drone
description: thesis project
img: assets/img/publication_preview/drone_image_small_a.jpg
importance: 1
category: thesis
related_publications: false
---

**Master Student** : *Andrea Boldrini*

**Supervisor**     : *Gregorio Marchesini*

The use of unmanned aerial vehicles (UAVs) to perform physical interaction
tasks is an effective and advanced solution which has been studied within
the past years. However, a vast number of factors affect its performance and
reliability, especially for high-pitch-angle maneuvers.
This study investigates how it is possible to achieve highly precise setpoint
tracking of a tilt-quadrotor equipped with a front-mounted gripper using
optimal control techniques, specifically aiming to maximize the achievable
pitch angle during hover. Furthermore, the study analyzes scenarios involving
an external wrench generated on the vehicle and the use of the gripper to grasp
a cylindrical target object.
System dynamics were modeled, and control schemes were iteratively
designed using Proportional-Integral-Derivative (PID), Linear-Quadratic
Regulator (LQR), Linear Model Predictive Control (LMPC), and Nonlinear
Model Predictive Control (NMPC), with PID serving as a baseline. An
external wrench estimator was designed to estimate the current external
disturbance to be accounted for in the control input assessment. Designs
were initially simulated in MATLAB/Simulink to verify initial design success
and then in ROS/Gazebo for higher-fidelity validation. PX4 Autopilot
firmware, together with MAVLink communication protocol and MAVROS
ROS package, and CasADi were utilized in this end.
Quantitative analysis of advanced simulations revealed that model
predictive control, particularly NMPC, yielded more precise setpoint tracking
and near-vertical hovering compared to PID. The NMPC achieved an
impressive pitch angle range of (-84°, 80°), and LMPC attained (-74°, 75°),
significantly surpassing PID’s (-77°, 65°). LQR, however, did not improve
baseline performance. Regarding disturbance handling, both NMPC and
LMPC, unlike LQR and simple PID, were able to limit the position and attitude
offset at steady state. Finally, a modified NMPC was evaluated for its ability to
maintain stable contact while grasping a cylindrical target object, even during
pitch angle changes. This was achieved by incorporating the adjoint of a
penalty term into its cost function, optimizing its response to variations in
the contact position (working point).
This research demonstrates the suitability of model predictive control for
high-pitch-angle maneuvers when the external wrench is correctly estimated.
Furthermore, our findings imply that incorporating appropriate penalty terms
into the cost function is crucial for enabling stable interaction with physical
targets under variable pitch conditions.

</div>