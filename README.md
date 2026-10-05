# TechStore Ecommerce

TechStore is a full-stack electronics store with a Next.js storefront and an Express API. It includes customer shopping flows, account and order management, an admin dashboard, and an AI shopping assistant.

## Features

- Browse products, categories, deals, and product details
- Register and sign in; manage a cart, wishlist, profile, and orders
- Complete checkout using Razorpay
- Admin tools for products, users, orders, store statistics, contact messages, and newsletter subscribers
- Contact form, newsletter signup, and an AI shopping assistant
- Responsive UI with light/dark themes

## Tech stack

- **Frontend:** Next.js 16, React 19, TypeScript, Tailwind CSS 4
- **Backend:** Node.js, Express 5, MongoDB with Mongoose
- **Integrations:** Razorpay payments and Google Gemini (production AI); Ollama for local AI development

## Project structure

```text
.
├── backend/
│   ├── config/         # MongoDB and payment provider setup
│   ├── controllers/    # API request handlers
│   ├── data/           # Seed product data
│   ├── middleware/     # Authentication, validation, and rate limits
│   ├── models/         # Mongoose models
│   ├── routes/         # Express API routes
│   ├── services/       # AI service
│   └── server.js       # API entry point
├── frontend/
│   ├── app/            # Store, account, and admin pages (Next.js App Router)
│   ├── components/     # Reusable UI components
│   ├── context/        # Auth, cart, checkout, and wishlist state
│   ├── public/         # Product and hero images
│   └── services/       # Frontend API helpers
└── .github/workflows/  # GitHub Actions CI
```

## Requirements

- Node.js 24 (the version used by the CI workflow)
- npm
- A MongoDB database
- Razorpay credentials to enable payments

## Getting started

Install dependencies in both apps:

```bash
cd backend
npm ci

cd ../frontend
npm ci
```

Create `backend/.env`:

```dotenv
PORT=5000
ATLAS_URL=mongodb+srv://<username>:<password>@<cluster>/<database>
JWT_SECRET=replace-with-a-long-random-secret
FRONTEND_URL=http://localhost:3000
RAZORPAY_KEY_ID=your-razorpay-key-id
RAZORPAY_KEY_SECRET=your-razorpay-key-secret
```

Create `frontend/.env.local`:

```dotenv
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Keep real credentials private; do not commit environment files. `COOKIE_SAME_SITE` can optionally be set on the backend (defaults to `lax`). Razorpay credentials are required on the backend to process payments.

Start the backend and frontend in separate terminals:

```bash
# Terminal 1
cd backend
npm run dev
```

```bash
# Terminal 2
cd frontend
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The backend health endpoint is [http://localhost:5000/](http://localhost:5000/).

## Product seed data

To load the sample products:

```bash
cd backend
npm run seed
```

**Warning:** the seed script deletes all existing product documents before inserting the sample catalog. Back up or use a development database before running it.

## API route groups

The backend runs on port `5000` by default. Main route groups include:

| Prefix | Purpose |
| --- | --- |
| `/products` | Product catalog and admin product operations |
| `/users` | Registration, login, profile, and admin user operations |
| `/cart` | Cart operations |
| `/wishlist` | Wishlist operations |
| `/orders` | Customer orders and admin order management |
| `/payments` | Razorpay order creation and payment verification |
| `/admin` | Admin access and statistics |
| `/contact` | Contact form submissions and admin message listing |
| `/newsletter` | Newsletter subscriptions and admin subscriber listing |
| `/api/chat` | Authenticated shopping assistant |

Most account and admin endpoints require authentication; admin endpoints also require an admin account.

## Scripts

| Directory | Command | Description |
| --- | --- | --- |
| `frontend` | `npm run dev` | Start the Next.js development server |
| `frontend` | `npm run build` | Build the frontend for production |
| `frontend` | `npm run start` | Serve the production build |
| `frontend` | `npm run lint` | Run ESLint |
| `backend` | `npm run dev` | Start the API with nodemon |
| `backend` | `npm start` | Start the API |
| `backend` | `npm run seed` | Replace product documents with sample data |

The GitHub Actions workflow builds the frontend and installs backend dependencies on pushes and pull requests targeting `main`.

## AI assistant configuration

For local development, the backend AI service uses Ollama; configure `OLLAMA_URL` and `OLLAMA_MODEL` in `backend/.env` and run the Ollama service/model locally. `OLLAMA_API_KEY` is optional. In production, configure `GEMINI_API_KEY` for Google Gemini.
