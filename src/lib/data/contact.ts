export const CONTACT_EMAIL = "adrianmatiaspl@gmail.com";
export const LINKEDIN_URL = "https://www.linkedin.com/in/adrianpalomino";
export const LINKEDIN_DISPLAY = "linkedin.com/in/adrianpalomino";

const WHATSAPP_DIGITS = "51972801063";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_DIGITS}`;
export const WHATSAPP_DISPLAY = "+51 972 801 063";

/** wa.me link with a pre-filled first message, so the chat opens ready to send. */
export function whatsappUrl(message: string): string {
  return `${WHATSAPP_URL}?text=${encodeURIComponent(message)}`;
}
