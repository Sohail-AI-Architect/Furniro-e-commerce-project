export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  isNew?: boolean;
  category: "Dining" | "Living" | "Bedroom";
  image: string;
  gallery?: string[];
  featureImages?: string[];
  colorImages?: Record<string, string>;
};

export const products: Product[] = [
  {
    id: "syltherine",
    slug: "syltherine",
    name: "Syltherine",
    description: "Stylish cafe chair",
    price: 2500000,
    oldPrice: 3500000,
    discount: 30,
    category: "Dining",
    image: "/images/product-syltherine.jpg",
  },
  {
    id: "leviosa",
    slug: "leviosa",
    name: "Leviosa",
    description: "Stylish cafe chair",
    price: 2500000,
    category: "Dining",
    image: "/images/leviosa.jpg",
  },
  {
    id: "lolito",
    slug: "lolito",
    name: "Lolito",
    description: "Luxury big sofa",
    price: 7000000,
    oldPrice: 14000000,
    discount: 50,
    category: "Living",
    image: "/images/product-lolito.jpg",
  },
  {
    id: "respira",
    slug: "respira",
    name: "Respira",
    description: "Outdoor bar table and stool",
    price: 500000,
    isNew: true,
    category: "Living",
    image: "/images/product-respira.jpg",
  },
  {
    id: "grifo",
    slug: "grifo",
    name: "Grifo",
    description: "Night lamp",
    price: 1500000,
    category: "Bedroom",
    image: "/images/product-grifo.jpg",
  },
  {
    id: "muggo",
    slug: "muggo",
    name: "Muggo",
    description: "Small mug",
    price: 150000,
    isNew: true,
    category: "Dining",
    image: "/images/product-muggo.jpg",
  },
  {
    id: "pingky",
    slug: "pingky",
    name: "Pingky",
    description: "Cute bed set",
    price: 7000000,
    oldPrice: 14000000,
    discount: 50,
    category: "Bedroom",
    image: "/images/product-pingky.jpg",
  },
  {
    id: "potty",
    slug: "potty",
    name: "Potty",
    description: "Minimalist flower pot",
    price: 500000,
    isNew: true,
    category: "Dining",
    image: "/images/product-potty.jpg",
  },
];

export const asgaardSofa: Product = {
  id: "asgaard-sofa",
  slug: "asgaard-sofa",
  name: "Asgaard sofa",
  description: "Three-seater sofa with solid wood frame",
  price: 250000,
  oldPrice: 350000,
  discount: 29,
  isNew: true,
  category: "Living",
  image: "/images/product-asgaard-main.jpg",
  gallery: [
    "/images/product-asgaard-main.jpg",
    "/images/product-asgaard-2.jpg",
    "/images/product-asgaard-3.jpg",
    "/images/product-asgaard-4.jpg",
  ],
  featureImages: [
    "/images/product-asgaard-feature-1.jpg",
    "/images/product-asgaard-feature-2.jpg",
  ],
  colorImages: {
    Purple: "/images/product-asgaard-2.jpg",
    Black: "/images/product-asgaard-3.jpg",
    Gold: "/images/product-asgaard-main.jpg",
  },
};

export const outdoorSofaSet: Product = {
  id: "outdoor-sofa-set",
  slug: "outdoor-sofa-set",
  name: "Outdoor Sofa Set",
  description: "Three seater and two single seater outdoor sofa set",
  price: 224000,
  category: "Living",
  image: "/images/product-outdoor-sofa.jpg",
};

export const allProducts: Product[] = [...products, asgaardSofa, outdoorSofaSet];

export const productsBySlug = allProducts.reduce<Record<string, Product>>(
  (acc, product) => {
    if (!acc[product.slug]) acc[product.slug] = product;
    return acc;
  },
  {},
);

export const getProduct = (slug: string) => productsBySlug[slug];

export const shopProducts: Product[] = Array.from({ length: 4 }).flatMap((_, round) =>
  allProducts.map((product) => ({
    ...product,
    id: round === 0 ? product.id : `${product.id}-${round}`,
  })),
);

export const categories = [
  { name: "Dining", image: "/images/category-dining.jpg" },
  { name: "Living", image: "/images/category-living.jpg" },
  { name: "Bedroom", image: "/images/category-bedroom.jpg" },
];

export const roomInspirations = [
  {
    id: "01",
    label: "Bed Room",
    title: "Inner Peace",
    image: "/images/inspiration-1.jpg",
  },
  {
    id: "02",
    label: "Living Room",
    title: "Cozy Corner",
    image: "/images/inspiration-2.jpg",
  },
  {
    id: "03",
    label: "Dining Room",
    title: "Warm Gatherings",
    image: "/images/inspiration-3.jpg",
  },
];

export const funiroGallery = [
  "/images/gallery-1.jpg",
  "/images/gallery-2.jpg",
  "/images/gallery-3.jpg",
  "/images/gallery-4.jpg",
  "/images/gallery-5.jpg",
  "/images/gallery-6.jpg",
  "/images/gallery-7.jpg",
  "/images/gallery-8.jpg",
  "/images/gallery-9.jpg",
];

export const formatPrice = (value: number, fractionDigits = 0) =>
  `Rp ${new Intl.NumberFormat("id-ID", {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(value)}`;
