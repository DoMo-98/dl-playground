import type { Locale } from '../../i18n'

type LocalizedSectionCopy = {
  title: string
  description: string
  goal: string
}

type LocalizedUnitCopy = {
  title: string
  description: string
}

type LocalizedLessonCopy = {
  title: string
  shortTitle: string
  summary: string
  objectives: string[]
}

type LocalizedMessages = {
  languageName: string
  nav: {
    learn: string
    firstLesson: string
    languageSwitcherLabel: string
    mobileMenuLabel: string
  }
  home: {
    badge: string
    title: string
    description: string
    primaryCta: string
    secondaryCta: string
    pillarsEyebrow: string
    pillars: Array<{ title: string; description: string }>
  }
  learn: {
    eyebrow: string
    title: string
    description: string
    startEyebrow: string
    openLesson: string
    metaMinutes: string
    metaObjectives: string
    readyCount: (ready: number, total: number) => string
    totalMinutes: (minutes: number) => string
    openAvailableLesson: string
    sectionRoadmap: string
    status: Record<'ready' | 'planned', string>
  }
  lessonChrome: {
    objectiveLabel: string
    objectiveTitle: string
    coreIdeaLabel: string
    coreIdeaTitle: string
    observeLabel: string
    observeTitle: string
    navigationLabel: string
    navigationTitle: string
    backToLearningPath: string
    previous: string
    next: string
  }
  sections: Record<string, LocalizedSectionCopy>
  units: Record<string, LocalizedUnitCopy>
  lessons: Record<string, LocalizedLessonCopy>
}

export const enMessages: LocalizedMessages = {
  languageName: 'English',
  nav: {
    learn: 'Learn',
    firstLesson: 'First lesson',
    languageSwitcherLabel: 'Language',
    mobileMenuLabel: 'Main navigation',
  },
  home: {
    badge: 'Visual, interactive deep learning intuition',
    title: 'Learn neural networks by seeing them, touching them, and changing them.',
    description:
      'This web layer of dl-playground is being built as an academic interactive resource: every lesson combines explanation, visualization, and experimentation.',
    primaryCta: 'Explore learning path',
    secondaryCta: 'Open first lesson',
    pillarsEyebrow: 'Design pillars',
    pillars: [
      { title: 'Explain clearly', description: 'each page teaches one idea at a time.' },
      { title: 'Show visually', description: 'mechanisms should be visible, not only described.' },
      { title: 'Let users experiment', description: 'every page includes meaningful interaction.' },
      { title: 'Give immediate feedback', description: 'changes should produce visible effects.' },
    ],
  },
  learn: {
    eyebrow: 'Learning path',
    title: 'Interactive deep learning lessons',
    description:
      'The learning path is organized into small visual lessons. Each page is designed to explain a concept, show it clearly, and let the learner change something meaningful.',
    startEyebrow: 'Start with the first live lesson',
    openLesson: 'Open lesson',
    metaMinutes: 'min',
    metaObjectives: 'objectives',
    readyCount: (ready, total) => `${ready}/${total} ready`,
    totalMinutes: (minutes) => `${minutes} min total`,
    openAvailableLesson: 'Open available lesson',
    sectionRoadmap: 'Section roadmap',
    status: {
      ready: 'ready',
      planned: 'planned',
    },
  },
  lessonChrome: {
    objectiveLabel: 'Learning objective',
    objectiveTitle: 'What this page helps you answer',
    coreIdeaLabel: 'Core idea',
    coreIdeaTitle: 'Core idea',
    observeLabel: 'Observe',
    observeTitle: 'Guided observation prompts',
    navigationLabel: 'Navigation',
    navigationTitle: 'Keep the lesson sequence coherent',
    backToLearningPath: 'Back to learning path',
    previous: 'Previous',
    next: 'Next',
  },
  sections: {
    foundations: {
      title: 'Foundations',
      description: 'Core concepts that support later deep learning intuition.',
      goal: 'Build the optimization and representation intuitions that later models rely on.',
    },
    mechanics: {
      title: 'Architectural mechanics',
      description: 'Mechanisms that explain how neural network components behave.',
      goal: 'Move from single-neuron intuition to the building blocks of deeper models.',
    },
    cnn: {
      title: 'CNNs',
      description: 'Spatial pattern extraction and hierarchical feature building.',
      goal: 'Show how local receptive fields detect useful structure in images and grids.',
    },
  },
  units: {
    optimization: {
      title: 'Optimization intuition',
      description: 'How parameters move, why loss changes, and what stable progress feels like.',
    },
    perceptron: {
      title: 'Perceptron basics',
      description: 'The smallest decision unit: score inputs, shift with bias, and form a linear separator.',
    },
    mlp: {
      title: 'Multi-layer perceptrons',
      description: 'Why stacking layers only becomes expressive once non-linearity enters the picture.',
    },
    convolutions: {
      title: 'Local pattern detection',
      description: 'Understand kernels as small reusable detectors applied across space.',
    },
  },
  lessons: {
    'gradient-descent-intuition': {
      title: 'Gradient descent intuition',
      shortTitle: 'Gradient descent',
      summary: 'See how learning rate changes the path from noisy steps to stable convergence on a simple loss landscape.',
      objectives: [
        'Relate gradient direction to parameter updates',
        'Contrast stable convergence with oscillation and overshoot',
      ],
    },
    'perceptron-weighted-sum': {
      title: 'Perceptron · weighted sum and bias',
      shortTitle: 'Weighted sum and bias',
      summary: 'Manipulate inputs, weights, and bias to see how a perceptron computes its score before thresholding.',
      objectives: [
        'Connect each input-weight product to the total score',
        'Understand how bias shifts the score before classification',
      ],
    },
    'perceptron-decision-boundary': {
      title: 'Perceptron · decision boundary intuition',
      shortTitle: 'Decision boundary intuition',
      summary: 'Move weights and bias to watch a linear boundary rotate and shift across a 2D classification plane.',
      objectives: [
        'Link weights to boundary orientation',
        'Link bias to boundary translation',
      ],
    },
    'mlp-activations': {
      title: 'MLP · activation functions and non-linearity',
      shortTitle: 'Activations and non-linearity',
      summary: 'Compare activation choices to see when a network stays effectively linear and when it becomes expressive.',
      objectives: [
        'See why stacked linear layers collapse into another linear map',
        'Compare how activations reshape representable behavior',
      ],
    },
    'cnn-local-patterns': {
      title: 'Convolution as local pattern detector',
      shortTitle: 'Local pattern detector',
      summary: 'Edit a small kernel and input grid to see how local matches build a feature map.',
      objectives: [
        'Relate kernel values to local match strength',
        'Interpret the feature map as a scan of local evidence',
      ],
    },
  },
}

export type { LocalizedMessages }
export const localeForMessages: Locale = 'en'
