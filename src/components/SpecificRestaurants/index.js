import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'
import FoodItems from '../FoodItems'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class SpecificRestaurants extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    specificItems: [],
    resDetails: {},
  }

  componentDidMount() {
    this.getSpecificResData()
  }

  getSpecificResData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const url = `https://apis.ccbp.in/restaurants-list/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const option = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, option)
    const data = await response.json()

    if (response.ok === true) {
      const updateResDetails = {
        costForTwo: data.cost_for_two,
        cuisine: data.cuisine,
        id: data.id,
        imageUrl: data.image_url,
        itemsCount: data.items_count,
        location: data.location,
        name: data.name,
        opensAt: data.opens_at,
        rating: data.rating,
        reviewsCount: data.reviews_count,
      }

      const updateSpecificResItems = data.food_items.map(each => ({
        cost: each.cost,
        footType: each.food_type,
        id: each.id,
        imageUrl: each.image_url,
        name: each.name,
        rating: each.rating,
      }))

      this.setState({
        resDetails: updateResDetails,
        specificItems: updateSpecificResItems,
        apiStatus: apiStatusConstants.success,
      })
    }
  }

  getSucces = () => {
    const {specificItems, resDetails} = this.state

    const {
      costForTwo,
      cuisine,
      id,
      imageUrl,
      location,
      name,
      rating,
      reviewsCount,
    } = resDetails

    return (
      <div className="specific-restaurants-container">
        <div className="specific-restaurants-header-card">
          <div className={`specific-resturants-details ${id}`}>
            <img
              src={imageUrl}
              alt={name}
              className="specific-restaurants-header-img"
            />

            <div className="specific-resturants-header-details">
              <h1 className="specific-resturants-header-title">{name}</h1>
              <p className="specific-resturants-header-type">{cuisine}</p>
              <p className="specific-resturants-header-location">{location}</p>
              <div className="specific-resturants-header-description">
                <div className="specific-resturants-header-rating-card">
                  <p className="specific-resturants-header-rating">
                    <img
                      src="https://i.im.ge/2024/02/08/cDn2Mm.vecteezy-star-illustrations-single-star-23639223.png"
                      alt="7 rating"
                      className="specific-restaurant-header-rating-image"
                    />
                    {rating}
                  </p>
                  <p className="specific-resturants-header-reviews">
                    {reviewsCount}+ Rating
                  </p>
                </div>
                <hr />
                <div className="specific-resturants-header-cost-card">
                  <p className="specific-resturants-header-cost">
                    ₹ {costForTwo}
                  </p>
                  <p className="specific-resturants-header-cost-text">
                    Cost for two
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="specific-resturant-food-items-container">
          <ul className="food-items-lists">
            {specificItems.map(each => (
              <FoodItems foodItemsDetais={each} key={each.id} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  getLoading = () => (
    <div className="restaurant-details-loader">
      <Loader type="TailSpin" color="orange" height="50" width="50" />
    </div>
  )

  getCheckStatus = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.getSucces()
      case apiStatusConstants.inProgress:
        return this.getLoading()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.getCheckStatus()}
        <Footer />
      </>
    )
  }
}

export default SpecificRestaurants
