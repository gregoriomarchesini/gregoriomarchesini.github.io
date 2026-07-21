---
title: Optimal Control for Enhanced Flight Performance of a Tilt-Rotor Drone
subtitle: thesis project
category: thesis
slug: 5_project
img: /assets/img/drone_with_tree.png
order: 3
student: Andrea Boldrini
company: [A*STAR](https://www.a-star.edu.sg/), Singapore
---

The use of unmanned aerial vehicles (UAVs) to perform physical interaction tasks is an effective and advanced solution that has been studied extensively in recent years. However, many factors affect performance and reliability, especially for high-pitch-angle maneuvers.

This study investigates how highly precise setpoint tracking can be achieved for a tilt-quadrotor equipped with a front-mounted gripper, with a specific focus on maximizing the achievable pitch angle during hover. It also analyzes scenarios involving an external wrench generated on the vehicle and the use of the gripper to grasp a cylindrical target object.

System dynamics were modeled, and control schemes were iteratively designed using Proportional-Integral-Derivative (PID), Linear-Quadratic Regulator (LQR), Linear Model Predictive Control (LMPC), and Nonlinear Model Predictive Control (NMPC), with PID serving as a baseline. An external wrench estimator was designed to estimate the current disturbance so it could be accounted for in control input assessment.

The designs were first simulated in MATLAB/Simulink and then in ROS/Gazebo for higher-fidelity validation. PX4 Autopilot firmware, MAVLink, MAVROS, and CasADi were all used in the workflow.

Quantitative analysis of advanced simulations revealed that model predictive control, particularly NMPC, yielded more precise setpoint tracking and near-vertical hovering compared to PID. The NMPC achieved a pitch angle range of (-84 degrees, 80 degrees), and LMPC attained (-74 degrees, 75 degrees), significantly surpassing PID's (-77 degrees, 65 degrees). LQR, however, did not improve baseline performance.

Regarding disturbance handling, both NMPC and LMPC, unlike LQR and simple PID, were able to limit the position and attitude offset at steady state. A modified NMPC was also evaluated for its ability to maintain stable contact while grasping a cylindrical target object, even during pitch angle changes.

This research demonstrates the suitability of model predictive control for high-pitch-angle maneuvers when the external wrench is correctly estimated. It also suggests that incorporating appropriate penalty terms into the cost function is crucial for enabling stable interaction with physical targets under variable pitch conditions.
