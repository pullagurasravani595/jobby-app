import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import FilterGroup from '../FilterGroup'
import NewJobCard from '../NewJobCard'
import './index.css'

const apiStatusCondition = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    jobsList: [],
    apiStatus: apiStatusCondition.initial,
    jobType: [],
    jobSalary: '',
    searchInput: '',
    jobStr: '',
  }

  componentDidMount() {
    this.getJobsDetails()
  }

  getJobsDetails = async () => {
    this.setState({apiStatus: apiStatusCondition.inProgress})

    const jwtToken = Cookies.get('jwt_token')
    const {jobStr, jobSalary, searchInput} = this.state

    const url = `https://apis.ccbp.in/jobs?employment_type=${jobStr}&minimum_package=${jobSalary}&search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updateData = await data.jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))

      this.setState({
        apiStatus: apiStatusCondition.success,
        jobsList: updateData,
      })
    } else {
      this.setState({apiStatus: apiStatusCondition.failure})
    }
  }

  changeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearchIcon = () => {
    const {searchInput} = this.state
    this.setState({searchInput}, this.getJobsDetails)
  }

  clickRetryJobBtn = () => {
    this.getJobsDetails()
  }

  renderInputContainer = () => {
    const {searchInput} = this.state

    return (
      <div className="input-container">
        <input
          type="search"
          className="input"
          placeholder="search"
          onChange={this.changeSearchInput}
          onKeyDown={this.completeSearchInput}
          value={searchInput}
        />
        <button
          type="button"
          data-testid="searchButton"
          className="search-button"
          onClick={this.onClickSearchIcon}
        >
          <BsSearch className="search-icon" />
        </button>
      </div>
    )
  }

  renderJobsList = () => {
    const {jobsList} = this.state

    if (jobsList.length === 0) {
      return (
        <div className="no-jobs-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
            alt="no jobs"
            className="no-jobs-img"
          />
          <h1 className="no-jobs-heading">No Jobs Found</h1>
          <p className="no-jobs-heading no-jobs-description">
            We could not find any jobs. Try other filters{' '}
          </p>
        </div>
      )
    }
    return (
      <ul className="job-list-container">
        {jobsList.map(job => (
          <NewJobCard jobDetails={job} key={job.id} />
        ))}
      </ul>
    )
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-description">
        We cannot seem to find the page you are looking for
      </p>
      <button type="button" className="button" onClick={this.clickRetryJobBtn}>
        Retry
      </button>
    </div>
  )

  renderLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderResponseDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusCondition.success:
        return this.renderJobsList()
      case apiStatusCondition.failure:
        return this.renderFailureView()
      case apiStatusCondition.inProgress:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  updatedEmploymentType = jobTypeVal => {
    const {jobType} = this.state
    this.setState(prevState => ({
      jobType: [...prevState.jobType, jobTypeVal].join(','),
    }))
    this.setState({jobStr: jobType.join(',')}, this.getJobsDetails)
  }

  updatedSalaryType = jobSalary => {
    this.setState({jobSalary}, this.getJobsDetails)
  }

  render() {
    const {employmentTypesList, salaryRangesList} = this.props
    const {jobType, jobStr} = this.state
    console.log(jobType)
    console.log(jobStr)

    return (
      <>
        <Header />
        <div className="jobs-container">
          <div className="filter-container">
            <FilterGroup
              salaryRangesList={salaryRangesList}
              employmentTypesList={employmentTypesList}
              updatedEmploymentType={this.updatedEmploymentType}
              updatedSalaryType={this.updatedSalaryType}
            />
          </div>
          <div className="input-item-container">
            {this.renderInputContainer()}
            {this.renderResponseDetails()}
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
