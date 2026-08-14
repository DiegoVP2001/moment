// ============ DATA V2 ============
// Generado automáticamente por el panel de cliente (Google Sheets → Apps Script).
// No editar a mano — los cambios se pierden en la próxima publicación desde el Sheet.
// Última actualización: 2026-08-14 18:59
const WA_NUM = '56998928078';
const WA_PRETTY = '+56 9 9892 8078';

function waLink(serviceTitle, itemName) {
  return `https://wa.me/${WA_NUM}?text=${encodeURIComponent(`¡Hola! Me gustaría saber la disponibilidad para agendar ${itemName} de ${serviceTitle}.`)}`;
}
function waGeneralLink(serviceTitle) {
  return `https://wa.me/${WA_NUM}?text=${encodeURIComponent(`¡Hola! Me gustaría más información sobre ${serviceTitle}.`)}`;
}
function waBuyLink(productName) {
  return `https://wa.me/${WA_NUM}?text=${encodeURIComponent(`¡Hola! Consulto disponibilidad de ${productName} en Moment. ¿Tienen stock?`)}`;
}
function waReservarLink() {
  return `https://wa.me/${WA_NUM}?text=${encodeURIComponent('¡Hola! Me gustaría más información para reservar en Moment.')}`;
}

const BRAND = {
  "name": "Moment",
  "phone": "+56 9 9892 8078",
  "email": "momentcentrodeportivo@gmail.com",
  "address": "Calle Cortes 41, Isla de Maipo",
  "region": "Región Metropolitana",
  "instagram": "moment.csd",
  "instagramUrl": "https://www.instagram.com/moment.csd/"
};

const HOME_COPY = {
  "hero": {
    "titleLine1": "Piensa en tu",
    "titleHighlight": "bienestar",
    "subtitle": "Todo lo que necesitas para progresar en tu escalada.\n\nUn espacio pensado para ti, con escalada, entrenamiento y equipamiento especializado, acompañado por un equipo multidisciplinario.",
    "ctaPrimaryLabel": "Explorar servicios →",
    "ctaSecondaryLabel": "Conocer el centro"
  },
  "installations": {
    "eyebrow": "/ instalaciones",
    "title": "Un centro pensado para cada etapa.",
    "subtitle": "Un muro de escalada, zonas de entrenamiento funcional y especialistas deportivos — todo bajo un mismo techo en Isla de Maipo.",
    "instructions": "Pasa el cursor para pausar · Arrastra para navegar · Haz clic para ampliar"
  },
  "info": {
    "eyebrow": "/ información",
    "title": "Horarios y funcionamiento.",
    "openingHoursLabel": "Horario de apertura",
    "classScheduleLabel": "Horario de clases y entrenamientos",
    "ctaClasesLabel": "Clases de Escalada →",
    "ctaEntrenamientoLabel": "Entrenamientos Funcionales →",
    "ctaMuroLabel": "Muro de Escalada →"
  },
  "location": {
    "eyebrow": "/ ubicación",
    "title": "Gimnasio de escalada",
    "subtitlePrefix": "Estamos ubicados en",
    "subtitleSuffix": "— a pasos de la plaza de Armas. Contamos con bicicleteros al interior del recinto.",
    "ctaLabel": "Cómo llegar →"
  },
  "services": {
    "eyebrow": "/ servicios",
    "title": "Un centro pensado para acompañarte."
  }
};

const OPENING_HOURS_FULL = [
  [
    "Lunes a viernes",
    "07:30–22:00",
    "16:00–22:00"
  ],
  [
    "Sábado",
    "09:00–22:30",
    "Todo el día"
  ],
  [
    "Domingo",
    "09:00–16:00",
    "Todo el día"
  ],
  [
    "Festivos",
    "09:00–19:00",
    "Todo el día"
  ]
];

const CLASS_SCHEDULE = [
  {
    "time": "7:00–08:00",
    "mon": "Entrenamiento funcional",
    "tue": null,
    "wed": "Entrenamiento funcional",
    "thu": null,
    "fri": "Entrenamiento funcional"
  },
  {
    "time": "08:00–09:30",
    "mon": null,
    "tue": "Clase escalada adulto",
    "wed": null,
    "thu": "Clase escalada adulto",
    "fri": null
  },
  {
    "time": "17:30–18:30",
    "mon": "Clase escalada infantojuvenil",
    "tue": null,
    "wed": "Clase escalada infantojuvenil",
    "thu": null,
    "fri": "Clase escalada infantojuvenil"
  },
  {
    "time": "19:30–21:00",
    "mon": "Clase escalada adulto",
    "tue": "Entrenamiento funcional",
    "wed": "Clase escalada adulto",
    "thu": "Entrenamiento funcional",
    "fri": "Clase escalada adulto"
  }
];

const SERVICES_GRID = [
  {
    "id": "muro",
    "icon": "assets/icon-climbing.png",
    "title": "Muro de Escalada",
    "desc": "Rutas de boulder para todos los niveles, renovadas periódicamente.",
    "href": "muro-escalada.html"
  },
  {
    "id": "entrenamiento",
    "icon": "assets/icon-training.png",
    "title": "Entrenamiento Funcional",
    "desc": "Entrenamiento orientado a mejorar tu escalada, con horarios propios.",
    "href": "entrenamiento-funcional.html"
  },
  {
    "id": "training-boards",
    "icon": null,
    "title": "Training Boards",
    "desc": "(Próximamente) Escala, entrena y progresa con un sistema inteligente de luces y app que te permite elegir problemas, ajustar la dificultad y seguir tu progreso."
  },
  {
    "id": "especialidades",
    "icon": null,
    "title": "Especialidades Deportivas",
    "subitems": [
      {
        "label": "Kinesiología Deportiva",
        "href": "kinesiologia.html"
      },
      {
        "label": "Psicología Deportiva",
        "href": "psicologia-deportiva.html"
      },
      {
        "label": "Nutrición Deportiva",
        "href": "nutricion.html"
      }
    ]
  },
  {
    "id": "tienda",
    "icon": null,
    "title": "Tienda",
    "desc": "Todo lo que necesitas para tu próxima sesión de escalada. Revisa nuestro catálogo de productos y consulta disponibilidad en tienda.",
    "href": "tienda.html"
  }
];

const PAGE_CLASES_ESCALADA = {
  "title": "Clases de Escalada",
  "eyebrow": "/ clases de escalada · moment",
  "titleLine1": "Sube de nivel,",
  "titleLine2": "clase a clase.",
  "subtitle": "Clases grupales con instructores certificados. Aprende técnicas de escalada desde el primer día, sin importar tu nivel.",
  "items": [
    {
      "k": "4 clases al mes",
      "v": "$49.990"
    },
    {
      "k": "8 clases al mes",
      "v": "$88.990"
    },
    {
      "k": "12 clases al mes",
      "v": "$109.000"
    },
    {
      "k": "Clase de prueba",
      "v": "$15.000"
    }
  ],
  "benefit": "Ser alumno o alumna de Moment da acceso a múltiples beneficios, entre ellos descuentos en mensualidades, entrenamientos funcionales y marcas asociadas."
};

const PAGE_ENTRENAMIENTO_FUNCIONAL = {
  "title": "Entrenamiento Funcional",
  "eyebrow": "/ entrenamiento funcional · moment",
  "titleLine1": "Más fuerza,",
  "titleLine2": "mejor escalada.",
  "subtitle": "Entrenamientos funcionales orientados a mejorar en la escalada, con horarios propios dentro del centro.",
  "items": [
    {
      "k": "4 sesiones al mes",
      "v": "$65.000"
    },
    {
      "k": "8 sesiones al mes",
      "v": "$80.000"
    },
    {
      "k": "12 sesiones al mes",
      "v": "$110.000"
    },
    {
      "k": "Clase de prueba",
      "v": "$20.000"
    }
  ]
};

const PAGE_MURO_ESCALADA = {
  "title": "Muro de Escalada",
  "eyebrow": "/ muro de escalada · moment",
  "titleLine1": "Escala a tu",
  "titleLine2": "propio ritmo.",
  "subtitle": "Pases, tickets y mensualidades para nuestro muro indoor, con rutas de boulder renovadas periódicamente.",
  "blockExplanation": "El \"bloque alto\" es el horario de mayor demanda (columna de la derecha); el resto de las horas de apertura corresponde al \"bloque bajo\", con precios más bajos.",
  "pricing": [
    {
      "category": "General",
      "schedule": "Bloque alto",
      "entry": "$6.500",
      "tickets10": "$52.000",
      "monthly": "$65.000"
    },
    {
      "category": "General",
      "schedule": "Bloque bajo",
      "entry": "$5.000",
      "tickets10": "$40.000",
      "monthly": "$50.000"
    },
    {
      "category": "Estudiantes",
      "schedule": "Bloque alto",
      "entry": "$5.500",
      "tickets10": "$47.000",
      "monthly": "$59.000"
    },
    {
      "category": "Estudiante",
      "schedule": "Bloque bajo",
      "entry": "$3.500",
      "tickets10": "$36.000",
      "monthly": "$45.000"
    }
  ],
  "conditions": [
    "La calidad de estudiante se acredita con certificado de alumno regular vigente.",
    "Permanencia máxima 4 horas por ingreso diario.",
    "Tickets y mensualidades intransferibles, con 1 mes para hacer uso.",
    "El acceso incluye toda la instalación: zona de escalada, zona de entrenamiento y zona de cardio."
  ]
};

const PAGE_KINESIOLOGIA = {
  "title": "Kinesiología Deportiva",
  "eyebrow": "/ kinesiología deportiva · moment",
  "titleLine1": "Cuida el cuerpo",
  "titleLine2": "que te sostiene.",
  "subtitle": "Evaluación, rehabilitación y optimización del movimiento para deportistas y personas activas.",
  "notes": [
    "Atenciones realizadas por kinesiólogos deportivos.",
    "Reembolsable en isapres y seguros complementarios. Se emite boleta por sesión.",
    "Pago solo con efectivo o transferencia.",
    "Pacientes FONASA: consultar condiciones de atención."
  ],
  "sections": [
    {
      "title": "Evaluación",
      "items": [
        {
          "k": "Evaluación inicial (obligatoria)",
          "v": "$35.000"
        },
        {
          "k": "Reevaluación",
          "v": "$20.000"
        }
      ]
    },
    {
      "title": "Sesiones",
      "items": [
        {
          "k": "Sesión individual",
          "v": "$30.000"
        }
      ]
    },
    {
      "title": "Paquetes de sesiones",
      "subtitle": "Pago único — valor preferencial",
      "items": [
        {
          "k": "Pack 5 sesiones",
          "v": "$139.500",
          "note": "7% de descuento"
        },
        {
          "k": "Pack 8 sesiones",
          "v": "$216.000",
          "note": "10% de descuento"
        },
        {
          "k": "Pack 10 sesiones",
          "v": "$261.000",
          "note": "13% de descuento"
        }
      ]
    },
    {
      "title": "Recovery",
      "subtitle": "1 hora por sesión",
      "items": [
        {
          "k": "Recovery",
          "v": "$35.000",
          "note": "Masoterapia, punción seca y compresión en botas"
        }
      ]
    }
  ]
};

const PAGE_NUTRICION = {
  "title": "Nutrición Deportiva",
  "eyebrow": "/ nutrición deportiva · moment",
  "titleLine1": "Alimenta tu",
  "titleLine2": "rendimiento.",
  "subtitle": "Planes alimenticios pensados para complementar tu entrenamiento y tu progreso en la escalada.",
  "pendingLabel": "⏳ Contenido pendiente",
  "pendingParagraph": "Todavía no tenemos precios ni planes definidos para Nutrición Deportiva — esta página se completará más adelante. Mientras tanto, escríbenos por WhatsApp y te contamos los valores directamente.",
  "ctaLabel": "Consultar valores por WhatsApp"
};

const NOSOTROS_COPY = {
  "team": {
    "eyebrow": "/ equipo",
    "titlePrefix": "Profesionales que",
    "titleHighlight": "escuchan",
    "titleSuffix": "antes de tratar.",
    "subtitle": "Cada miembro tiene formación específica y trabaja en coordinación con las otras áreas.",
    "linkLabel": "Conoce más de nosotros →"
  },
  "media": {
    "eyebrow": "/ en medios",
    "title": "Lo que dicen de nosotros."
  },
  "mission": {
    "title": "Cuidar al deportista completo",
    "paragraph": "Ofrecer un servicio deportivo integral donde cada persona encuentre evaluación, rehabilitación, entrenamiento y acompañamiento psicológico en un solo lugar, con un equipo que trabaja de forma coordinada."
  },
  "vision": {
    "title": "Referente regional en bienestar deportivo",
    "paragraph": "Ser el centro deportivo de referencia en la Región Metropolitana sur, reconocido por la calidad de su atención, la innovación de sus programas y el impacto real en la comunidad activa de Isla de Maipo y alrededores."
  },
  "values": {
    "title": "Lo que nos mueve",
    "items": [
      {
        "term": "Integralidad",
        "rest": "— cuerpo y mente, siempre juntos."
      },
      {
        "term": "Cercanía",
        "rest": "— conocemos a cada persona por su nombre."
      },
      {
        "term": "Evidencia",
        "rest": "— decisiones basadas en evaluación, no en supuestos."
      },
      {
        "term": "Comunidad",
        "rest": "— el centro es de quienes lo usan."
      },
      {
        "term": "Movimiento",
        "rest": "— todo empieza cuando decides moverte."
      }
    ]
  },
  "history": {
    "title": "De una idea a un centro real.",
    "subtitle": "Moment nació con una convicción: que kinesiología, psicología, entrenamiento y escalada deberían compartir el mismo techo. No como servicios separados, sino como un sistema que trabaja en conjunto por el bienestar de cada persona.",
    "paragraph1": "En 2026 abrimos las puertas en Calle Cortes 41, Isla de Maipo, con las cuatro áreas ya funcionando desde el primer día. Kinesiología, psicología deportiva, entrenamiento & recovery y escalada — todo integrado, todo en un mismo espacio.",
    "paragraph2": "Somos un equipo multidisciplinario que cree que el rendimiento y el bienestar no se dividen: se construyen juntos.",
    "timeline": [
      {
        "year": "2026",
        "title": "Apertura del centro",
        "desc": "Cuatro áreas integradas desde el día uno: kinesiología, psicología, entrenamiento y escalada indoor."
      },
      {
        "year": "Hoy",
        "title": "Comunidad en crecimiento",
        "desc": "Tienda, eventos, atenciones semanales y una comunidad activa que ya es parte del centro."
      }
    ]
  },
  "whyMoment": {
    "eyebrow": "/ por qué Moment",
    "title": "Todo en un mismo lugar.",
    "stats": [
      {
        "number": "4",
        "label": "Áreas especializadas",
        "desc": "Kinesiología, psicología, entrenamiento y escalada bajo un mismo techo."
      },
      {
        "number": "2026",
        "label": "Año de apertura",
        "desc": "Abrimos con las 4 áreas integradas desde el primer día, en Isla de Maipo."
      },
      {
        "number": "1",
        "label": "Enfoque integral",
        "desc": "Cada área trabaja coordinada con las demás por tu bienestar completo."
      }
    ]
  }
};

const TEAM = [
  {
    "name": "Karinna Araneda",
    "role": "Kinesióloga Deportiva",
    "bio": "Amplia experiencia en rehabilitación y optimización del rendimiento atlético.",
    "linkedin": "https://www.linkedin.com/in/karinnaaraneda/",
    "photo": "assets/team-karinna.jpg"
  },
  {
    "name": "Jairo Pinto",
    "role": "Psicólogo Deportivo",
    "bio": "Experto en diseño de programas personalizados para el rendimiento psicológico.",
    "linkedin": "https://www.linkedin.com/in/jairopintosepulveda/",
    "photo": "assets/team-jairo.jpg"
  },
  {
    "name": "Miguel",
    "role": "Nutricionista Deportivo",
    "bio": "Planes alimenticios que potencian la salud y el rendimiento de atletas.",
    "linkedin": null,
    "photo": "assets/team-miguel.png"
  }
];

const CAROUSEL_ITEMS = [
  {
    "type": "image",
    "src": "assets/img_carrusel_1.jpeg",
    "label": "Muro de escalada"
  },
  {
    "type": "image",
    "src": "assets/img_carrusel_2.jpeg",
    "label": "Inauguración Moment"
  },
  {
    "type": "video",
    "src": "assets/video_carrusel_1.mp4",
    "label": "Sesión de entrenamiento"
  },
  {
    "type": "image",
    "src": "assets/img_carrusel_instalacion_muro.jpeg",
    "label": "Instalando el muro"
  },
  {
    "type": "image",
    "src": "assets/img_carrusel_comunidad_1.jpeg",
    "label": "Comunidad Moment"
  },
  {
    "type": "image",
    "src": "assets/img_carrusel_comunidad_2.jpeg",
    "label": "Team Moment escalando"
  }
];

const MEDIOS = [
  {
    "source": "Islita TV",
    "title": "Inauguración MOMENT",
    "youtubeId": "zjuSQSz3h2s",
    "thumb": "https://img.youtube.com/vi/zjuSQSz3h2s/hqdefault.jpg"
  },
  {
    "source": "Radio Origen",
    "title": "Entrevista MOMENT",
    "youtubeId": "RGQ14zBu2TA",
    "thumb": "https://img.youtube.com/vi/RGQ14zBu2TA/hqdefault.jpg"
  }
];

const SHOP = [
  {
    "name": "Magnesio Titan Mix 60g",
    "price": "$4.990",
    "category": "Magnesios",
    "desc": "Combinación 50/50 de polvo y roca para agarre óptimo. Sin químicos agresivos, libre de GMO.",
    "images": [
      "assets/productos/magnesio-mix-1.jpg",
      "assets/productos/magnesio-mix-2.jpg",
      "assets/productos/magnesio-mix-3.jpg"
    ]
  },
  {
    "name": "Magnesio Líquido 60ml",
    "price": "$4.990",
    "category": "Magnesios",
    "desc": "Seca el sudor al instante y mejora la adherencia. Con alcohol etanol 70% que desinfecta en cada uso.",
    "images": [
      "assets/productos/magnesio-liq60-1.jpg",
      "assets/productos/magnesio-liq60-2.jpg",
      "assets/productos/magnesio-liq60-3.jpg"
    ]
  },
  {
    "name": "Magnesio Líquido 250ml",
    "price": "$9.990",
    "category": "Magnesios",
    "desc": "Mismo rendimiento profesional en formato grande. Mayor duración por uso, ideal para entrenamientos frecuentes.",
    "images": [
      "assets/productos/magnesio-liq250-1.jpg",
      "assets/productos/magnesio-liq250-2.jpg",
      "assets/productos/magnesio-liq250-3.jpg"
    ]
  },
  {
    "name": "Bolsa de Magnesio Sloth",
    "price": "$25.000",
    "category": "Magnesera",
    "desc": "Abertura amplia estructurada, cierre con cordón y bolsillo con cremallera. Soporte para cepillo y forro de vellón interior.",
    "images": [
      "assets/productos/bolsa-sloth-1.webp",
      "assets/productos/bolsa-sloth-2.webp",
      "assets/productos/bolsa-sloth-3.webp",
      "assets/productos/bolsa-sloth-4.webp"
    ]
  },
  {
    "name": "Cepillo Regleta Escalada",
    "price": "$9.990",
    "category": "Cepillos",
    "desc": "Cerdas resistentes para limpiar agarres y presas. Devuelve la fricción natural de la roca o presa y mejora la adherencia.",
    "images": [
      "assets/productos/cepillo-1.jpg",
      "assets/productos/cepillo-2.jpg",
      "assets/productos/cepillo-3.jpg"
    ]
  },
  {
    "name": "Tape Prostick 3,8cm × 10mts",
    "price": "$7.990",
    "category": "Tape deportivo",
    "desc": "MicroPlaster + MaxGlue: transpirable, resistente al sudor y se rasga a mano. Para dedos, articulaciones y zonas de carga.",
    "images": [
      "assets/productos/tape-1.jpg",
      "assets/productos/tape-2.jpg",
      "assets/productos/tape-3.jpg"
    ]
  },
  {
    "name": "Pinza Power Gripper 4Grip",
    "price": "$44.990",
    "category": "Entrenamiento",
    "desc": "4 tipos de agarre para entrenar fuerza de pinza. Ideal para escalada y rehabilitación de dedos. Carga máx. 100 kg.",
    "images": [
      "assets/productos/grip-1.jpg",
      "assets/productos/grip-2.jpg",
      "assets/productos/grip-3.jpg"
    ]
  },
  {
    "name": "Tabla Titan Grip 4Grip",
    "price": "$24.990",
    "category": "Entrenamiento",
    "desc": "Regleta multitoma para tracción y suspensiones. 3 profundidades: 25mm, 15mm y 10mm. Resistencia 150 kg.",
    "images": [
      "assets/productos/tabla-1.jpg",
      "assets/productos/tabla-2.jpg",
      "assets/productos/tabla-3.jpg"
    ]
  },
  {
    "name": "Anillos Masajeadores",
    "price": "$1.990",
    "category": "Recuperación",
    "desc": "Estimulan la circulación y alivian tensión en dedos. Usados en acupuntura y rehabilitación de manos.",
    "images": [
      "assets/productos/anillos-1.jpg",
      "assets/productos/anillos-2.jpg",
      "assets/productos/anillos-3.jpg"
    ]
  }
];

const JOBS = [
  {
    "title": "Kinesiólogo/a Deportivo/a",
    "type": "Part-time",
    "desc": "Buscamos kinesiólogo/a con experiencia en rehabilitación deportiva para atender pacientes y diseñar planes de recuperación."
  },
  {
    "title": "Profesor/a de Escalada",
    "type": "Part-time",
    "desc": "Instructor/a de escalada con conocimiento en progresiones y planificación de clases grupales."
  }
];

const SHOP_COPY = {
  "eyebrow": "/ tienda",
  "title": "Equípate en Moment.",
  "subtitle": "Productos disponibles en el centro. Consulta disponibilidad y retira en Moment.",
  "slideCaption": "Desliza para ver más →",
  "footerCaption": "Productos disponibles en Moment · Consulta stock y retiro"
};

const JOBS_COPY = {
  "eyebrow": "/ trabaja con nosotros",
  "title": "Sé parte del equipo.",
  "subtitle": "Vacantes disponibles",
  "ctaLabel": "Enviar CV →",
  "spontaneousParagraph": "Si no contamos con vacantes de tu interés pero quieres ser parte del equipo, déjanos tu postulación y CV. Lo tendremos en cuenta para futuras oportunidades.",
  "spontaneousCtaLabel": "Enviar postulación espontánea →"
};

const CONTACT_COPY = {
  "eyebrow": "/ contacto",
  "title": "Hablemos.",
  "subtitle": "Escríbenos por cualquiera de estos medios y te respondemos a la brevedad."
};

const FOOTER_COPY = {
  "brandParagraph": "Centro de escalada en Isla de Maipo. Muro, entrenamiento funcional y especialidades deportivas para acompañar tu progreso."
};

Object.assign(window, {
  BRAND, TEAM, CAROUSEL_ITEMS, MEDIOS, SHOP, JOBS,
  OPENING_HOURS_FULL, CLASS_SCHEDULE, SERVICES_GRID,
  PAGE_CLASES_ESCALADA, PAGE_ENTRENAMIENTO_FUNCIONAL, PAGE_MURO_ESCALADA, PAGE_KINESIOLOGIA, PAGE_NUTRICION,
  HOME_COPY, NOSOTROS_COPY, SHOP_COPY, JOBS_COPY, CONTACT_COPY, FOOTER_COPY,
  WA_NUM, WA_PRETTY, waLink, waGeneralLink, waBuyLink, waReservarLink
});
