# Mini Oda Shop

Django + SQLite backend, React + TypeScript (Vite) frontend. Browse products, add
them to a cart, place an order.

This is a starting point, not a working shop. The parts the assignment asks you to
build are stubbed out and marked `TODO`. Everything around them — project config,
dev server, API proxy, the `Product` model and its endpoint, type definitions — is
already wired up, so you can spend your two hours on the assignment instead of setup.

## Prerequisites

Python 3 and Node, any recent version. Check with `python3 --version` and
`node --version`.

## Run

Backend, on port 8000:

```bash
python3 -m venv .venv
.venv/bin/pip install -r backend/requirements.txt
.venv/bin/python backend/manage.py migrate
.venv/bin/python backend/manage.py seed_products
.venv/bin/python backend/manage.py runserver
```

Frontend, on port 5173, in a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:5173. You should see the product count and an empty cart. The
Vite dev server proxies `/api` to Django, so the browser only ever talks to one
origin and there is no CORS setup to worry about.

Run `seed_products` again whenever you change `products.json`. It updates the
existing rows instead of duplicating them, so it is safe to repeat.

## Layout

```
backend/
  config/          settings, root urls, wsgi
  shop/
    models.py      database models — Product is done, the order is yours
    views.py       request handlers: they take an HTTP request and return a response
    urls.py        maps a URL path to a view
    management/commands/seed_products.py   loads products.json into SQLite
  products.json    22 products, already here
frontend/src/
  App.tsx          fetches products, owns the cart state
  api.ts           fetch helpers for both endpoints
  types.ts         Product, Cart, OrderLine
  tokens.css       a small slice of Oda's design tokens
  index.css        the two-column shell and the cart panel
  components/      ProductList.tsx and Cart.tsx
```

NB! Money is stored as whole øre, so 3090 means 30,90 kr. Integers avoid the
rounding errors that floats bring, so keep prices in øre everywhere and format them
only when you show them.

Add files and folders wherever it helps. Nothing here is fixed.

## Design

`designs/cart-empty.png` and `designs/cart-filled.png` show the shop with an empty
and an active cart. Use them for inspiration. 

## Before you submit

Replace this README with your own: how to run the app, what you cut or simplified to
fit the two hours, what you would do next with more time, and where AI tools helped
or got in the way.

---

# English summary

A small full-stack e-commerce project with a Django backend and a React + Vite frontend. The project includes a product list, shopping cart, quantity updates, checkout flow, and a success modal after a completed purchase.

## Changes made

- Product list with cards and a yellow square "add to cart" button with a + icon
- Shopping cart with item overview, quantity controls, and remove buttons
- Empty cart state with text and styling
- Cart footer with totals and a fixed "Complete purchase" button at the bottom
- Django API for fetching products and creating orders
- Order model with `total_price_ore` and `products` stored as JSON
- CSRF exemption for the order endpoint during local development
- Success popup after a completed purchase
- Styling adapted to the Oda design, including the two-column layout

## Technologies

- Backend: Django + SQLite
- Frontend: React + TypeScript + Vite
- UI helpers: MUI icons

## Requirements to run the project

You need:

- Python 3.10+ or newer
- Node.js 18+ and npm

Check with:

```bash
python3 --version
node --version
npm --version
```

## Run the project locally

### 1) Backend

From the project root:

```bash
cd backend
python3 -m venv .venv
. .venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py seed_products
python manage.py runserver
```

This starts the Django server at http://localhost:8000.

### 2) Frontend

In a new terminal:

```bash
cd frontend
npm install
npm install @mui/icons-material @mui/material @emotion/react @emotion/styled
npm run dev
```

This starts Vite at http://localhost:5173.

## If something does not work

If dependencies are already installed but the app will not start:

```bash
cd backend
. .venv/bin/activate
python manage.py migrate
python manage.py seed_products
python manage.py runserver
```

```bash
cd frontend
npm install
npm run dev
```

If you edit `products.json`, run this command again to update the database:

```bash
cd backend
. .venv/bin/activate
python manage.py seed_products
```

## Structure

```text
shop-skeleton/
  backend/
    config/
    shop/
    manage.py
    requirements.txt
    products.json
  frontend/
    src/
    package.json
    vite.config.ts
  designs/
  README.md
```

## Short project status

The project is now in a working demo state with:

- product listing
- shopping cart
- order creation through the Django API
- success popup after purchase
- responsive visual styling
