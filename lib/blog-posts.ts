export const blogCategoryNames = [
  "Crafts",
  "Design",
  "Handmade",
  "Interior",
  "Wood",
] as const;

export type BlogCategory = (typeof blogCategoryNames)[number];

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  date: string;
  dateTime: string;
  image: string;
  readingTime: string;
  content: string[];
  quote: string;
};

const excerpt =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mus mauris vitae ultricies leo integer malesuada nunc. In nulla posuere sollicitudin aliquam ultrices. Morbi blandit cursus risus at ultrices mi tempus imperdiet. Libero enim sed faucibus turpis in. Cursus mattis molestie a iaculis at erat. Nibh cras pulvinar mattis nunc sed blandit libero. Pellentesque elit ullamcorper dignissim cras tincidunt. Pharetra et ultrices neque ornare aenean euismod elementum.";

const featuredPosts: BlogPost[] = [
  {
    slug: "going-all-in-with-millennial-design",
    title: "Going all-in with millennial design",
    excerpt,
    category: "Wood",
    date: "14 Oct 2022",
    dateTime: "2022-10-14",
    image: "/images/blog-post-1.jpg",
    readingTime: "5 min read",
    content: [
      "Millennial interiors are less about chasing a single look and more about creating a home that feels personal, useful and easy to live in. The best rooms mix clean lines with objects that carry a story, allowing the space to evolve instead of feeling finished all at once.",
      "Start with a calm foundation: warm neutrals, natural materials and furniture with simple silhouettes. Then layer in the details that make the room yours, from a vintage rug to a hand-thrown vase or a chair discovered at a weekend market.",
      "Texture does much of the work. Combine smooth surfaces with timber grain, linen, boucle and brushed metal so that even a restrained palette feels rich. Lighting should be layered too, with soft ambient light supported by task and accent pieces.",
      "The result is a home that feels collected rather than staged. It is relaxed, adaptable and ready for the way real life moves through a room.",
    ],
    quote:
      "Good design should feel personal, not performative. The pieces you live with every day matter most.",
  },
  {
    slug: "exploring-new-ways-of-decorating",
    title: "Exploring new ways of decorating",
    excerpt,
    category: "Handmade",
    date: "14 Oct 2022",
    dateTime: "2022-10-14",
    image: "/images/blog-post-2.jpg",
    readingTime: "4 min read",
    content: [
      "Decorating is no longer about filling every corner. A more thoughtful approach gives each object room to breathe, letting shape, colour and negative space work together.",
      "Try beginning with one piece you genuinely love. Build the palette around it, then repeat a colour or material in two or three places so the room feels connected without becoming matching.",
      "Scale is just as important as colour. A large artwork or an oversized lamp can give a small room confidence, while a low sofa or open shelving can make a compact space feel more generous.",
      "The most memorable rooms are the ones that invite curiosity. Leave a little space for discovery and let the arrangement change as you find new things.",
    ],
    quote:
      "A room does not need more things. It needs the right things, placed with intention.",
  },
  {
    slug: "handmade-pieces-that-took-time-to-make",
    title: "Handmade pieces that took time to make",
    excerpt,
    category: "Wood",
    date: "14 Oct 2022",
    dateTime: "2022-10-14",
    image: "/images/blog-post-3.jpg",
    readingTime: "6 min read",
    content: [
      "Handmade furniture carries the marks of its making. A slight variation in grain, a softened edge or a visible joint is not a flaw; it is evidence of the time and skill behind the piece.",
      "Working with natural materials asks for patience. Timber needs to settle, joints need to be tested and finishes need time to cure. Those slower processes often produce furniture that lasts for generations.",
      "Choosing handmade also means choosing a relationship with the maker. Understanding where a material comes from and how a piece is constructed helps us value it differently and care for it for longer.",
      "In a world of disposable interiors, handmade pieces offer a quieter kind of luxury: objects with character, made to be repaired, passed on and remembered.",
    ],
    quote:
      "The small imperfections are often the details that make a handmade piece worth keeping.",
  },
];

type BlogPostSeed = {
  slug: string;
  title: string;
  category: BlogCategory;
  date: string;
  dateTime: string;
  image: string;
};

const additionalPostSeeds: BlogPostSeed[] = [
  {
    slug: "quiet-joy-of-hand-painted-ceramics",
    title: "The quiet joy of hand-painted ceramics",
    category: "Crafts",
    date: "12 Oct 2022",
    dateTime: "2022-10-12",
    image: "/images/blog-1.jpg",
  },
  {
    slug: "beginners-guide-to-macrame-wall-art",
    title: "A beginner's guide to macrame wall art",
    category: "Crafts",
    date: "09 Oct 2022",
    dateTime: "2022-10-09",
    image: "/images/blog-2.jpg",
  },
  {
    slug: "designing-a-calm-reading-corner",
    title: "Designing a calm reading corner",
    category: "Design",
    date: "07 Oct 2022",
    dateTime: "2022-10-07",
    image: "/images/blog-3.jpg",
  },
  {
    slug: "how-lighting-shapes-a-room",
    title: "How lighting shapes a room",
    category: "Design",
    date: "05 Oct 2022",
    dateTime: "2022-10-05",
    image: "/images/blog-4.jpg",
  },
  {
    slug: "small-space-big-design-ideas",
    title: "Small space, big design ideas",
    category: "Design",
    date: "02 Oct 2022",
    dateTime: "2022-10-02",
    image: "/images/blog-post-1.jpg",
  },
  {
    slug: "art-of-mixing-old-and-new",
    title: "The art of mixing old and new",
    category: "Design",
    date: "29 Sep 2022",
    dateTime: "2022-09-29",
    image: "/images/blog-post-2.jpg",
  },
  {
    slug: "guide-to-choosing-the-perfect-rug",
    title: "A guide to choosing the perfect rug",
    category: "Design",
    date: "26 Sep 2022",
    dateTime: "2022-09-26",
    image: "/images/blog-post-3.jpg",
  },
  {
    slug: "colour-palettes-that-stand-the-test-of-time",
    title: "Colour palettes that stand the test of time",
    category: "Design",
    date: "23 Sep 2022",
    dateTime: "2022-09-23",
    image: "/images/blog-1.jpg",
  },
  {
    slug: "creating-balance-with-negative-space",
    title: "Creating balance with negative space",
    category: "Design",
    date: "20 Sep 2022",
    dateTime: "2022-09-20",
    image: "/images/blog-2.jpg",
  },
  {
    slug: "why-texture-matters-in-modern-interiors",
    title: "Why texture matters in modern interiors",
    category: "Design",
    date: "17 Sep 2022",
    dateTime: "2022-09-17",
    image: "/images/blog-3.jpg",
  },
  {
    slug: "story-behind-hand-woven-textiles",
    title: "The story behind hand-woven textiles",
    category: "Handmade",
    date: "14 Sep 2022",
    dateTime: "2022-09-14",
    image: "/images/blog-4.jpg",
  },
  {
    slug: "celebrating-the-makers-in-our-community",
    title: "Celebrating the makers in our community",
    category: "Handmade",
    date: "11 Sep 2022",
    dateTime: "2022-09-11",
    image: "/images/blog-post-1.jpg",
  },
  {
    slug: "why-slow-furniture-is-worth-the-wait",
    title: "Why slow furniture is worth the wait",
    category: "Handmade",
    date: "08 Sep 2022",
    dateTime: "2022-09-08",
    image: "/images/blog-post-2.jpg",
  },
  {
    slug: "from-workshop-to-living-room",
    title: "From workshop to living room",
    category: "Handmade",
    date: "05 Sep 2022",
    dateTime: "2022-09-05",
    image: "/images/blog-post-3.jpg",
  },
  {
    slug: "beauty-of-hand-carved-details",
    title: "The beauty of hand-carved details",
    category: "Handmade",
    date: "02 Sep 2022",
    dateTime: "2022-09-02",
    image: "/images/blog-1.jpg",
  },
  {
    slug: "meet-the-artisans-behind-our-collection",
    title: "Meet the artisans behind our collection",
    category: "Handmade",
    date: "30 Aug 2022",
    dateTime: "2022-08-30",
    image: "/images/blog-2.jpg",
  },
  {
    slug: "modern-home-tour-in-milan",
    title: "A modern home tour in Milan",
    category: "Interior",
    date: "27 Aug 2022",
    dateTime: "2022-08-27",
    image: "/images/blog-post-1.jpg",
  },
  {
    slug: "choosing-the-right-wood-for-your-home",
    title: "Choosing the right wood for your home",
    category: "Wood",
    date: "24 Aug 2022",
    dateTime: "2022-08-24",
    image: "/images/blog-post-2.jpg",
  },
  {
    slug: "warmth-of-solid-oak-furniture",
    title: "The warmth of solid oak furniture",
    category: "Wood",
    date: "21 Aug 2022",
    dateTime: "2022-08-21",
    image: "/images/blog-post-3.jpg",
  },
  {
    slug: "caring-for-wooden-furniture-naturally",
    title: "Caring for wooden furniture naturally",
    category: "Wood",
    date: "18 Aug 2022",
    dateTime: "2022-08-18",
    image: "/images/blog-3.jpg",
  },
  {
    slug: "timeless-wood-finishes-for-every-room",
    title: "Timeless wood finishes for every room",
    category: "Wood",
    date: "15 Aug 2022",
    dateTime: "2022-08-15",
    image: "/images/blog-4.jpg",
  },
];

const buildContent = (title: string) => [
  `${title} is a story about the way thoughtful details can change the feeling of a home. It begins with a simple idea and grows through materials, light and the people who shape the space.`,
  "Natural textures, warm neutrals and a few carefully chosen pieces often do more than a room full of trends. The aim is a space that feels calm, useful and personal.",
  "Layering is part of the process. Combine smooth surfaces with timber grain, soft textiles and brushed metal, then let lighting add depth throughout the day.",
  "The result is a home that feels collected rather than staged: relaxed, adaptable and ready for everyday life.",
];

const buildPost = (seed: BlogPostSeed, index: number): BlogPost => ({
  ...seed,
  excerpt,
  readingTime: `${4 + (index % 4)} min read`,
  content: buildContent(seed.title),
  quote: `Every room tells a story. ${seed.title} is a reminder that the smallest details often speak the loudest.`,
});

const additionalPosts = additionalPostSeeds.map(buildPost);

export const blogPosts: BlogPost[] = [...featuredPosts, ...additionalPosts];

export const blogCategories = blogCategoryNames.map((label) => ({
  label,
  count: blogPosts.filter((post) => post.category === label).length,
}));

export const recentBlogPosts = [
  {
    title: "Going all-in with millennial design",
    date: "03 Aug 2022",
    image: "/images/blog-recent-1.jpg",
    slug: "going-all-in-with-millennial-design",
  },
  {
    title: "Exploring new ways of decorating",
    date: "03 Aug 2022",
    image: "/images/blog-recent-2.jpg",
    slug: "exploring-new-ways-of-decorating",
  },
  {
    title: "Handmade pieces that took time to make",
    date: "03 Aug 2022",
    image: "/images/blog-recent-3.jpg",
    slug: "handmade-pieces-that-took-time-to-make",
  },
  {
    title: "Modern home in Milan",
    date: "03 Aug 2022",
    image: "/images/blog-recent-4.jpg",
  },
  {
    title: "Colorful office redesign",
    date: "03 Aug 2022",
    image: "/images/blog-recent-5.jpg",
  },
];

export const getBlogPost = (slug: string) =>
  blogPosts.find((post) => post.slug === slug);

export const matchesCategory = (postCategory: string, category: string) =>
  postCategory.trim().toLowerCase() === category.trim().toLowerCase();
