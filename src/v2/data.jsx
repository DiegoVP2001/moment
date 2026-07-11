// ============ DATA V2 ============
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

const BRAND = {
  name: 'Moment',
  tagline: 'Piensa en tu bienestar',
  phone: WA_PRETTY,
  email: 'momentcentrodeportivo@gmail.com',
  address: 'Calle Cortes 41, Isla de Maipo',
  region: 'Región Metropolitana',
  instagram: 'moment.csd',
  instagramUrl: 'https://www.instagram.com/moment.csd/',
  hours: [
    ['Lun — Vie', '07:30 — 22:00'],
    ['Sábado',    '09:00 — 22:30'],
    ['Domingo',   '09:00 — 16:00'],
    ['Festivos',  '09:00 — 19:00'],
  ]
};

const SERVICES = [
  {
    id: 'kine', n: '01',
    title: 'Kinesiología Deportiva',
    icon: 'assets/icon-kinesiology.png',
    desc: 'Evaluación, rehabilitación y optimización del movimiento para deportistas y personas activas.',
    cta: 'Agendar evaluación',
    accent: 'teal',
    detail: 'Diagnóstico funcional, tratamiento manual y ejercicios específicos para recuperar lesiones y mejorar el rendimiento. Los packs permiten acceso a valor preferencial y seguimiento continuo del proceso.',
    items: [
      { k: 'Evaluación inicial',  v: '$35.000' },
      { k: 'Sesión individual',   v: '$30.000' },
      { k: 'Pack 5 sesiones',     v: '$139.500' },
      { k: 'Pack 10 sesiones',    v: '$261.000' },
    ],
    fullDetail: {
      notes: [
        'Atenciones realizadas por kinesiólogos deportivos.',
        'Reembolsable en isapres y seguros complementarios. Se emite boleta por sesión.',
        'Pago solo con efectivo o transferencia.',
        'Pacientes FONASA: consultar condiciones de atención.',
      ],
      sections: [
        {
          title: 'Evaluación',
          items: [
            { k: 'Evaluación inicial (obligatoria)', v: '$35.000' },
            { k: 'Reevaluación', v: '$20.000' },
          ],
        },
        {
          title: 'Sesiones',
          items: [
            { k: 'Sesión individual', v: '$30.000' },
          ],
        },
        {
          title: 'Paquetes de sesiones',
          subtitle: 'Pago único — valor preferencial',
          items: [
            { k: 'Pack 5 sesiones', v: '$139.500', note: '7% de descuento' },
            { k: 'Pack 8 sesiones', v: '$216.000', note: '10% de descuento' },
            { k: 'Pack 10 sesiones', v: '$261.000', note: '13% de descuento' },
          ],
        },
      ],
    },
  },
  {
    id: 'psico', n: '02',
    title: 'Psicología Deportiva',
    icon: 'assets/icon-psychology.png',
    desc: 'Trabajo psicológico especializado para deportistas, entrenadores, padres y equipos. Concentración, ansiedad, motivación, autoconfianza y 9 áreas de intervención aplicadas al deporte.',
    cta: 'Consultar disponibilidad',
    accent: 'blue',
    detail: 'Intervención en 9 áreas: concentración, motivación, autoconfianza, fortaleza mental, activación, visualización, autohabla, retorno tras lesión y cohesión de equipo. Sesiones individuales y 3 programas de acompañamiento mensual (desde $115.000). Atención a deportistas, entrenadores, padres y organizaciones.',
    items: [
      { k: 'Evaluación inicial',         v: '$25.000' },
      { k: 'Sesión individual',          v: '$30.000' },
      { k: 'Evaluación y Bases',         v: '$115.000/mes' },
      { k: 'Intervención en Competencia', v: '$300.000/mes' },
    ],
    fullDetail: {
      notes: [
        'Modalidad presencial u online.',
        'Duración por sesión: 45 a 55 minutos.',
        'Los valores con precios visibles corresponden exclusivamente a deportistas individuales.',
        'Para entrenadores, equipos y organizaciones: consultar directamente.',
      ],
      sections: [
        {
          title: 'Evaluación y sesiones individuales',
          items: [
            { k: 'Evaluación inicial', v: '$25.000', note: 'Análisis del contexto deportivo, objetivos y recomendaciones iniciales' },
            { k: 'Sesión individual', v: '$30.000', note: 'Intervención focalizada en necesidad específica' },
          ],
        },
        {
          title: 'Programas de acompañamiento mensual',
          items: [
            { k: 'Evaluación y Bases', v: '$115.000/mes', note: 'Hasta 4 sesiones — inicio del proceso psicológico deportivo' },
            { k: 'Desarrollo Psicológico', v: '$210.000/mes', note: 'Hasta 8 sesiones — plan progresivo + seguimiento entre sesiones' },
            { k: 'Intervención en Competencia', v: '$300.000/mes', note: 'Hasta 12 sesiones — rutinas precompetitivas, control de presión y observaciones' },
          ],
        },
      ],
    },
  },
  {
    id: 'train', n: '03',
    title: 'Entrenamiento & Recovery',
    icon: 'assets/icon-training.png',
    desc: 'Planes de entrenamiento personalizado, recovery con masoterapia y compresión, y evaluación cardiovascular.',
    cta: 'Ver planes',
    accent: 'ink',
    detail: 'Trabajamos desde las ciencias del deporte integrando entrenamiento y kinesiología. Planes individuales y grupales. Recovery con masoterapia, electropunción y compresión neumática.',
    items: [
      { k: 'Plan Inicio (1 ses + 1 acceso/sem)', v: '$89.000/mes' },
      { k: 'Plan 2 (2 ses + 2 accesos/sem)',     v: '$200.000/mes' },
      { k: 'Recovery Moment (60 min)',            v: '$35.000' },
      { k: 'Evaluación VO2',                      v: '$20.000' },
    ],
    fullDetail: {
      notes: [
        'Evaluación inicial obligatoria: $35.000 · Reevaluación: $20.000.',
        'Cualquier método de pago.',
      ],
      sections: [
        {
          title: 'Entrenamiento personalizado',
          subtitle: 'Guiado por kinesióloga deportiva — planes mensuales',
          items: [
            { k: 'Plan Inicio', v: '$89.000/mes', note: '1 sesión + 1 acceso al gym por semana' },
            { k: 'Plan 1', v: '$120.000/mes', note: '1 sesión + 2 accesos al gym por semana' },
            { k: 'Plan 2', v: '$200.000/mes', note: '2 sesiones + 2 accesos al gym por semana' },
            { k: 'Plan 3', v: '$280.000/mes', note: '3 sesiones + acceso libre al gym + 1 pase acompañante' },
          ],
        },
        {
          title: 'Small Group',
          subtitle: 'Entrenamiento grupal guiado · máx. 3 personas',
          items: [
            { k: '1 vez por semana', v: '$55.000/mes' },
            { k: '2 veces por semana', v: '$85.000/mes' },
            { k: '3 veces por semana', v: '$110.000/mes' },
          ],
        },
        {
          title: 'Recovery',
          subtitle: '60 minutos por sesión',
          items: [
            { k: 'Recovery Moment', v: '$35.000', note: 'Masoterapia + compresión neumática (Terapress)' },
            { k: 'Recovery Pro', v: '$45.000', note: 'Masoterapia + electropunción + compresión neumática' },
            { k: 'Pack 2 sesiones/mes', v: '$68.000', note: '$34.000 por sesión' },
            { k: 'Pack 4 sesiones/mes', v: '$130.000', note: '$32.500 por sesión' },
          ],
        },
        {
          title: 'Entrenamiento cardiovascular',
          items: [
            { k: 'Evaluación VO2 (indirecto)', v: '$20.000', note: 'Test + interpretación de resultados' },
            { k: 'Plan Cardiovascular', v: '$65.000', note: 'Planificación basada en FTP para runners y ciclistas' },
            { k: 'Plan Cardiovascular + VO2', v: '$75.000' },
          ],
        },
      ],
    },
  },
  {
    id: 'climb', n: '04',
    title: 'Escalada · Climbing Wall',
    icon: 'assets/icon-climbing.png',
    desc: 'Pases, clases y bautizos de escalada en nuestro muro indoor con rutas renovadas periódicamente.',
    cta: 'Reservar sesión',
    accent: 'pink',
    detail: 'Muro indoor con rutas para todos los niveles. Horario bajo (L–V 7:30–16:00) y horario alto (16:00–22:00; fines de semana y festivos). Planes mensuales y semestrales con acceso libre. Clases con instructor, arnés incluido.',
    items: [
      { k: 'Pase diario adulto',  v: 'desde $5.000' },
      { k: 'Plan mensual adulto', v: 'desde $45.000' },
      { k: 'Clase prueba',        v: '$12.000' },
      { k: 'Bautizo de escalada', v: '$15.000' },
    ],
    fullDetail: {
      notes: [
        'Arriendo de zapatillas de escalada: $2.000.',
        'Horario bajo: lunes a viernes 7:30–16:00 · Horario alto: lunes a viernes 16:00–22:00; sábados, domingos y festivos todo el día.',
        'Horarios boulder: Sáb 9:00–22:30 · Dom 9:00–16:00 · Festivos 9:00–19:00.',
        'Comunidad Moment: misma tarifa que menores de 22 en planes.',
      ],
      sections: [
        {
          title: 'Pase diario',
          items: [
            { k: 'Adulto — horario bajo', v: '$5.000' },
            { k: 'Adulto — horario alto', v: '$6.500' },
            { k: 'Menor de 22 / Comunidad Moment — horario bajo', v: '$3.500' },
            { k: 'Menor de 22 / Comunidad Moment — horario alto', v: '$4.500' },
          ],
        },
        {
          title: 'Pack de pases',
          subtitle: 'Duración 1 mes',
          items: [
            { k: '5 pases', v: '$22.500', note: '$4.500 por pase' },
            { k: '10 pases', v: '$40.000', note: '$4.000 por pase' },
          ],
        },
        {
          title: 'Plan mensual (30 días)',
          items: [
            { k: 'Adulto — horario bajo', v: '$45.000' },
            { k: 'Adulto — horario alto', v: '$65.000' },
            { k: 'Adulto — full', v: '$80.000' },
            { k: 'Menor / Comunidad Moment — horario bajo', v: '$33.500' },
            { k: 'Menor / Comunidad Moment — horario alto', v: '$49.000' },
            { k: 'Menor / Comunidad Moment — full', v: '$60.000' },
          ],
        },
        {
          title: 'Plan semestral (6 meses)',
          items: [
            { k: 'Adulto — horario bajo', v: '$230.000' },
            { k: 'Adulto — horario alto', v: '$360.000' },
            { k: 'Adulto — full', v: '$400.000' },
            { k: 'Menor / Comunidad Moment — horario bajo', v: '$184.000' },
            { k: 'Menor / Comunidad Moment — horario alto', v: '$288.000' },
            { k: 'Menor / Comunidad Moment — full', v: '$320.000' },
          ],
        },
        {
          title: 'Clases mensuales',
          subtitle: 'Con instructor — arnés incluido · 10% dcto. menores de 22 y Comunidad Moment · 10% extra al 2º hermano/a (NNA)',
          items: [
            { k: '4 clases al mes', v: '$49.900' },
            { k: '8 clases al mes', v: '$79.900' },
            { k: '12 clases al mes', v: '$109.000' },
            { k: 'Clase prueba', v: '$12.000' },
            { k: 'Bautizo de escalada (adulto)', v: '$15.000' },
          ],
        },
        {
          title: 'Horarios de clases',
          subtitle: 'Actualizados junio 2026',
          items: [
            { k: 'Adultos — Lu · Mi · Vi', v: '7:30–9:30 · 9:30–11:30 · 19:45–21:45' },
            { k: 'Adultos — Ma · Ju', v: '17:30–19:30' },
            { k: 'Niños/as 5–8 años — Ma · Ju', v: '17:00–18:30' },
            { k: 'Niños/as 5–8 años — Sáb', v: '10:00–11:30' },
            { k: 'Niños/as 9–14 años — Lu · Mi · Vi', v: '17:00–18:30' },
            { k: 'Niños/as 9–14 años — Sáb', v: '11:45–13:15' },
          ],
        },
      ],
    },
  },
];

const TEAM = [
  {
    name: 'Karinna Araneda', role: 'Kinesióloga Deportiva',
    bio: 'Amplia experiencia en rehabilitación y optimización del rendimiento atlético.',
    photo: 'assets/team-karinna.jpg',
    linkedin: 'https://www.linkedin.com/in/karinnaaraneda/',
  },
  {
    name: 'Jairo Pinto', role: 'Psicólogo Deportivo',
    bio: 'Experto en diseño de programas personalizados para el rendimiento psicológico.',
    photo: 'assets/team-jairo.jpg',
    linkedin: 'https://www.linkedin.com/in/jairopintosepulveda/',
  },
  {
    name: 'Miguel', role: 'Nutricionista Deportivo',
    bio: 'Planes alimenticios que potencian la salud y el rendimiento de atletas.',
    photo: 'assets/team-miguel.png',
    linkedin: null,
  },
];

const CAROUSEL_ITEMS = [
  { type: 'image', src: 'assets/img_carrusel_1.jpeg', label: 'Muro de escalada' },
  { type: 'image', src: 'assets/img_carrusel_2.jpeg', label: 'Inauguración Moment' },
  { type: 'video', src: 'assets/video_carrusel_1.mp4', label: 'Sesión de entrenamiento' },
  { type: 'image', src: 'assets/img_carrusel_1.jpeg', label: 'Zona boulder' },
  { type: 'image', src: 'assets/img_carrusel_2.jpeg', label: 'Comunidad Moment' },
  { type: 'video', src: 'assets/video_carrusel_1.mp4', label: 'Recovery en acción' },
];

const MEDIOS = [
  {
    source: 'Islita TV', title: 'Inauguración MOMENT',
    youtubeId: 'zjuSQSz3h2s',
    thumb: 'https://img.youtube.com/vi/zjuSQSz3h2s/hqdefault.jpg',
  },
  {
    source: 'Radio Origen', title: 'Entrevista MOMENT',
    youtubeId: 'RGQ14zBu2TA',
    thumb: 'https://img.youtube.com/vi/RGQ14zBu2TA/hqdefault.jpg',
  },
];

const SHOP = [
  // --- Magnesios ---
  {
    name: 'Magnesio Titan Mix 60g', price: '$4.990', category: 'Magnesios',
    desc: 'Combinación 50/50 de polvo y roca para agarre óptimo. Sin químicos agresivos, libre de GMO.',
    images: ['assets/productos/magnesio-mix-1.jpg','assets/productos/magnesio-mix-2.jpg','assets/productos/magnesio-mix-3.jpg'],
  },
  {
    name: 'Magnesio Líquido 60ml', price: '$4.990', category: 'Magnesios',
    desc: 'Seca el sudor al instante y mejora la adherencia. Con alcohol etanol 70% que desinfecta en cada uso.',
    images: ['assets/productos/magnesio-liq60-1.jpg','assets/productos/magnesio-liq60-2.jpg','assets/productos/magnesio-liq60-3.jpg'],
  },
  {
    name: 'Magnesio Líquido 250ml', price: '$9.990', category: 'Magnesios',
    desc: 'Mismo rendimiento profesional en formato grande. Mayor duración por uso, ideal para entrenamientos frecuentes.',
    images: ['assets/productos/magnesio-liq250-1.jpg','assets/productos/magnesio-liq250-2.jpg','assets/productos/magnesio-liq250-3.jpg'],
  },
  // --- Magnesera ---
  {
    name: 'Bolsa de Magnesio Sloth', price: '$25.000', category: 'Magnesera',
    desc: 'Abertura amplia estructurada, cierre con cordón y bolsillo con cremallera. Soporte para cepillo y forro de vellón interior.',
    images: ['assets/productos/bolsa-sloth-1.webp','assets/productos/bolsa-sloth-2.webp','assets/productos/bolsa-sloth-3.webp','assets/productos/bolsa-sloth-4.webp'],
  },
  // --- Cepillos ---
  {
    name: 'Cepillo Regleta Escalada', price: '$9.990', category: 'Cepillos',
    desc: 'Cerdas resistentes para limpiar agarres y presas. Devuelve la fricción natural de la roca o presa y mejora la adherencia.',
    images: ['assets/productos/cepillo-1.jpg','assets/productos/cepillo-2.jpg','assets/productos/cepillo-3.jpg'],
  },
  // --- Tape deportivo ---
  {
    name: 'Tape Prostick 3,8cm × 10mts', price: '$7.990', category: 'Tape deportivo',
    desc: 'MicroPlaster + MaxGlue: transpirable, resistente al sudor y se rasga a mano. Para dedos, articulaciones y zonas de carga.',
    images: ['assets/productos/tape-1.jpg','assets/productos/tape-2.jpg','assets/productos/tape-3.jpg'],
  },
  // --- Entrenamiento ---
  {
    name: 'Pinza Power Gripper 4Grip', price: '$44.990', category: 'Entrenamiento',
    desc: '4 tipos de agarre para entrenar fuerza de pinza. Ideal para escalada y rehabilitación de dedos. Carga máx. 100 kg.',
    images: ['assets/productos/grip-1.jpg','assets/productos/grip-2.jpg','assets/productos/grip-3.jpg'],
  },
  {
    name: 'Tabla Titan Grip 4Grip', price: '$24.990', category: 'Entrenamiento',
    desc: 'Regleta multitoma para tracción y suspensiones. 3 profundidades: 25mm, 15mm y 10mm. Resistencia 150 kg.',
    images: ['assets/productos/tabla-1.jpg','assets/productos/tabla-2.jpg','assets/productos/tabla-3.jpg'],
  },
  // --- Recuperación ---
  {
    name: 'Anillos Masajeadores', price: '$1.990', category: 'Recuperación',
    desc: 'Estimulan la circulación y alivian tensión en dedos. Usados en acupuntura y rehabilitación de manos.',
    images: ['assets/productos/anillos-1.jpg','assets/productos/anillos-2.jpg','assets/productos/anillos-3.jpg'],
  },
];

const JOBS = [
  { title: 'Kinesiólogo/a Deportivo/a', type: 'Part-time', desc: 'Buscamos kinesiólogo/a con experiencia en rehabilitación deportiva para atender pacientes y diseñar planes de recuperación.' },
  { title: 'Profesor/a de Calistenia', type: 'Part-time', desc: 'Instructor/a de calistenia con conocimiento en progresiones de fuerza y planificación de clases grupales.' },
];

Object.assign(window, {
  BRAND, SERVICES, TEAM, CAROUSEL_ITEMS, MEDIOS, SHOP, JOBS,
  WA_NUM, WA_PRETTY, waLink, waGeneralLink, waBuyLink
});
