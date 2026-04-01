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
      'La ruta de aprendizaje está organizada en pequeñas lecciones visuales. Las secciones reflejan una taxonomía temática, mientras que la secuencia global de lecciones sigue un orden pedagógico separado pensado para aprender mejor.',
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
    taxonomyNoteTitle: 'Cómo leer este mapa',
    taxonomyNote:
      'La taxonomía de secciones agrupa las lecciones por tema. La secuencia global de lecciones está orientada al aprendizaje y puede cruzar secciones cuando eso hace la pedagogía más clara.',
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
      eyebrow: 'Fundamentos · Perceptrón',
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
      eyebrow: 'Fundamentos · Perceptrón',
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
  mlp: {
    activationsPage: {
      eyebrow: 'Fundamentos · MLP',
      title: 'Funciones de activación y no linealidad',
      description:
        'Una pila de capas lineales sigue comportándose como un único mapa lineal. Esta lección muestra cómo las activaciones doblan ese comportamiento para que una red multicapa pequeña pueda representar respuestas más ricas.',
      objective: '¿Qué cambia cuando la misma red multicapa pequeña deja su capa oculta lineal frente a cuando pasa por una activación no lineal?',
      coreIdeaDescription:
        'Rumelhart et al. volvieron prácticas las capas ocultas, pero la profundidad solo gana interés representacional cuando entre capas ocurre algo no lineal.',
      coreIdeaBullets: [
        'Si cada etapa sigue siendo lineal, toda la red todavía puede colapsar en una sola transformación afín.',
        'ReLU crea quiebros por tramos; tanh y sigmoid comprimen y saturan de maneras distintas.',
        'Cambiar la activación cambia qué formas pueden expresar las mismas unidades ocultas.',
      ],
      activationLabel: 'Activación en la capa oculta',
      activationOptions: {
        linear: {
          label: 'Lineal',
          description: 'Sin curvatura: la capa oculta deja pasar directamente su preactivación.',
          interpretationTitle: 'Por qué esto sigue siendo limitado',
          interpretation:
            'Incluso con varias capas, una pila puramente lineal sigue comportándose como una sola regla afín. La curva no gana los pliegues necesarios para expresar estructura más rica.',
        },
        relu: {
          label: 'ReLU',
          description: 'Las respuestas negativas se recortan a cero, produciendo un comportamiento lineal por tramos.',
          interpretationTitle: 'Por qué esto añade estructura útil',
          interpretation:
            'ReLU introduce quiebros cuando las unidades ocultas se encienden o se apagan. La salida ya puede cambiar de pendiente según la zona de entrada en vez de seguir siendo globalmente lineal.',
        },
        tanh: {
          label: 'tanh',
          description: 'Una activación suave y acotada que satura cerca de -1 y 1.',
          interpretationTitle: 'Por qué esto se siente más suave',
          interpretation:
            'tanh curva las señales ocultas de forma suave y comprime los extremos. La red conserva curvatura expresiva, pero las entradas grandes pueden empezar a saturarse.',
        },
        sigmoid: {
          label: 'Sigmoid',
          description: 'Una activación acotada que comprime magnitudes grandes hacia 0 o 1.',
          interpretationTitle: 'Por qué esto comprime con fuerza',
          interpretation:
            'Sigmoid también añade no linealidad, pero aplasta con más agresividad. La salida puede aplanarse en los extremos: es expresiva, aunque menos dinámica.',
        },
      },
      controlLabels: {
        hiddenScale: 'Escala de preactivación oculta',
        outputScale: 'Escala de mezcla de salida',
      },
      stats: {
        behavior: 'Clase de comportamiento',
        outputRange: 'Rango de salida',
        centerValue: 'Valor en x = 0',
      },
      shapeLabels: {
        affine: 'Afín / sigue siendo prácticamente una línea',
        'piecewise-linear': 'Lineal por tramos / se dobla al activar unidades',
        'smooth-saturated': 'Suave / se curva y satura',
        'bounded-squashing': 'Acotada / compresión fuerte en los extremos',
      },
      readingGuideTitle: 'Cómo leer la gráfica',
      readingGuideBullets: [
        'La línea blanca es la salida final de la red a lo largo del eje de entrada.',
        'Las líneas ámbar y azul son las dos unidades ocultas antes de recombinarse en la salida final.',
        'Empieza con lineal y luego compara cómo cambia la misma configuración oculta cuando la activación dobla cada respuesta.',
      ],
      xorBridgeTitle: 'Conexión con la lección anterior',
      xorBridgeDescription:
        'El preset XOR fallaba porque un perceptrón solo dibujaba una frontera recta. La no linealidad es el ingrediente que permite que las redes multicapa dejen de comportarse como una sola regla recta.',
      prompts: [
        'Empieza con lineal y fíjate en que la salida blanca sigue una tendencia prácticamente recta.',
        'Cambia a ReLU y busca los puntos donde la pendiente cambia porque las unidades ocultas se encienden o apagan.',
        'Compara tanh y sigmoid con una escala oculta mayor. ¿Cuál satura antes y cómo cambia eso los extremos de la salida?',
      ],
      visualization: {
        eyebrow: 'Respuesta de un MLP 1D pequeño',
        badge: 'mismos pesos, distinta activación',
        ariaLabel: 'Visualización de respuesta MLP con activaciones',
        legend: {
          output: 'Salida final',
          hiddenOne: 'Unidad oculta 1',
          hiddenTwo: 'Unidad oculta 2',
        },
      },
    },
  },
  optimization: {
    gradientDescentPage: {
      eyebrow: 'Fundamentos · Optimización',
      title: 'Intuición de descenso por gradiente',
      description:
        'El descenso por gradiente sigue la pendiente local de la pérdida. Esta lección te deja cambiar la tasa de aprendizaje y observar cómo el mismo punto inicial converge, rebota o se vuelve inestable.',
      objective: '¿Cómo cambia la tasa de aprendizaje si el descenso por gradiente converge con suavidad, oscila alrededor del valle o sobrepasa hasta volverse inestable?',
      coreIdeaDescription:
        'Backprop da la dirección, pero la tasa de aprendizaje decide con cuánta decisión se mueve la actualización. Sobre el mismo paisaje de pérdida, pasos pequeños pueden arrastrarse, pasos moderados pueden asentarse y pasos demasiado grandes pueden rebotar de un lado a otro del valle.',
      coreIdeaBullets: [
        'El gradiente apunta cuesta arriba, así que la actualización se mueve en la dirección contraria.',
        'Una tasa de aprendizaje moderada suele bajar la pérdida manteniendo la trayectoria bajo control.',
        'Si la tasa de aprendizaje es demasiado grande, la actualización puede sobrepasar el valle y empezar a oscilar o divergir.',
      ],
      presetLabel: 'Presets sugeridos de tasa de aprendizaje',
      presets: [
        {
          id: 'stable',
          learningRate: 0.15,
          label: 'Descenso estable',
          description: 'Una tasa moderada que mantiene la trayectoria bajando hacia la cuenca sin saltos dramáticos.',
        },
        {
          id: 'oscillating',
          learningRate: 0.35,
          label: 'Oscilación amortiguada',
          description: 'Lo bastante grande como para rebotar un poco alrededor del valle antes de volver a asentarse.',
        },
        {
          id: 'unstable',
          learningRate: 0.7,
          label: 'Sobrepaso inestable',
          description: 'Tan agresiva que las actualizaciones saltan por el paisaje de pérdida y dejan de progresar de forma fiable.',
        },
      ],
      controlLabels: {
        learningRate: 'Tasa de aprendizaje',
        startParameter: 'Parámetro inicial',
      },
      actions: {
        step: 'Dar un paso',
        autoplay: 'Autoplay',
        pause: 'Pausar',
        reset: 'Reiniciar trayectoria',
      },
      updateTitle: 'Regla de actualización actual',
      updateDescription:
        'El número después del signo menos es la pendiente local. Una tasa de aprendizaje mayor multiplica esa pendiente y la convierte en un salto más grande sobre el eje del parámetro.',
      stats: {
        step: 'Número de paso',
        loss: 'Pérdida actual',
        gradient: 'Gradiente actual',
        regime: 'Régimen observado',
      },
      regimes: {
        stable: {
          label: 'Estable',
          title: 'La pérdida sigue bajando de forma controlada',
          description:
            'La mayoría de los pasos recientes mejoraron la pérdida sin grandes cambios de dirección. Este es el régimen que normalmente quieres cuando enseñas la idea básica del descenso por gradiente.',
        },
        oscillating: {
          label: 'Oscilante',
          title: 'La trayectoria cruza el valle y cambia de dirección',
          description:
            'Las actualizaciones aún progresan en conjunto, pero el tamaño del paso ya es lo bastante grande como para rebotar de un lado de la cuenca al otro en lugar de asentarse enseguida.',
        },
        unstable: {
          label: 'Inestable',
          title: 'El sobrepaso deja de comportarse como un descenso fiable',
          description:
            'La pérdida sube con demasiada frecuencia o la trayectoria salta demasiado lejos. Es la señal de que la tasa de aprendizaje está empujando la actualización más allá de lo que soporta la pendiente local.',
        },
      },
      readingGuideTitle: 'Cómo leer la gráfica',
      readingGuideBullets: [
        'La curva blanca es el paisaje de pérdida: más abajo es mejor.',
        'Los puntos ámbar marcan los parámetros ya visitados y la línea cian discontinua conecta la trayectoria de actualización.',
        'Prueba primero unos pocos pasos manuales y luego usa autoplay para notar cómo se comporta la misma regla con el tiempo.',
      ],
      bridgeTitle: 'Conexión con la lección anterior',
      bridgeDescription:
        'La lección de MLP mostraba que las capas ocultas necesitan no linealidad para ganar expresividad. Esta cambia al lado de la optimización: una vez que la red tiene parámetros expresivos, el descenso por gradiente es el mecanismo que los mueve por el paisaje de pérdida.',
      prompts: [
        'Empieza con el preset estable y avanza paso a paso. ¿Cada nuevo punto se acerca a una zona más baja del valle?',
        'Cambia al preset oscilante y observa el momento en que la trayectoria cruza el mínimo y cambia de dirección.',
        'Usa el preset inestable. ¿Qué pasos dejan de ayudar y qué te sugiere eso sobre elegir la tasa de aprendizaje?',
      ],
      visualization: {
        eyebrow: 'Paisaje de pérdida 1D',
        title: 'Trayectoria del parámetro sobre la curva de pérdida',
        badge: 'mismo paisaje, distinto comportamiento de actualización',
        ariaLabel: 'Visualización del descenso por gradiente sobre un paisaje de pérdida unidimensional',
        legend: {
          loss: 'Curva de pérdida',
          trajectory: 'Trayectoria de actualización',
          visitedStep: 'Pasos visitados',
        },
      },
    },
  },
  sections: {
    foundations: {
      title: 'Fundamentos',
      description: 'Conceptos base que sostienen la intuición de representación y optimización.',
      goal: 'Pasar de los perceptrones a la optimización sin partir el camino inicial en bloques temáticos poco naturales para aprender.',
    },
    cnns: {
      title: 'CNNs',
      description: 'Extracción de patrones espaciales y construcción jerárquica de características.',
      goal: 'Mostrar cómo los campos receptivos locales detectan estructura útil en imágenes y rejillas.',
    },
    'stable-training': {
      title: 'Entrenamiento estable',
      description: 'Técnicas que hacen más fiable la optimización y el flujo de señal en redes profundas.',
      goal: 'Explicar por qué la inicialización, la normalización, la regularización y los residuos ayudan a que entrenar siga siendo viable.',
    },
    'sequence-memory': {
      title: 'Secuencia y memoria',
      description: 'Estado, recurrencia, atención y manejo de dependencias de largo alcance.',
      goal: 'Construir intuición para modelos que procesan datos ordenados y conservan contexto útil a lo largo del tiempo.',
    },
    research: {
      title: 'Investigación',
      description: 'Temas exploratorios que van más allá de la ruta principal de aprendizaje.',
      goal: 'Reservar espacio para temas avanzados exploratorios sin forzarlos dentro de la secuencia inicial.',
    },
  },
  units: {
    optimization: {
      title: 'Optimización',
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
    initialization: {
      title: 'Inicialización',
      description: 'Por qué las escalas iniciales pueden preservar la señal o romper el entrenamiento desde el principio.',
    },
    'normalization-and-regularization': {
      title: 'Normalización y regularización',
      description: 'Herramientas de estabilidad que moldean activaciones, gradientes y generalización.',
    },
    'rnns-and-lstms': {
      title: 'RNNs y LSTMs',
      description: 'Modelos secuenciales con estado que reutilizan memoria oculta en el tiempo.',
    },
    transformers: {
      title: 'Transformers',
      description: 'Modelos secuenciales basados en atención sin recurrencia.',
    },
    'meta-learning': {
      title: 'Meta-learning',
      description: 'Procedimientos de aprendizaje que optimizan cómo aprende el propio sistema.',
    },
    'nested-learning': {
      title: 'Nested learning',
      description: 'Bucles de actualización apilados o bilevel para direcciones de investigación experimentales.',
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
