/* ==========================================================================
   Forms — validation and submission
   Backend integration points are marked. Do not fabricate endpoints.
   ========================================================================== */

export function initForms() {
  const forms = document.querySelectorAll('[data-form]');
  if (!forms.length) return;

  forms.forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const status = form.querySelector('[data-form-status]');
      const button = form.querySelector('button[type="submit"]');
      const email = form.querySelector('input[type="email"]');

      // ---- validation ----
      if (email && !isValidEmail(email.value)) {
        setStatus(status, 'Please enter a valid email address.', 'error');
        email.focus();
        return;
      }

      // ---- submit ----
      if (button) { button.disabled = true; button.dataset.original = button.textContent; }
      setStatus(status, 'Sending…', 'pending');

      try {
        // INTEGRATION POINT — connect to EmailJS or your backend here.
        // See js/emailjs-integration.js
        await submitForm(form);
        setStatus(status, 'Thank you. We will be in touch.', 'success');
        form.reset();
      } catch (err) {
        setStatus(status, 'Something went wrong. Please email us directly.', 'error');
      } finally {
        if (button) {
          button.disabled = false;
          button.textContent = button.dataset.original || button.textContent;
        }
      }
    });
  });
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
}

function setStatus(el, message, state) {
  if (!el) return;
  el.textContent = message;
  el.dataset.state = state;
}

async function submitForm(form) {
  // Replace with real submission. Throws until connected.
  throw new Error('Form backend not connected');
}
