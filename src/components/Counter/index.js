import CartContext from '../../context/CartContext'
import './index.css'

const Counter = props => (
  <CartContext.Consumer>
    {value => {
      const {
        incrementCartItemQuantity,
        decrementCartItemQuantity,
        cartList,
      } = value

      const {id} = props
      const {quantity} = cartList.filter(each => each.id === id)[0]

      const onClickDecrement = () => {
        decrementCartItemQuantity(id)
      }

      const onClickIncrement = () => {
        incrementCartItemQuantity(id)
      }

      return (
        <div className="button-card" data-testid="item-quantity">
          <button
            type="button"
            onClick={onClickDecrement}
            className="button-dec-inc"
            data-testid="decrement-count"
          >
            -
          </button>
          <p className="cart-item-quantity">{quantity}</p>
          <button
            type="button"
            onClick={onClickIncrement}
            className="button-dec-inc"
            data-testid="increment-count"
          >
            +
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default Counter
