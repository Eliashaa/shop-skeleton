import type React from 'react'
import { formatOre } from '../format'
import type { Product } from '../types'

type Props = {
  products: Product[]
  setCart: React.Dispatch<React.SetStateAction<[Product, number][]>> 
  cart: [Product, number][]
}

function addToCart(
  product: Product,
  setCart: React.Dispatch<React.SetStateAction<[Product, number][]>>,
  cart: [Product, number][],
) {
  const existingItem = cart.find(([p]) => p.id === product.id)

  if (existingItem) {
    return cart
  }

  const newCart: [Product, number][] = [...cart, [product, 1]]
  setCart(newCart)
  console.log(newCart)
}

export default function ProductList({ products, setCart, cart }: Props) {
  return (
    <section className="products">
      {products.map((product) => (
        <article className="product-card" key={product.id}>
          <div className="product-image">
            <img src={product.image} alt={product.title} loading="lazy" />
          </div>
          <h2 className="product-title">{product.title}</h2>
          <p className="product-subtitle">{product.subtitle}</p>
          <p className="product-price">{formatOre(product.price_ore)}</p>
          {/* TODO: A button that puts the product in the cart. */}
          <button
            className="add-to-cart"
            type="button"
            aria-label={`Legg ${product.title} i handlekurven`}
            onClick={() => addToCart(product, setCart, cart)}
          >
            <span aria-hidden="true">+</span>
          </button>

        </article>
      ))}
    </section>
  )
}
