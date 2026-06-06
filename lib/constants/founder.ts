export const founderLinks = {
  instagram: "https://www.instagram.com/dev.by.rohit/",
  linkedin: "https://www.linkedin.com/in/rohit-jadhav94/",
  whatsapp: "https://wa.me/918459262203"
} as const;

export const founderSocial = [
  {
    label: "Instagram",
    href: founderLinks.instagram,
    handle: "@dev.by.rohit"
  },
  {
    label: "LinkedIn",
    href: founderLinks.linkedin,
    handle: "Rohit Jadhav"
  }
] as const;
