document.addEventListener('DOMContentLoaded', () => {
  // Menú móvil
  const btn = document.querySelector('.hamburguesa'), menu = document.querySelector('.menu');
  btn.addEventListener('click', () => {
    const abierto = menu.classList.toggle('abierto');
    btn.setAttribute('aria-expanded', abierto);
  });

  // Marcar página activa
  const actual = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.menu a').forEach(a => {
    if (a.getAttribute('href') === actual) a.classList.add('activo');
  });

  // Botón subir
  const subir = document.querySelector('.subir');
  window.addEventListener('scroll', () => subir.classList.toggle('visible', scrollY > 400));
  subir.addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));

  // Aparición al hacer scroll
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
  }), { threshold: .15 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // Movimiento suave de fotos al desplazarse (parallax)
  const fotos = document.querySelectorAll('[data-parallax]');
  if (fotos.length && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const mover = () => fotos.forEach(img => {
      const r = img.parentElement.getBoundingClientRect();
      const p = (r.top + r.height / 2 - innerHeight / 2) / innerHeight;
      img.style.transform = `translateY(${p * -30}px) scale(1.12)`;
    });
    addEventListener('scroll', mover, { passive: true }); mover();
  }

  const quieto = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Barra de progreso y cabecera compacta
  const barra = document.createElement('div'); barra.className = 'progreso'; document.body.prepend(barra);
  const cab = document.querySelector('.cabecera');
  const alScroll = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    barra.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
    cab.classList.toggle('compacta', scrollY > 40);
  };
  addEventListener('scroll', alScroll, { passive: true }); alScroll();

  // Aparición escalonada en rejillas
  document.querySelectorAll('.rejilla, .galeria').forEach(g =>
    g.querySelectorAll('.reveal').forEach((el, i) => el.style.transitionDelay = (i * 0.1) + 's'));
  // Textos que entran desde la izquierda
  document.querySelectorAll('.dos > div:first-child.reveal').forEach(el => el.classList.add('izq'));

  // Contadores animados
  document.querySelectorAll('.cifras strong').forEach(el => {
    const fin = parseInt(el.textContent, 10), suf = el.textContent.replace(/[0-9]/g, '');
    if (quieto || isNaN(fin)) return;
    el.textContent = '0' + suf;
    new IntersectionObserver((es, ob) => es.forEach(e => {
      if (!e.isIntersecting) return; ob.disconnect();
      const t0 = performance.now(), dur = 1400;
      const paso = t => { const k = Math.min((t - t0) / dur, 1), v = 1 - Math.pow(1 - k, 3);
        el.textContent = Math.round(fin * v) + suf; if (k < 1) requestAnimationFrame(paso); };
      requestAnimationFrame(paso);
    })).observe(el);
  });

  // Inclinación suave de las fotos con el mouse
  if (!quieto && matchMedia('(hover: hover)').matches) {
    document.querySelectorAll('.foto').forEach(f => {
      f.addEventListener('mousemove', e => {
        const r = f.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
        f.style.transform = `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg)`;
      });
      f.addEventListener('mouseleave', () => f.style.transform = '');
    });
  }

  // Videos: se pausan al salir de pantalla
  document.querySelectorAll('video').forEach(v => new IntersectionObserver(es =>
    es.forEach(e => { if (!e.isIntersecting && !v.paused) v.pause(); }), { threshold: .2 }).observe(v));

  // Formulario -> WhatsApp
  const form = document.getElementById('form-contacto');
  if (form) form.addEventListener('submit', e => {
    e.preventDefault();
    const d = new FormData(form);
    const msg = `Hola Hemcor, soy ${d.get('nombre')}.\nTipo de proyecto: ${d.get('tipo')}\nCorreo: ${d.get('correo')}\n${d.get('mensaje')}`;
    window.open('https://wa.me/50671108270?text=' + encodeURIComponent(msg), '_blank');
    form.querySelector('.aviso').textContent = 'Abriendo WhatsApp con tu mensaje…';
  });
});

// Menú móvil: cambia el ícono y se cierra al tocar un enlace o con Escape
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector('.hamburguesa'), menu = document.querySelector('.menu');
  if (!btn || !menu) return;
  const pintar = () => {
    const a = menu.classList.contains('abierto');
    btn.innerHTML = a ? '&#10005;' : '&#9776;';
    btn.setAttribute('aria-label', a ? 'Cerrar menú' : 'Abrir menú');
  };
  const cerrar = () => { menu.classList.remove('abierto'); btn.setAttribute('aria-expanded', 'false'); pintar(); };
  btn.addEventListener('click', pintar);
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', cerrar));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') cerrar(); });
  document.addEventListener('click', e => { if (menu.classList.contains('abierto') && !e.target.closest('.cabecera')) cerrar(); });
  // Al reproducir un video, pausa los demás
  const vids = document.querySelectorAll('video');
  vids.forEach(v => v.addEventListener('play', () => vids.forEach(o => { if (o !== v) o.pause(); })));
});
