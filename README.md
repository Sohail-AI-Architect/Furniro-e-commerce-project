# Furniro E-Commerce Application

A modern, pixel-perfect, fully functional e-commerce storefront built from Figma design specifications. Furniro delivers a polished shopping experience for furniture and home décor across mobile, tablet, and desktop, with interactive product variants, a persistent cart and wishlist, product comparison, dynamic blog search, and a responsive checkout flow.

The application is built with **Next.js 15 (App Router)**, **React 19**, **TypeScript**, and **Tailwind CSS**. Product, cart, wishlist, and comparison data are managed client-side with React Context and persisted in `localStorage`.

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Key Features](#key-features)
- [Page Routing](#page-routing)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [State & Persistence](#state--persistence)
- [Responsive Breakpoints](#responsive-breakpoints)
- [Verification](#verification)
- [Production Notes](#production-notes)

---

## Tech Stack

| Layer | Technology |
| --- | --- |
| Framework | Next.js 15.5 (App Router) |
| Language | TypeScript 5.9 |
| UI Library | React 19 |
| Styling | Tailwind CSS 3.4 |
| State Management | React Context (`CartProvider`, `WishlistProvider`, `ComparisonProvider`) |
| Persistence | Browser `localStorage` |
| Icons & UI | Custom lightweight SVG icon components in `components/icons.tsx` |
| Typography | Poppins via `next/font/google` |
| Images | `next/image` with local optimized assets |
| Data Source | Static catalog in `lib/products.ts` |

> No external state-management, UI component, or icon libraries are required by this build.

---

## Key Features

### 100% Responsive Design

- Pixel-perfect layouts across mobile, tablet, and desktop.
- Verified at `320px`, `375px`, `480px`, `768px`, `1024px`, `1025px`, `1280px`, and `1440px+`.
- Responsive product grids: 2 columns on tablets and 4 columns on desktop.
- Mobile and tablet navigation with an accessible slide-out menu.
- Full-width cart drawer on mobile, exact desktop drawer geometry.

### Product Detail Interactivity

- Dynamic product routes using slugs.
- Size and color variant selection.
- Live product image updates when a color swatch is selected.
- Quantity counter with validation.
- Add to Cart with selected variants preserved.
- Related products section.
- Product sharing via social networks and clipboard copy.

### Interactive Cart Drawer

- Slide-in cart sidebar with overlay and smooth transitions.
- Real-time item count, line items, and subtotal calculation.
- Quantity editing and item removal on the cart page.
- Automatic cart badge synchronization.
- LocalStorage persistence across reloads.
- Close via button, overlay click, or `Escape`.

### Shop & Search

- 40-result catalog with category filtering.
- Grid and list view modes.
- Show-per-page selector with pagination.
- Sorting by price and name.
- Global search overlay with instant product matching.
- Dedicated search results page using `/search?q=`.

### Dynamic Blog Search & Filter

- 24 blog posts with individual article routes.
- Synchronized search input and URL query parameters (`?q=`).
- Category chips for filtering by topic.
- Case-insensitive matching and clear-filter action.
- Empty-state handling and result counts.

### Wishlist System

- Add or remove products from the wishlist.
- Live header badge count synchronization.
- Dedicated saved-items page.
- LocalStorage persistence.
- Empty wishlist state.

### Share & Comparison Engine

- Clipboard copy for product links with success feedback.
- Social share actions for products.
- Product comparison page with a feature matrix.
- Compare up to two products side by side.
- Direct add-to-cart from the comparison table.
- Persistent comparison selection via LocalStorage.

### Interactive Contact Form

- Client-side submission using `event.preventDefault()`.
- Required field validation.
- Form clearing after successful submission.
- Success feedback banner.
- Contact details, phone, and working hours sections.

### Checkout Flow

- Shipping and contact information form.
- Required-field validation.
- Order confirmation state.
- Cart clearing after order placement.
- Redirect to the home page after confirmation.

### Accessibility & UX

- Semantic headings and landmarks.
- ARIA labels for icon-only controls.
- Keyboard support for closing the cart and search overlay.
- Visible focus states and interactive feedback.
- Reduced layout shift through optimized image sizing.

---

## Page Routing

| Route | Description |
| --- | --- |
| `/` | Home page with hero, category browsing, product grid, room inspiration, and gallery |
| `/shop` | Shop page with 40 results, category filtering, sorting, pagination, and grid/list views |
| `/product/[slug]` | Dynamic product detail page with variants, quantity, sharing, and related products |
| `/cart` | Cart page with quantity controls, item removal, and totals |
| `/cart-sidebar` | Standalone cart drawer preview route |
| `/checkout` | Checkout form, validation, order confirmation, and cart clearing |
| `/comparison` | Comparison alias that redirects to `/product-comparison` |
| `/product-comparison` | Product comparison matrix and direct add-to-cart |
| `/blog` | Blog listing with search, category filtering, and result counts |
| `/blog/[id]` | Individual blog article page |
| `/contact` | Contact information and interactive contact form |
| `/wishlist` | Saved wishlist items |
| `/search?q=` | Search results page |
| `/about` | Brand and studio information |

> Product URLs use the product slug, for example `/product/asgaard-sofa`.

---

## Project Structure

```text
.
├── app/                       # Next.js App Router pages and layouts
│   ├── about/
│   ├── blog/
│   ├── cart/
│   ├── cart-sidebar/
│   ├── checkout/
│   ├── comparison/            # Redirect alias
│   ├── contact/
│   ├── product/[slug]/
│   ├── product-comparison/
│   ├── search/
│   ├── shop/
│   ├── wishlist/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/                # Shared UI and client interaction components
│   ├── cart-provider.tsx
│   ├── cart-sidebar.tsx
│   ├── comparison-provider.tsx
│   ├── contact-form.tsx
│   ├── icons.tsx
│   ├── product-card.tsx
│   ├── product-detail.tsx
│   ├── search-modal.tsx
│   ├── shop-client.tsx
│   ├── site-header.tsx
│   ├── wishlist-provider.tsx
│   └── ...
├── lib/
│   └── products.ts             # Product catalog and formatting helpers
├── public/
│   └── images/                 # Local product, category, and editorial imagery
├── scripts/
│   └── fetch-assets.mjs
├── next.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## Getting Started

### Prerequisites

- **Node.js** `>= 18.18` (Node.js 20 LTS recommended)
- **npm** `>= 9`
- Git

### 1. Clone the Repository

```bash
git clone <repository-url> ecommerce-store
cd ecommerce-store
```

Replace `<repository-url>` with the project repository URL.

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Create a Production Build

```bash
npm run build
```

### 5. Run the Production Build Locally

```bash
npm run start
```

The production server runs on [http://localhost:3000](http://localhost:3000) by default. To use a different port:

```bash
npm run start -- -p 3100
```

---

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Next.js development server |
| `npm run build` | Create an optimized production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run Next.js ESLint checks |

---

## State & Persistence

All commerce state is client-side and persisted in the browser.

| Feature | Provider | LocalStorage Key |
| --- | --- | --- |
| Cart | `CartProvider` | `funiro-cart` |
| Wishlist | `WishlistProvider` | `funiro-wishlist` |
| Comparison | `ComparisonProvider` | `funiro-comparison` |

### Cart

- Stores product snapshot, quantity, selected size, and selected color.
- Merges quantities for the same product.
- Calculates count and subtotal from persisted items.
- Opens the cart drawer after adding an item.

### Wishlist

- Stores product slugs.
- Validates persisted slugs against the local product catalog.
- Keeps the header badge in sync with saved items.

### Comparison

- Stores product slugs.
- Limits comparison to two products.
- Validates persisted entries against the catalog.

> Data is scoped to the current browser and origin. There is no account sync or server database.

---

## Responsive Breakpoints

| Range | Layout Behavior |
| --- | --- |
| `320px–479px` | Single-column grids, stacked forms, mobile navigation, full-width cart drawer |
| `480px–1024px` | Two-column product grids, tablet navigation, 417px cart drawer |
| `1025px–1440px+` | Four-column product grids, desktop navigation, full Figma desktop layout |

Key Tailwind breakpoints used in the implementation:

```text
sm   640px
lg   1024px
min-[480px]   custom large-mobile breakpoint
min-[1025px]  custom desktop product-grid breakpoint
```

The comparison table intentionally scrolls horizontally inside its container on smaller screens. Page-level horizontal overflow is prevented.

---

## Verification

The application has been validated with the following checks:

- Production build completes successfully with zero TypeScript errors.
- 29/29 interaction tests pass across navigation, search, wishlist, product variants, cart, checkout, blog, contact, sharing, and comparison.
- Responsive audit passes at `320`, `375`, `480`, `768`, `1024`, `1025`, `1280`, and `1440` pixels.
- Cart drawer dimensions verified: full-width on mobile, `417px` from tablet upward.
- No unexpected page-level horizontal overflow.
- Header cart and wishlist badges remain synchronized with persisted state.
- Cart and wishlist state survive page reloads.
- Product detail variant selection updates the preview image correctly.
- Blog search and category filters remain synchronized with the URL.

---

## Production Notes

- This project uses a static local product catalog in `lib/products.ts`.
- Checkout is a client-side demonstration flow. No payment gateway, order API, inventory service, or authentication backend is connected.
- Cart, wishlist, and comparison data are stored per browser using `localStorage`.
- Product imagery is served locally from `public/images` through `next/image`.
- The store is designed to match the supplied Figma specifications while remaining functional across all supported viewport sizes.

---

## License

This project is open-source and available under the [MIT License](LICENSE).
#   F u r n i r o - e - c o m m e r c e - p r o j e c t  
 