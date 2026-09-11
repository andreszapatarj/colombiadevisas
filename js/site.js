const hero = document.querySelector('.hero-video');
const testimonialVideos = [...document.querySelectorAll('.testi-video video')];
let heroPausedByTestimonial = false;

function playHeroWithSound() {
  if (!hero || heroPausedByTestimonial) return;
  hero.muted = false;
  hero.defaultMuted = false;
  hero.volume = 1;
  hero.play().catch(() => {
    // Los navegadores pueden bloquear el autoplay con sonido hasta que exista
    // una interacción del usuario. Se vuelve a intentar en la primera interacción.
    const enableOnInteraction = () => {
      if (heroPausedByTestimonial) return;
      hero.muted = false;
      hero.volume = 1;
      hero.play().catch(() => {});
    };
    document.addEventListener('pointerdown', enableOnInteraction, { once: true, capture: true });
    document.addEventListener('keydown', enableOnInteraction, { once: true, capture: true });
    document.addEventListener('touchstart', enableOnInteraction, { once: true, capture: true });
  });
}

if (hero) {
  // Intentar iniciar el video principal inmediatamente con sonido.
  hero.muted = false;
  hero.defaultMuted = false;
  hero.volume = 1;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', playHeroWithSound, { once: true });
  } else {
    playHeroWithSound();
  }

  hero.addEventListener('loadeddata', playHeroWithSound, { once: true });
  hero.addEventListener('canplay', playHeroWithSound, { once: true });

  // Si el usuario vuelve a reproducir manualmente el video principal,
  // queda habilitado nuevamente como video activo.
  hero.addEventListener('play', () => {
    heroPausedByTestimonial = false;
    hero.muted = false;
    hero.volume = 1;
  });

  document.addEventListener('visibilitychange', () => {
    if (!document.hidden && hero.paused && !heroPausedByTestimonial) {
      playHeroWithSound();
    }
  });
}

// Cuando se reproduce un testimonio, el video principal se pausa y NO vuelve
// a arrancar automáticamente. El usuario puede reproducirlo nuevamente cuando quiera.
testimonialVideos.forEach((video) => {
  video.addEventListener('play', () => {
    heroPausedByTestimonial = true;
    if (hero && !hero.paused) hero.pause();

    // Solo un testimonio a la vez.
    testimonialVideos.forEach((other) => {
      if (other !== video && !other.paused) other.pause();
    });
  });
});

document.querySelectorAll('[data-cta]').forEach(a =>
  a.addEventListener('click', () => {
    try { localStorage.setItem('cta_click', new Date().toISOString()); } catch (e) {}
  })
);

// Oculta el icono de play cuando cada video comienza a reproducirse.
function bindPlayOverlay(video, overlay) {
  if (!video || !overlay) return;
  const hide = () => overlay.classList.add('video-play-hidden');
  const show = () => overlay.classList.remove('video-play-hidden');
  video.addEventListener('play', hide);
  video.addEventListener('playing', hide);
  video.addEventListener('ended', show);
  if (!video.paused) hide();
}

bindPlayOverlay(hero, document.querySelector('.hero-play'));
document.querySelectorAll('.testi-video').forEach(wrap => {
  const video = wrap.querySelector('video');
  const overlay = wrap.querySelector('.testi-play');
  bindPlayOverlay(video, overlay);
});
