# Web MVP

## MVP Goal

Deliver a first usable slice of the interactive learning web that proves the core product idea:

- explanation
- visualization
- interaction
- immediate feedback

The MVP should establish the page pattern and technical direction, not cover the whole curriculum.

## MVP Objectives

- validate the learning experience style
- establish reusable page primitives
- prove that interaction improves comprehension
- create a small but coherent learning sequence

## MVP Scope

### Included
- a minimal web shell / navigation structure
- a landing page for the learning path
- 4 to 6 interactive pages
- a consistent pedagogical page template
- lightweight stateful controls and visual feedback
- concise explanatory content

### Not included yet
- full roadmap coverage
- full research section
- polished course-scale information architecture
- authentication, user accounts, or persistence of progress
- advanced analytics or backend-heavy features

## Recommended First Pages

### 1. Learning Path Overview
Purpose:
- introduce the structure of the web
- explain how to use the interactive pages
- provide an overview of the roadmap

### 2. Perceptron: Weighted Sum and Bias
Why first:
- simple mental model
- easy to visualize inputs, weights, and output
- strong interaction potential

Core interaction ideas:
- modify weights and bias
- see output change live
- show thresholded classification

### 3. Perceptron: Decision Boundary Intuition
Why early:
- visually compelling
- builds direct intuition for classification

Core interaction ideas:
- drag data points
- move the boundary via weights/bias
- watch class regions change

### 4. MLP: Activation Functions and Non-Linearity
Why early:
- key conceptual leap from linear to nonlinear behavior
- highly visual and pedagogically valuable

Core interaction ideas:
- switch activations
- compare output curves
- show effect on representable functions

### 5. Gradient Descent Intuition
Why early:
- foundational to most later topics
- works well visually in 1D/2D loss landscapes

Core interaction ideas:
- tune learning rate
- step through optimization
- visualize overshooting, convergence, and instability

### 6. Convolution as Local Pattern Detector
Why early:
- intuitive visual payoff
- helps broaden beyond MLPs

Core interaction ideas:
- edit kernel values
- slide kernel across an image/grid
- inspect resulting feature maps

## MVP Design Requirements

Every MVP page must:

- teach one clear idea
- expose one or more meaningful controls
- produce immediate visual feedback
- include a short interpretation section
- avoid unnecessary text density

## Reusable Building Blocks to Establish Early

- page layout shell
- explanation panel
- visualization canvas/area
- controls panel
- result/interpretation panel
- guided exploration callouts
- shared styling for educational consistency

## MVP Exit Criteria

The MVP is successful when:

- the experience already feels like a coherent interactive learning tool
- at least several pages are genuinely useful for learning
- the page pattern is reusable for future topics
- it is clear how the rest of the roadmap can be expanded from this base

## After MVP

Once the MVP works, the next phase should focus on:

- extending the mechanics section
- refining page primitives based on real usage
- deciding how tightly to couple the web and the experimentation sandbox
- expanding into sequence models and memory topics
