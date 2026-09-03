import {
  Award,
  Compass,
  Hammer,
  PackageCheck,
  Ruler,
  Timer,
  Truck,
  Users,
} from "lucide-react";
import { photos } from "./media";

export const collections = [
  {
    number: "01",
    slug: "living",
    label: "Living",
    image: photos.living,
    description: "Sofas, consoles & pieces with presence",
    note: "Soft structure / generous comfort",
  },
  {
    number: "02",
    slug: "bedroom",
    label: "Bedroom",
    image: photos.bedroom,
    description: "Restful forms, made for your room",
    note: "Quiet proportion / tailored rest",
  },
  {
    number: "03",
    slug: "dining",
    label: "Dining",
    image: photos.dining,
    description: "Gathering spaces with a considered edge",
    note: "Handmade rhythm / everyday ceremony",
  },
] as const;

export type Collection = (typeof collections)[number];

export const materials = [
  {
    name: "Walnut",
    detail: "Depth, grain, and a warmer kind of permanence",
    color: "#6f4933",
  },
  {
    name: "Bouclé",
    detail: "Soft texture that catches the light quietly",
    color: "#d8d0c3",
  },
  {
    name: "Brass",
    detail: "A small glint for the details worth noticing",
    color: "#b8965a",
  },
  {
    name: "Linen",
    detail: "Natural tactility with an easy, lived-in finish",
    color: "#b7aa96",
  },
] as const;

export type Material = (typeof materials)[number];

export const trustPoints = [
  "Free design consultation",
  "Fully bespoke to your space",
  "Premium materials, in-house craft",
  "Delivery & installation included",
];

export const process = [
  {
    number: "01",
    title: "Listen",
    copy: "We start with your room, your references, and the way you want it to feel.",
    icon: Compass,
  },
  {
    number: "02",
    title: "Shape",
    copy: "Together, we refine proportions, materials, and the details that make it yours.",
    icon: Ruler,
  },
  {
    number: "03",
    title: "Craft",
    copy: "Our in-house team turns the direction into a considered, tangible piece.",
    icon: Hammer,
  },
  {
    number: "04",
    title: "Install",
    copy: "Delivery and installation bring the finished work into its place, properly.",
    icon: Truck,
  },
];

export const roomOptions = [
  "Living room",
  "Bedroom",
  "Dining",
  "Office / study",
  "Something else",
];
export const feelingOptions = [
  "Warm & layered",
  "Quiet & minimal",
  "Bold & sculptural",
  "Classic & enduring",
];
export const timingOptions = [
  "Just exploring",
  "This season",
  "Ready to discuss",
];
export const budgetOptions = [
  "Thoughtful investment",
  "Comfortable range",
  "Need guidance",
];

export const aiLoadingMessages = [
  "Reading the room’s light and proportions…",
  "Pairing practical ideas with your brief…",
  "Preparing a clear starting point for you…",
];

export const studioStats = [
  {
    icon: Timer,
    value: "6+",
    label: "Years shaping bespoke rooms",
    detail:
      "Since 2020, working exclusively on custom, made-to-room furniture.",
  },
  {
    icon: PackageCheck,
    value: "500+",
    label: "Custom pieces designed & installed",
    detail: "Each one drawn up for a specific room, not a catalogue number.",
  },
  {
    icon: Users,
    value: "300+",
    label: "Homeowners across Chattogram",
    detail: "From first sketch to a finished room they walk into daily.",
  },
  {
    icon: Award,
    value: "3",
    label: "Industry honours since 2024",
    detail:
      "Furniture-fair exhibitions, Chamber membership, and nationwide recognition.",
  },
];

export const recognitions = [
  {
    year: "2024–25",
    title: "International Furniture Fair, Chattogram",
    note: "Exhibitor",
  },
  { year: "2025", title: "Chamber of Commerce", note: "Member" },
  { year: "2026", title: "BFIOA Recognition", note: "Nationwide honour" },
];

export const faqs = [
  {
    q: "Do you only build custom pieces, or is there a ready collection too?",
    a: "Both. Explore living, bedroom, and dining pieces in showroom-ready designs, or bring us a space and start something fully bespoke — sized, finished, and built around your room.",
  },
  {
    q: "How long does a bespoke piece take?",
    a: "Most custom work moves from consultation to installation in a few weeks, depending on complexity and material availability. Your consultant will confirm a realistic timeline at the free design consultation.",
  },
  {
    q: "What materials do you work with?",
    a: "Premium solid woods, veneers, and upholstery fabrics chosen for durability and finish, worked by our in-house craftsmen at the Agrabad workshop.",
  },
  {
    q: "Do you deliver and install?",
    a: "Yes. Every order includes delivery and professional installation, so the piece arrives ready to live in your room, not just dropped at the door.",
  },
  {
    q: "What if I'm not sure what I want yet?",
    a: "That’s what the free design consultation and studio brief are for. Share a room photo and a few preferences, and we’ll help you shape a direction before anything is decided.",
  },
  {
    q: "Do you offer flexible payment?",
    a: "Yes, we offer easy payment options. Your consultant can walk you through what fits your project during the first conversation.",
  },
];

export const galleryItems = [
  {
    image: "showroomTour" as const,
    label: "Virtual showroom tour",
    meta: "Published / Heaven Furniture Mart YouTube",
    external: true,
  },
  {
    image: "homeDecor" as const,
    label: "Home décor series",
    meta: "Published channel reference / 2023",
    external: true,
  },
  {
    image: "bathroomDecor" as const,
    label: "Bathroom décor series",
    meta: "Published channel reference / 2023",
    external: true,
  },
  {
    image: "seasonalDecor" as const,
    label: "Seasonal décor series",
    meta: "Published channel reference / Heaven Furniture Mart",
    external: true,
  },
];

export const navSections = [
  { id: "top", label: "Studio" },
  { id: "ai-story", label: "Intelligence" },
  { id: "collections", label: "Collections" },
  { id: "bespoke", label: "Bespoke" },
  { id: "studio-brief", label: "Brief" },
  { id: "contact", label: "Visit" },
];
