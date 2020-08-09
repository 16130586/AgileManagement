import React, {Fragment, useEffect} from 'react'
import { connect } from 'react-redux'
import { pageContextualNavigation} from '../../actions/global'
import PeopleComponent from '../../components/workplace/people/Index'
import GroupContainer from './people/GroupContainer'

let tabs = {
    "0": GroupContainer
}
let PeopleContainer = function(props){
    useEffect(() => {
        props.getNavigation('GLOBAL', null)
    }, [])
    return(
        <Fragment>
            <PeopleComponent tabs={tabs} />
        </Fragment>
    )
}
const mapStateToProps = state => {
    return {
      
    }
  }
  const mapDispatchToProps = dispatch => {
    return {
        getNavigation : (pageName, data) => dispatch(pageContextualNavigation(pageName,data))
    }
  }
export default connect(mapStateToProps, mapDispatchToProps)(PeopleContainer)
