import CartItem from '../CartItem'
import CartSummary from '../CartSummary'
import CartContext from '../../context/CartContext'

import './index.css'

const CartListView = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value

      return (
        <ul className="cart-list" data-testid="cartItem">
          <li className="cart-list-header">
            <p className="cart-header-item">Items</p>
            <p className="cart-header-quantity">Quantity</p>
            <p className="cart-header-price">Price</p>
          </li>
          {cartList.map(eachCartItem => (
            <CartItem key={eachCartItem.id} cartItemDetails={eachCartItem} />
          ))}
          <hr />
          <CartSummary />
        </ul>
      )
    }}
  </CartContext.Consumer>
)

export default CartListView
