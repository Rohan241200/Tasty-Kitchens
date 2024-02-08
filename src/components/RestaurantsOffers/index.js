import {Component} from 'react'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import Loader from 'react-loader-spinner'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './index.css'

const apiStatusContext = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class RestaurantsOffer extends Component {
  state = {apiStatus: apiStatusContext.initial, resturantOfferList: []}

  componentDidMount() {
    this.getResturants()
  }

  getResturants = async () => {
    this.setState({apiStatus: apiStatusContext.inProgress})

    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/restaurants-list/offers'
    const option = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, option)
    const data = await response.json()
    if (response.ok === true) {
      const updateDate = data.offers.map(each => ({
        id: each.id,
        imageUrl: each.image_url,
      }))
      this.setState({
        resturantOfferList: updateDate,
        apiStatus: apiStatusContext.success,
      })
    } else {
      this.setState({apiStatus: apiStatusContext.failure})
    }
  }

  getSucces = () => {
    const {resturantOfferList} = this.state
    const settings = {
      dots: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 5000,
      infinite: true,
    }

    return (
      <ul className="home-header-resturarants-items-list">
        <Slider {...settings}>
          {resturantOfferList.map(each => (
            <li className="home-header-restaurant-lists" key={each.id}>
              <img
                src={each.imageUrl}
                alt="offer"
                className="home-banner-img"
              />
            </li>
          ))}
        </Slider>
      </ul>
    )
  }

  getLoading = () => (
    <div
      className="offer-loader-container"
      data-testid="restaurants-offers-loader"
    >
      <Loader type="TailSpin" color="orange" height="50" width="50" />
    </div>
  )

  getCheckStatus = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusContext.success:
        return this.getSucces()
      case apiStatusContext.inProgress:
        return this.getLoading()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="resturant-offer-list-container">
        {this.getCheckStatus()}
      </div>
    )
  }
}

export default RestaurantsOffer
