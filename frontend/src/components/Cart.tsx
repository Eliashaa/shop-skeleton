import type React from 'react'
import { formatOre } from '../format'
import type { Product } from '../types'
import DeleteIcon from '@mui/icons-material/Delete';

type Props = {
  cart: [Product, number][]
  setCart: React.Dispatch<React.SetStateAction<[Product, number][]>>
}



function formatText(product: Product) {
  return product.subtitle.split("·")[1].split(" ")[2] + ", " + product.subtitle.split("·")[0]
}

export default function Cart({ cart, setCart }: Props) {
  function changeQuantity(productId: string, change: number) {
    setCart((currentCart) => currentCart.flatMap(([product, quantity]) => {
      if (product.id !== productId) return [[product, quantity]]

      const nextQuantity = quantity + change
      return nextQuantity > 0 ? [[product, nextQuantity]] : []
    }))
  }

  const totalPrice = (product: Product, quantity: number) => product.price_ore * quantity

  return cart.length === 0 ? (
    <div className="cart-empty">
      <h2 className="cart-empty-heading">Handlekurven er tom</h2>
      <p className="cart-empty-body">Legg til varer for å fortsette.</p>
    </div>
  ) : (
    <div className="cart">
    <div className="cart-container">
    <div className="cart-header">
      <span>Tøm handlekurv</span>
      <button className="cart-header-button" type="button" aria-label="Tøm handlekurv" onClick={() => setCart([])}>
        <DeleteIcon fontSize="small" aria-hidden="true" />
      </button>
    </div>
    <ul className="cart">
      {cart.map(([product, quantity]) => (
        <li className="cart-item" key={product.id}>
            <div className="cart-image">
              <img src={product.image} alt={product.title} loading="lazy" />
            </div>
          <div className="cart-details">
            <strong className="cart-title">{product.title}</strong>
            <span className="cart-subtitle">{formatText(product)}</span>
            <div className="quantity-controls" aria-label={`Antall ${product.title}`}>
              <button type="button" aria-label="Reduser antall" onClick={() => changeQuantity(product.id, -1)}>-</button>
              <span>{quantity}</span>
              <button type="button" aria-label="Øk antall" onClick={() => changeQuantity(product.id, 1)}>+</button>
            </div>
          </div>
          <strong className="cart-price">{formatOre(product.price_ore * quantity)}</strong>
          <button className="remove-item" type="button" aria-label={`Fjern ${product.title}`} onClick={() => changeQuantity(product.id, -quantity)}>×</button>
        </li>
      ))}
    </ul>
     <div className="cart-footer">
      <div className="cart-total">
        <strong>Delsum</strong>
        <strong>{formatOre(cart.reduce((total, [product, quantity]) => total + totalPrice(product, quantity), 0))}</strong>
      </div>
      <button className="checkout-button" type="button">Fullfør kjøp</button>
    </div>
    </div>
   
    </div>
  )
}
