import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import Popup from 'reactjs-popup'
import {IoMdMenu, IoMdClose} from 'react-icons/io'
import 'reactjs-popup/dist/index.css'
import CartContext from '../../context/CartContext'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value

        return (
          <nav className="navbar">
            <div className="header-logo-card">
              <Link to="/" className="header-home-link-logo">
                <img
                  src="https://i.im.ge/2024/01/23/YVtMir.Frame-274.png"
                  alt="website logo"
                />
              </Link>
              <h1 className="header-features-title">Tasty Kitchens</h1>
            </div>
            <ul className="desktop-links-items-lists">
              <Link to="/" className="header-home-link-logo">
                <li className="header-links">Home</li>
              </Link>
              <Link to="/cart" className="header-home-link-logo">
                <li className="header-links cart-length">
                  Cart
                  {cartList.length > 0 && (
                    <p className="cart-item-length">{cartList.length}</p>
                  )}
                </li>
              </Link>
              <button
                type="button"
                onClick={onClickLogout}
                className="logout-button"
              >
                Logout
              </button>
            </ul>
            <div className="mobile-menu-popup-container">
              <Popup
                position="bottom right"
                contentStyle={{
                  width: '100%',
                }}
                trigger={
                  <button
                    className="trigger-menu-button"
                    type="button"
                    aria-label="menu"
                  >
                    <IoMdMenu />
                  </button>
                }
              >
                {close => (
                  <ul className="mobile-menu">
                    <Link to="/" className="header-home-link-logo">
                      <li className="header-links">Home</li>
                    </Link>
                    <Link to="/cart" className="header-home-link-logo">
                      <li className="header-links cart-length">
                        Cart
                        {cartList.length > 0 && (
                          <p className="cart-item-length">{cartList.length}</p>
                        )}
                      </li>
                    </Link>
                    <li>
                      <button
                        type="button"
                        onClick={onClickLogout}
                        className="logout-button"
                      >
                        Logout
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        aria-label="menu"
                        className="trigger-close-button"
                        onClick={() => close()}
                      >
                        <IoMdClose />
                      </button>
                    </li>
                  </ul>
                )}
              </Popup>
            </div>
          </nav>
        )
      }}
    </CartContext.Consumer>
  )
}

export default withRouter(Header)
