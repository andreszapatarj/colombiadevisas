const form = document.getElementById('bookingForm');
const agendaBtn = document.getElementById('agendaBtn');
const contactBtn = document.getElementById('contactBtn');
const msg = document.getElementById('formMsg');
const opcionError = document.getElementById('opcionError');

const fields = [
  { id: 'nombre', label: 'Nombre completo' },
  { id: 'correo', label: 'Correo electrónico', email: true },
  { id: 'telefono', label: 'Teléfono / WhatsApp' },
  { id: 'tipoVisa', label: 'Tipo de servicio' }
];

function showMessage(text, type = 'error') {
  msg.className = `form-msg ${type}`;
  msg.textContent = text;
}
function clearMessage() {
  msg.className = 'form-msg hidden';
  msg.textContent = '';
}
function clearFieldState(input) {
  input.classList.remove('invalid-field');
}
function markInvalid(input) {
  input.classList.add('invalid-field');
}

fields.forEach(({ id }) => {
  const input = document.getElementById(id);
  input.addEventListener('input', () => clearFieldState(input));
  input.addEventListener('change', () => clearFieldState(input));
});

document.querySelectorAll('input[name="opcion"]').forEach(r => r.addEventListener('change', () => {
  const agenda = r.value === 'agenda' && r.checked;
  agendaBtn.classList.toggle('hidden', !agenda);
  contactBtn.classList.toggle('hidden', agenda);
  opcionError.textContent = '';
  clearMessage();
}));

form.addEventListener('submit', e => {
  e.preventDefault();
  clearMessage();
  opcionError.textContent = '';

  let firstInvalid = null;
  const missing = [];

  fields.forEach(({ id, label, email }) => {
    const input = document.getElementById(id);
    const value = input.value.trim();
    let invalid = !value;
    if (!invalid && email) invalid = !input.checkValidity();
    if (invalid) {
      markInvalid(input);
      missing.push(label);
      if (!firstInvalid) firstInvalid = input;
    } else clearFieldState(input);
  });

  const opcion = document.querySelector('input[name="opcion"]:checked')?.value;
  if (!opcion) {
    opcionError.textContent = '✨ Elige una de las dos opciones para continuar.';
    missing.push('una opción de contacto');
  }

  if (missing.length) {
    const text = missing.length === 1
      ? `✨ Solo falta completar: ${missing[0]}.`
      : `✨ Aún faltan algunos datos. Revisa los campos marcados para continuar.`;
    showMessage(text, 'error');
    (firstInvalid || document.querySelector('input[name="opcion"]'))?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    firstInvalid?.focus();
    return;
  }

  if (opcion === 'agenda') {
    showMessage('✓ ¡Perfecto! Tus datos están completos y la opción para agendar está lista.', 'ok');
  } else {
    showMessage('✓ ¡Perfecto! Tus datos están completos. Te ayudaremos con la información que necesitas.', 'ok');
  }
});
