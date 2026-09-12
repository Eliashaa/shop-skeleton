import type { OrderLine, Product } from './types'

export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch('/api/products')
  if (!res.ok) throw new Error(`GET /api/products failed: ${res.status}`)
  const data: { products: Product[] } = await res.json()
  return data.products
}

export async function placeOrder(lines: OrderLine[]): Promise<{ order_id: number }> {
  const res = await fetch('/api/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ items: lines }),
  })
  if (!res.ok) throw new Error(`POST /api/orders failed: ${res.status}`)
  return res.json()
}

export async function createOrder(total_price_ore: number, products: OrderLine[]): Promise<{ order_id: number }> {
  const res = await fetch('/api/orders/create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ total_price_ore, products }),
  })
  if (!res.ok) throw new Error(`POST /api/orders/create failed: ${res.status}`)
  return res.json()
}