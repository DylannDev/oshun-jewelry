import { CiFaceSmile, CiGlobe, CiMedal, CiStar } from "react-icons/ci";

export const navbarLinks = [
  { href: "nouveautés", label: "Nouveautés" },
  { href: "tendances", label: "Tendances" },
  { href: "vêtements", label: "Vêtements" },
  { href: "maillots", label: "Maillots" },
  { href: "accessoires", label: "Accessoires" },
  { href: "/", label: "Contact" },
  { href: "/", label: "Panier" },
  { href: "/", label: "Se Déconnecter" },
];

export const values = [
  {
    icon: <CiMedal />,
    title: "Qualité & Artisanat",
    description:
      "Des pièces minutieusement fabriquées avec des matériaux de haute qualité.",
  },
  {
    icon: <CiFaceSmile />,
    title: "Satisfaction Client",
    description:
      "Nous nous engageons à fournir une expérience d'achat positive.",
  },
  {
    icon: <CiGlobe />,
    title: "Mode Responsable",
    description:
      "Des pratiques respectueuses de l’environnement et une mode durable.",
  },
];
