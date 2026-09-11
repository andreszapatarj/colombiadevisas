const form=document.getElementById('bookingForm'), agendaBtn=document.getElementById('agendaBtn'), contactBtn=document.getElementById('contactBtn'), msg=document.getElementById('formMsg');

document.querySelectorAll('input[name="opcion"]').forEach(r=>r.addEventListener('change',()=>{
  const agenda=r.value==='agenda'&&r.checked;
  agendaBtn.classList.toggle('hidden',!agenda);
  contactBtn.classList.toggle('hidden',agenda);
}));

form.addEventListener('submit',e=>{
  e.preventDefault();
  const opcion=document.querySelector('input[name="opcion"]:checked')?.value;
  if(!opcion){
    msg.className='form-msg error';
    msg.textContent='Selecciona una opción.';
    return;
  }
  if(opcion==='agenda'){
    msg.className='form-msg ok';
    msg.textContent='Demo: la cita se registraría en MySQL y se enviaría la confirmación por WhatsApp desde Hostinger.';
  }else{
    msg.className='form-msg ok';
    msg.textContent='Demo: aquí se abriría el canal de contacto configurado por la empresa.';
  }
});
