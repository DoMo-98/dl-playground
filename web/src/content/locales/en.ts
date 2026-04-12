import type { Locale } from '../../types/i18n'
import { hiddenLayerCount } from '../../features/initialization/lib/initialization'

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
    firstLessonEyebrow: string
    firstLesson: string
    repository: string
    languageSwitcherLabel: string
    primaryNavigationLabel: string
    mobileMenuOpenLabel: string
    mobileMenuCloseLabel: string
    mobileMenuPanelLabel: string
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
    taxonomyNoteTitle: string
    taxonomyNote: string
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
      ariaLabel: string
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
  cnn: {
    localPatternPage: {
      eyebrow: string
      title: string
      description: string
      objective: string
      coreIdeaDescription: string
      coreIdeaBullets: string[]
      presetTitle: string
      presetOptions: Record<'vertical-edge' | 'horizontal-edge' | 'center-focus', {
        label: string
        description: string
        interpretation: string
      }>
      actions: {
        resetPreset: string
        clearKernel: string
      }
      controlsHintTitle: string
      controlsHintBullets: string[]
      stats: {
        strongestCell: string
        strongestValue: string
        polarity: string
      }
      polarity: {
        positive: string
        negative: string
        neutral: string
      }
      interpretationTitle: string
      readingGuideTitle: string
      readingGuideBullets: string[]
      bridgeTitle: string
      bridgeDescription: (positiveCount: number, negativeCount: number) => string
      prompts: string[]
      visualization: {
        eyebrow: string
        badge: string
        ariaLabel: string
        inputTitle: string
        inputHint: string
        kernelTitle: string
        kernelHint: string
        featureMapTitle: string
        featureMapHint: string
        selectedPatchTitle: string
        selectedPatchDescription: string
        inputCellLabel: string
        kernelCellLabel: string
        featureCellLabel: string
      }
    }
  }
  optimization: {
    gradientDescentPage: {
      eyebrow: string
      title: string
      description: string
      objective: string
      coreIdeaDescription: string
      coreIdeaBullets: string[]
      presetLabel: string
      presets: Array<{
        id: string
        learningRate: number
        label: string
        description: string
      }>
      controlLabels: {
        learningRate: string
        startParameter: string
      }
      actions: {
        step: string
        autoplay: string
        pause: string
        reset: string
      }
      updateTitle: string
      updateDescription: string
      stats: {
        step: string
        loss: string
        gradient: string
        regime: string
      }
      regimes: Record<'stable' | 'oscillating' | 'unstable', {
        label: string
        title: string
        description: string
      }>
      readingGuideTitle: string
      readingGuideBullets: string[]
      bridgeTitle: string
      bridgeDescription: string
      prompts: string[]
      visualization: {
        eyebrow: string
        title: string
        badge: string
        ariaLabel: string
        legend: {
          loss: string
          trajectory: string
          visitedStep: string
        }
      }
    }
  }
  stableTraining: {
    initializationPage: {
      eyebrow: string
      title: string
      description: string
      objective: string
      coreIdeaDescription: string
      coreIdeaBullets: string[]
      initializationTitle: string
      initializationOptions: Record<'tiny' | 'xavier' | 'he' | 'large', {
        label: string
        description: string
      }>
      activationTitle: string
      activationOptions: Record<'relu' | 'tanh', {
        label: string
        description: string
      }>
      controlsHintTitle: string
      controlsHintBullets: string[]
      layerLabel: (layerIndex: number) => string
      layerDescription: (layerIndex: number) => string
      zeroFractionLabel: (value: number) => string
      activationCardTitle: string
      gradientCardTitle: string
      meterLabels: {
        activationStd: string
        activationMeanAbs: string
        gradientStd: string
        gradientMeanAbs: string
      }
      stats: {
        regime: string
        finalActivationStd: string
        firstLayerGradientStd: string
      }
      regimes: Record<'vanishing' | 'stable' | 'exploding', {
        label: string
        title: string
        description: string
      }>
      readingGuideTitle: string
      readingGuideBullets: string[]
      bridgeTitle: string
      bridgeDescription: (mode: 'tiny' | 'xavier' | 'he' | 'large', activation: 'relu' | 'tanh') => string
      prompts: string[]
    }
    batchNormPage: {
      eyebrow: string
      title: string
      description: string
      objective: string
      coreIdeaDescription: string
      coreIdeaBullets: string[]
      presetTitle: string
      presetOptions: Record<'balanced' | 'shifted' | 'mixed', { label: string; description: string; interpretation: string }>
      modeTitle: string
      modeOptions: Record<'none' | 'train' | 'inference', { label: string; description: string; interpretation: string }>
      controlsHintTitle: string
      controlsHintBullets: string[]
      stats: {
        batchMean: string
        batchStd: string
        outputMean: string
        outputStd: string
        runningMean: string
        runningStd: string
        meanShift: string
        range: string
      }
      readingGuideTitle: string
      readingGuideBullets: string[]
      bridgeTitle: string
      bridgeDescription: (mode: 'none' | 'train' | 'inference', batchMean: number, outputMean: number) => string
      prompts: string[]
      visualization: {
        batchStatsTitle: string
        outputStatsTitle: string
        ariaLabel: string
        sampleLabel: (index: number) => string
        rawLabel: string
        outputLabels: {
          none: string
          normalized: string
        }
        rangeValue: (min: number, max: number) => string
      }
    }
    layerNormPage: {
      eyebrow: string
      title: string
      description: string
      objective: string
      coreIdeaDescription: string
      coreIdeaBullets: string[]
      presetTitle: string
      presetOptions: Record<'balanced' | 'shifted' | 'contrast', { label: string; description: string; interpretation: string }>
      contextTitle: string
      contextOptions: Record<'steady-peers' | 'shifted-peers', { label: string; description: string; interpretation: string }>
      controlsHintTitle: string
      controlsHintBullets: string[]
      stats: {
        rawMean: string
        rawStd: string
        batchMean: string
        batchStd: string
        layerMean: string
        layerStd: string
        batchVsLayerGap: string
      }
      readingGuideTitle: string
      readingGuideBullets: string[]
      bridgeTitle: string
      bridgeDescription: (context: 'steady-peers' | 'shifted-peers', gap: number) => string
      prompts: string[]
      visualization: {
        focusTitle: string
        peerTitle: string
        ariaLabel: string
        rawLabel: string
        batchNormLabel: string
        layerNormLabel: string
      }
    }
    residualConnectionsPage: {
      eyebrow: string
      title: string
      description: string
      objective: string
      coreIdeaDescription: string
      coreIdeaBullets: string[]
      presetTitle: string
      presetOptions: Record<'denoise' | 'feature-boost' | 'context-mix', {
        label: string
        description: string
        plainInterpretation: string
        residualInterpretation: string
      }>
      depthTitle: string
      depthOptionLabel: (depth: number) => string
      depthOptionDescription: (depth: number) => string
      controlsHintTitle: string
      controlsHintBullets: string[]
      stats: {
        plainDistance: string
        plainNorm: string
        residualDistance: string
        residualNorm: string
        preservationGain: string
        preservationGainValue: (gain: number) => string
        residualDeltaNorm: string
        depth: string
      }
      layerTraceTitle: string
      layerLabel: (layerIndex: number) => string
      readingGuideTitle: string
      readingGuideBullets: string[]
      bridgeTitle: string
      bridgeDescription: (depth: number, gain: number) => string
      prompts: string[]
      visualization: {
        plainTitle: string
        residualTitle: string
        featureAriaLabel: string
        inputLabel: string
        plainLabel: string
        residualLabel: string
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
    firstLessonEyebrow: 'Start here',
    firstLesson: 'First lesson',
    repository: 'GitHub repo',
    languageSwitcherLabel: 'Language',
    primaryNavigationLabel: 'Primary navigation',
    mobileMenuOpenLabel: 'Open main menu',
    mobileMenuCloseLabel: 'Close main menu',
    mobileMenuPanelLabel: 'Mobile navigation menu',
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
      'The learning path is organized into small visual lessons. The section cards reflect thematic taxonomy, while the lesson sequence remains a separate pedagogical order designed for learners.',
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
    taxonomyNoteTitle: 'How to read this map',
    taxonomyNote:
      'Section taxonomy groups lessons by topic. The global lesson sequence is learner-facing and can cross section boundaries when that makes the pedagogy clearer.',
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
      ariaLabel: 'Perceptron neuron diagram showing inputs, weights, weighted sum, and binary output',
    },
    weightedSumPage: {
      eyebrow: 'Foundations · Perceptron',
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
      eyebrow: 'Foundations · Perceptron',
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
      eyebrow: 'Foundations · MLP',
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
  cnn: {
    localPatternPage: {
      eyebrow: 'CNNs · Convolutions',
      title: 'Convolution as local pattern detector',
      description:
        'A convolution reuses the same kernel weights over local neighborhoods. This lesson lets you edit both the grid and the kernel so you can see how local matches create a feature map.',
      objective: 'How does one small kernel turn repeated local comparisons into a feature map that highlights the places where a pattern appears?',
      coreIdeaDescription:
        'In the narrow, source-safe framing from LeCun et al. (1998), the key behavior is local: a small receptive field slides over the input, multiplies local values by shared weights, and writes one response per position into a feature map.',
      coreIdeaBullets: [
        'The same kernel is reused at every position, so the detector looks for one pattern everywhere.',
        'Each feature-map cell only sees a local patch of the input, not the full grid at once.',
        'Strong positive or negative responses mean the local patch aligns with the detector in different ways.',
      ],
      presetTitle: 'Suggested pattern presets',
      presetOptions: {
        'vertical-edge': {
          label: 'Vertical edge detector',
          description: 'A bright band on the right meets a left-to-right edge kernel.',
          interpretation: 'The strongest cells appear where the sliding window sees the left side dark and the right side bright, so the shared kernel keeps firing on the same local transition.',
        },
        'horizontal-edge': {
          label: 'Horizontal edge detector',
          description: 'A top-to-bottom transition meets a horizontal edge kernel.',
          interpretation: 'Responses light up where the local patch changes from dark to bright across rows. The mechanism is the same; only the kernel orientation changed.',
        },
        'center-focus': {
          label: 'Center-weighted detector',
          description: 'A kernel with extra center weight rewards dense local clusters.',
          interpretation: 'Now the strongest cells appear where the local patch contains many active neighbors near the center, showing that convolutions can detect more than just edges.',
        },
      },
      actions: {
        resetPreset: 'Reset to preset',
        clearKernel: 'Clear kernel',
      },
      controlsHintTitle: 'How to interact with the grids',
      controlsHintBullets: [
        'Click any input cell to toggle local evidence on or off.',
        'Click kernel cells to cycle through -1, 0, and 1 so you can change what the detector rewards or suppresses.',
        'Click a feature-map cell to highlight the exact receptive field that produced that response.',
      ],
      stats: {
        strongestCell: 'Strongest position',
        strongestValue: 'Strongest response',
        polarity: 'Response polarity',
      },
      polarity: {
        positive: 'Positive match',
        negative: 'Negative match',
        neutral: 'Neutral / no match',
      },
      interpretationTitle: 'What the highlighted response means',
      readingGuideTitle: 'How to read this lesson',
      readingGuideBullets: [
        'The input grid is the original signal the kernel scans.',
        'The kernel grid is the shared detector: the exact same weights are reused at every valid position.',
        'The feature map stores one score per receptive field, so it becomes a spatial map of local evidence.',
      ],
      bridgeTitle: 'Why this matters after gradient descent',
      bridgeDescription: (positiveCount: number, negativeCount: number) =>
        `This detector currently produces ${positiveCount} positive cells and ${negativeCount} negative cells. Gradient descent would later learn kernels like this by rewarding filters whose local responses help the task, but the mechanism you are seeing already exists before any training details are added.`,
      prompts: [
        'Start with the vertical-edge preset and click through the feature map. Which windows contain the full dark-to-bright transition?',
        'Flip a few input cells near the edge. Which feature-map responses change immediately, and which stay untouched because their receptive field never saw that edit?',
        'Cycle kernel values until the detector becomes mostly zeros. What happens to the feature map when weight sharing keeps applying a weak detector everywhere?',
      ],
      visualization: {
        eyebrow: 'Local receptive field scan',
        badge: 'same kernel, many local comparisons',
        ariaLabel: 'Convolution lesson visualization with input grid, kernel, and feature map',
        inputTitle: 'Input grid',
        inputHint: 'click cells to toggle 0/1',
        kernelTitle: 'Shared kernel',
        kernelHint: 'click cells to cycle -1 / 0 / 1',
        featureMapTitle: 'Feature map',
        featureMapHint: 'click a response to inspect its receptive field',
        selectedPatchTitle: 'Selected local computation',
        selectedPatchDescription: 'For the highlighted receptive field, the convolution sums:',
        inputCellLabel: 'Input cell',
        kernelCellLabel: 'Kernel cell',
        featureCellLabel: 'Feature map cell',
      },
    },
  },

  optimization: {
    gradientDescentPage: {
      eyebrow: 'Foundations · Optimization',
      title: 'Gradient descent intuition',
      description:
        'Gradient descent follows the local slope of the loss. This lesson lets you change the learning rate and watch the same starting point settle, bounce, or become unstable.',
      objective: 'How does the learning rate change whether gradient descent converges smoothly, oscillates around the valley, or overshoots into unstable behavior?',
      coreIdeaDescription:
        'Backprop gives the direction, but the learning rate decides how boldly the update moves. On the same loss landscape, small steps can crawl, moderate steps can settle, and overly large steps can bounce across the valley.',
      coreIdeaBullets: [
        'The gradient points uphill, so the update moves in the opposite direction.',
        'A moderate learning rate usually lowers the loss while keeping the trajectory controlled.',
        'If the learning rate is too large, the update can overshoot the valley and start oscillating or diverging.',
      ],
      presetLabel: 'Suggested learning-rate presets',
      presets: [
        {
          id: 'stable',
          learningRate: 0.15,
          label: 'Stable descent',
          description: 'A moderate rate that keeps the path descending into the basin without dramatic jumps.',
        },
        {
          id: 'oscillating',
          learningRate: 0.35,
          label: 'Damped oscillation',
          description: 'Large enough to bounce across the valley a little before settling back down.',
        },
        {
          id: 'unstable',
          learningRate: 0.7,
          label: 'Unstable overshoot',
          description: 'So aggressive that the updates leap across the loss landscape and stop making reliable progress.',
        },
      ],
      controlLabels: {
        learningRate: 'Learning rate',
        startParameter: 'Starting parameter',
      },
      actions: {
        step: 'Take one step',
        autoplay: 'Autoplay',
        pause: 'Pause',
        reset: 'Reset path',
      },
      updateTitle: 'Current update rule',
      updateDescription:
        'The number after the minus sign is the local slope. A larger learning rate multiplies that slope into a bigger jump across the parameter axis.',
      stats: {
        step: 'Step count',
        loss: 'Current loss',
        gradient: 'Current gradient',
        regime: 'Observed regime',
      },
      regimes: {
        stable: {
          label: 'Stable',
          title: 'Loss keeps moving downhill in a controlled way',
          description:
            'Most recent steps improved the loss without strong back-and-forth reversals. This is the regime you usually want when teaching the basic idea of gradient descent.',
        },
        oscillating: {
          label: 'Oscillating',
          title: 'The path crosses the valley and changes direction',
          description:
            'The updates are still making progress overall, but the step size is big enough to bounce from one side of the basin to the other instead of settling immediately.',
        },
        unstable: {
          label: 'Unstable',
          title: 'Overshoot stops behaving like reliable descent',
          description:
            'The loss is rising too often or the trajectory is leaping too far. This is the warning sign that the learning rate is pushing the update beyond what the local slope can support.',
        },
      },
      readingGuideTitle: 'How to read the chart',
      readingGuideBullets: [
        'The white curve is the loss landscape: lower is better.',
        'Amber dots mark the parameters already visited, and the dashed cyan line connects the update trajectory.',
        'Try a few single steps first, then use autoplay to feel how the same rule behaves over time.',
      ],
      bridgeTitle: 'Connection to the previous lesson',
      bridgeDescription:
        'The MLP lesson showed that hidden layers need non-linearity to become expressive. This lesson shifts to the optimization side: once a network has expressive parameters, gradient descent is the mechanism that moves them through the loss landscape.',
      prompts: [
        'Start with the stable preset and step forward. Does each new dot move toward a lower part of the valley?',
        'Switch to the oscillating preset and watch for the moment the path crosses the minimum and flips direction.',
        'Use the unstable preset. Which steps stop helping, and what does that suggest about choosing a learning rate?',
      ],
      visualization: {
        eyebrow: '1D loss landscape',
        title: 'Parameter path over the loss curve',
        badge: 'same landscape, different update behavior',
        ariaLabel: 'Gradient descent visualization over a one-dimensional loss landscape',
        legend: {
          loss: 'Loss curve',
          trajectory: 'Update trajectory',
          visitedStep: 'Visited steps',
        },
      },
    },
  },
  stableTraining: {
    initializationPage: {
      eyebrow: 'Stable training · Initialization',
      title: 'Bad initialization vs stable initialization',
      description:
        'Before learning begins, the starting weight scale already shapes what signal survives through depth. This lesson compares bad and stable presets across a fixed deep network.',
      objective:
        'How much can the starting weight scale change what a deep network passes forward and what a backward update can still send back through earlier layers?',
      coreIdeaDescription:
        'Glorot & Bengio (2010) frame initialization as a signal-scale problem, and He et al. (2015) adapt that story to rectifiers. If the starting weights are too small, signals shrink; if they are too large, they blow up or saturate; the useful zone keeps forward activations and backward updates in a workable range.',
      coreIdeaBullets: [
        'Initialization matters before the first optimizer step because it sets the starting signal scale.',
        'A good starting scale preserves enough variation layer to layer instead of crushing it or amplifying it uncontrollably.',
        'The best scale depends on the activation family, which is why Xavier and He are not interchangeable defaults.',
      ],
      initializationTitle: 'Initialization presets',
      initializationOptions: {
        tiny: {
          label: 'Tiny weights',
          description: 'Too little variance: later layers mostly receive almost-flat signals.',
        },
        xavier: {
          label: 'Xavier-style balance',
          description: 'A balanced default that keeps tanh-like activations from collapsing too quickly.',
        },
        he: {
          label: 'He-style balance',
          description: 'A rectifier-friendly scale that tries to keep ReLU signal flow alive.',
        },
        large: {
          label: 'Oversized weights',
          description: 'Too much variance: deep layers become dominated by exaggerated responses.',
        },
      },
      activationTitle: 'Activation family',
      activationOptions: {
        relu: {
          label: 'ReLU',
          description: 'Useful for seeing why He initialization helps keep rectifier pathways alive.',
        },
        tanh: {
          label: 'tanh',
          description: 'Useful for seeing why saturation becomes a problem when the scale is too large.',
        },
      },
      controlsHintTitle: 'How to read the layer cards',
      controlsHintBullets: [
        'Each row is one hidden layer in the same fixed network depth.',
        'Activation bars show what the forward signal still looks like after that layer.',
        'Gradient bars show a backward proxy: whether an update could still reach early layers with useful scale.',
      ],
      layerLabel: (layerIndex: number) => `Layer ${layerIndex}`,
      layerDescription: (layerIndex: number) =>
        layerIndex === 1
          ? 'Closest hidden layer to the input.'
          : layerIndex === hiddenLayerCount
            ? 'Deepest hidden layer in this toy stack.'
            : 'Another hidden layer in the same forward/backward chain.',
      zeroFractionLabel: (value: number) => `${Math.round(value * 100)}% zeros`,
      activationCardTitle: 'Forward signal',
      gradientCardTitle: 'Backward proxy',
      meterLabels: {
        activationStd: 'Activation std',
        activationMeanAbs: 'Mean |activation|',
        gradientStd: 'Gradient std',
        gradientMeanAbs: 'Mean |gradient|',
      },
      stats: {
        regime: 'Observed regime',
        finalActivationStd: 'Deepest-layer activation std',
        firstLayerGradientStd: 'Earliest-layer gradient std',
      },
      regimes: {
        vanishing: {
          label: 'Vanishing range',
          title: 'Signal is fading before the network can use depth well',
          description:
            'The later activations or earlier gradients are collapsing toward zero. Even if the architecture is deep, very little useful variation survives across layers.',
        },
        stable: {
          label: 'Stable range',
          title: 'Forward and backward scales stay in a workable corridor',
          description:
            'This is the target intuition: activations keep enough spread to carry information, and backward updates still have enough scale to influence early layers.',
        },
        exploding: {
          label: 'Exploding range',
          title: 'Depth is amplifying values too aggressively',
          description:
            'The network is now magnifying responses so much that later layers or backward updates become badly scaled. This makes optimization brittle even before discussing the optimizer itself.',
        },
      },
      readingGuideTitle: 'What to compare first',
      readingGuideBullets: [
        'Keep ReLU selected and switch between Tiny, He, and Oversized weights. Watch how the bars either collapse, stay usable, or blow up.',
        'Then switch to tanh and compare Xavier against Oversized weights. Notice how large weights push tanh toward saturation.',
        'Focus on both ends of the stack: deep activations tell you what survives forward, while early-layer gradients tell you what can still learn backward.',
      ],
      bridgeTitle: 'Why this matters after convolution',
      bridgeDescription: (mode, activation) => {
        const modeLabel = {
          tiny: 'tiny weights',
          xavier: 'Xavier-style balance',
          he: 'He-style balance',
          large: 'oversized weights',
        }[mode]
        return `${modeLabel} with ${activation.toUpperCase()} changes the network before training even starts. The lesson is not that initialization solves everything, but that stable training begins by keeping signal flow usable enough for later optimization to do meaningful work.`
      },
      prompts: [
        'Start with He + ReLU. Which layers keep a similar amount of signal instead of collapsing immediately?',
        'Switch to Tiny weights. Do the later layers still show meaningful activation spread, or does everything flatten out?',
        'Try Oversized weights. Which metric blows up first: the forward signal or the backward proxy?',
      ],
    },
    batchNormPage: {
      eyebrow: 'Stable training · Normalization',
      title: 'BatchNorm intuition',
      description:
        'Batch normalization recenters and rescales activations using batch statistics during training, then switches to running statistics at inference time. This lesson keeps that contrast visible on one tiny activation batch.',
      objective:
        'What changes when the same activations pass through no normalization, BatchNorm in training mode, or BatchNorm in inference mode?',
      coreIdeaDescription:
        'Ioffe & Szegedy (2015) frame BatchNorm around batch-dependent statistics. The core intuition here is narrow and faithful: the current mini-batch sets the mean and variance during training, but inference has to rely on running estimates collected earlier.',
      coreIdeaBullets: [
        'Training-mode BatchNorm uses the current batch, so a shifted batch gets pulled back toward a more controlled range.',
        'Inference cannot peek at the full training batch, so it uses running mean and variance instead.',
        'The mechanism is not “make everything zero forever”, but “stabilize what each layer sees while preserving a predictable scale.”',
      ],
      presetTitle: 'Activation batch presets',
      presetOptions: {
        balanced: {
          label: 'Balanced batch',
          description: 'Activations already straddle zero with a moderate spread.',
          interpretation: 'This batch is already fairly centered, so BatchNorm changes less dramatically.',
        },
        shifted: {
          label: 'Shifted upward batch',
          description: 'Most activations sit well above zero, mimicking a drifting hidden layer.',
          interpretation: 'This is the clearest case for seeing BatchNorm recenter a drifting batch during training.',
        },
        mixed: {
          label: 'Mixed / uneven batch',
          description: 'A wider batch with both negative and strongly positive activations.',
          interpretation: 'This preset makes it easy to compare a noisy batch against smoother running statistics at inference.',
        },
      },
      modeTitle: 'Normalization mode',
      modeOptions: {
        none: {
          label: 'No BatchNorm',
          description: 'Leave the raw activations untouched.',
          interpretation: 'Without normalization, the output keeps the same mean shift and scale as the incoming batch.',
        },
        train: {
          label: 'BatchNorm, training mode',
          description: 'Normalize with the current batch mean and variance.',
          interpretation: 'Training mode recenters this specific batch and pushes its spread close to one standard deviation.',
        },
        inference: {
          label: 'BatchNorm, inference mode',
          description: 'Normalize with stored running statistics instead of the live batch.',
          interpretation: 'Inference mode stays predictable across requests, but it no longer perfectly recenters this exact batch.',
        },
      },
      controlsHintTitle: 'How to read the comparison',
      controlsHintBullets: [
        'Pick a batch preset first, then switch modes so the exact same activations stay in view.',
        'The amber stats describe the live batch before normalization.',
        'The cyan stats describe what the next layer would see after the chosen mode is applied.',
      ],
      stats: {
        batchMean: 'Batch mean',
        batchStd: 'Batch std',
        outputMean: 'Output mean',
        outputStd: 'Output std',
        runningMean: 'Running mean',
        runningStd: 'Running std',
        meanShift: 'Output mean shift',
        range: 'Output range',
      },
      readingGuideTitle: 'What to compare first',
      readingGuideBullets: [
        'Start with the shifted batch and no BatchNorm. Notice that every output bar stays displaced upward.',
        'Switch to training mode and check how the batch mean moves close to zero while the spread becomes more controlled.',
        'Then switch to inference mode. The output still uses normalization, but now it follows stored running statistics instead of the exact current batch.',
      ],
      bridgeTitle: 'Connection to the previous lesson',
      bridgeDescription: (mode, batchMean, outputMean) => {
        if (mode === 'none') {
          return `The incoming batch mean is ${batchMean.toFixed(2)}, and without BatchNorm the next layer inherits that same drift. After the initialization lesson, this is the key new idea: stable training can also come from controlling the activations each layer receives.`
        }

        if (mode === 'train') {
          return `Training-mode BatchNorm turns a batch mean of ${batchMean.toFixed(2)} into an output mean near ${outputMean.toFixed(2)} by using this mini-batch's own statistics. That is the batch-dependent part you should not lose in the simplification.`
        }

        return `Inference mode still normalizes, but it does so with stored running statistics, so the output mean lands near ${outputMean.toFixed(2)} instead of perfectly zero. This is why train-vs-inference behavior matters in BatchNorm.`
      },
      prompts: [
        'Use the shifted batch. Which mode most clearly recenters the outputs around zero?',
        'Switch from training to inference on the mixed batch. Why do the output bars change even though the raw activations stayed identical?',
        'Return to no BatchNorm. Which part of the drift or scale problem is now passed directly to the next layer?',
      ],
      visualization: {
        batchStatsTitle: 'Incoming batch statistics',
        outputStatsTitle: 'What the next layer sees',
        ariaLabel: 'BatchNorm lesson visualization showing raw and normalized activations for each sample',
        sampleLabel: (index) => `Sample ${index}`,
        rawLabel: 'Raw activation',
        outputLabels: {
          none: 'Output activation',
          normalized: 'Normalized activation',
        },
        rangeValue: (min, max) => `${min.toFixed(2)} to ${max.toFixed(2)}`,
      },
    },
    layerNormPage: {
      eyebrow: 'Stable training · Normalization',
      title: 'LayerNorm intuition',
      description:
        "Layer normalization rescales each sample using that sample's own feature statistics. This lesson keeps one focused sample fixed while the surrounding batch changes, so you can see why LayerNorm does not inherit BatchNorm's batch dependence.",
      objective:
        'Why does LayerNorm stay stable for one sample even when the other samples in the batch change?',
      coreIdeaDescription:
        'Ba, Kiros, and Hinton (2016) normalize across the features inside each individual case. The faithful narrow intuition here is that the focused sample carries its own mean and variance, so changing neighboring samples should not change the LayerNorm output for that case.',
      coreIdeaBullets: [
        'BatchNorm mixes information across samples because it normalizes each feature with batch-wide statistics.',
        'LayerNorm normalizes across features inside one sample, so the same sample keeps the same normalized pattern even if its neighbors drift.',
        'The goal is not to erase structure, but to control scale and offset without depending on the current mini-batch composition.',
      ],
      presetTitle: 'Focused sample preset',
      presetOptions: {
        balanced: {
          label: 'Balanced feature profile',
          description: 'The focused sample rises smoothly across its three features.',
          interpretation: 'This makes it easy to see that LayerNorm preserves the same internal pattern while re-centering it within the sample.',
        },
        shifted: {
          label: 'Shifted positive profile',
          description: 'All three features are elevated, similar to a drifting hidden state.',
          interpretation: 'This is the clearest preset for seeing LayerNorm remove sample-level offset without caring which peers share the batch.',
        },
        contrast: {
          label: 'High-contrast profile',
          description: 'The focused sample spans negative, medium, and large positive features.',
          interpretation: 'This preset highlights that LayerNorm keeps relative feature contrast while standardizing the sample as a whole.',
        },
      },
      contextTitle: 'Neighboring batch context',
      contextOptions: {
        'steady-peers': {
          label: 'Steady peers',
          description: 'The other samples stay close to the focused sample.',
          interpretation: 'When peers stay similar, BatchNorm and LayerNorm look more alike on the focused sample.',
        },
        'shifted-peers': {
          label: 'Shifted peers',
          description: 'The other samples drift upward while the focused sample stays exactly the same.',
          interpretation: 'Now the batch-wide statistics move, so BatchNorm changes for the focused sample while LayerNorm stays locked to the sample itself.',
        },
      },
      controlsHintTitle: 'How to read the comparison',
      controlsHintBullets: [
        'The first sample is the only one shown in detail, and it never changes when you switch neighboring context.',
        'Compare the cyan BatchNorm bars against the green LayerNorm bars after changing only the peer samples.',
        'If LayerNorm is doing its job, the green pattern for the focused sample should stay identical across contexts.',
      ],
      stats: {
        rawMean: 'Focused-sample mean',
        rawStd: 'Focused-sample std',
        batchMean: 'BatchNorm output mean',
        batchStd: 'BatchNorm output std',
        layerMean: 'LayerNorm output mean',
        layerStd: 'LayerNorm output std',
        batchVsLayerGap: 'Max BatchNorm vs LayerNorm gap',
      },
      readingGuideTitle: 'What to compare first',
      readingGuideBullets: [
        'Start with Steady peers and note the three values for the focused sample: raw, BatchNorm, and LayerNorm.',
        'Switch to Shifted peers. The raw values stay fixed because the focused sample did not move.',
        'Watch which normalization changes anyway: BatchNorm reacts to the new batch context, while LayerNorm keeps the same feature-wise pattern for the focused sample.',
      ],
      bridgeTitle: 'Connection to the BatchNorm lesson',
      bridgeDescription: (context, gap) => {
        if (context === 'steady-peers') {
          return `With steady peers, BatchNorm and LayerNorm stay relatively close on the focused sample, so the contrast is milder. That is useful because it shows the methods are not opposites, they simply normalize along different axes.`
        }

        return `With shifted peers, the focused sample still has the same internal values, but BatchNorm now moves because the surrounding batch changed. The current max gap of ${gap.toFixed(2)} makes the LayerNorm payoff visible: per-sample normalization does not depend on who else arrived in the batch.`
      },
      prompts: [
        'Keep the same focused sample and switch from Steady peers to Shifted peers. Which bars move even though the sample itself did not change?',
        'Look at the LayerNorm output mean and std. Why do they stay near zero and one for the focused sample across both contexts?',
        'Return to the high-contrast preset. Which part of the sample survives normalization: absolute offset or relative feature pattern?',
      ],
      visualization: {
        focusTitle: 'Focused sample before normalization',
        peerTitle: 'What changes when peers drift',
        ariaLabel: 'LayerNorm lesson visualization comparing raw, BatchNorm, and LayerNorm values for one focused sample',
        rawLabel: 'Raw feature',
        batchNormLabel: 'BatchNorm output',
        layerNormLabel: 'LayerNorm output',
      },
    },
    residualConnectionsPage: {
      eyebrow: 'Stable training · Residual connections',
      title: 'Why skip connections help',
      description:
        'Residual blocks let each layer add a correction instead of replacing the whole representation. This lesson contrasts a plain stack with a residual stack so you can see how the identity path preserves useful signal as depth grows.',
      objective:
        'Why does adding an identity skip path make deep stacks easier to keep useful than asking every block to rewrite the full signal?',
      coreIdeaDescription:
        'He et al. frame residual learning as fitting a residual function on top of an identity shortcut. The faithful, narrow lesson here is that a block becomes easier to use when it can keep the current representation and only add what needs changing.',
      coreIdeaBullets: [
        'A plain stack feeds each block only the transformed output of the previous block, so depth can overwrite or shrink the original signal quickly.',
        'A residual block keeps an identity lane alive and adds a learned correction on top of it.',
        'The point is not that residual branches do nothing, but that they can make small useful edits without forcing the whole representation to be rebuilt each time.',
      ],
      presetTitle: 'Residual branch behavior',
      presetOptions: {
        denoise: {
          label: 'Gentle cleanup branch',
          description: 'Each block proposes a small cleanup-style correction.',
          plainInterpretation: 'In the plain stack, the branch output becomes the entire next state, so the original signal fades quickly.',
          residualInterpretation: 'In the residual stack, that same cleanup branch acts like a light correction layered on top of the original features.',
        },
        'feature-boost': {
          label: 'Feature boosting branch',
          description: 'Each block amplifies some features while trimming others.',
          plainInterpretation: 'Without the skip path, repeated feature boosting starts to replace the original pattern with the branch preference alone.',
          residualInterpretation: 'With the skip path, the branch can emphasize useful features while the input pattern still survives underneath.',
        },
        'context-mix': {
          label: 'Context mixing branch',
          description: 'Each block mixes neighboring features more aggressively.',
          plainInterpretation: 'The plain stack quickly collapses into the branch mixing behavior because every layer must pass only that remixed state onward.',
          residualInterpretation: 'The residual stack still mixes context, but it keeps an explicit route for the pre-existing representation to travel through depth.',
        },
      },
      depthTitle: 'Stack depth',
      depthOptionLabel: (depth) => `${depth} blocks`,
      depthOptionDescription: (depth) => depth <= 2
        ? 'A short stack where both designs still look fairly close.'
        : depth <= 4
          ? 'Enough depth for the plain path to start drifting away from the input.'
          : 'A deeper stack where the skip path has to keep the original signal alive across many blocks.',
      controlsHintTitle: 'How to read the comparison',
      controlsHintBullets: [
        'The input bars never move, so they act as the reference representation we want to preserve or refine.',
        'Compare the purple plain output with the cyan residual output after changing only the branch behavior or depth.',
        'Then scan the layer trace below. Smaller distance-to-input means that stack is still carrying more of the original representation forward.',
      ],
      stats: {
        plainDistance: 'Plain stack distance to input',
        plainNorm: 'Plain stack signal norm',
        residualDistance: 'Residual stack distance to input',
        residualNorm: 'Residual stack signal norm',
        preservationGain: 'Residual preservation gain',
        preservationGainValue: (gain) => `${gain.toFixed(1)}× better`,
        residualDeltaNorm: 'Residual correction size',
        depth: 'Active depth',
      },
      layerTraceTitle: 'Distance to the original input across depth',
      layerLabel: (layerIndex) => `Block ${layerIndex}`,
      readingGuideTitle: 'What to compare first',
      readingGuideBullets: [
        'Start with 2 blocks and note that both designs are still fairly close to the input, especially in the gentler preset.',
        'Increase depth to 4 or 8 blocks. The plain stack now depends entirely on repeated branch outputs, so it drifts farther from the original signal.',
        'Watch the residual stack instead: the identity path still carries the original signal while each block only adds a correction.',
      ],
      bridgeTitle: 'Connection to the ResNet paper claim',
      bridgeDescription: (depth, gain) => `At ${depth} blocks, the residual stack is preserving the original representation about ${gain.toFixed(1)}× better than the plain stack in this toy setup. That captures the narrow teaching claim from He et al.: learning a residual update can be easier than relearning the whole mapping at every layer.`,
      prompts: [
        'Keep the same preset and move from 2 to 8 blocks. Which stack stays visually closer to the input bars?',
        'Switch from Gentle cleanup to Context mixing. How does the skip path change what depth does to the original representation?',
        'Look at the layer trace. At which block does the plain stack start drifting much faster than the residual stack?',
      ],
      visualization: {
        plainTitle: 'Plain stack after the last block',
        residualTitle: 'Residual stack after the last block',
        featureAriaLabel: 'Residual lesson visualization comparing input, plain stack output, and residual stack output by feature',
        inputLabel: 'Input signal',
        plainLabel: 'Plain output',
        residualLabel: 'Residual output',
      },
    },
  },
  sections: {
    foundations: {
      title: 'Foundations',
      description: 'Core concepts that ground basic representation and optimization intuition.',
      goal: 'Move from perceptrons to optimization without splitting the beginner path across unrelated top-level buckets.',
    },
    cnns: {
      title: 'CNNs',
      description: 'Spatial pattern extraction and hierarchical feature building.',
      goal: 'Show how local receptive fields detect useful structure in images and grids.',
    },
    'stable-training': {
      title: 'Stable Training',
      description: 'Techniques that make optimization and deep signal flow behave more reliably.',
      goal: 'Explain why initialization, normalization, regularization, and residual design help training stay usable.',
    },
    'sequence-memory': {
      title: 'Sequence & Memory',
      description: 'State, recurrence, attention, and long-range dependency handling.',
      goal: 'Build intuition for models that process ordered data and preserve useful context over time.',
    },
    research: {
      title: 'Research',
      description: 'Exploratory topics that extend beyond the core learner path.',
      goal: 'Reserve space for exploratory advanced topics without forcing them into the beginner sequence.',
    },
  },
  units: {
    optimization: {
      title: 'Optimization',
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
    initialization: {
      title: 'Initialization',
      description: 'Why starting scales can either preserve signal or break training early.',
    },
    'normalization-and-regularization': {
      title: 'Normalization and regularization',
      description: 'Stability tools that shape activations, gradients, and generalization behavior.',
    },
    'residual-connections': {
      title: 'Residual connections',
      description: 'Identity shortcuts that let deep stacks keep useful signal while learning corrections.',
    },
    'rnns-and-lstms': {
      title: 'RNNs and LSTMs',
      description: 'Stateful sequence models that reuse hidden state over time.',
    },
    transformers: {
      title: 'Transformers',
      description: 'Attention-based sequence models without recurrence.',
    },
    'meta-learning': {
      title: 'Meta-learning',
      description: 'Learning procedures that optimize how learning itself adapts.',
    },
    'nested-learning': {
      title: 'Nested learning',
      description: 'Stacked or bilevel update loops for experimental research directions.',
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
    'initialization-bad-vs-stable': {
      title: 'Initialization · bad init vs stable init',
      shortTitle: 'Bad initialization vs stable initialization',
      summary: 'Compare initialization presets to see when deep signal flow fades, stays usable, or explodes before training really starts.',
      objectives: [
        'Connect initialization scale to forward activation spread',
        'Relate the same starting scale to a simple backward-stability proxy',
      ],
    },
    'normalization-batchnorm-intuition': {
      title: 'Normalization · BatchNorm intuition',
      shortTitle: 'BatchNorm intuition',
      summary: 'Compare raw activations, training-time BatchNorm, and inference-time BatchNorm to see how batch statistics change what the next layer receives.',
      objectives: [
        'Relate batch statistics to training-time normalization',
        'Contrast live batch normalization with inference-time running statistics',
      ],
    },
    'normalization-layernorm-intuition': {
      title: 'Normalization · LayerNorm intuition',
      shortTitle: 'LayerNorm intuition',
      summary: 'Keep one sample fixed while neighboring samples drift to see why LayerNorm depends on per-sample feature statistics instead of batch composition.',
      objectives: [
        'Contrast batch-dependent normalization with per-sample normalization',
        'See why LayerNorm stays stable when batch neighbors change',
      ],
    },
    'residual-connections-why-skip-connections-help': {
      title: 'Residual connections · why skip connections help',
      shortTitle: 'Why skip connections help',
      summary: 'Compare a plain stack with a residual stack to see how identity shortcuts preserve useful signal while each block only learns a correction.',
      objectives: [
        'Contrast full replacement with residual correction across depth',
        'See why an identity shortcut helps deep representations stay usable',
      ],
    },
  },
}

export type { LocalizedMessages }
export const localeForMessages: Locale = 'en'
