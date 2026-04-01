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
    openAvailableLesson: string
    sectionRoadmap: string
    readyCount: (ready: number, total: number) => string
    totalMinutes: (minutes: number) => string
    status: Record<'ready' | 'planned', string>
    lessonKind: Record<'interactive' | 'lab' | 'reading', string>
    unavailableLabel: string
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
    unavailableBadge: string
    unavailableDescription: string
  }
  notFound: {
    eyebrow: string
    title: string
    description: string
    primaryCta: string
    secondaryCta: string
  }
  perceptron: {
    neuronDiagram: {
      inputs: string
      weights: string
      neuron: string
      weightedSum: string
      binaryOutput: string
      thresholdAtZero: string
    }
    weightedSumPage: {
      eyebrow: string
      title: string
      description: string
      objective: string
      coreIdeaDescription: string
      coreIdeaBullets: string[]
      controlsTitle: string
      controlsDescription: string
      controlLabels: {
        x1: string
        x2: string
        w1: string
        w2: string
        bias: string
      }
      currentComputation: string
      whatToNotice: string
      noticeBullets: string[]
      prompts: string[]
      tryThis: string
      tryThisBullets: string[]
    }
    decisionBoundaryPage: {
      eyebrow: string
      title: string
      description: string
      objective: string
      coreIdeaDescription: string
      coreIdeaBullets: string[]
      datasetLegend: string
      datasetNames: Record<'diagonal-separable' | 'xor-trap', string>
      datasetDescriptions: Record<'diagonal-separable' | 'xor-trap', string>
      datasetNotes: Partial<Record<'diagonal-separable' | 'xor-trap', string>>
      preparedDataset: string
      controlLabels: {
        w1: string
        w2: string
        bias: string
      }
      stats: {
        correct: string
        mismatched: string
        equation: string
      }
      movementTitle: string
      movementBullets: string[]
      presetNoteTitle: string
      prompts: string[]
      visualization: {
        eyebrow: string
        regionBadge: string
        ariaLabel: string
        legend: {
          positiveRegion: string
          negativeRegion: string
          correctOutline: string
          mismatchOutline: string
        }
      }
    }
  }
  mlp: {
    activationsPage: {
      eyebrow: string
      title: string
      description: string
      objective: string
      coreIdeaDescription: string
      coreIdeaBullets: string[]
      activationLabel: string
      activationOptions: Record<'linear' | 'relu' | 'tanh' | 'sigmoid', {
        label: string
        description: string
        interpretationTitle: string
        interpretation: string
      }>
      controlLabels: {
        hiddenScale: string
        outputScale: string
      }
      stats: {
        behavior: string
        outputRange: string
        centerValue: string
      }
      shapeLabels: Record<'affine' | 'piecewise-linear' | 'smooth-saturated' | 'bounded-squashing', string>
      readingGuideTitle: string
      readingGuideBullets: string[]
      xorBridgeTitle: string
      xorBridgeDescription: string
      prompts: string[]
      visualization: {
        eyebrow: string
        badge: string
        ariaLabel: string
        legend: {
          output: string
          hiddenOne: string
          hiddenTwo: string
        }
      }
    }
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
    openAvailableLesson: 'Open available lesson',
    sectionRoadmap: 'Section roadmap',
    readyCount: (ready, total) => `${ready}/${total} ready`,
    totalMinutes: (minutes) => `${minutes} min total`,
    status: {
      ready: 'ready',
      planned: 'planned',
    },
    lessonKind: {
      interactive: 'interactive',
      lab: 'lab',
      reading: 'reading',
    },
    unavailableLabel: 'Not available yet',
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
    unavailableBadge: 'Planned',
    unavailableDescription: 'This lesson is listed in the sequence, but it is not available to open yet.',
  },
  notFound: {
    eyebrow: 'Page not found',
    title: 'This route does not exist in the current locale.',
    description: 'You are still browsing the English version. You can go back home or return to the learning path without leaving this locale.',
    primaryCta: 'Go to home',
    secondaryCta: 'Back to learning path',
  },
  perceptron: {
    neuronDiagram: {
      inputs: 'Inputs',
      weights: 'Weights',
      neuron: 'Neuron',
      weightedSum: 'Weighted sum',
      binaryOutput: 'Binary output',
      thresholdAtZero: 'Threshold at 0',
    },
    weightedSumPage: {
      eyebrow: 'Architectural mechanics · Perceptron',
      title: 'Weighted sum and bias',
      description:
        'A perceptron combines its inputs using weights, then shifts the result with a bias. This is the basic scoring step before any threshold or activation decides the final output.',
      objective: 'How do weights and bias turn the same inputs into a higher or lower perceptron score?',
      coreIdeaDescription:
        'The perceptron does not decide in one jump. It first builds a score from weighted inputs, then compares that score with a threshold. This page isolates the scoring step so you can see exactly which parameter is pushing the result up or down.',
      coreIdeaBullets: [
        'Each weight controls how strongly its input contributes to the score.',
        'The bias shifts the score even when the inputs stay fixed.',
        'Crossing zero changes the binary output, so small numeric changes can matter.',
      ],
      controlsTitle: 'Adjust the perceptron ingredients',
      controlsDescription: 'Move one control at a time when possible so the cause-and-effect stays easy to track.',
      controlLabels: {
        x1: 'Input x₁',
        x2: 'Input x₂',
        w1: 'Weight w₁',
        w2: 'Weight w₂',
        bias: 'Bias b',
      },
      currentComputation: 'Current computation',
      whatToNotice: 'What to notice',
      noticeBullets: [
        'Positive weights push the sum upward when their input increases.',
        'Negative weights pull the sum downward when their input increases.',
        'The bias shifts the final score even if the inputs stay fixed.',
        'Once the sum crosses zero, the binary output flips from 0 to 1.',
      ],
      prompts: [
        'Increase only one positive weight. Which visual connection becomes more influential, and how quickly does the score move?',
        'Hold the inputs fixed and drag the bias. When does the score cross zero and flip the output?',
        'Make both weights very small. What part of the computation now dominates the decision?',
      ],
      tryThis: 'Try this',
      tryThisBullets: [
        'Set both inputs positive, then flip one weight from positive to negative.',
        'Keep weights fixed and move only the bias to see how the threshold shifts.',
        'Try making both weights near zero and observe how much the bias dominates.',
      ],
    },
    decisionBoundaryPage: {
      eyebrow: 'Architectural mechanics · Perceptron',
      title: 'Decision boundary intuition',
      description:
        'A perceptron turns its weighted sum into a straight decision boundary. Changing the weights rotates that line; changing the bias slides it across the plane.',
      objective: 'How do weights and bias change the straight line that separates one class from the other?',
      coreIdeaDescription:
        'This lesson focuses on the geometry you can see right now: one perceptron, one straight boundary, and immediate visual feedback as you move the controls.',
      coreIdeaBullets: [
        'The weights control the orientation of the separating line.',
        'The bias shifts the same line to cover a different part of the plane.',
        'A single perceptron can only draw one straight boundary in this 2D view.',
      ],
      datasetLegend: 'Prepared dataset',
      datasetNames: {
        'diagonal-separable': 'Diagonal split',
        'xor-trap': 'XOR trap',
      },
      datasetDescriptions: {
        'diagonal-separable': 'A small linearly separable set where the positive class lives toward the upper-right.',
        'xor-trap': 'This preset shows a classic limit: one straight line cannot separate opposite corners cleanly.',
      },
      datasetNotes: {
        'xor-trap': 'A single perceptron stays linear, so some points remain mismatched no matter how you rotate the boundary.',
      },
      preparedDataset: 'Prepared dataset',
      controlLabels: {
        w1: 'Weight w₁ (x-axis influence)',
        w2: 'Weight w₂ (y-axis influence)',
        bias: 'Bias b (boundary shift)',
      },
      stats: {
        correct: 'Correctly classified',
        mismatched: 'Mismatched points',
        equation: 'Boundary equation',
      },
      movementTitle: 'How to read the movement',
      movementBullets: [
        'Increasing w₁ changes how strongly horizontal position tilts the boundary.',
        'Increasing w₂ changes how strongly vertical position tilts the boundary.',
        'Changing bias slides the same line without needing to rotate it much.',
        'Points are predicted as class 1 when w₁x + w₂y + b ≥ 0.',
      ],
      presetNoteTitle: 'Why this preset matters',
      prompts: [
        'Use the diagonal split preset and try to reach zero mismatches by rotating the line.',
        'Then switch to XOR trap and notice that at least some points stay wrong because one perceptron is still linear.',
        'Push w₂ toward zero to see the boundary become vertical, then use bias to slide it left or right.',
      ],
      visualization: {
        eyebrow: '2D classification plane',
        regionBadge: 'class 1 region vs class 0 region',
        ariaLabel: 'Decision boundary visualization',
        legend: {
          positiveRegion: 'Predicted class 1 region / point fill',
          negativeRegion: 'Predicted class 0 region / point fill',
          correctOutline: 'White outline = prediction matches target label',
          mismatchOutline: 'Pink outline = mismatch against target label',
        },
      },
    },
  },
  mlp: {
    activationsPage: {
      eyebrow: 'Architectural mechanics · MLP',
      title: 'Activation functions and non-linearity',
      description:
        'A stack of linear layers still behaves like one linear map. This lesson shows how activation functions bend that behavior so a tiny multilayer network can represent richer responses.',
      objective: 'What changes when the same tiny multilayer network keeps its hidden layer linear versus passing it through a non-linear activation?',
      coreIdeaDescription:
        'Rumelhart et al. made hidden layers useful in practice, but hidden depth only becomes representationally interesting when something non-linear happens between layers.',
      coreIdeaBullets: [
        'If every stage stays linear, the full network can still collapse into one affine transformation.',
        'ReLU creates piecewise-linear bends; tanh and sigmoid squash and saturate in different ways.',
        'Changing the activation changes what shapes the same hidden units can express.',
      ],
      activationLabel: 'Activation at the hidden layer',
      activationOptions: {
        linear: {
          label: 'Linear',
          description: 'No bending: the hidden layer passes its pre-activation straight through.',
          interpretationTitle: 'Why this stays limited',
          interpretation:
            'Even with multiple layers, a purely linear stack still behaves like one affine rule. The curve does not gain the bends needed to express richer structure.',
        },
        relu: {
          label: 'ReLU',
          description: 'Negative responses clamp to zero, producing piecewise-linear behavior.',
          interpretationTitle: 'Why this adds useful structure',
          interpretation:
            'ReLU introduces kinks where hidden units switch on or off. The output can now change slope across different input regions instead of staying globally linear.',
        },
        tanh: {
          label: 'tanh',
          description: 'A smooth bounded activation that saturates near -1 and 1.',
          interpretationTitle: 'Why this feels smoother',
          interpretation:
            'tanh bends the hidden signals smoothly and compresses extremes. The network keeps expressive curvature, but large inputs can start saturating.',
        },
        sigmoid: {
          label: 'Sigmoid',
          description: 'A bounded squashing activation that compresses large magnitudes toward 0 or 1.',
          interpretationTitle: 'Why this compresses strongly',
          interpretation:
            'Sigmoid also adds non-linearity, but it squashes more aggressively. The resulting output can flatten toward the extremes, which is expressive but can be less dynamic.',
        },
      },
      controlLabels: {
        hiddenScale: 'Hidden pre-activation scale',
        outputScale: 'Output mixing scale',
      },
      stats: {
        behavior: 'Behavior class',
        outputRange: 'Output range',
        centerValue: 'Value at x = 0',
      },
      shapeLabels: {
        affine: 'Affine / still effectively one line',
        'piecewise-linear': 'Piecewise-linear / bends by switching units on',
        'smooth-saturated': 'Smooth / bends and saturates',
        'bounded-squashing': 'Bounded / strong squashing at the extremes',
      },
      readingGuideTitle: 'How to read the chart',
      readingGuideBullets: [
        'The white line is the final network output across the input axis.',
        'The amber and blue lines are the two hidden units before they are remixed into the final output.',
        'Switch to linear first, then compare how the same hidden setup changes once the activation bends each hidden response.',
      ],
      xorBridgeTitle: 'Connection to the previous lesson',
      xorBridgeDescription:
        'The XOR preset failed because one perceptron only drew one straight boundary. Non-linearity is the ingredient that lets multilayer networks stop behaving like a single straight rule.',
      prompts: [
        'Start with linear and notice that the white output remains effectively one straight trend.',
        'Switch to ReLU and look for the points where the slope changes because hidden units turn on or off.',
        'Compare tanh and sigmoid with a larger hidden scale. Which one saturates sooner, and how does that change the output extremes?',
      ],
      visualization: {
        eyebrow: 'Tiny 1D MLP response',
        badge: 'same weights, different activation behavior',
        ariaLabel: 'MLP activation response visualization',
        legend: {
          output: 'Final output',
          hiddenOne: 'Hidden unit 1',
          hiddenTwo: 'Hidden unit 2',
        },
      },
    },
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
      objectives: ['Link weights to boundary orientation', 'Link bias to boundary translation'],
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
