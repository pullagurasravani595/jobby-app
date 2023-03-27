import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = () => (
  <>
    <Header />
    <div className="home-container">
      <h1 className="heading">
        Find The Job That <br />
        Fits Your Life
      </h1>
      <p className="home-description">
        Millions of people are searching for jobs, salary, information, company
        reviews. Find the job that fits your abilities and potential
      </p>
      <Link to="/jobs">
        <li className="list-button">
          <button type="button" className="button">
            Find Jobs
          </button>
        </li>
      </Link>
    </div>
  </>
)

export default Home
