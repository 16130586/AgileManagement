import React, {Fragment, useEffect} from 'react'
import { connect } from 'react-redux'
import { pageContextualNavigation} from '../../actions/global'
import PeopleComponent from '../../components/workplace/people/Index'
import GroupContainer from './people/GroupContainer'
import {createGroup} from "../../actions/work-space";

let tabs = {
    "0": GroupContainer
}
let PeopleContainer = function(props){
    useEffect(() => {
        props.getNavigation('GLOBAL', null)
    }, [])
    return(
        <Fragment>
            <PeopleComponent tabs={tabs} createGroup={props.createGroup}/>
        </Fragment>
    )
}
const mapStateToProps = state => {
    return {
      
    }
  }
  const mapDispatchToProps = dispatch => {
    return {
        getNavigation : (pageName, data) => dispatch(pageContextualNavigation(pageName,data)),
        createGroup: (data) => dispatch(createGroup(data)),
    }
  }
export default connect(mapStateToProps, mapDispatchToProps)(PeopleContainer)
