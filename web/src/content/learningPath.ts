export type LearningSection = {
  title: string
  slug: string
  description: string
  lessons: Array<{
    title: string
    href: string
    status: 'ready' | 'planned'
  }>
}

export const learningSections: LearningSection[] = [
  {
    title: 'Foundations',
    slug: 'foundations',
    description: 'Core concepts that support later deep learning intuition.',
    lessons: [
      {
        title: 'Gradient descent intuition',
        href: '/learn/foundations/gradient-descent',
        status: 'planned',
      },
    ],
  },
  {
    title: 'Architectural mechanics',
    slug: 'mechanics',
    description: 'Mechanisms that explain how neural network components behave.',
    lessons: [
      {
        title: 'Perceptron · weighted sum and bias',
        href: '/learn/mechanics/perceptron/weighted-sum',
        status: 'ready',
      },
      {
        title: 'Perceptron · decision boundary intuition',
        href: '/learn/mechanics/perceptron/decision-boundary',
        status: 'planned',
      },
      {
        title: 'MLP · activation functions and non-linearity',
        href: '/learn/mechanics/mlp/activations',
        status: 'planned',
      },
    ],
  },
  {
    title: 'CNNs',
    slug: 'cnn',
    description: 'Spatial pattern extraction and hierarchical feature building.',
    lessons: [
      {
        title: 'Convolution as local pattern detector',
        href: '/learn/cnn/local-patterns',
        status: 'planned',
      },
    ],
  },
]
