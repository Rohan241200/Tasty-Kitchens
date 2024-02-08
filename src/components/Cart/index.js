import {Link} from 'react-router-dom'
import CartListView from '../CartListView'
import Header from '../Header'
import Footer from '../Footer'
import CartContext from '../../context/CartContext'
import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value

      const isEmpty = cartList.length === 0

      return (
        <>
          <Header />
          <div className="cart-container">
            {isEmpty ? (
              <div className="empty-cart-container">
                <img
                  src="https://i.im.ge/2024/01/24/YpKD1L.OBJECTS.png"
                  alt="empty cart"
                  className="empty-cart-image"
                />
                <h1 className="empty-cart-title">No Order Yet!</h1>
                <p className="empty-cart-desc">
                  Your cart is empty. Add something from the menu.
                </p>
                <Link to="/" className="empty-cart-link">
                  <button className="empty-cart-button" type="button">
                    Order Now
                  </button>
                </Link>
              </div>
            ) : (
              <CartListView />
            )}
          </div>
          <Footer />
        </>
      )
    }}
  </CartContext.Consumer>
)

export default Cart
