// Troque o número abaixo pelo WhatsApp real da marca (formato: código do país + DDD + número).
export const WHATSAPP_NUMBER = "5500000000000";

export const WHATSAPP_URL =
  `https://wa.me/${WHATSAPP_NUMBER}?text=` +
  encodeURIComponent(
    "Olá, vim pelo site da Cost Crew e quero saber mais sobre as camisetas.",
  );

export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Collection", href: "#collection" },
  { label: "Lookbook", href: "#lookbook" },
  { label: "Quality", href: "#quality" },
  { label: "Lifestyle", href: "#lifestyle" },
  { label: "Contact", href: "#contact" },
] as const;

export const BRAND = {
  name: "COST CREW",
  tagline: "find your coast.",
  instagram: "https://instagram.com",
  email: "hello@costcrew.co",
};
