# Furniro E-Commerce Application

A modern, pixel-perfect, fully functional e-commerce storefront built from Figma design specifications. Furniro delivers a polished shopping experience for furniture and home décor across mobile, tablet, and desktop, with interactive product variants, a persistent cart and wishlist, product comparison, dynamic blog search, and a responsive checkout flow.

The application is built with **Next.js 15 (App Router)**, **React 19**, **TypeScript**, and **Tailwind CSS**. Product, cart, wishlist, and comparison data are managed client-side with React Context and persisted in \localStorage\.

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
| State Management | React Context (\CartProvider\, \WishlistProvider\, \ComparisonProvider\) |
| Persistence | Browser \localStorage\ |
| Icons & UI | Custom lightweight SVG icon components in \components/icons.tsx\ |
| Typography | Poppins via \
ext/font/google\ |
| Images | \
ext/image\ with local optimized assets |
| Data Source | Static catalog in \lib/products.ts\ |

> No external state-management, UI component, or icon libraries are required by this build.

---

## Key Features

### 100% Responsive Design
- Pixel-perfect layouts across mobile, tablet, and desktop.
- Verified at \320px\, \375px\, \480px\, \768px\, \1024px\, \1025px\, \1280px\, and \1440px+\.
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
- Close via button, overlay click, or \Escape\.

### Shop & Search
- 40-result catalog with category filtering.
- Grid and list view modes.
- Show-per-page selector with pagination.
- Sorting by price and name.
- Global search overlay with instant product matching.
- Dedicated search results page using \/search?q=\.

### Dynamic Blog Search & Filter
- 24 blog posts with individual article routes.
- Synchronized search input and URL query parameters (\?q=\).
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
- Client-side submission using \event.preventDefault()\.
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

---

## Page Routing

| Route | Description |
| --- | --- |
| \/\ | Home page with hero, category browsing, product grid, room inspiration, and gallery |
| \/shop\ | Shop page with 40 results, category filtering, sorting, pagination, and grid/list views |
| \/product/[slug]\ | Dynamic product detail page with variants, quantity, sharing, and related products |
| \/cart\ | Cart page with quantity controls, item removal, and totals |
| \/checkout\ | Checkout form, validation, order confirmation, and cart clearing |
| \/comparison\ | Comparison alias that redirects to \/product-comparison\ |
| \/product-comparison\ | Product comparison matrix and direct add-to-cart |
| \/blog\ | Blog listing with search, category filtering, and result counts |
| \/blog/[id]\ | Individual blog article page |
| \/contact\ | Contact information and interactive contact form |
| \/wishlist\ | Saved wishlist items |
| \/search?q=\ | Search results page |
| \/about\ | Brand and studio information |

---

## Getting Started

### Prerequisites
- **Node.js** \>= 18.18\ (Node.js 20 LTS recommended)
- **npm** \>= 9\
- Git

### 1. Clone the Repository
\\\ash
git clone https://github.com/Sohail-AI-Architect/Furniro-e-commerce-project.git ecommerce-store
cd ecommerce-store
\\\

### 2. Install Dependencies
\\\ash
npm install
\\\

### 3. Start the Development Server
\\\ash
npm run dev
\\\
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Create a Production Build
\\\ash
npm run build
\\\

---

## License
This project is open-source and available under the MIT License.
