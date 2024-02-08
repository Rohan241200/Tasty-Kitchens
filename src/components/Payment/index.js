import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Payment = () => (
  <>
    <Header />
    <div className="payment-container">
      <div className="payment-card">
        <img
          src="https://i.im.ge/2024/01/25/YeLGKK.check-circle-1-1.png"
          alt="success"
          className="payment-img"
        />
        <h1 className="payment-heading">Payment Successful</h1>
        <p className="payment-desc">
          Thank you for ordering Your payment is successfully completed.
        </p>
        <Link to="/" className="payment-link">
          <button type="button" className="payment-button">
            Go To Home Page
          </button>
        </Link>
      </div>
    </div>
  </>
)

export default Payment
