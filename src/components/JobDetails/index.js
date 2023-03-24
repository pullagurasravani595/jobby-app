import {AiFillStar} from 'react-icons/ai'
import {ImLocation} from 'react-icons/im'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import './index.css'

const JobDetails = props => {
  const {itemDetails} = props
  const {
    companyLogoUrl,
    title,
    rating,
    location,
    employmentType,
    packagePerAnnum,
    jobDescription,
    skills,
  } = itemDetails

  return (
    <div>
      <div className="company-logo-title-container">
        <img
          src={companyLogoUrl}
          alt="company logo"
          className="company-logo-img"
        />
        <div className="title-rating-container">
          <h1 className="title-heading">{title}</h1>
          <div className="star-rating-container">
            <AiFillStar className="icon-img" />
            <p className="rating">{rating}</p>
          </div>
        </div>
      </div>
      <div className="location-employment-package-container">
        <div className="location-employment-container">
          <div className="location-container">
            <ImLocation className="location-icon" />
            <p className="location-title">{location}</p>
          </div>
          <div className="employment-container">
            <BsFillBriefcaseFill className="location-icon" />
            <p className="employment-title">{employmentType}</p>
          </div>
        </div>
        <p className="employment-title">{packagePerAnnum}</p>
      </div>
      <hr className="line" />
      <h1 className="description-heading">Description</h1>
      <p className="description-heading description">{jobDescription}</p>
      <h1 className="description-heading">Skills</h1>
      <ul>
        {skills.map(each => {
          const {imageUrl, name} = each

          return (
            <li className="list-container">
              <img src={imageUrl} alt="name" />
              <p>{name}</p>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default JobDetails
