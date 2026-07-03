export type Product = {
  id: string;
  name: string;
  colorName: string;
  swatch: string;
  description: string;
  image: string;
  imageAlt: string;
  /** Crisp, calm single-pose clip shown on the front card (4:5). */
  studioVideo: string;
  studioPoster: string;
  /** Longer multi-pose loop used as the depth layer behind the card. */
  studioBackdrop: string;
  studioBackdropPoster: string;
};

export const products: Product[] = [
  {
    id: "sand",
    name: "Sand Oversized Tee",
    colorName: "Warm Sand",
    swatch: "#cbb493",
    description:
      "The everyday hero. Washed sand cotton with a relaxed drop-shoulder cut.",
    image: "/images/collection-flatlay.jpg",
    imageAlt: "Cost Crew folded tees in sand, olive and brown on natural linen",
    studioVideo: "/videos/studio-sand-fg.mp4",
    studioPoster: "/posters/studio-sand-fg.jpg",
    studioBackdrop: "/videos/studio-sand-bg.mp4",
    studioBackdropPoster: "/posters/studio-sand-bg.jpg",
  },
  {
    id: "olive",
    name: "Olive Oversized Tee",
    colorName: "Deep Olive",
    swatch: "#333f2c",
    description:
      "Muted, earthy and grounded. Heavyweight cotton with a coastal-washed finish.",
    image: "/images/olive-rocks.jpg",
    imageAlt: "Man in olive Cost Crew oversized tee sitting on coastal rocks at sunset",
    studioVideo: "/videos/studio-olive-fg.mp4",
    studioPoster: "/posters/studio-olive-fg.jpg",
    studioBackdrop: "/videos/studio-olive-bg.mp4",
    studioBackdropPoster: "/posters/studio-olive-bg.jpg",
  },
  {
    id: "brown",
    name: "Brown Oversized Tee",
    colorName: "Chocolate",
    swatch: "#4a3524",
    description:
      "Rich chocolate tone with a soft, broken-in hand feel from the first wear.",
    image: "/images/surf-brown-beach.jpg",
    imageAlt: "Man in brown Cost Crew tee holding a surfboard on the beach at golden hour",
    studioVideo: "/videos/studio-brown-fg.mp4",
    studioPoster: "/posters/studio-brown-fg.jpg",
    studioBackdrop: "/videos/studio-brown-bg.mp4",
    studioBackdropPoster: "/posters/studio-brown-bg.jpg",
  },
];
