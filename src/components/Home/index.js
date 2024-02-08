import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {MdSort} from 'react-icons/md'
import {GrPrevious, GrNext} from 'react-icons/gr'

import Header from '../Header'
import Footer from '../Footer'
import NotFound from '../NotFound'
import RestaurantsOffers from '../RestaurantsOffers'
import GetResturantList from '../GetResturantList'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  constructor(props) {
    super(props)
    const {sortByOptions} = props
    this.state = {
      selectedOption: sortByOptions[0].value,

      resturants: [],
      apiStatus: apiStatusConstants.initial,
      offSet: 0,
      activePage: 1,
    }
  }

  componentDidMount() {
    this.getResturantsData()
  }

  getResturantsData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const {selectedOption, offSet} = this.state

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/restaurants-list?offset=${offSet}&limit=${9}&sort_by_rating=${selectedOption}`
    const option = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, option)
    const data = await response.json()

    if (response.ok === true) {
      const updateDate = data.restaurants.map(each => ({
        costForTwo: each.cost_for_two,
        cuisine: each.cuisine,
        groupByTime: each.group_by_time,
        hasOnlineDelivery: each.has_online_delivery,
        hasTableBooking: each.has_table_booking,
        id: each.id,
        imageUrl: each.image_url,
        isDeliveringNow: each.is_delivering_now,
        location: each.location,
        menuType: each.menu_type,
        name: each.name,
        opensAt: each.opens_at,
        rating: each.user_rating.rating,
        ratingColor: each.user_rating.rating_color,
        ratingText: each.user_rating.rating_text,
        totalReviews: each.user_rating.total_reviews,
      }))

      this.setState({
        resturants: updateDate,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  changeSortBy = event => {
    this.setState({selectedOption: event.target.value}, this.getResturantsData)
  }

  prevSlide = () => {
    const {offSet} = this.state

    if (offSet > 8) {
      this.setState(
        prevState => ({
          offSet: prevState.offSet - 9,
          activePage: prevState.activePage - 1,
        }),
        this.getResturantsData,
      )
    }
  }

  nextSlide = () => {
    const {offSet} = this.state

    if (offSet < 20) {
      this.setState(
        prevState => ({
          offSet: prevState.offSet + 9,
          activePage: prevState.activePage + 1,
        }),
        this.getResturantsData,
      )
    }
  }

  getSucces = () => {
    const {selectedOption, resturants} = this.state

    const {sortByOptions} = this.props

    return (
      <div className="home-card-container">
        <div className="home-popular-restaurant-card">
          <h1 className="home-popular-restaurant">Popular Restaurants</h1>
          <div className="home-desc-sortby">
            <p className="home-restaurant-greeting-desc">
              Select Your favourite restaurant special dish and make your day
              happy...
            </p>
            <div className="select-sortby-card">
              <MdSort className="sortby-icon" />
              <p className="sortby-text">Sort By</p>
              <select
                value={selectedOption}
                onChange={this.changeSortBy}
                className="select-option-sortby"
              >
                {sortByOptions.map(each => (
                  <option
                    value={each.value}
                    key={each.id}
                    className="sortby-options"
                  >
                    {each.displayText}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <hr />
          <ul className="restaurant-list-items" data-testid="restaurant-item">
            {resturants.map(each => (
              <GetResturantList restaurantsDetails={each} key={each.id} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  getLoading = () => (
    <div className="loader-container" data-testid="restaurants-list-loader">
      <Loader type="TailSpin" color="orange" height="50" width="50" />
    </div>
  )

  getFailure = () => <NotFound />

  getCheckStatus = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.getSucces()
      case apiStatusConstants.inProgress:
        return this.getLoading()
      case apiStatusConstants.failure:
        return this.getFailure()
      default:
        return null
    }
  }

  render() {
    const {activePage} = this.state
    return (
      <>
        <Header />
        <div className="home-container">
          <RestaurantsOffers />
          {this.getCheckStatus()}
          <div className="home-page-restaurant-pre-next-button">
            <button
              type="button"
              onClick={this.prevSlide}
              aria-label="prev"
              className="slide-button"
              data-testid="pagination-left-button"
            >
              <GrPrevious />
            </button>
            <p className="active-page-list" data-testid="active-page-number">
              {activePage} of 4
            </p>
            <button
              type="button"
              onClick={this.nextSlide}
              aria-label="next"
              className="slide-button"
              data-testid="pagination-right-button"
            >
              <GrNext />
            </button>
          </div>
        </div>

        <Footer />
      </>
    )
  }
}

export default Home
