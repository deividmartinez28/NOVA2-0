// ==========================================================================
// SONIQ - Interactive Script with EmailJS & Motion Micro-Interactions
// ==========================================================================

// 1. Inicializar EmailJS con la Clave Pública
emailjs.init({ publicKey: "qw4lxgDnOMzRW2TxW" });

const form = document.getElementById("soniq-form");
const button = document.getElementById("submit-btn");
const status = document.getElementById("status");
const card = document.getElementById("card-container");
const cardGlow = document.getElementById("card-glow");

// 2. Efecto interactivo de luz Neón que sigue al cursor en la tarjeta
if (card && cardGlow) {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    cardGlow.style.left = `${x}px`;
    cardGlow.style.top = `${y}px`;
  });
}

// 3. Envío del Formulario con Validación y Animaciones
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  status.textContent = "";
  status.className = "status";

  // Honeypot anti-spam check
  if (form.website && form.website.value.trim() !== "") return;

  const emailInput = document.getElementById("user_email");
  const emailValue = emailInput.value.trim();

  // Validar Email con Expresión Regular
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailValue)) {
    status.textContent = "Por favor, ingresa un correo electrónico válido.";
    status.classList.add("error");
    emailInput.focus();
    return;
  }

  // Activar estado de carga en el botón
  button.disabled = true;
  button.classList.add("loading");

  try {
    // Enviar a través de EmailJS
    await emailjs.sendForm(
      "service_z4sfs54",
      "template_mv7mhjj",
      form
    );

    // Éxito
    status.textContent = "¡Gracias por suscribirte! Revisa tu bandeja de entrada.";
    status.classList.add("success");
    form.reset();
  } catch (error) {
    console.error("EmailJS Error:", error);
    status.textContent = "No pudimos completar el envío. Inténtalo de nuevo en un momento.";
    status.classList.add("error");
  } finally {
    // Restaurar estado del botón
    button.disabled = false;
    button.classList.remove("loading");
  }
});
