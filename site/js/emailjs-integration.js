/* ==========================================================================
   EmailJS integration
   --------------------------------------------------------------------------
   INTEGRATION POINT. Add your public key and template IDs here.
   Nothing is fabricated — these values must be supplied before forms work.
   ========================================================================== */

const CONFIG = {
  publicKey:  '',   // ← EmailJS public key
  serviceId:  '',   // ← EmailJS service ID
  templates: {
    contact:   '',  // ← contact form template ID
    demo:      '',  // ← demo booking template ID
    newsletter:''   // ← newsletter signup template ID
  }
};

export function initEmailJS() {
  if (!CONFIG.publicKey) {
    console.info('[StartiQOS] EmailJS not configured. Forms will not submit.');
    return false;
  }
  if (window.emailjs) {
    window.emailjs.init(CONFIG.publicKey);
    return true;
  }
  return false;
}

export async function sendEmail(templateKey, params) {
  const templateId = CONFIG.templates[templateKey];
  if (!CONFIG.publicKey || !templateId) {
    throw new Error(`EmailJS template "${templateKey}" not configured`);
  }
  return window.emailjs.send(CONFIG.serviceId, templateId, params);
}
