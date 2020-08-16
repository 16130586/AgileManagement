import React from 'react'
import ProfileComponent from '../../components/navigation/global-items/Profile'
import { connect } from 'react-redux'
import { logout } from '../../actions/global'
let ProfileContainer = function (props) {
  console.log(props)
  return (
    <ProfileComponent logout={props.logout} />
  )
}

const mapStateToProps = state => {
  return {

  }
}
const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer)
