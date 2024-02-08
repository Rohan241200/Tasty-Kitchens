import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="page-not-found">
    <div className="page-not-found-card">
      <img
        className="erroring"
        src="https://i.im.ge/2024/01/23/YVNIMz.Layer-2.png"
        alt="not found"
      />
      <h1 className="page-not-found-title">Page Not Found</h1>
      <p className="we-are-sorry-the">
        We are sorry, the page you requested could not be found.
        <br />
        Please go back to the homepage
      </p>
      <Link to="/" className="link-button">
        <button type="button" className="go-to-homepage-button">
          Home Page
        </button>
      </Link>
    </div>
  </div>
)

export default NotFound
