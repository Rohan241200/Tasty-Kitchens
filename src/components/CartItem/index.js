import Counter from '../Counter'
import CartContext from '../../context/CartContext'
import './index.css'

const CartItem = props => (
  <CartContext.Consumer>
    {() => {
      const {cartItemDetails} = props

      const {cost, imageUrl, name, id, quantity, footType} = cartItemDetails

      const totalPrice = cost * quantity

      return (
        <li className="cart-list-items-card">
          <div className="cart-img-name">
            <img src={imageUrl} alt={footType} className="cart-img" />
            <p className="cart-name">{name}</p>
          </div>
          <Counter quantity={quantity} id={id} />
          <p className="cart-item-total-price">{totalPrice}</p>
        </li>
      )
    }}
  </CartContext.Consumer>
)
export default CartItem
