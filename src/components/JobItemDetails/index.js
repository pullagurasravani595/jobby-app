import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiFillStar} from 'react-icons/ai'
import {ImLocation} from 'react-icons/im'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import Header from '../Header'
import JobDetails from '../JobDetails'
import './index.css'

const apiStatusConstraints = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
  initial: 'INITIAL',
}

class JobItemDetails extends Component {
  state = {
    jobItemDetailsObj: [],
    apiStatus: apiStatusConstraints.initial,
    newJobDetails: [],
    lifeAtCompanyList: [],
  }

  componentDidMount() {
    this.getJobItemDetails()
  }

  getJobItemDetails = async () => {
    this.setState({apiStatus: apiStatusConstraints.inProgress})

    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params

    const apiUrl = `https://apis.ccbp.in/jobs/${id}`

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)

    if (response.ok === true) {
      const data = await response.json()

      const updateData = {
        jobDetails: data.job_details,
        similarJobs: data.similar_jobs.map(eachJobSimilar => ({
          companyLogoUrl: eachJobSimilar.company_logo_url,
          employmentType: eachJobSimilar.employment_type,
          id: eachJobSimilar.id,
          jobDescription: eachJobSimilar.job_description,
          location: eachJobSimilar.location,
          rating: eachJobSimilar.rating,
          title: eachJobSimilar.title,
        })),
      }

      const {jobDetails} = updateData

      const newObject = {
        companyLogoUrl: jobDetails.company_logo_url,
        companyWebsiteUrl: jobDetails.company_website_url,
        employmentType: jobDetails.employment_type,
        id: jobDetails.id,
        jobDescription: jobDetails.job_description,
        lifeAtCompany: jobDetails.life_at_company,
        location: jobDetails.location,
        packagePerAnnum: jobDetails.package_per_annum,
        rating: jobDetails.rating,
        skills: jobDetails.skills.map(eachSkill => ({
          imageUrl: eachSkill.image_url,
          name: eachSkill.name,
        })),
        title: jobDetails.title,
      }

      const {lifeAtCompany} = newObject

      const lifeEnvironmentCompany = {
        description: lifeAtCompany.description,
        imageUrl: lifeAtCompany.image_url,
      }

      this.setState({
        apiStatus: apiStatusConstraints.success,
        jobItemDetailsObj: updateData,
        newJobDetails: newObject,
        lifeAtCompanyList: lifeEnvironmentCompany,
      })
    } else {
      this.setState({apiStatus: apiStatusConstraints.failure})
    }
  }

  renderJobDetailsView = () => {
    const {newJobDetails, lifeAtCompanyList} = this.state

    return (
      <JobDetails
        itemDetails={newJobDetails}
        lifeAtCompanyDetailsList={lifeAtCompanyList}
      />
    )
  }

  clickRetryButton = () => {
    this.getJobItemDetails()
  }

  renderSimilarJobsView = () => {
    const {jobItemDetailsObj} = this.state
    const {similarJobs} = jobItemDetailsObj

    return (
      <div className="similar-job-container">
        <h1 className="similar-job-heading">Similar Jobs</h1>
        <ul className="similar-job-items-container">
          {similarJobs.map(jobItem => {
            const {
              companyLogoUrl,
              title,
              rating,
              jobDescription,
              location,
              employmentType,
              id,
            } = jobItem

            return (
              <li className="similar-job-list-container" key={id}>
                <div className="similar-job-logo-title-container">
                  <img
                    src={companyLogoUrl}
                    alt="similar job company logo"
                    className="similar-jobs-logo"
                  />
                  <div>
                    <h1 className="similar-job-heading">{title}</h1>
                    <div className="similar-job-rating-container">
                      <AiFillStar className="similar-jobs-star-icon" />
                      <p className="similar-job-rating">{rating}</p>
                    </div>
                  </div>
                </div>
                <h1 className="similar-job-description">Description</h1>
                <p className="similar-job-description-heading">
                  {jobDescription}
                </p>
                <div className="similar-job-location-employment-container">
                  <div className="similar-job-location-container">
                    <ImLocation className="similar-job-location-icon" />
                    <p className="similar-job-location-icon">{location}</p>
                  </div>
                  <div className="similar-job-location-container">
                    <BsFillBriefcaseFill className="similar-job-location-icon" />
                    <p className="similar-job-location-icon">
                      {employmentType}
                    </p>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  renderSuccessViewJobItem = () => (
    <>
      {this.renderJobDetailsView()}
      {this.renderSimilarJobsView()}
    </>
  )

  renderFailureViewJobItem = () => (
    <div className="job-item-failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="failure-heading-job-item">Oops! Something Went Wrong</h1>
      <p className="failure-description-job-item">
        We cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        className="button-btn"
        onClick={this.clickRetryButton}
      >
        Retry
      </button>
    </div>
  )

  renderLoaderViewJobItem = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderResponseDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstraints.success:
        return this.renderSuccessViewJobItem()
      case apiStatusConstraints.failure:
        return this.renderFailureViewJobItem()
      case apiStatusConstraints.inProgress:
        return this.renderLoaderViewJobItem()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        <div className="banner-container">{this.renderResponseDetails()}</div>
      </div>
    )
  }
}

export default JobItemDetails
