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
    readyCount: (ready, total) => `${ready}/${total} listas`,
    totalMinutes: (minutes) => `${minutes} min en total`,
    openAvailableLesson: 'Abrir lección disponible',
    sectionRoadmap: 'Hoja de ruta de la sección',
    status: {
      ready: 'lista',
      planned: 'planeada',
    },
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
