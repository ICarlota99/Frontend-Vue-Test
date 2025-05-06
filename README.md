# 🛍️ Frontend Vue Test – Online Store

This is a frontend project built with **Vue 3 + TypeScript**, simulating a product showcase for an online store. The design was based on a provided Figma prototype, with a focus on responsive layout, clean structure, and good developer practices.

## 🌐 Check the website at:
https://icarlota99.github.io/Vue-Market/

## 🧩 What I Built

The application’s **homepage** includes multiple sections (it's still incomplete):

- A **scrolling grid** with circular icons, allowing horizontal navigation.
- A fixed **product grid** that displays 10 product cards in a clean, responsive layout.
- Reusable components like `ProductCard`, `RoundImage`, `ScrollingGrid`, and `ProductGrid` were built with scalability in mind.

Each product card leads to a **dedicated product detail view** (`/products/{id}/details`). This page displays extended product data, including any available variations.

## 🔌 Mock API

Instead of integrating a live backend, the app uses a **mock API** built with `Axios Mock Adapter`. The following endpoints are simulated:

- `GET /products/published/web`: Returns a list of mock products.
- `GET /products/{id}/details`: Returns detailed data for a selected product.
- `GET /categories`: Returns a list of categories.

This allowed development of API integration and loading states without needing a real backend.

## ⚙️ Technical Stack

- **Vue 3** with **Composition API**
- **TypeScript** for strong typing and clarity
- **Tailwind CSS** for modern, responsive styling
- **Pinia** for state management (e.g., product store, category store, cart logic (this still needs improvements))
- **Vue Router** for navigation
- **Axios** for HTTP requests with mocked endpoints
- **Loading skeletons** for better UX while fetching data

## ✨ UX & Features

- Responsive layout for mobile and desktop
- Smooth animations when hovering product cards
- Reusable UI components
- Clean component structure and separation of concerns
- Well-typed state and props with TypeScript
- Use of loading skeletons to improve UX when loaging sections

---

This project was developed as part of a technical assessment and showcases modern Vue.js development with attention to UI/UX, state handling, and API integration.
