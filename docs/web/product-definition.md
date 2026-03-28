# Web Product Definition

## Purpose

Build an interactive, visual web experience for learning deep learning in depth through explanation, visualization, and experimentation.

The goal is not only to explain concepts, but to help users:

- understand what each component does
- see how it behaves
- manipulate relevant pieces
- build intuition through feedback

## Product Type

This web experience is not primarily:

- static documentation
- a blog
- a slide deck
- a passive course
- a production model-serving app

It is an academic interactive learning resource: part explanation layer, part visual lab.

## Primary User

The primary user is someone who wants to understand deep learning deeply and benefits from:

- visual explanations
- manipulation of parameters and components
- immediate feedback
- progressive decomposition of complex ideas

## Learning Goal

Each learning unit should help the user answer:

- What is this component?
- Why does it exist?
- What problem does it solve?
- How does it affect the network?
- What changes when I modify it?

The emphasis is on mechanical and intuitive understanding, not rote memorization.

## Content Structure

The web follows the learning path of the repository.

- A topic may map to one or many pages.
- Complex topics should be split into smaller learning units.
- Page boundaries should optimize clarity and pedagogy, not force a rigid one-topic-one-page structure.

## Mandatory Rule Per Page

Every page must include all of the following:

- a clear explanation
- a visual component
- an interactive component
- at least one meaningful parameter, component, or condition the user can modify
- visible feedback showing how the output or behavior changes

If a page does not include real interaction, it does not satisfy the product intent.

## Recommended Page Pattern

Each page should generally contain:

1. **What you are seeing**
   - short context and learning objective
2. **Core idea**
   - concise explanation of the concept
3. **Visualization**
   - visual representation of the mechanism
4. **Interaction**
   - controls such as sliders, toggles, inputs, or draggable elements
5. **Result / feedback**
   - immediate change in outputs, states, losses, activations, boundaries, attention, or reconstructions
6. **Interpretation**
   - explanation of what changed and why
7. **Guided exploration**
   - prompts, comparisons, or mini-exercises

## UX Principles

1. **Visual before verbose**
   - show the idea before over-explaining it
2. **Interaction with purpose**
   - every control should teach something
3. **Low cognitive load**
   - keep layouts clean and focused
4. **Progressive learning**
   - move from simple to complex
5. **Immediate feedback**
   - interactions should quickly produce a visible effect
6. **Theory tied to behavior**
   - explain concepts through their consequences
7. **Composable units**
   - each page should stand alone while fitting into a broader sequence

## What the Product Should Include

- dynamic visualizations
- interactive controls
- rigorous but accessible explanations
- concept-first pedagogy
- progression through the learning path
- modular page decomposition when needed
- repeated support for experimentation and intuition-building

## What the Product Should Avoid

- text-heavy pages with weak interaction
- visual effects that are impressive but pedagogically shallow
- overly dense academic writing
- unnecessary complexity in the interface
- forcing advanced mathematical formalism before intuition is built

## Relationship to the Repository

The repository is expected to contain two complementary layers:

- **Web**: the interactive learning experience
- **Sandbox**: the experimental environment for trying architectures and ideas

Current focus: the web.

## Success Criteria

A page is successful if, after using it, the learner feels:

- “I understand this concept better now.”
- “I can see why it behaves this way.”
- “If I change this part, I can anticipate some of the effect.”
- “I gained intuition, not just information.”

The product is successful if it makes deep learning feel:

- clearer
- more visual
- more tangible
- more explorable
