import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'

const apiStatusConstraints = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class FilterGroup extends Component {
  state = {profileObj: {}, apiStatus: apiStatusConstraints.initial}

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    this.setState({apiStatus: apiStatusConstraints.inProgress})

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const formattedData = await response.json()

      const updateProfile = {
        profileDetails: formattedData.profile_details,
      }

      const {profileDetails} = updateProfile
      const newData = {
        name: profileDetails.name,
        profileImageUrl: profileDetails.profile_image_url,
        shortBio: profileDetails.short_bio,
      }
      this.setState({
        apiStatus: apiStatusConstraints.success,
        profileObj: {...newData},
      })
    } else {
      this.setState({apiStatus: apiStatusConstraints.failure})
    }
  }

  renderProfileDetails = () => {
    const {profileObj} = this.state
    const {name, profileImageUrl, shortBio} = profileObj

    return (
      <div className="profile-container">
        <img src={profileImageUrl} alt="profile" className="profile-img" />
        <h1 className="profile-name">{name}</h1>
        <p className="profile-bio">{shortBio}</p>
      </div>
    )
  }

  renderFailureView = () => (
    <button
      type="button"
      className="retry-btn"
      onClick={this.getProfileDetails}
    >
      Retry
    </button>
  )

  renderLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderApiStatusViewsAll = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstraints.success:
        return this.renderProfileDetails()
      case apiStatusConstraints.failure:
        return this.renderFailureView()
      case apiStatusConstraints.inProgress:
        return this.renderLoaderView()

      default:
        return null
    }
  }

  renderEmploymentTypeList = () => {
    const {employmentTypesList, updatedEmploymentType} = this.props

    return employmentTypesList.map(eachType => {
      const {label, employmentTypeId} = eachType
      const clickCheckBox = () => updatedEmploymentType(employmentTypeId)

      return (
        <li className="list-container">
          <input
            type="checkbox"
            id="myCheckbox"
            className="input-checkbox"
            onClick={clickCheckBox}
          />
          <label htmlFor="myCheckbox" className="label-element">
            {label}
          </label>
        </li>
      )
    })
  }

  renderSalaryList = () => {
    const {salaryRangesList, updatedSalaryType} = this.props

    return salaryRangesList.map(eachSalary => {
      const {label, salaryRangeId} = eachSalary
      const clickRadioBtn = () => updatedSalaryType(salaryRangeId)

      return (
        <li className="list-container">
          <input
            type="radio"
            className="radiobox"
            onChange={clickRadioBtn}
            name="salary"
          />
          <label className="label-element">{label}</label>
        </li>
      )
    })
  }

  renderSalaryRangeDisplay = () => (
    <>
      <h1 className="employment-heading">Salary Range</h1>
      <ul className="employment-container">{this.renderSalaryList()}</ul>
    </>
  )

  renderEmployListDisplay = () => (
    <>
      <h1 className="employment-heading">Type of Employment</h1>
      <ul className="employment-container">
        {this.renderEmploymentTypeList()}
      </ul>
    </>
  )

  render() {
    return (
      <div className="filter-container">
        <div>{this.renderApiStatusViewsAll()}</div>
        <hr className="line" />
        {this.renderEmployListDisplay()}
        <hr className="line" />
        {this.renderSalaryRangeDisplay()}
      </div>
    )
  }
}

export default FilterGroup
