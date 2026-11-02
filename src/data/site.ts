/* =========================================================
   Contenido editable de la web de Enfocados.
   Todo lo que cambia con frecuencia (teléfonos, promociones,
   eventos) se edita aquí, sin tocar el diseño.
   ========================================================= */

export const negocio = {
  nombre: 'Centro Psicológico Integral Enfocados',
  nombreCorto: 'Enfocados',
  lema: 'Con amor, ciencia y dedicación',
  frase: 'Acompañamos a cada niño en su camino de aprendizaje y desarrollo',
  firma: 'Enfocados, creciendo juntos',
  descripcion:
    'Centro psicológico integral con servicios especializados para bebés, niños, adolescentes y adultos en Comas y Los Olivos.',
  publico: ['Bebés', 'Niños', 'Adolescentes', 'Adultos'],
  aniosCumplidos: 2,
  facebook: 'https://www.facebook.com/profile.php?id=61567496570659',
};

/* ---------- Medición de conversiones (opcional) ----------
   Pegar los IDs para activar Google Analytics 4 y/o Meta Pixel.
   Cada clic en WhatsApp se registra como evento de contacto. */
export const analitica = {
  ga4: '', // ej. 'G-XXXXXXXXXX'
  metaPixel: '', // ej. '123456789012345'
};

export type SedeId = 'comas' | 'olivos';

export interface Sede {
  id: SedeId;
  nombre: string;
  distrito: string;
  /** Formato internacional sin "+" ni espacios */
  telefono: string;
  /** PENDIENTE: completar con la dirección exacta */
  direccion?: string;
  /** PENDIENTE: completar con el horario de atención */
  horario?: string;
  /** URL "embed" de Google Maps (Compartir → Insertar un mapa) */
  mapaEmbed?: string;
}

export const sedes: Record<SedeId, Sede> = {
  comas: {
    id: 'comas',
    nombre: 'Sede Comas',
    distrito: 'Comas',
    // PENDIENTE: confirmar. La portada de Facebook dice 992 259 335,
    // pero el WhatsApp registrado en la página es 992 259 535.
    telefono: '51992259535',
  },
  olivos: {
    id: 'olivos',
    nombre: 'Sede Los Olivos',
    distrito: 'Los Olivos',
    telefono: '51963306027',
  },
};

export const sedePrincipal: SedeId = 'comas';

export const formatPhone = (n: string) =>
  n.replace(/^51/, '').replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3');

export const waUrl = (msg: string, sede: SedeId = sedePrincipal) =>
  `https://wa.me/${sedes[sede].telefono}?text=${encodeURIComponent(msg)}`;

export const terapias = [
  { nombre: 'Psicología', icono: 'smile', color: 'pink', texto: 'Acompañamiento emocional y conductual para entender lo que siente y vive cada paciente.' },
  { nombre: 'Neuropsicología', icono: 'puzzle', color: 'blue', texto: 'Evaluación y estimulación de funciones como la atención, la memoria y el razonamiento.' },
  { nombre: 'Neurología', icono: 'pulse', color: 'mint', texto: 'Atención especializada del sistema nervioso como parte del abordaje integral.' },
  { nombre: 'Terapia de lenguaje', icono: 'chat', color: 'orange', texto: 'Apoyo en el habla, la comprensión y la comunicación para expresarse con confianza.' },
  { nombre: 'Terapia ocupacional', icono: 'hand', color: 'violet', texto: 'Desarrollo de habilidades para la autonomía en las actividades del día a día.' },
  { nombre: 'Terapia de aprendizaje', icono: 'book', color: 'mint', texto: 'Estrategias para fortalecer la lectura, la escritura, el cálculo y los hábitos de estudio.' },
  { nombre: 'Terapia física', icono: 'run', color: 'pink', texto: 'Trabajo de la motricidad, la postura y el movimiento según cada etapa.' },
  { nombre: 'Terapia de conducta', icono: 'star', color: 'yellow-dark', texto: 'Herramientas para la regulación de la conducta, en casa y en el colegio.' },
  { nombre: 'Terapia sensorial', icono: 'waves', color: 'blue', texto: 'Ayudamos a procesar e integrar los estímulos del entorno de forma adecuada.' },
] as const;

/* ---------- Promoción vigente ----------
   Se oculta sola al pasar la fecha `hasta` (se revisa al compilar
   y también en el navegador del visitante). */
export const promocion = {
  activa: true,
  etiqueta: '¡Segundo aniversario!',
  titulo: 'Promociones especiales de noviembre',
  bajada: 'Celebramos 2 años creciendo junto a ustedes con paquetes de sesiones por tiempo limitado.',
  hasta: '2026-11-30T23:59:59-05:00',
  paquetes: [
    { sesiones: 8, frecuencia: '2 veces por semana', precio: 220, color: 'mint' },
    { sesiones: 12, frecuencia: '3 veces por semana', precio: 300, color: 'blue' },
    { sesiones: 16, frecuencia: '4 veces por semana', precio: 400, color: 'orange' },
    { sesiones: 20, frecuencia: '5 veces por semana', precio: 500, color: 'violet' },
  ],
  extra: {
    titulo: '¡Compra y gana!',
    texto: 'Por cada paquete adquirido recibe tus <strong>tickets de la suerte</strong> para participar en nuestro sorteo de aniversario.',
  },
  nota: 'Promoción válida durante noviembre en las sedes de Comas y Los Olivos. Consulta las condiciones por WhatsApp.',
};

export const promoVigente = () => promocion.activa && Date.now() < Date.parse(promocion.hasta);

/* ---------- Novedades y eventos ---------- */
export const novedades = [
  { etiqueta: 'Evento', fecha: 'Octubre', titulo: '¡Celebramos Halloween!', texto: 'Nuestros pequeños llegaron disfrazados y se llevaron un recuerdo fotográfico muy especial.', icono: 'star', fondo: 'violet' },
  { etiqueta: 'Aniversario', fecha: 'Noviembre', titulo: 'Cumplimos 2 años', texto: 'Celebramos con promociones especiales y un sorteo para las familias que confían en nosotros.', icono: 'gift', fondo: 'pink' },
  { etiqueta: 'Próximamente', fecha: 'Muy pronto', titulo: 'Próximos eventos', texto: 'Síguenos en Facebook para enterarte primero de nuestros talleres, campañas y actividades.', icono: 'calendar', fondo: 'mint', enlace: { texto: 'Ir a Facebook', url: negocio.facebook } },
];

/* ---------- Preguntas frecuentes ----------
   Solo con información confirmada. Agregar más cuando el centro
   confirme horarios, duración de sesiones, medios de pago, etc. */
export const preguntas = [
  { p: '¿A quiénes atienden?', r: 'Brindamos servicios especializados para bebés, niños, adolescentes y adultos.' },
  { p: '¿Cómo agendo una evaluación?', r: 'Escríbenos por WhatsApp a la sede de tu preferencia o completa el formulario de esta página. Te responderemos para coordinar la fecha.' },
  { p: '¿Dónde se encuentran?', r: 'Contamos con dos sedes: una en Comas y otra en Los Olivos. Puedes elegir la que te quede más cerca.' },
  { p: '¿Qué terapias ofrecen?', r: 'Psicología, neuropsicología, neurología, terapia de lenguaje, ocupacional, de aprendizaje, física, de conducta y sensorial.' },
  { p: 'No sé qué terapia necesita mi hijo, ¿pueden orientarme?', r: 'Sí. Cuéntanos tu caso por WhatsApp y te orientaremos para empezar con una evaluación.' },
  { p: '¿Tienen promociones?', r: 'Sí, publicamos promociones y paquetes de sesiones en fechas especiales. Revisa la sección de promociones o síguenos en Facebook.' },
];
