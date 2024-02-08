import {Link} from 'react-router-dom'
import CartContext from '../../context/CartContext'

import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItems} = value

      let total = 0
      cartList.forEach(eachCartItem => {
        total += eachCartItem.cost * eachCartItem.quantity
      })

      const onplaceOrder = () => {
        removeAllCartItems()
      }

      return (
        <div className="cart-summary-container">
          <h1 className="order-total-value">Order Total:</h1>
          <div className="cost-place-order">
            <p className="total-cost" data-testid="total-price">
              ₹ {total}
            </p>
            <Link to="/order/payment">
              <button
                type="button"
                className="checkout-button"
                onClick={onplaceOrder}
              >
                Place Order
              </button>
            </Link>
          </div>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
