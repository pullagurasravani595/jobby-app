import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {ImLocation} from 'react-icons/im'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import './index.css'

const JobItemDetails = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    location,
    rating,
    title,
    packagePerAnnum,
    jobDescription,
    id,
  } = jobDetails
  return (
    <Link to={`/jobs/${id}`} className="nav-link">
      <div className="job-item-container">
        <div className="logo-title-container">
          <img
            src={companyLogoUrl}
            alt="job details company logo"
            className="company-logo"
          />
          <div>
            <h1 className="title">{title}</h1>
            <div className="star-rating-container">
              <AiFillStar className="star" />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="location-employment-salary-container">
          <div className="location-employment">
            <div className="location-container">
              <ImLocation className="location" />
              <p className="location-name">{location}</p>
            </div>
            <div className="location-container">
              <BsFillBriefcaseFill className="location" />
              <p className="location-name">{employmentType}</p>
            </div>
          </div>
          <p className="salary">{packagePerAnnum}</p>
        </div>
        <hr className="line" />
        <p className="description">Description</p>
        <p className="description">{jobDescription}</p>
      </div>
    </Link>
  )
}

export default JobItemDetails
