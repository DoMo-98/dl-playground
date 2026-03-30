import type { LocalizedMessages } from './en'
import type { Locale } from '../../i18n'

export const esMessages: LocalizedMessages = {
  languageName: 'Español',
  nav: {
    learn: 'Aprender',
    firstLesson: 'Primera lección',
    languageSwitcherLabel: 'Idioma',
    mobileMenuLabel: 'Navegación principal',
  },
  home: {
    badge: 'Intuición de deep learning visual e interactiva',
    title: 'Aprende redes neuronales viéndolas, tocándolas y cambiándolas.',
    description:
      'Esta capa web de dl-playground se está construyendo como un recurso interactivo académico: cada lección combina explicación, visualización y experimentación.',
    primaryCta: 'Explorar ruta de aprendizaje',
    secondaryCta: 'Abrir primera lección',
    pillarsEyebrow: 'Pilares de diseño',
    pillars: [
      { title: 'Explicar con claridad', description: 'cada página enseña una sola idea cada vez.' },
      { title: 'Mostrar visualmente', description: 'los mecanismos deben verse, no solo describirse.' },
      { title: 'Dejar experimentar', description: 'cada página incluye interacción con sentido.' },
      { title: 'Dar feedback inmediato', description: 'los cambios deben producir efectos visibles.' },
    ],
  },
  learn: {
    eyebrow: 'Ruta de aprendizaje',
    title: 'Lecciones interactivas de deep learning',
    description:
      'La ruta de aprendizaje está organizada en pequeñas lecciones visuales. Cada página está diseñada para explicar un concepto, mostrarlo con claridad y permitir que la persona cambie algo relevante.',
    startEyebrow: 'Empieza por la primera lección disponible',
    openLesson: 'Abrir lección',
    metaMinutes: 'min',
    metaObjectives: 'objetivos',
    openAvailableLesson: 'Abrir lección disponible',
    sectionRoadmap: 'Hoja de ruta de la sección',
    readyCount: (ready, total) => `${ready}/${total} listas`,
    totalMinutes: (minutes) => `${minutes} min en total`,
    status: {
      ready: 'lista',
      planned: 'planeada',
    },
    lessonKind: {
      interactive: 'interactiva',
      lab: 'laboratorio',
      reading: 'lectura',
    },
    unavailableLabel: 'Aún no disponible',
  },
  lessonChrome: {
    objectiveLabel: 'Objetivo de aprendizaje',
    objectiveTitle: 'Qué te ayuda a responder esta página',
    coreIdeaLabel: 'Idea central',
    coreIdeaTitle: 'Idea central',
    observeLabel: 'Observa',
    observeTitle: 'Preguntas guiadas de observación',
    navigationLabel: 'Navegación',
    navigationTitle: 'Mantén coherente la secuencia de lecciones',
    backToLearningPath: 'Volver a la ruta de aprendizaje',
    previous: 'Anterior',
    next: 'Siguiente',
    unavailableBadge: 'Planeada',
    unavailableDescription: 'Esta lección forma parte de la secuencia, pero todavía no está disponible para abrir.',
  },
  notFound: {
    eyebrow: 'Página no encontrada',
    title: 'Esta ruta no existe dentro del idioma actual.',
    description: 'Sigues navegando en español. Puedes volver al inicio o regresar a la ruta de aprendizaje sin salir de este idioma.',
    primaryCta: 'Ir al inicio',
    secondaryCta: 'Volver a la ruta de aprendizaje',
  },
  perceptron: {
    neuronDiagram: {
      inputs: 'Entradas',
      weights: 'Pesos',
      neuron: 'Neurona',
      weightedSum: 'Suma ponderada',
      binaryOutput: 'Salida binaria',
      thresholdAtZero: 'Umbral en 0',
    },
    weightedSumPage: {
      eyebrow: 'Mecánica arquitectónica · Perceptrón',
      title: 'Suma ponderada y sesgo',
      description:
        'Un perceptrón combina sus entradas usando pesos y luego desplaza el resultado con un sesgo. Este es el paso básico de puntuación antes de que un umbral o una activación decidan la salida final.',
      objective: '¿Cómo hacen los pesos y el sesgo que las mismas entradas produzcan una puntuación del perceptrón más alta o más baja?',
      coreIdeaDescription:
        'El perceptrón no decide de un solo salto. Primero construye una puntuación a partir de entradas ponderadas y después compara esa puntuación con un umbral. Esta página aísla el paso de puntuación para que puedas ver exactamente qué parámetro está empujando el resultado hacia arriba o hacia abajo.',
      coreIdeaBullets: [
        'Cada peso controla cuánto contribuye su entrada a la puntuación.',
        'El sesgo desplaza la puntuación incluso cuando las entradas no cambian.',
        'Cruzar el cero cambia la salida binaria, así que pequeños cambios numéricos pueden importar.',
      ],
      controlsTitle: 'Ajusta los ingredientes del perceptrón',
      controlsDescription: 'Cuando puedas, mueve un solo control cada vez para que la relación causa-efecto siga siendo fácil de seguir.',
      controlLabels: {
        x1: 'Entrada x₁',
        x2: 'Entrada x₂',
        w1: 'Peso w₁',
        w2: 'Peso w₂',
        bias: 'Sesgo b',
      },
      currentComputation: 'Cálculo actual',
      whatToNotice: 'Qué conviene observar',
      noticeBullets: [
        'Los pesos positivos empujan la suma hacia arriba cuando su entrada aumenta.',
        'Los pesos negativos tiran de la suma hacia abajo cuando su entrada aumenta.',
        'El sesgo desplaza la puntuación final aunque las entradas no cambien.',
        'Cuando la suma cruza el cero, la salida binaria cambia de 0 a 1.',
      ],
      prompts: [
        'Aumenta solo un peso positivo. ¿Qué conexión visual se vuelve más influyente y con qué rapidez se mueve la puntuación?',
        'Mantén las entradas fijas y arrastra el sesgo. ¿Cuándo cruza la puntuación el cero y cambia la salida?',
        'Haz que ambos pesos sean muy pequeños. ¿Qué parte del cálculo domina ahora la decisión?',
      ],
      tryThis: 'Prueba esto',
      tryThisBullets: [
        'Pon ambas entradas en positivo y luego cambia uno de los pesos de positivo a negativo.',
        'Mantén los pesos fijos y mueve solo el sesgo para ver cómo se desplaza el umbral.',
        'Prueba a dejar ambos pesos cerca de cero y observa cuánto domina el sesgo.',
      ],
    },
    decisionBoundaryPage: {
      eyebrow: 'Mecánica arquitectónica · Perceptrón',
      title: 'Intuición de frontera de decisión',
      description:
        'Un perceptrón convierte su suma ponderada en una frontera de decisión recta. Al cambiar los pesos, esa línea rota; al cambiar el sesgo, se desliza por el plano.',
      objective: '¿Cómo cambian los pesos y el sesgo la línea recta que separa una clase de la otra?',
      coreIdeaDescription:
        'Esta lección se centra en la geometría que puedes observar al instante: un perceptrón, una frontera recta y feedback visual inmediato mientras ajustas los controles.',
      coreIdeaBullets: [
        'Los pesos controlan la orientación de la línea que separa las clases.',
        'El sesgo desplaza esa misma línea para cubrir otra zona del plano.',
        'Un único perceptrón solo puede dibujar una frontera recta en esta vista 2D.',
      ],
      datasetLegend: 'Conjunto preparado',
      datasetNames: {
        'diagonal-separable': 'Separación diagonal',
        'xor-trap': 'Trampa XOR',
      },
      datasetDescriptions: {
        'diagonal-separable': 'Un pequeño conjunto linealmente separable donde la clase positiva vive hacia la zona superior derecha.',
        'xor-trap': 'Este preset muestra un límite clásico: una sola línea recta no puede separar limpiamente las esquinas opuestas.',
      },
      datasetNotes: {
        'xor-trap': 'Un solo perceptrón sigue siendo lineal, así que algunos puntos quedarán mal clasificados por mucho que rotes la frontera.',
      },
      preparedDataset: 'Conjunto preparado',
      controlLabels: {
        w1: 'Peso w₁ (influencia en el eje x)',
        w2: 'Peso w₂ (influencia en el eje y)',
        bias: 'Sesgo b (desplazamiento de la frontera)',
      },
      stats: {
        correct: 'Clasificados correctamente',
        mismatched: 'Puntos mal clasificados',
        equation: 'Ecuación de la frontera',
      },
      movementTitle: 'Cómo leer el movimiento',
      movementBullets: [
        'Aumentar w₁ cambia cuánto inclina la frontera la posición horizontal.',
        'Aumentar w₂ cambia cuánto inclina la frontera la posición vertical.',
        'Cambiar el sesgo desliza la misma línea sin necesidad de rotarla mucho.',
        'Los puntos se predicen como clase 1 cuando w₁x + w₂y + b ≥ 0.',
      ],
      presetNoteTitle: 'Por qué importa este preset',
      prompts: [
        'Usa el preset de separación diagonal e intenta llegar a cero fallos rotando la línea.',
        'Después cambia a Trampa XOR y fíjate en que algunos puntos seguirán mal porque un solo perceptrón sigue siendo lineal.',
        'Lleva w₂ hacia cero para ver cómo la frontera se vuelve vertical y luego usa el sesgo para deslizarla a izquierda o derecha.',
      ],
      visualization: {
        eyebrow: 'Plano de clasificación 2D',
        regionBadge: 'región de clase 1 frente a región de clase 0',
        ariaLabel: 'Visualización de la frontera de decisión',
        legend: {
          positiveRegion: 'Región predicha como clase 1 / relleno del punto',
          negativeRegion: 'Región predicha como clase 0 / relleno del punto',
          correctOutline: 'Contorno blanco = la predicción coincide con la etiqueta objetivo',
          mismatchOutline: 'Contorno rosa = no coincide con la etiqueta objetivo',
        },
      },
    },
  },
  sections: {
    foundations: {
      title: 'Fundamentos',
      description: 'Conceptos base que sostienen la intuición posterior sobre deep learning.',
      goal: 'Construir intuiciones de optimización y representación sobre las que se apoyan los modelos posteriores.',
    },
    mechanics: {
      title: 'Mecánica arquitectónica',
      description: 'Mecanismos que explican cómo se comportan los componentes de una red neuronal.',
      goal: 'Pasar de la intuición de una sola neurona a los bloques con los que se construyen modelos más profundos.',
    },
    cnn: {
      title: 'CNNs',
      description: 'Extracción de patrones espaciales y construcción jerárquica de características.',
      goal: 'Mostrar cómo los campos receptivos locales detectan estructura útil en imágenes y rejillas.',
    },
  },
  units: {
    optimization: {
      title: 'Intuición de optimización',
      description: 'Cómo se mueven los parámetros, por qué cambia la pérdida y qué se siente como progreso estable.',
    },
    perceptron: {
      title: 'Fundamentos del perceptrón',
      description: 'La unidad de decisión más pequeña: puntuar entradas, desplazar con sesgo y formar un separador lineal.',
    },
    mlp: {
      title: 'Perceptrones multicapa',
      description: 'Por qué apilar capas solo gana expresividad cuando aparece la no linealidad.',
    },
    convolutions: {
      title: 'Detección de patrones locales',
      description: 'Entender los kernels como pequeños detectores reutilizables aplicados a lo largo del espacio.',
    },
  },
  lessons: {
    'gradient-descent-intuition': {
      title: 'Descenso por gradiente · intuición',
      shortTitle: 'Descenso por gradiente',
      summary: 'Observa cómo la tasa de aprendizaje cambia el recorrido desde pasos ruidosos hasta una convergencia estable en un paisaje de pérdida sencillo.',
      objectives: [
        'Relacionar la dirección del gradiente con las actualizaciones de parámetros',
        'Contrastar convergencia estable con oscilación y sobrepaso',
      ],
    },
    'perceptron-weighted-sum': {
      title: 'Perceptrón · suma ponderada y sesgo',
      shortTitle: 'Suma ponderada y sesgo',
      summary: 'Manipula entradas, pesos y sesgo para ver cómo un perceptrón calcula su puntuación antes del umbral.',
      objectives: [
        'Conectar cada producto entrada-peso con la puntuación total',
        'Entender cómo el sesgo desplaza la puntuación antes de clasificar',
      ],
    },
    'perceptron-decision-boundary': {
      title: 'Perceptrón · intuición de frontera de decisión',
      shortTitle: 'Frontera de decisión',
      summary: 'Mueve pesos y sesgo para ver cómo una frontera lineal rota y se desplaza sobre un plano de clasificación 2D.',
      objectives: [
        'Relacionar los pesos con la orientación de la frontera',
        'Relacionar el sesgo con la traslación de la frontera',
      ],
    },
    'mlp-activations': {
      title: 'MLP · funciones de activación y no linealidad',
      shortTitle: 'Activaciones y no linealidad',
      summary: 'Compara activaciones para ver cuándo una red sigue siendo lineal en la práctica y cuándo gana expresividad.',
      objectives: [
        'Ver por qué varias capas lineales se colapsan en otro mapa lineal',
        'Comparar cómo las activaciones reforman el comportamiento representable',
      ],
    },
    'cnn-local-patterns': {
      title: 'Convolución como detector local de patrones',
      shortTitle: 'Detector local de patrones',
      summary: 'Edita un kernel pequeño y una rejilla de entrada para ver cómo las coincidencias locales construyen un mapa de características.',
      objectives: [
        'Relacionar los valores del kernel con la fuerza de coincidencia local',
        'Interpretar el mapa de características como un barrido de evidencia local',
      ],
    },
  },
}

export const localeForMessages: Locale = 'es'
