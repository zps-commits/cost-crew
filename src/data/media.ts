// Central media registry. Swap file paths here to replace any asset on the site.

export type CarouselItem = {
  src: string;
  alt: string;
  caption: string;
};

// Floating 3D carousel (section 4)
export const carouselItems: CarouselItem[] = [
  {
    src: "/images/skate-backview.jpg",
    alt: "Man from behind holding a skateboard, off-white tee, rocky coast at sunset",
    caption: "Off the rocks",
  },
  {
    src: "/images/fabric-brown-logo.jpg",
    alt: "Macro of chocolate brown cotton tee with Cost Crew wave logo",
    caption: "The mark",
  },
  {
    src: "/images/surf-brown-beach.jpg",
    alt: "Surfer with board in brown Cost Crew tee at golden hour",
    caption: "Board days",
  },
  {
    src: "/images/skate-road-brown.jpg",
    alt: "Skater in brown tee on a palm-lined coastal road at sunset",
    caption: "Coast road",
  },
  {
    src: "/images/packaging-box.jpg",
    alt: "Premium kraft packaging with folded Cost Crew tee, tag and pouch",
    caption: "First touch",
  },
  {
    src: "/images/detail-collar-label.jpg",
    alt: "Close-up of collar stitching and woven wave label",
    caption: "The finish",
  },
  {
    src: "/images/coastal-road-sunset.jpg",
    alt: "Wide coastal road with palm trees and ocean at sunset",
    caption: "Golden hour",
  },
];

// Editorial gallery (section 10)
export const galleryItems: CarouselItem[] = [
  {
    src: "/images/skate-road-brown.jpg",
    alt: "Skater in brown tee riding a coastal road at sunset",
    caption: "Street",
  },
  {
    src: "/images/olive-rocks.jpg",
    alt: "Man in olive tee on coastal rocks",
    caption: "Olive",
  },
  {
    src: "/images/surf-brown-beach.jpg",
    alt: "Surfer with board on the beach",
    caption: "Surf",
  },
  {
    src: "/images/fabric-brown-logo.jpg",
    alt: "Macro of brown fabric with logo",
    caption: "Fabric",
  },
  {
    src: "/images/skate-backview.jpg",
    alt: "Skater looking out to sea, off-white tee",
    caption: "Coast",
  },
  {
    src: "/images/packaging-box.jpg",
    alt: "Premium packaging",
    caption: "Unboxing",
  },
];

export const lifestyleMedia = {
  skateVideo: "/videos/skate-road.mp4",
  skatePoster: "/posters/skate-road.jpg",
  skateCloseupVideo: "/videos/skate-closeup.mp4",
  skateCloseupPoster: "/posters/skate-closeup.jpg",
  surf: "/images/surf-brown-beach.jpg",
  skateBackview: "/images/skate-backview.jpg",
  oliveRocks: "/images/olive-rocks.jpg",
};

export const manifestoMedia = {
  video: "/videos/trio-walking.mp4",
  poster: "/posters/trio-walking.jpg",
  editorialVideo: "/videos/trio-editorial.mp4",
  editorialPoster: "/posters/trio-editorial.jpg",
};

export const heroMedia = {
  video: "/videos/trio-walking.mp4",
  poster: "/posters/trio-walking.jpg",
};

export const qualityMedia = {
  fabricVideo: "/videos/fabric-macro.mp4",
  fabricPoster: "/posters/fabric-macro.jpg",
  detail: "/images/detail-collar-label.jpg",
  fabric: "/images/fabric-brown-logo.jpg",
};

export const packagingMedia = {
  image: "/images/packaging-box.jpg",
};

export const ctaMedia = {
  image: "/images/coastal-road-sunset.jpg",
};

// Blurred background loops behind the Studio Lookbook cards
export const lookbookBackdrops = [
  "/videos/studio-sand-alt.mp4",
  "/videos/studio-olive-alt.mp4",
  "/videos/studio-brown-alt.mp4",
];
