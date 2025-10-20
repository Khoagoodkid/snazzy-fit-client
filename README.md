# 🛍️ SnazzyFit - Modern E-Commerce Fashion Platform

![SnazzyFit](https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80)

**SnazzyFit** is a modern, full-featured e-commerce platform for fashion retail, built with Next.js 14, TypeScript, and a beautiful gradient-based design system. Experience seamless shopping with a vibrant, nature-inspired UI and comprehensive customer features.

---

## ✨ Features

### 🛒 **Shopping Experience**
- **Dynamic Product Catalog** - Browse collections with advanced filtering and sorting
- **Product Details** - Comprehensive product pages with image galleries, variants (color/size), and reviews
- **Smart Search** - Real-time product search with keyword filtering
- **Shopping Cart** - Add, remove, and manage cart items with quantity controls
- **Collections & Categories** - Organized product browsing by collection and category
- **Price Filtering** - Interactive price range slider for budget-conscious shopping
- **Multi-Filter System** - Filter by season, style, availability, and more
- **Product Reviews** - View and submit detailed product reviews with images

### 🎨 **Modern Design System**
- **Vibrant Gradients** - Soft, nature-inspired color palettes (lime/emerald/teal, violet/purple, cyan/teal)
- **Glass Morphism** - Backdrop blur effects on cards and containers
- **Smooth Animations** - Framer Motion scroll animations on all sections
- **Responsive Design** - Mobile-first approach with elegant desktop layouts
- **Dark Mode Elements** - Sophisticated dark gradients for contrast sections
- **Pattern Overlays** - Subtle SVG textures for depth
- **Hover Effects** - Scale, translate, and color transitions on interactive elements

### 👤 **User Management**
- **Authentication System**
  - Email/Password login and registration
  - Google OAuth integration
  - Email verification
  - Password reset functionality
  - Change password with strength validation
- **User Profile**
  - Personal information management
  - Avatar upload with preview
  - Address book (CRUD operations)
  - Order history with status tracking
  - Password management

### 📦 **Order Management**
- **Checkout Process** - Multi-step checkout with customer info and payment method selection
- **Order Tracking** - View order details, status, and history
- **Order Status** - Real-time order status updates (pending, processing, shipped, delivered, cancelled)
- **Payment Integration** - Stripe payment processing with success/failure handling

### ⭐ **Product Reviews**
- **Review System** - Rate and review purchased products
- **Image Uploads** - Attach photos to reviews (max 5 images, 5MB each)
- **Variant Display** - Show size and color of purchased items in reviews
- **Review Management** - Edit and delete your own reviews
- **Previous Images** - Keep or remove existing images when editing

### 💬 **Customer Support**
- **Support Tickets** - Create, view, edit, and delete support tickets
- **Ticket Types** - General Inquiry, Product Issue, Order Issue, Shipping, Return/Refund, Technical
- **Chat System** - Real-time chat interface with support agents
- **Image Attachments** - Upload images with tickets and chat messages
- **Order Linking** - Link tickets to specific orders for faster resolution
- **Status Tracking** - Monitor ticket status (open, in progress, resolved, closed)

### 📄 **Content Pages**
- **Home Page** - Hero section, features, categories, flash sales, deals, testimonials, blogs, FAQs
- **Shop Page** - Product grid with filters, quick access cards, promotional banners
- **About Us** - Company story, team members, quality highlights, statistics
- **Contact Us** - Contact form, location map, multiple contact methods
- **Blog** - Fashion articles with categories and pagination
- **Collections** - Browse all collections with categories

---

## 🛠️ Tech Stack

### **Frontend**
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Animations**: Framer Motion
- **State Management**: Redux Toolkit
- **Form Handling**: React Hook Form
- **Icons**: Lucide React

### **Backend Integration**
- **API Client**: Axios with custom interceptors
- **Authentication**: JWT tokens with refresh mechanism
- **Image Handling**: FormData for multipart uploads
- **Error Handling**: Centralized error handling with toast notifications

### **Key Libraries**
```json
{
  "next": "15.1.3",
  "react": "^19.0.0",
  "typescript": "^5",
  "framer-motion": "^12.23.22",
  "@reduxjs/toolkit": "^2.5.0",
  "axios": "^1.7.9",
  "tailwindcss": "^3.4.1"
}
```

---

## 📁 Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── (client)/                 # Client-facing routes
│   │   ├── (auth)/              # Authentication pages
│   │   ├── collections/         # Collection pages
│   │   ├── shop/                # Shop page
│   │   ├── checkout/            # Checkout flow
│   │   └── ...
│   ├── blog/                    # Blog pages
│   └── layout.tsx               # Root layout
├── components/
│   ├── features/                # Feature components
│   │   ├── home/               # Home page sections
│   │   ├── shop/               # Shop page components
│   │   ├── product-detail/     # Product detail components
│   │   ├── collections/        # Collection components
│   │   ├── checkout/           # Checkout components
│   │   ├── profile/            # User profile components
│   │   ├── customer-support/   # Support ticket system
│   │   ├── auth/               # Authentication forms
│   │   └── app/                # Shared app components
│   └── ui/                      # Reusable UI components
├── services/                    # API service hooks
│   └── client/
│       ├── auth/
│       ├── product/
│       ├── cart/
│       ├── order/
│       ├── user/
│       └── ...
├── lib/                         # Redux store and utilities
│   ├── features/               # Redux slices
│   ├── store.ts                # Redux store configuration
│   └── utils.ts                # Utility functions
├── types/                       # TypeScript interfaces
│   ├── product/
│   ├── cart/
│   ├── order/
│   ├── user/
│   └── ...
└── middleware/                  # Axios interceptors

```

---

## 🚀 Getting Started

### **Prerequisites**
- Node.js 18+ 
- npm, yarn, pnpm, or bun
- Backend API server running (configure in `src/config/config.ts`)

### **Installation**

1. **Clone the repository**
```bash
git clone <repository-url>
cd snazzy-fit-client
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Configure environment**
Create a `.env.local` file:
```env
NEXT_PUBLIC_API_URL=your_backend_api_url
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_oauth_client_id
```

4. **Run development server**
```bash
npm run dev
```

5. **Open browser**
Navigate to [http://localhost:3000](http://localhost:3000)

---

## 🎨 Design Philosophy

### **Color Palette**
The application uses a **vibrant, nature-inspired gradient system** with multiple color themes:

- **Primary**: Lime/Emerald/Teal - Fresh, natural vibes
- **Secondary**: Cyan/Teal - Cool, professional
- **Accent 1**: Indigo/Purple/Pink - Elegant, sophisticated
- **Accent 2**: Violet/Purple/Fuchsia - Energetic, modern
- **Accent 3**: Amber/Orange/Yellow - Warm, inviting
- **Dark**: Slate-900/800/700 - Professional, premium

### **Key Design Principles**
- **Glass Morphism** - Frosted glass effects with backdrop blur
- **Soft Gradients** - Subtle background blobs for depth
- **Modern Typography** - Bold headings with gradient text accents
- **Micro-interactions** - Hover animations, transitions, and scale effects
- **Consistent Spacing** - Generous padding and margins for breathing room
- **Shadow Hierarchy** - From subtle (shadow-sm) to dramatic (shadow-2xl)

---

## 🔑 Key Features Breakdown

### **Authentication Flow**
1. User signs up with email/password or Google OAuth
2. Email verification sent
3. User verifies email via link
4. Login with credentials
5. JWT tokens stored (access + refresh)
6. Auto-refresh on token expiration

### **Shopping Flow**
1. Browse collections/categories/shop
2. Filter and sort products
3. View product details with variants
4. Select color, size, and quantity
5. Add to cart or buy now
6. Checkout with shipping details
7. Payment via Stripe
8. Order confirmation and tracking

### **Review Flow**
1. User purchases product
2. Order status becomes "PAID"
3. User can review product
4. Select specific order item (variant)
5. Rate 1-5 stars, write comment, upload images
6. Review appears on product page
7. Edit/delete own reviews

### **Support Flow**
1. Create support ticket with type and description
2. Link ticket to specific order (optional)
3. Upload supporting images
4. Navigate to chat session
5. Real-time messaging with agent
6. Ticket resolution and closure

---

## 🧩 Component Architecture

### **Reusable Components**
- **ProductImage** - Smart image component with Package icon fallback
- **ProductCard** - Standardized product display with hover effects
- **Breadcrumb** - Dynamic breadcrumb navigation
- **Pagination** - Reusable pagination with page controls
- **PriceRangeSlider** - Interactive price filter slider
- **MultiSelectRadioGroup** - Multi-select filter component

### **Feature Components**
Each feature is encapsulated in its own folder with:
- Main component file
- Sub-components (if complex)
- Related utilities and helpers

---

## 📡 API Integration

### **Service Hooks Pattern**
All API calls are abstracted into custom React hooks:

```typescript
const { getProducts, isLoading } = useProductService()
const { addToCart } = useCartService()
const { createOrder } = useOrderService()
```

### **Key Services**
- `useAuthService` - Authentication operations
- `useProductService` - Product CRUD and search
- `useCartService` - Cart management
- `useOrderService` - Order creation and tracking
- `useUserService` - User profile updates
- `useAddressService` - Address CRUD
- `useProductReviewService` - Review CRUD
- `useCustomerSupport` - Ticket CRUD
- `useStripeService` - Payment processing

### **API Features**
- Automatic token refresh
- Request/response interceptors
- Error handling with toast notifications
- FormData support for file uploads
- Query parameter building

---

## 🎭 Animation System

### **Framer Motion Implementation**
All home page sections use scroll-triggered animations:

```typescript
<motion.section 
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.3 }}
  transition={{ duration: 0.6 }}
>
```

**Animation Features:**
- Fade-in on scroll
- Slide-up effect (30px)
- Triggers at 30% visibility
- Plays once per session
- 0.6s smooth duration

---

## 🔐 Security Features

- JWT token authentication
- Automatic token refresh
- Protected routes with middleware
- Secure password handling
- Email verification
- HTTPS-only cookies
- CSRF protection (backend)

---

## 📱 Responsive Design

- **Mobile First** - Optimized for small screens
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Grid Layouts** - Responsive grid systems (1 → 2 → 3 → 4 columns)
- **Hidden Elements** - Show/hide based on screen size
- **Touch Optimized** - Mobile-friendly interactions

---

## 🧪 Development

### **Available Scripts**

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Lint code
npm run lint
```

### **Code Style**
- ESLint configuration
- TypeScript strict mode
- Functional components with hooks
- Custom hooks for reusability
- Component composition pattern

---

## 🌐 Pages Overview

### **Public Pages**
- `/` - Home page with hero, features, categories, deals, testimonials
- `/shop` - Product listing with filters and search
- `/collections` - All collections display
- `/collections/[collection]` - Collection products
- `/collections/[collection]/[category]/[slug]` - Product detail
- `/about-us` - Company information and team
- `/contact-us` - Contact form and information
- `/blog` - Fashion blog articles

### **Auth Pages**
- `/login` - User login
- `/signup` - User registration
- `/verify-email` - Email verification
- `/reset-password` - Password reset request
- `/change-password` - Change password

### **Protected Pages**
- `/profile` - User dashboard with tabs
- `/checkout` - Checkout process
- `/shopping-cart` - Cart management
- `/customer-support` - Support tickets
- `/customer-support/session/[ticketId]` - Live chat

---

## 🎯 Future Enhancements

- [ ] Wishlist functionality
- [ ] Product comparison
- [ ] Advanced search filters
- [ ] Multiple payment gateways
- [ ] Loyalty program
- [ ] Gift cards
- [ ] Live inventory tracking
- [ ] AR try-on feature
- [ ] Personalized recommendations
- [ ] Multi-language support
- [ ] Dark mode toggle
- [ ] Progressive Web App (PWA)

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Team

**James Ha** - CEO & Founder

---

## 📞 Contact

- **Website**: [snazzyfit.com](https://snazzyfit.com)
- **Email**: hello@snazzyfit.com
- **Support**: support@snazzyfit.com
- **Phone**: +1 (555) 123-FASHION

---

## 🙏 Acknowledgments

- Design inspiration from modern e-commerce platforms
- Images from [Unsplash](https://unsplash.com)
- Icons from [Lucide React](https://lucide.dev)
- UI components from [shadcn/ui](https://ui.shadcn.com)

---

<div align="center">
  <p>Built with ❤️ by the SnazzyFit Team</p>
  <p>© 2024 SnazzyFit. All Rights Reserved.</p>
</div>
