export type Product = {
  id: string;
  name: string;
  colorName: string;
  swatch: string;
  description: string;
  image: string;
  imageAlt: string;
  studioVideo: string;
  studioPoster: string;
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
    studioVideo: "/videos/studio-sand.mp4",
    studioPoster: "/posters/studio-sand.jpg",
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
    studioVideo: "/videos/studio-olive.mp4",
    studioPoster: "/posters/studio-olive.jpg",
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
    studioVideo: "/videos/studio-brown.mp4",
    studioPoster: "/posters/studio-brown.jpg",
  },
];
