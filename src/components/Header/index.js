import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onClickLogoutBtn = () => {
    Cookies.remove('jwt_token')

    const {history} = props
    history.replace('/login')
  }

  return (
    <nav className="nav-container">
      <Link to="/" className="nav-link">
        <li className="list-item">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="logo-header"
          />
        </li>
      </Link>
      <ul className="link-container">
        <Link to="/" className="nav-link">
          <li className="list-item">Home</li>
        </Link>
        <Link to="/jobs" className="nav-link">
          <li className="list-item">Jobs</li>
        </Link>
      </ul>
      <button type="button" className="button" onClick={onClickLogoutBtn}>
        Logout
      </button>
    </nav>
  )
}

export default withRouter(Header)
