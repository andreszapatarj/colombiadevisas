const hero=document.querySelector('.hero-video');
if(hero){
  // El video principal intenta iniciar automáticamente con sonido.
  hero.muted=false;
  hero.defaultMuted=false;
  hero.volume=1;

  const playHeroWithSound=()=>{
    hero.muted=false;
    hero.volume=1;
    return hero.play().catch(()=>{
      // Algunos navegadores bloquean por seguridad el autoplay con sonido.
      // En ese caso, el siguiente toque/clic del usuario activa inmediatamente el audio.
      const enableOnInteraction=()=>{
        hero.muted=false;
        hero.volume=1;
        hero.play().catch(()=>{});
        document.removeEventListener('pointerdown', enableOnInteraction, true);
        document.removeEventListener('keydown', enableOnInteraction, true);
        document.removeEventListener('touchstart', enableOnInteraction, true);
      };
      document.addEventListener('pointerdown', enableOnInteraction, true, {once:true});
      document.addEventListener('keydown', enableOnInteraction, true, {once:true});
      document.addEventListener('touchstart', enableOnInteraction, true, {once:true});
    });
  };

  if(hero.readyState >= 2) playHeroWithSound();
  else hero.addEventListener('canplay', playHeroWithSound, {once:true});

  document.addEventListener('visibilitychange',()=>{
    if(!document.hidden && hero.paused) playHeroWithSound();
  });
}
document.querySelectorAll('[data-cta]').forEach(a=>a.addEventListener('click',()=>{try{localStorage.setItem('cta_click',new Date().toISOString())}catch(e){}}));


// Oculta el icono de play cuando cada video comienza a reproducirse.
function bindPlayOverlay(video, overlay){
  if(!video || !overlay) return;
  const hide=()=>overlay.classList.add('video-play-hidden');
  const show=()=>overlay.classList.remove('video-play-hidden');
  video.addEventListener('play', hide);
  video.addEventListener('playing', hide);
  video.addEventListener('ended', show);
  if(!video.paused) hide();
}

bindPlayOverlay(document.querySelector('.hero-video'), document.querySelector('.hero-play'));
document.querySelectorAll('.testi-video').forEach(wrap=>{
  const video=wrap.querySelector('video');
  const overlay=wrap.querySelector('.testi-play');
  bindPlayOverlay(video, overlay);
});
