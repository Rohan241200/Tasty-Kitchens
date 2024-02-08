import CartContext from '../../context/CartContext'

import './index.css'

const FoodItems = props => {
  const {foodItemsDetais} = props
  const {id, cost, imageUrl, rating, name} = foodItemsDetais

  return (
    <CartContext.Consumer>
      {value => {
        const {addCartItem} = value

        const onAddToCart = () => {
          addCartItem({...foodItemsDetais, quantity: 1})
        }

        return (
          <li className={`food-item-list-card ${id}`}>
            <img src={imageUrl} alt={name} className="food-item-list-image" />
            <div className="food-item-list-details-card">
              <h4 className="food-details-title">{name}</h4>
              <p className="food-details-cost">₹ {cost}.00</p>
              <p className="food-detials-rating">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M6.71496 0.448353L8.22262 3.70603L11.31 4.0419C11.6204 4.08619 11.877 4.31177 11.9666 4.61909C12.0562 4.92642 11.9622 5.25897 11.7263 5.47004L9.27132 7.5426L10.0318 11.0242C10.0916 11.3385 9.96705 11.6596 9.71288 11.8463C9.45871 12.033 9.12154 12.0511 8.84971 11.8925L5.99982 10.1203L3.1526 11.8925C2.88076 12.0511 2.54359 12.033 2.28942 11.8463C2.03525 11.6596 1.91067 11.3385 1.97048 11.0242L2.73098 7.5426L0.273356 5.47004C0.0372661 5.2586 -0.0563708 4.92553 0.0338322 4.61804C0.124035 4.31055 0.38145 4.08532 0.6923 4.0419L3.77968 3.70603L5.28735 0.448353C5.42381 0.173292 5.6997 0 6.00115 0C6.3026 0 6.57849 0.173292 6.71496 0.448353Z"
                    fill="#FFCC00"
                  />
                </svg>
                {rating}
              </p>
              <button
                type="button"
                className="add-to-cart-button"
                onClick={onAddToCart}
              >
                ADD
              </button>
            </div>
          </li>
        )
      }}
    </CartContext.Consumer>
  )
}

export default FoodItems
