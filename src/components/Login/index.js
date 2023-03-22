import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showErrorMsg: false,
    errorMsg: '',
  }

  changeUsername = event => {
    this.setState({username: event.target.value})
  }

  changePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccessView = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})

    const {history} = this.props
    history.replace('/')
  }

  onSubmitFailureView = errorMsg => {
    this.setState({showErrorMsg: true, errorMsg})
  }

  onSubmitFormClick = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = ' https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)

    if (response.ok === true) {
      return this.onSubmitSuccessView(data.jwt_token)
    }
    return this.onSubmitFailureView(data.error_msg)
  }

  render() {
    const {username, password, showErrorMsg, errorMsg} = this.state
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-container">
        <form className="form-container" onSubmit={this.onSubmitFormClick}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="logo"
          />
          <div className="label-input-container">
            <label htmlFor="username" className="label-element">
              USERNAME
            </label>
            <input
              type="text"
              id="username"
              className="input-element"
              value={username}
              placeholder="Username"
              onChange={this.changeUsername}
            />
          </div>
          <div className="label-password-container">
            <label htmlFor="password" className="label-element">
              PASSWORD
            </label>
            <input
              type="password"
              id="password"
              className="input-element"
              value={password}
              placeholder="Password"
              onChange={this.changePassword}
            />
          </div>
          <button type="submit" className="submit-btn">
            Login
          </button>
          {showErrorMsg && <p className="error">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default Login
