import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  loginUser = async event => {
    event.preventDefault()

    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onChnageUserName = event => {
    this.setState({username: event.target.value})
  }

  onChnagePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    const {username, password, showSubmitError, errorMsg} = this.state
    return (
      <div className="login-container">
        <div className="login-card-container">
          <div className="card">
            <img
              className="frame-img"
              alt="website logo"
              src="https://i.im.ge/2024/01/23/YVtMir.Frame-274.png"
            />
            <h1 className="features-title">Tasty Kitchens</h1>
            <form onSubmit={this.loginUser} className="form-card">
              <h3 className="login-title">Login</h3>
              <div className="input-label-default">
                <label className="label" htmlFor="username">
                  USERNAME
                </label>
                <input
                  type="text"
                  className="user-input"
                  id="username"
                  value={username}
                  onChange={this.onChnageUserName}
                />
              </div>
              <div className="input-label-default">
                <label className="label" htmlFor="password">
                  PASSWORD
                </label>
                <input
                  className="user-input"
                  type="password"
                  id="password"
                  value={password}
                  onChange={this.onChnagePassword}
                />
              </div>
              <button type="submit" className="login-button">
                Login
              </button>
              {showSubmitError && <p className="error-msg">{errorMsg}</p>}
            </form>
          </div>
        </div>
        <img
          src="https://s3-alpha-sig.figma.com/img/ceff/20e8/367d1981f2a409a617ac848670d29c7e?Expires=1708300800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=SpWaaQKlYJOcjVy8Es4~vlnyVuN9yJgJdKlwuldVrAjjPt7QpRyIJOBgTW91kNaYXAMCRgaGhlVhDQBCuXQnGkPESOfD0G3KLFEO4seB57x-QpH7Lfz4VRwGe9IGxsM2ZghX7Inkclkzme2OG54C0-N6PaJziQiybNdJ~50kP0bSL6R7TmVu7X2y0Po41yfXn0sh3WblvaA3k8DocHGTipFCuJjnP-CFH~vmTTG2HCvAzW43hitYEbYu-aHJnLbkBMW7v0hFm9YsGt5O8Ox5KlzoFN8uOsh1e~YtQJnt4DL6F3hvyk3PHFgJnsDVUlo-goE98a-qPi7~biqFPYr0sA__"
          className="login-page-image"
          alt="website login"
        />
      </div>
    )
  }
}

export default Login
