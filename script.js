const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();

const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('#main-nav');
if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
  });
}

const whatsappNumber = '51922822365';
function whatsappLink(message) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

document.querySelectorAll('.wa-service').forEach(link => {
  const service = link.dataset.service;
  link.href = whatsappLink(`Hola TecnoPlus, quiero consultar por el servicio ${service}. ¿Me pueden orientar sobre el precio y la atención?`);
  link.target = '_blank';
  link.rel = 'noopener';
});

document.querySelectorAll('.wa-payment').forEach(link => {
  const method = link.dataset.method;
  link.href = whatsappLink(`Hola TecnoPlus, quisiera pagar por ${method}. ¿Me confirman el servicio, el monto y me envían los datos oficiales para realizar el pago?`);
  link.target = '_blank';
  link.rel = 'noopener';
});

const chat = document.querySelector('#chat');
const toggle = document.querySelector('#chat-toggle');
const close = document.querySelector('#chat-close');
const form = document.querySelector('#chat-form');
const input = document.querySelector('#chat-input');
const messages = document.querySelector('#messages');

if (chat && toggle && close && form && input && messages) {
  toggle.addEventListener('click', () => { chat.hidden = false; input.focus(); });
  close.addEventListener('click', () => { chat.hidden = true; });

  const answers = {
    servicio: 'Ofrecemos diagnóstico, optimización, mantenimiento preventivo, instalación de programas y soporte técnico virtual o presencial.',
    donde: 'Atendemos de forma virtual y presencial en Ica, Chincha y Pueblo Nuevo.',
    contacto: 'Puedes escribirnos por WhatsApp al +51 922 822 365.',
    precio: 'Para conocer el precio, escríbenos por WhatsApp y cuéntanos qué problema presenta tu equipo.',
    pago: 'Puedes coordinar Yape o depósito/transferencia por WhatsApp. TecnoPlus te confirma los datos oficiales y el monto.',
    default: 'Puedo ayudarte con servicios, zona de atención, contacto, precios y formas de pago. Para una consulta específica, escríbenos por WhatsApp.'
  };

  function reply(text) {
    const t = text.toLowerCase();
    if (t.includes('servicio') || t.includes('ofrecen')) return answers.servicio;
    if (t.includes('dónde') || t.includes('donde') || t.includes('atienden') || t.includes('zona')) return answers.donde;
    if (t.includes('contact') || t.includes('whatsapp') || t.includes('número') || t.includes('numero')) return answers.contacto;
    if (t.includes('precio') || t.includes('costo')) return answers.precio;
    if (t.includes('pago') || t.includes('yape') || t.includes('depósito') || t.includes('deposito')) return answers.pago;
    return answers.default;
  }

  function add(text, type) {
    const el = document.createElement('div');
    el.className = type === 'user' ? 'user-message' : 'bot-message';
    el.textContent = text;
    messages.append(el);
    messages.scrollTop = messages.scrollHeight;
  }

  function send(text) {
    if (!text.trim()) return;
    add(text, 'user');
    input.value = '';
    setTimeout(() => add(reply(text), 'bot'), 250);
  }

  form.addEventListener('submit', event => { event.preventDefault(); send(input.value); });
  document.querySelectorAll('.quick-questions button').forEach(button => {
    button.addEventListener('click', () => send(button.textContent));
  });
}
