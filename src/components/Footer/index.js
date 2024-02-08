import {
  FaPinterestSquare,
  FaInstagram,
  FaTwitter,
  FaFacebookSquare,
} from 'react-icons/fa'

import './index.css'

const Footer = () => (
  <div className="footer-container">
    <div className="footer-card">
      <div className="footer-description">
        <img
          src="https://i.im.ge/2024/01/24/YHJbND.Frame-275.png"
          alt="website-footer-logo"
        />
        <h3 className="footer-title">Tasty Kitchens</h3>
      </div>
      <p className="footer-desc">
        The only thing we are serious about is food. Contact us on
      </p>
      <div className="social-media-contacts">
        <FaPinterestSquare
          className="social-media-icons"
          testid="pintrest-social-icon"
        />
        <FaInstagram
          className="social-media-icons"
          testid="instagram-social-icon"
        />
        <FaTwitter
          className="social-media-icons"
          testid="twitter-social-icon"
        />
        <FaFacebookSquare
          className="social-media-icons"
          testid="facebook-social-icon"
        />
      </div>
    </div>
  </div>
)
export default Footer
