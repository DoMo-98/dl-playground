import type { LocalizedMessages } from './en'
import type { Locale } from '../../types/i18n'
import { hiddenLayerCount } from '../../features/initialization/lib/initialization'

export const esMessages: LocalizedMessages = {
  languageName: 'Español',
  nav: {
    learn: 'Aprender',
    firstLessonEyebrow: 'Empieza aquí',
    firstLesson: 'Primera lección',
    repository: 'Repo en GitHub',
    languageSwitcherLabel: 'Idioma',
    primaryNavigationLabel: 'Navegación principal',
    mobileMenuOpenLabel: 'Abrir menú principal',
    mobileMenuCloseLabel: 'Cerrar menú principal',
    mobileMenuPanelLabel: 'Menú de navegación móvil',
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
      ariaLabel: 'Diagrama de neurona del perceptrón mostrando entradas, pesos, suma ponderada y salida binaria',
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
  cnn: {
    localPatternPage: {
      eyebrow: 'CNNs · Convoluciones',
      title: 'Convolución como detector local de patrones',
      description:
        'Una convolución reutiliza los mismos pesos del kernel sobre vecindarios locales. Esta lección te deja editar tanto la rejilla como el kernel para ver cómo las coincidencias locales construyen un mapa de características.',
      objective: '¿Cómo convierte un kernel pequeño comparaciones locales repetidas en un mapa de características que resalta dónde aparece un patrón?',
      coreIdeaDescription:
        'En el encuadre estrecho y seguro respecto a la fuente de LeCun et al. (1998), el comportamiento clave es local: un campo receptivo pequeño recorre la entrada, multiplica valores locales por pesos compartidos y escribe una respuesta por posición en un mapa de características.',
      coreIdeaBullets: [
        'El mismo kernel se reutiliza en cada posición, así que el detector busca un mismo patrón en todas partes.',
        'Cada celda del mapa de características solo ve un parche local de la entrada, no toda la rejilla a la vez.',
        'Respuestas positivas o negativas fuertes significan que el parche local se alinea con el detector de formas distintas.',
      ],
      presetTitle: 'Presets sugeridos de patrones',
      presetOptions: {
        'vertical-edge': {
          label: 'Detector de borde vertical',
          description: 'Una banda brillante a la derecha se encuentra con un kernel de borde de izquierda a derecha.',
          interpretation: 'Las celdas más fuertes aparecen donde la ventana deslizante ve el lado izquierdo oscuro y el derecho brillante, así que el kernel compartido sigue activándose sobre la misma transición local.',
        },
        'horizontal-edge': {
          label: 'Detector de borde horizontal',
          description: 'Una transición de arriba a abajo se encuentra con un kernel de borde horizontal.',
          interpretation: 'Las respuestas se iluminan donde el parche local cambia de oscuro a brillante entre filas. El mecanismo es el mismo; solo cambió la orientación del kernel.',
        },
        'center-focus': {
          label: 'Detector centrado',
          description: 'Un kernel con más peso en el centro recompensa agrupaciones locales densas.',
          interpretation: 'Ahora las celdas más fuertes aparecen donde el parche local contiene muchos vecinos activos cerca del centro, mostrando que las convoluciones pueden detectar algo más que bordes.',
        },
      },
      actions: {
        resetPreset: 'Reiniciar preset',
        clearKernel: 'Vaciar kernel',
      },
      controlsHintTitle: 'Cómo interactuar con las rejillas',
      controlsHintBullets: [
        'Haz clic en cualquier celda de entrada para activar o desactivar evidencia local.',
        'Haz clic en las celdas del kernel para rotar entre -1, 0 y 1 y cambiar qué recompensa o suprime el detector.',
        'Haz clic en una celda del mapa de características para resaltar el campo receptivo exacto que produjo esa respuesta.',
      ],
      stats: {
        strongestCell: 'Posición más fuerte',
        strongestValue: 'Respuesta más fuerte',
        polarity: 'Polaridad de la respuesta',
      },
      polarity: {
        positive: 'Coincidencia positiva',
        negative: 'Coincidencia negativa',
        neutral: 'Neutral / sin coincidencia',
      },
      interpretationTitle: 'Qué significa la respuesta resaltada',
      readingGuideTitle: 'Cómo leer esta lección',
      readingGuideBullets: [
        'La rejilla de entrada es la señal original que recorre el kernel.',
        'La rejilla del kernel es el detector compartido: exactamente los mismos pesos se reutilizan en cada posición válida.',
        'El mapa de características guarda una puntuación por campo receptivo, así que se vuelve un mapa espacial de evidencia local.',
      ],
      bridgeTitle: 'Por qué importa después del descenso por gradiente',
      bridgeDescription: (positiveCount: number, negativeCount: number) =>
        `Este detector produce ahora ${positiveCount} celdas positivas y ${negativeCount} negativas. Más adelante, el descenso por gradiente aprendería kernels así recompensando filtros cuyas respuestas locales ayudan a la tarea, pero el mecanismo que ves ya existe antes de añadir detalles de entrenamiento.`,
      prompts: [
        'Empieza con el preset de borde vertical y recorre el mapa de características. ¿Qué ventanas contienen la transición completa de oscuro a brillante?',
        'Cambia unas pocas celdas de entrada cerca del borde. ¿Qué respuestas del mapa cambian al instante y cuáles no porque su campo receptivo nunca vio esa edición?',
        'Rota los valores del kernel hasta que el detector quede casi en ceros. ¿Qué pasa con el mapa cuando el weight sharing sigue aplicando un detector débil en todas partes?',
      ],
      visualization: {
        eyebrow: 'Barrido por campo receptivo local',
        badge: 'mismo kernel, muchas comparaciones locales',
        ariaLabel: 'Visualización de la lección de convolución con rejilla de entrada, kernel y mapa de características',
        inputTitle: 'Rejilla de entrada',
        inputHint: 'haz clic para alternar 0/1',
        kernelTitle: 'Kernel compartido',
        kernelHint: 'haz clic para rotar -1 / 0 / 1',
        featureMapTitle: 'Mapa de características',
        featureMapHint: 'haz clic en una respuesta para inspeccionar su campo receptivo',
        selectedPatchTitle: 'Cálculo local seleccionado',
        selectedPatchDescription: 'Para el campo receptivo resaltado, la convolución suma:',
        inputCellLabel: 'Celda de entrada',
        kernelCellLabel: 'Celda del kernel',
        featureCellLabel: 'Celda del mapa de características',
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
  stableTraining: {
    initializationPage: {
      eyebrow: 'Entrenamiento estable · Inicialización',
      title: 'Mala inicialización vs inicialización estable',
      description:
        'Antes de que empiece el aprendizaje, la escala inicial de los pesos ya condiciona qué señal sobrevive en profundidad. Esta lección compara presets malos y estables sobre una misma red profunda fija.',
      objective:
        '¿Cuánto puede cambiar la escala inicial de los pesos lo que una red profunda consigue pasar hacia delante y lo que una actualización hacia atrás aún puede devolver a las capas tempranas?',
      coreIdeaDescription:
        'Glorot & Bengio (2010) presentan la inicialización como un problema de escala de señal, y He et al. (2015) adaptan esa historia al caso de las activaciones rectificadoras. Si los pesos empiezan demasiado pequeños, la señal se apaga; si empiezan demasiado grandes, explota o se satura; la zona útil mantiene activaciones y actualizaciones dentro de un rango trabajable.',
      coreIdeaBullets: [
        'La inicialización importa antes del primer paso del optimizador porque fija la escala inicial de la señal.',
        'Una buena escala conserva variación útil capa a capa en lugar de aplastarla o amplificarla sin control.',
        'La mejor escala depende de la familia de activaciones; por eso Xavier y He no son defaults intercambiables.',
      ],
      initializationTitle: 'Presets de inicialización',
      initializationOptions: {
        tiny: {
          label: 'Pesos diminutos',
          description: 'Demasiada poca varianza: las capas profundas reciben señales casi planas.',
        },
        xavier: {
          label: 'Equilibrio estilo Xavier',
          description: 'Un punto de partida equilibrado para que activaciones tipo tanh no colapsen demasiado pronto.',
        },
        he: {
          label: 'Equilibrio estilo He',
          description: 'Una escala pensada para rectificadores que intenta mantener vivo el flujo con ReLU.',
        },
        large: {
          label: 'Pesos sobredimensionados',
          description: 'Demasiada varianza: las capas profundas quedan dominadas por respuestas exageradas.',
        },
      },
      activationTitle: 'Familia de activación',
      activationOptions: {
        relu: {
          label: 'ReLU',
          description: 'Útil para ver por qué la inicialización He ayuda a mantener activas las rutas rectificadas.',
        },
        tanh: {
          label: 'tanh',
          description: 'Útil para ver por qué la saturación aparece cuando la escala es demasiado grande.',
        },
      },
      controlsHintTitle: 'Cómo leer las tarjetas por capa',
      controlsHintBullets: [
        'Cada fila representa una capa oculta de la misma profundidad fija.',
        'Las barras de activación muestran qué aspecto conserva la señal hacia delante tras esa capa.',
        'Las barras de gradiente muestran un proxy hacia atrás: si una actualización aún puede llegar con escala útil a las capas tempranas.',
      ],
      layerLabel: (layerIndex: number) => `Capa ${layerIndex}`,
      layerDescription: (layerIndex: number) =>
        layerIndex === 1
          ? 'Capa oculta más cercana a la entrada.'
          : layerIndex === hiddenLayerCount
            ? 'Capa oculta más profunda de esta pila de juguete.'
            : 'Otra capa oculta dentro de la misma cadena forward/backward.',
      zeroFractionLabel: (value: number) => `${Math.round(value * 100)}% ceros`,
      activationCardTitle: 'Señal hacia delante',
      gradientCardTitle: 'Proxy hacia atrás',
      meterLabels: {
        activationStd: 'Desv. típica de activación',
        activationMeanAbs: 'Media |activación|',
        gradientStd: 'Desv. típica de gradiente',
        gradientMeanAbs: 'Media |gradiente|',
      },
      stats: {
        regime: 'Régimen observado',
        finalActivationStd: 'Desv. típica en la capa más profunda',
        firstLayerGradientStd: 'Desv. típica del gradiente en la primera capa',
      },
      regimes: {
        vanishing: {
          label: 'Rango desvanecido',
          title: 'La señal se apaga antes de que la profundidad resulte útil',
          description:
            'Las activaciones profundas o los gradientes tempranos se están colapsando hacia cero. Aunque la arquitectura tenga profundidad, sobrevive muy poca variación útil entre capas.',
        },
        stable: {
          label: 'Rango estable',
          title: 'Las escalas forward y backward se mantienen en un corredor útil',
          description:
            'Esta es la intuición objetivo: las activaciones conservan suficiente dispersión para transportar información y las actualizaciones hacia atrás aún tienen escala bastante para influir en capas tempranas.',
        },
        exploding: {
          label: 'Rango explosivo',
          title: 'La profundidad está amplificando demasiado los valores',
          description:
            'La red está magnificando las respuestas hasta el punto de desescalar activaciones o actualizaciones hacia atrás. Eso vuelve frágil la optimización incluso antes de hablar del optimizador.',
        },
      },
      readingGuideTitle: 'Qué comparar primero',
      readingGuideBullets: [
        'Mantén ReLU y cambia entre Pesos diminutos, He y Pesos sobredimensionados. Mira cómo las barras colapsan, se mantienen o explotan.',
        'Después cambia a tanh y compara Xavier con Pesos sobredimensionados. Fíjate en cómo los pesos grandes empujan tanh hacia saturación.',
        'Mira ambos extremos de la pila: las activaciones profundas te dicen qué sobrevive hacia delante y los gradientes tempranos qué puede seguir aprendiendo hacia atrás.',
      ],
      bridgeTitle: 'Por qué importa después de convolución',
      bridgeDescription: (mode, activation) => {
        const modeLabel = {
          tiny: 'pesos diminutos',
          xavier: 'equilibrio estilo Xavier',
          he: 'equilibrio estilo He',
          large: 'pesos sobredimensionados',
        }[mode]
        return `${modeLabel} con ${activation.toUpperCase()} cambia la red antes incluso de entrenarla. La idea no es que la inicialización lo resuelva todo, sino que el entrenamiento estable empieza manteniendo el flujo de señal lo bastante utilizable como para que la optimización posterior tenga algo con lo que trabajar.`
      },
      prompts: [
        'Empieza con He + ReLU. ¿Qué capas conservan una cantidad parecida de señal en lugar de colapsar enseguida?',
        'Cambia a Pesos diminutos. ¿Las capas profundas siguen mostrando dispersión útil o todo se aplana?',
        'Prueba Pesos sobredimensionados. ¿Qué métrica explota antes: la señal hacia delante o el proxy hacia atrás?',
      ],
    },
    batchNormPage: {
      eyebrow: 'Entrenamiento estable · Normalización',
      title: 'Intuición de BatchNorm',
      description:
        'Batch normalization recentra y reescala activaciones usando estadísticas del batch durante entrenamiento, y luego cambia a estadísticas acumuladas en inferencia. Esta lección mantiene ese contraste visible sobre un batch diminuto.',
      objective:
        '¿Qué cambia cuando las mismas activaciones pasan por ausencia de normalización, BatchNorm en modo entrenamiento o BatchNorm en modo inferencia?',
      coreIdeaDescription:
        'Ioffe & Szegedy (2015) sitúan BatchNorm alrededor de estadísticas dependientes del batch. La intuición aquí es deliberadamente estrecha y fiel: el minibatch actual fija la media y la varianza durante entrenamiento, pero en inferencia hay que usar estimaciones acumuladas previamente.',
      coreIdeaBullets: [
        'BatchNorm en entrenamiento usa el batch actual, así que un batch desplazado puede volver a un rango más controlado.',
        'La inferencia no puede mirar el batch completo de entrenamiento, así que usa media y varianza acumuladas.',
        'El mecanismo no es “dejar todo en cero para siempre”, sino estabilizar lo que ve cada capa manteniendo una escala predecible.',
      ],
      presetTitle: 'Presets de batch de activaciones',
      presetOptions: {
        balanced: {
          label: 'Batch equilibrado',
          description: 'Las activaciones ya rodean el cero con una dispersión moderada.',
          interpretation: 'Este batch ya está bastante centrado, así que BatchNorm cambia menos dramáticamente.',
        },
        shifted: {
          label: 'Batch desplazado hacia arriba',
          description: 'La mayoría de las activaciones quedan muy por encima de cero, como una capa oculta que deriva.',
          interpretation: 'Es el caso más claro para ver cómo BatchNorm recentra un batch desplazado durante entrenamiento.',
        },
        mixed: {
          label: 'Batch mixto / desigual',
          description: 'Un batch más ancho con activaciones negativas y muy positivas.',
          interpretation: 'Este preset facilita comparar un batch ruidoso con estadísticas acumuladas más suaves en inferencia.',
        },
      },
      modeTitle: 'Modo de normalización',
      modeOptions: {
        none: {
          label: 'Sin BatchNorm',
          description: 'Deja intactas las activaciones crudas.',
          interpretation: 'Sin normalización, la salida conserva el mismo desplazamiento de media y la misma escala del batch entrante.',
        },
        train: {
          label: 'BatchNorm, modo entrenamiento',
          description: 'Normaliza con la media y la varianza del batch actual.',
          interpretation: 'El modo entrenamiento recentra este batch concreto y lleva su dispersión cerca de una desviación típica.',
        },
        inference: {
          label: 'BatchNorm, modo inferencia',
          description: 'Normaliza con estadísticas acumuladas en lugar del batch vivo.',
          interpretation: 'El modo inferencia es más predecible entre peticiones, pero ya no recentra perfectamente este batch exacto.',
        },
      },
      controlsHintTitle: 'Cómo leer la comparación',
      controlsHintBullets: [
        'Elige primero un preset de batch y luego cambia de modo para mantener visibles exactamente las mismas activaciones.',
        'Las estadísticas ámbar describen el batch vivo antes de normalizar.',
        'Las estadísticas cian describen lo que vería la siguiente capa después de aplicar el modo elegido.',
      ],
      stats: {
        batchMean: 'Media del batch',
        batchStd: 'Desv. típica del batch',
        outputMean: 'Media de salida',
        outputStd: 'Desv. típica de salida',
        runningMean: 'Media acumulada',
        runningStd: 'Desv. típica acumulada',
        meanShift: 'Cambio de media en salida',
        range: 'Rango de salida',
      },
      readingGuideTitle: 'Qué comparar primero',
      readingGuideBullets: [
        'Empieza con el batch desplazado y sin BatchNorm. Fíjate en que todas las barras de salida siguen desplazadas hacia arriba.',
        'Cambia a modo entrenamiento y comprueba cómo la media del batch se acerca a cero mientras la dispersión se controla mejor.',
        'Después cambia a modo inferencia. La salida sigue normalizada, pero ahora depende de estadísticas acumuladas y no del batch exacto actual.',
      ],
      bridgeTitle: 'Conexión con la lección anterior',
      bridgeDescription: (mode, batchMean, outputMean) => {
        if (mode === 'none') {
          return `La media del batch entrante es ${batchMean.toFixed(2)} y, sin BatchNorm, la siguiente capa hereda esa misma deriva. Después de la lección de inicialización, la idea nueva aquí es que el entrenamiento estable también puede venir de controlar las activaciones que recibe cada capa.`
        }

        if (mode === 'train') {
          return `BatchNorm en entrenamiento transforma una media de batch de ${batchMean.toFixed(2)} en una media de salida cercana a ${outputMean.toFixed(2)} usando las estadísticas de este minibatch. Esa dependencia del batch es justo la parte que no conviene perder en la simplificación.`
        }

        return `El modo inferencia sigue normalizando, pero lo hace con estadísticas acumuladas, así que la media de salida cae cerca de ${outputMean.toFixed(2)} en lugar de quedar perfectamente en cero. Por eso importa distinguir entrenamiento e inferencia en BatchNorm.`
      },
      prompts: [
        'Usa el batch desplazado. ¿Qué modo recentra con más claridad las salidas alrededor de cero?',
        'Cambia de entrenamiento a inferencia sobre el batch mixto. ¿Por qué cambian las barras de salida si las activaciones crudas siguen siendo idénticas?',
        'Vuelve a sin BatchNorm. ¿Qué parte del problema de deriva o escala se transmite ahora directamente a la siguiente capa?',
      ],
      visualization: {
        batchStatsTitle: 'Estadísticas del batch entrante',
        outputStatsTitle: 'Lo que ve la siguiente capa',
        ariaLabel: 'Visualización de BatchNorm mostrando activaciones crudas y normalizadas para cada muestra',
        sampleLabel: (index) => `Muestra ${index}`,
        rawLabel: 'Activación cruda',
        outputLabels: {
          none: 'Activación de salida',
          normalized: 'Activación normalizada',
        },
        rangeValue: (min, max) => `${min.toFixed(2)} a ${max.toFixed(2)}`,
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
    'initialization-bad-vs-stable': {
      title: 'Inicialización · mala inicialización vs inicialización estable',
      shortTitle: 'Mala inicialización vs inicialización estable',
      summary: 'Compara presets de inicialización para ver cuándo el flujo profundo de señal se apaga, se mantiene útil o explota antes de que el entrenamiento empiece de verdad.',
      objectives: [
        'Conectar la escala inicial con la dispersión de activaciones hacia delante',
        'Relacionar esa misma escala con un proxy simple de estabilidad hacia atrás',
      ],
    },
    'normalization-batchnorm-intuition': {
      title: 'Normalización · intuición de BatchNorm',
      shortTitle: 'Intuición de BatchNorm',
      summary: 'Compara activaciones crudas, BatchNorm en entrenamiento y BatchNorm en inferencia para ver cómo las estadísticas del batch cambian lo que recibe la siguiente capa.',
      objectives: [
        'Relacionar las estadísticas del batch con la normalización en entrenamiento',
        'Contrastar la normalización del batch vivo con las estadísticas acumuladas de inferencia',
      ],
    },
  },
}

export const localeForMessages: Locale = 'es'
