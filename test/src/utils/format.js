/**
 * Utility functions for formatting contact and configuration data.
 */

/**
 * Formats a phone number for display.
 * Assuming input like "917379524088"
 * Returns: "+91 73795 24088"
 */
export const formatPhoneDisplay = (phone) => {
  if (!phone) return '';
  const cleaned = ('' + phone).replace(/\D/g, '');
  if (cleaned.length === 12 && cleaned.startsWith('91')) {
    return `+91 ${cleaned.slice(2, 7)} ${cleaned.slice(7)}`;
  }
  return `+${cleaned}`; // Fallback
};

/**
 * Formats a phone number for a 'tel:' link.
 * Returns: "tel:+917379524088"
 */
export const formatTelLink = (phone) => {
  if (!phone) return '';
  const cleaned = ('' + phone).replace(/\D/g, '');
  return `tel:+${cleaned}`;
};

/**
 * Formats a WhatsApp link with an optional message.
 */
export const formatWhatsAppLink = (phone, message) => {
  if (!phone) return '';
  const cleaned = ('' + phone).replace(/\D/g, '');
  let url = `https://wa.me/${cleaned}`;
  if (message) {
    url += `?text=${encodeURIComponent(message)}`;
  }
  return url;
};

/**
 * Formats an email for a standard 'mailto:' link.
 */
export const formatEmailLink = (email, subject = '') => {
  if (!email) return '';
  let url = `mailto:${email}`;
  if (subject) {
    url += `?subject=${encodeURIComponent(subject)}`;
  }
  return url;
};

/**
 * Formats an email for a Gmail compose link.
 */
export const formatGmailComposeLink = (email, subject = '') => {
  if (!email) return '';
  let url = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}`;
  if (subject) {
    url += `&su=${encodeURIComponent(subject)}`;
  }
  return url;
};
