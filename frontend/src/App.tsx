import { useEffect, useState } from 'react'
import { fetchProducts } from './api'
import Cart from './components/Cart'
import ProductList from './components/ProductList'
import type { Product } from './types'

export default function App() {
  const [products, setProducts] = useState<Product[]>([])
  const [cart, setCart] = useState<[Product, number][]>([])

  useEffect(() => {
    fetchProducts().then(setProducts)
  }, [])

  // TODO: The cart state, and adding, changing a quantity and buying.

  return (
    <main className="layout">
      <ProductList products={products} setCart={setCart} cart={cart}/>
      <Cart cart={cart} setCart={setCart}/>
    </main>
  )
}