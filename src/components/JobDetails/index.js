import {AiFillStar} from 'react-icons/ai'
import {ImLocation} from 'react-icons/im'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FaExternalLinkAlt} from 'react-icons/fa'
import './index.css'

const JobDetails = props => {
  const {itemDetails, lifeAtCompanyDetailsList} = props
  const {
    companyLogoUrl,
    companyWebsiteUrl,
    title,
    rating,
    location,
    employmentType,
    packagePerAnnum,
    jobDescription,
    skills,
  } = itemDetails

  return (
    <div className="item-container">
      <div className="company-logo-title-container">
        <img
          src={companyLogoUrl}
          alt="job details company logo"
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
          <div className="employment-container-job">
            <BsFillBriefcaseFill className="location-icon" />
            <p className="employment-title">{employmentType}</p>
          </div>
        </div>
        <p className="employment-title">{packagePerAnnum}</p>
      </div>
      <hr className="line" />
      <div className="description-link-container">
        <h1 className="description-heading">Description</h1>
        <a href={companyWebsiteUrl} className="anchor-element">
          <div className="visit-container">
            <p className="visit-heading">Visit</p>
            <FaExternalLinkAlt />
          </div>
        </a>
      </div>
      <p className="description-heading description">{jobDescription}</p>
      <h1 className="description-heading">Skills</h1>
      <ul className="skill-container">
        {skills.map(skill => {
          const {imageUrl, name} = skill
          return (
            <li className="list-container" key={name}>
              <img src={imageUrl} alt={name} className="skill-img" />
              <p className="skill-name">{name}</p>
            </li>
          )
        })}
      </ul>
      <h1 className="life-at-company-heading">Life At Company</h1>
      <div className="life-at-company-container">
        <p className="life-at-company-description">
          {lifeAtCompanyDetailsList.description}
        </p>
        <img src={lifeAtCompanyDetailsList.imageUrl} alt="life at company" />
      </div>
    </div>
  )
}

export default JobDetails
