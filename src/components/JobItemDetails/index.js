import {Component} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'
import './index.css'

const apiStatusConstraints = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
  initial: 'INITIAL',
}

class JobItemDetails extends Component {
  state = {jobItemDetailsObj: [], apiStatus: apiStatusConstraints.initial}

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

      this.setState({
        apiStatus: apiStatusConstraints.success,
        jobItemDetailsObj: updateData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstraints.failure})
    }
  }

  renderJobItemDetailsDisplay = () => {
    const {jobItemDetailsObj} = this.state
    const {jobDetails} = jobItemDetailsObj
    const updateJobDetails = {
      companyLogoUrl: jobDetails.company_logo_url,
      companyWebsiteUrl: jobDetails.company_website_url,
      id: jobDetails.id,
      jobDescription: jobDetails.job_description,
      lifeAtCompany: jobDetails.life_at_company,
      location: jobDetails.location,
      packagePerAnnum: jobDetails.package_per_annum,
      rating: jobDetails.rating,
      skills: jobDetails.skills,
    }

    console.log(updateJobDetails)
    return (
      <div>
        <p className="heading">dfgh</p>
      </div>
    )
  }

  render() {
    const {jobItemDetailsObj} = this.state
    const {jobDetails} = jobItemDetailsObj

    return (
      <div>
        <Header />
        <div className="banner-container">
          <div className="item-container">
            {this.renderJobItemDetailsDisplay()}
          </div>
        </div>
      </div>
    )
  }
}

export default JobItemDetails
