/* =========================================================
   Enfocados — comportamiento de la web
   ========================================================= */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

// Header con sombra al hacer scroll
const header = document.getElementById('header');
const onScroll = () => header?.classList.toggle('is-scrolled', window.scrollY > 10);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// Menú móvil
const nav = document.getElementById('nav');
const menuBtn = document.getElementById('menuBtn');
const setMenu = (open: boolean) => {
  if (!nav || !menuBtn) return;
  nav.classList.toggle('is-open', open);
  menuBtn.setAttribute('aria-expanded', String(open));
  menuBtn.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  menuBtn.querySelector('use')?.setAttribute('href', open ? '#i-close' : '#i-menu');
};
menuBtn?.addEventListener('click', () => setMenu(!nav?.classList.contains('is-open')));
nav?.addEventListener('click', (e) => {
  if ((e.target as HTMLElement).closest('a')) setMenu(false);
});

// WhatsApp flotante con selector de sede
const fabBtn = document.getElementById('fabBtn');
const fabPanel = document.getElementById('fabPanel');
const setFab = (open: boolean) => {
  if (!fabBtn || !fabPanel) return;
  fabPanel.hidden = !open;
  fabBtn.setAttribute('aria-expanded', String(open));
};
fabBtn?.addEventListener('click', () => setFab(!!fabPanel?.hidden));
document.addEventListener('click', (e) => {
  if (!(e.target as HTMLElement).closest('#fab')) setFab(false);
});
document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  setFab(false);
  setMenu(false);
});

// Medición: cada contacto por WhatsApp se registra como conversión
const trackContact = (origen: string) => {
  window.gtag?.('event', 'contacto_whatsapp', { origen });
  window.fbq?.('track', 'Contact', { origen });
};
document.addEventListener('click', (e) => {
  const link = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="https://wa.me/"]');
  if (link) trackContact(link.dataset.origen ?? 'web');
});

// La promoción se oculta sola cuando vence, aunque la web no se haya vuelto a publicar
document.querySelectorAll<HTMLElement>('[data-promo-expira]').forEach((el) => {
  if (Date.now() > Date.parse(el.dataset.promoExpira ?? '')) el.remove();
});

// Formulario → mensaje de WhatsApp
const form = document.getElementById('contactForm') as HTMLFormElement | null;
const formError = document.getElementById('formError');
if (form && formError) {
  const sedes: Record<string, { nombre: string; telefono: string }> = JSON.parse(form.dataset.sedes ?? '{}');
  const field = (name: string) => form.elements.namedItem(name) as HTMLInputElement;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = field('nombre');
    const paciente = field('paciente');
    const acepto = field('acepto');

    const checks: [HTMLInputElement, boolean, string][] = [
      [nombre, !!nombre.value.trim(), 'Escribe tu nombre.'],
      [paciente, !!paciente.value, 'Indica para quién es la consulta.'],
      [acepto, acepto.checked, 'Acepta la política de privacidad para continuar.'],
    ];
    checks.forEach(([el, ok]) => el.setAttribute('aria-invalid', String(!ok)));
    const fallo = checks.find(([, ok]) => !ok);
    formError.hidden = !fallo;
    if (fallo) {
      formError.textContent = fallo[2];
      fallo[0].focus();
      return;
    }

    const data = new FormData(form);
    const val = (k: string) => String(data.get(k) ?? '').trim();
    const sede = sedes[val('sede')];
    const lineas = [
      `Hola, soy ${val('nombre')} y quisiera agendar una evaluación.`,
      `• Paciente: ${val('paciente')}${val('edad') ? ` (${val('edad')})` : ''}`,
      `• Servicio de interés: ${val('terapia')}`,
      `• Sede: ${sede.nombre}`,
    ];
    if (val('mensaje')) lineas.push(`• Comentario: ${val('mensaje')}`);

    trackContact('formulario');
    window.open(`https://wa.me/${sede.telefono}?text=${encodeURIComponent(lineas.join('\n'))}`, '_blank', 'noopener');
  });
}

// Aparición suave de secciones
const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      io.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  reveals.forEach((el) => io.observe(el));
} else {
  reveals.forEach((el) => el.classList.add('is-visible'));
}

export {};
