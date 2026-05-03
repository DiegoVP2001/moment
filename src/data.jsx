// ============ DATA ============
const BRAND = {
  name: 'Moment',
  tagline: 'Piensa en tu bienestar',
  phone: '+56 9 9892 8078',
  email: 'momentcentrodeportivo@gmail.com',
  address: 'Calle Cortes 41, Isla de Maipo',
  region: 'Región Metropolitana',
  instagram: 'moment.csd',
  hours: [
    ['Lun — Vie', '07:00 — 22:00'],
    ['Sábado',    '09:00 — 18:00'],
    ['Domingo',   '10:00 — 14:00'],
  ]
};

const WA_NUM = '56998928078';
function waLink(serviceTitle, itemName) {
  const msg = `¡Hola! Me gustaría saber la disponibilidad para agendar ${itemName} de ${serviceTitle}.`;
  return `https://wa.me/${WA_NUM}?text=${encodeURIComponent(msg)}`;
}
function waGeneralLink(serviceTitle) {
  const msg = `¡Hola! Me gustaría más información sobre ${serviceTitle}.`;
  return `https://wa.me/${WA_NUM}?text=${encodeURIComponent(msg)}`;
}

const SERVICES = [
  {
    id: 'kine',
    n: '01',
    title: 'Kinesiología Deportiva',
    icon: 'assets/icon-kinesiology.png',
    desc: 'Evaluación, rehabilitación y optimización del movimiento para deportistas y personas activas.',
    cta: 'Agendar evaluación',
    accent: 'teal',
    detail: 'Diagnóstico funcional, tratamiento manual y ejercicios específicos para recuperar lesiones y mejorar el rendimiento. Los packs incluyen seguimiento progresivo y reevaluaciones intermedias para ajustar la carga y medir avances.',
    items: [
      { k: 'Evaluación inicial', v: '$35.000' },
      { k: 'Reevaluación',       v: '$20.000' },
      { k: 'Sesión individual',  v: '$30.000' },
      { k: 'Pack 5 sesiones',    v: '$140.000' },
      { k: 'Pack 8 sesiones',    v: '$215.000' },
      { k: 'Pack 10 sesiones',   v: '$260.000' },
    ],
  },
  {
    id: 'psico',
    n: '02',
    title: 'Psicología Deportiva',
    icon: 'assets/icon-psychology.png',
    desc: 'Programas personalizados para rendimiento mental, manejo de presión y foco competitivo.',
    cta: 'Definir objetivos',
    accent: 'blue',
    detail: 'Trabajo individual orientado a objetivos: manejo de ansiedad competitiva, concentración, visualización y recuperación post-competencia. El Programa Base cubre fundamentos; Pro y Alto Rendimiento suman sesiones y acompañamiento en competencia.',
    items: [
      { k: 'Evaluación inicial',  v: '$20.000' },
      { k: 'Sesión individual',   v: '$30.000' },
      { k: 'Programa Base',       v: '$110.500' },
      { k: 'Programa Pro',        v: '$180.000' },
      { k: 'Alto Rendimiento',    v: '$270.000' },
    ],
  },
  {
    id: 'train',
    n: '03',
    title: 'Entrenamiento & Recovery',
    icon: 'assets/icon-training.png',
    desc: 'Planes de entrenamiento personalizado, masoterapia, compresión y evaluación VO2.',
    cta: 'Ver planes',
    accent: 'ink',
    detail: 'Planes mensuales con rutina personalizada según objetivo y frecuencia. Complementa con masoterapia, terapia de compresión para recovery y evaluación VO2 para medir capacidad aeróbica y calibrar cargas.',
    items: [
      { k: 'Plan 1 — 2 sesiones/sem',  v: '$90.000' },
      { k: 'Plan 2 — 3 sesiones/sem',  v: '$130.000' },
      { k: 'Plan 3 — ilimitado',       v: '$170.000' },
      { k: 'Masoterapia',              v: '$28.000' },
      { k: 'Compresión (Recovery)',    v: '$15.000' },
      { k: 'Evaluación VO2',           v: '$45.000' },
    ],
  },
  {
    id: 'climb',
    n: '04',
    title: 'Escalada · Climbing Wall',
    icon: 'assets/icon-climbing.png',
    desc: 'Pases, clases grupales y bautizos de escalada en nuestro muro dedicado.',
    cta: 'Reservar sesión',
    accent: 'pink',
    detail: 'Muro de escalada indoor con rutas renovadas periódicamente. El pase diario es libre; los mensuales/semestrales/anuales dan acceso ilimitado. Clases grupales y bautizos incluyen arnés, instructor y técnicas básicas de seguridad.',
    items: [
      { k: 'Pase diario',        v: '$8.000' },
      { k: 'Mensual',            v: '$38.000' },
      { k: 'Semestral',          v: '$180.000' },
      { k: 'Anual',              v: '$320.000' },
      { k: 'Clase grupal',       v: '$12.000' },
      { k: 'Bautizo escalada',   v: '$15.000' },
    ],
  },
];

const TEAM = [
  {
    name: 'Karinna Araneda',
    role: 'Kinesióloga Deportiva',
    bio: 'Amplia experiencia en rehabilitación y optimización del rendimiento atlético.',
    photo: 'assets/team-karinna.jpg',
  },
  {
    name: 'Jairo Pinto',
    role: 'Psicólogo Deportivo',
    bio: 'Experto en diseño de programas personalizados para el rendimiento psicológico.',
    photo: 'assets/team-jairo.jpg',
  },
  {
    name: 'Miguel',
    role: 'Nutricionista Deportivo',
    bio: 'Planes alimenticios que potencian la salud y el rendimiento de atletas.',
    photo: 'assets/team-miguel.png',
  },
];

const BLOG = [
  { tag: 'Recovery', title: 'Cómo la compresión acelera tu recuperación post-entrenamiento', read: '4 min' },
  { tag: 'Mental',   title: 'Tres rutinas de foco antes de una competencia clave',             read: '6 min' },
  { tag: 'Escalada', title: 'Guía para tu primera sesión en muro: lo que nadie te cuenta',     read: '5 min' },
];

const GALLERY_CAPTIONS = [
  'Sala de evaluación',
  'Muro de escalada · 8m',
  'Zona cardio & VO2',
  'Camilla de kinesiología',
  'Espacio recovery',
  'Sala multifuncional',
];

Object.assign(window, { BRAND, SERVICES, TEAM, BLOG, GALLERY_CAPTIONS, waLink, waGeneralLink, WA_NUM });
