const hero=document.querySelector('.hero-video');
if(hero){ hero.play().catch(()=>{}); document.addEventListener('visibilitychange',()=>{if(!document.hidden) hero.play().catch(()=>{});}); }
document.querySelectorAll('[data-cta]').forEach(a=>a.addEventListener('click',()=>{try{localStorage.setItem('cta_click',new Date().toISOString())}catch(e){}}));
