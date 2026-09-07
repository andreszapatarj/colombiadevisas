document.addEventListener("DOMContentLoaded", () => {
  const c = getContent();

  const set = (id, val) => { const el = document.getElementById(id); if(el) el.textContent = val; };
  const setHref = (id, val) => { const el = document.getElementById(id); if(el) el.setAttribute("href", val); };

  set("heroEyebrow", c.heroEyebrow);
  set("heroTitleLine1", c.heroTitleLine1);
  set("heroTitleLine2", c.heroTitleLine2);
  set("heroSub", c.heroSub);
  set("heroCta1Text", c.heroCta1);
  set("heroCta2Text", c.heroCta2);

  const heroBg = document.getElementById("heroBg");
  if(heroBg) heroBg.setAttribute("src", c.heroImageUrl);
  const avatarImg = document.getElementById("avatarImg");
  if(avatarImg) avatarImg.setAttribute("src", c.avatarImageUrl);

  set("introText", c.introText);

  const waLink = `https://wa.me/${c.whatsappNumber}?text=${encodeURIComponent(c.whatsappMessage)}`;
  document.querySelectorAll(".js-whatsapp-link").forEach(el => el.setAttribute("href", waLink));
  setHref("instagramLink", c.instagramUrl);
  setHref("emailLink", `mailto:${c.emailAddress}`);
  const emailText = document.getElementById("emailText");
  if(emailText) emailText.textContent = c.emailAddress;

  // Los tres botones tipo pastilla (Mi Sitio Web / Mi Blog / YouTube)
  setHref("siteLink", c.siteUrl); set("siteLabel", c.siteLabel);
  setHref("blogLink", c.blogUrl); set("blogLabel", c.blogLabel);
  setHref("youtubeLink", c.youtubeUrl); set("youtubeLabel", c.youtubeLabel);

  // Servicios
  const svcGrid = document.getElementById("svcGrid");
  if(svcGrid){
    svcGrid.innerHTML = c.services.map((s,i) => `
      <div class="svc-card">
        <span class="svc-num">0${i+1}</span>
        <h3>${escapeHtml(s.title)}</h3>
        <p>${escapeHtml(s.text)}</p>
      </div>`).join("");
  }

  set("whyTitle", c.whyTitle);
  set("whyText", c.whyText);
  set("stat1Num", c.stat1Num); set("stat1Label", c.stat1Label);
  set("stat2Num", c.stat2Num); set("stat2Label", c.stat2Label);
  set("stat3Num", c.stat3Num); set("stat3Label", c.stat3Label);
  set("stat4Num", c.stat4Num); set("stat4Label", c.stat4Label);

  const videoFrame = document.getElementById("videoFrame");
  if(videoFrame) videoFrame.setAttribute("src", c.videoUrl);

  const testiGrid = document.getElementById("testiGrid");
  if(testiGrid){
    testiGrid.innerHTML = c.testimonials.map(t => `
      <div class="testi-card">
        <p class="testi-quote">“${escapeHtml(t.quote)}”</p>
        <div class="testi-who">
          <div class="testi-avatar">${escapeHtml(t.name.charAt(0))}</div>
          <div>
            <div class="testi-name">${escapeHtml(t.name)}</div>
            <div class="testi-role">${escapeHtml(t.role)}</div>
          </div>
        </div>
      </div>`).join("");
  }

  set("ctaFinalTitle", c.ctaFinalTitle);
  set("ctaFinalText", c.ctaFinalText);

  const year = document.getElementById("year");
  if(year) year.textContent = new Date().getFullYear();

  // ---- Acceso oculto al panel privado ----
  // No hay botón visible de "login": se activa haciendo 5 clics
  // sobre el año del pie de página.
  const trigger = document.getElementById("admin-trigger");
  if(trigger){
    let clicks = 0, timer = null;
    trigger.addEventListener("click", () => {
      clicks++;
      clearTimeout(timer);
      timer = setTimeout(() => { clicks = 0; }, 1500);
      if(clicks >= 5){
        clicks = 0;
        window.location.href = "admin-login.html";
      }
    });
  }
});

function escapeHtml(str){
  return String(str)
    .replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;")
    .replaceAll('"',"&quot;").replaceAll("'","&#039;");
}
