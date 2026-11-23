import type { EventItem } from "../types/event";

export const events: EventItem[] = [
  {
    id: 1,
    title: "Hommikune Metsajooga",
    description: "Rahulik ja taastav joogatund keset sügisest metsa. Sobib algajatele ja edasijõudnutele. Sissepääs tasuta.",
    startsAt: "2026-09-28T09:00",
    location: "Järveotsa metsarada, Harjumaa",
    tags: ["metsajooga", "jooga", "meditatsioon", "vabaõhuüritus"],
    url: "https://example.ee/hommikune-metsajooga",
  },
  {
    id: 2,
    title: "Rabamatk koos päikesetõusuga",
    description: "Rahulik matk päikesetõusu ajal, mis lõppeb sooja taimetee joomisega rabasaarel. Sissepääs tasuta.",
    startsAt: "2026-10-05T06:30",
    location: "Viru raba, Lahemaa",
    tags: ["raba", "päikesetõus", "matk", "loodus"],
    url: "https://example.ee/rabamatk",
  },
  {
    id: 3,
    title: "Seene- ja marjamatk",
    description: "Matk juhendajaga, kes õpetab ohutult seeni määrama, jagatakse nippe marjade korjamiseks ning jagatakse ka huvitavaid retsepte. Sissepääs tasuta.",
    startsAt: "2026-11-02T11:00",
    location: "Harku mets, Harjumaa",
    tags: ["seened", "marjad", "matk", "toit"],
    url: "https://example.ee/seene-marjamatk",
  },
  {
    id: 4,
    title: "Telkimine metsas",
    description: "Mõnus telkimise kogemus metsas. Õhtul saab teha lõket ja nautida loodust. Sissepääs tasuline ja piiratud.",
    startsAt: "2026-10-12T19:00",
    location: "Pääsküla raba serv, Harjumaa",
    tags: ["telkimine", "lõke", "loodus", "tasuline"],
    url: "https://example.ee/telkimine-metsas",
  },
];