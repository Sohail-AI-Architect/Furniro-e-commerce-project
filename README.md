# ??? Furniro - Premium E-Commerce Application

<p align="center">
  <a href="https://furniro-e-commerce-project.vercel.app">
    <img src="https://img.shields.io/badge/Live%20Demo-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Demo" />
  </a>
  <img src="https://img.shields.io/badge/Next.js%2015-App%20Router-black?style=for-the-badge&logo=nextdotjs" alt="Next.js 15" />
  <img src="https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind%20CSS-3.4-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License" />
</p>

<p align="center">
  <b>?? Live Application:</b> <a href="https://furniro-e-commerce-project.vercel.app">https://furniro-e-commerce-project.vercel.app</a>
</p>

---

## ?? Overview

A modern, pixel-perfect, fully functional e-commerce storefront built from Figma design specifications. **Furniro** delivers a polished shopping experience for furniture and home décor across mobile, tablet, and desktop, featuring interactive product variants, persistent cart & wishlist, product comparison, dynamic blog search, and a complete checkout flow.

---

## ??? Tech Stack

| Layer | Technology |
| --- | --- |
| **Framework** | Next.js 15.5 (App Router) |
| **Language** | TypeScript 5.9 |
| **UI Library** | React 19 |
| **Styling** | Tailwind CSS 3.4 |
| **State Management** | React Context (\CartProvider\, \WishlistProvider\, \ComparisonProvider\) |
| **Persistence** | Browser \localStorage\ |
| **Icons & UI** | Custom lightweight SVG icon components |
| **Data Source** | Static product catalog in \lib/products.ts\ |

---

## ?? Key Features

- ?? **100% Responsive Design:** Verified across \320px\ to \1440px+\ screen widths.
- ?? **Interactive Cart Drawer:** Slide-in cart sidebar with live totals, item deletion, and LocalStorage sync.
- ?? **Product Comparison Engine:** Side-by-side spec comparison table with direct add-to-cart actions.
- ?? **Wishlist System:** Persistent saved items with live count badges in the header.
- ?? **Dynamic Catalog & Search:** Instant product filtering, category chips, and search overlay.
- ?? **Blog & Article Search:** 24 articles with real-time query parameter filtering (\?q=\).
- ?? **Checkout & Order Processing:** Complete form validation, order summary, and post-checkout state reset.

---

## ??? Page Routes

- \/\ — Homepage (Hero, Categories, Featured Grid, Room Inspiration, Gallery)
- \/shop\ — Product Catalog (Filters, Grid/List view, Pagination, Sorting)
- \/product/[slug]\ — Dynamic Product Detail (Variants, Swatches, Image Zoom, Sharing)
- \/cart\ — Cart Management Page
- \/checkout\ — Checkout & Order Confirmation
- \/product-comparison\ — Product Comparison Matrix
- \/blog\ — Blog Listings with Search
- \/wishlist\ — Saved Wishlist Items
- \/contact\ — Contact Form & Store Details

---

## ?? Getting Started

\\\ash
# 1. Clone repo
git clone https://github.com/Sohail-AI-Architect/Furniro-e-commerce-project.git

# 2. Install dependencies
npm install

# 3. Run development server
npm run dev
\\\

---

## ?? License

This project is licensed under the MIT License.
