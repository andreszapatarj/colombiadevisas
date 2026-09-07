document.addEventListener("DOMContentLoaded", () => {
  if(!hasSession()){
    window.location.href = "admin-login.html";
    return;
  }

  const c = getContent();
  const val = (id) => document.getElementById(id);

  val("f_heroEyebrow").value = c.heroEyebrow;
  val("f_heroTitleLine1").value = c.heroTitleLine1;
  val("f_heroTitleLine2").value = c.heroTitleLine2;
  val("f_heroSub").value = c.heroSub;
  val("f_heroCta1").value = c.heroCta1;
  val("f_heroCta2").value = c.heroCta2;
  val("f_heroImageUrl").value = c.heroImageUrl;
  val("f_avatarImageUrl").value = c.avatarImageUrl;
  val("f_introText").value = c.introText;
  val("f_whatsappNumber").value = c.whatsappNumber;
  val("f_whatsappMessage").value = c.whatsappMessage;
  val("f_instagramUrl").value = c.instagramUrl;
  val("f_emailAddress").value = c.emailAddress;
  val("f_siteLabel").value = c.siteLabel; val("f_siteUrl").value = c.siteUrl;
  val("f_blogLabel").value = c.blogLabel; val("f_blogUrl").value = c.blogUrl;
  val("f_youtubeLabel").value = c.youtubeLabel; val("f_youtubeUrl").value = c.youtubeUrl;

  c.services.forEach((s,i) => {
    val(`f_svc${i}_title`).value = s.title;
    val(`f_svc${i}_text`).value = s.text;
  });

  val("f_whyTitle").value = c.whyTitle;
  val("f_whyText").value = c.whyText;
  val("f_stat1Num").value = c.stat1Num; val("f_stat1Label").value = c.stat1Label;
  val("f_stat2Num").value = c.stat2Num; val("f_stat2Label").value = c.stat2Label;
  val("f_stat3Num").value = c.stat3Num; val("f_stat3Label").value = c.stat3Label;
  val("f_stat4Num").value = c.stat4Num; val("f_stat4Label").value = c.stat4Label;

  val("f_videoUrl").value = c.videoUrl;

  c.testimonials.forEach((t,i) => {
    val(`f_test${i}_name`).value = t.name;
    val(`f_test${i}_role`).value = t.role;
    val(`f_test${i}_quote`).value = t.quote;
  });

  val("f_ctaFinalTitle").value = c.ctaFinalTitle;
  val("f_ctaFinalText").value = c.ctaFinalText;

  document.getElementById("adminForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const updated = {
      heroEyebrow: val("f_heroEyebrow").value,
      heroTitleLine1: val("f_heroTitleLine1").value,
      heroTitleLine2: val("f_heroTitleLine2").value,
      heroSub: val("f_heroSub").value,
      heroCta1: val("f_heroCta1").value,
      heroCta2: val("f_heroCta2").value,
      heroImageUrl: val("f_heroImageUrl").value,
      avatarImageUrl: val("f_avatarImageUrl").value,
      introText: val("f_introText").value,
      whatsappNumber: val("f_whatsappNumber").value.replace(/\D/g,""),
      whatsappMessage: val("f_whatsappMessage").value,
      instagramUrl: val("f_instagramUrl").value,
      emailAddress: val("f_emailAddress").value,
      siteLabel: val("f_siteLabel").value, siteUrl: val("f_siteUrl").value,
      blogLabel: val("f_blogLabel").value, blogUrl: val("f_blogUrl").value,
      youtubeLabel: val("f_youtubeLabel").value, youtubeUrl: val("f_youtubeUrl").value,
      services: [0,1,2,3].map(i => ({
        title: val(`f_svc${i}_title`).value,
        text: val(`f_svc${i}_text`).value
      })),
      whyTitle: val("f_whyTitle").value,
      whyText: val("f_whyText").value,
      stat1Num: val("f_stat1Num").value, stat1Label: val("f_stat1Label").value,
      stat2Num: val("f_stat2Num").value, stat2Label: val("f_stat2Label").value,
      stat3Num: val("f_stat3Num").value, stat3Label: val("f_stat3Label").value,
      stat4Num: val("f_stat4Num").value, stat4Label: val("f_stat4Label").value,
      videoUrl: val("f_videoUrl").value,
      testimonials: [0,1,2].map(i => ({
        name: val(`f_test${i}_name`).value,
        role: val(`f_test${i}_role`).value,
        quote: val(`f_test${i}_quote`).value
      })),
      ctaFinalTitle: val("f_ctaFinalTitle").value,
      ctaFinalText: val("f_ctaFinalText").value
    };
    saveContent(updated);
    const toast = document.getElementById("saveToast");
    toast.style.display = "block";
    window.scrollTo({top:0, behavior:"smooth"});
    setTimeout(() => toast.style.display = "none", 3000);
  });

  document.getElementById("resetBtn").addEventListener("click", () => {
    if(confirm("Esto restaurará todos los textos a los valores originales. ¿Continuar?")){
      resetContent();
      window.location.reload();
    }
  });

  document.getElementById("logoutBtn").addEventListener("click", () => {
    endSession();
    window.location.href = "admin-login.html";
  });
});
