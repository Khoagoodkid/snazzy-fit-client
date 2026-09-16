# SnazzyFit

Frontend for a fashion e-commerce store. Customers can browse products, check out, manage their profile, and reach support. There's also an admin side for orders, users, tickets, and roles.

Built with Next.js 15, TypeScript, and Tailwind.

## What's included

- Product catalog with collections, filters, search, and reviews
- Cart, checkout, and Stripe payments
- Auth (email/password, Google, email verification, password reset)
- Profile, addresses, and order history
- Support tickets with chat
- Admin pages for users, orders, help desk, and permissions

## Stack

- **Next.js 15** (App Router) + React 19
- Tailwind + shadcn/ui
- Redux Toolkit, React Query, Apollo/urql for GraphQL
- Axios for REST, React Hook Form + Zod

## Setup

You'll need Node 18+ and the backend API running.

```bash
npm install
```

Create a `.env.local`:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_oauth_client_id
```

Then:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Useful scripts: `npm run build`, `npm run lint`, `npm run codegen` (GraphQL types, watch mode).

## Layout

```
src/
├── app/            # Routes — (client) storefront, (admin) dashboard
├── components/     # Feature UI and shared components
├── services/       # API hooks
├── lib/            # Store and helpers
└── types/          # TypeScript types
```

Main storefront routes: `/shop`, `/collections`, `/checkout`, `/profile`, `/customer-service`. Auth lives under `/login` and `/signup`. Admin is under `/admin`.
