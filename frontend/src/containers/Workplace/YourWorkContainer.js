import React, {Fragment, useEffect} from 'react'
import { connect } from 'react-redux'
import { fetchTotalAssignToMe } from '../../actions/work-space/index'
import { pageContextualNavigation} from '../../actions/global'
import YourWorkComponent from '../../components/workplace/your-work/Index'
import WorkOnContainer from './your-work/WorkOnContainer'
import ViewedContainer from './your-work/ViewedContainer'
import AssignedToMeContainer from './your-work/AssignedToMeContainer'
import StarredContainer from './your-work/StarredContainer'


    let tabs = {
        "0": WorkOnContainer,
        "1": ViewedContainer,
        "2": AssignedToMeContainer,
        "3": StarredContainer
    }
let YourWorkContainer = function(props){
    useEffect(()=> {
        props.fetchTotalAssignToMe()
    }, [props.fetchTotalAssignToMe])

    useEffect(() => {
        props.getNavigation('GLOBAL', null)
    }, [])

    return(
        <Fragment>
            <YourWorkComponent tabs={tabs} totalAssignToMe={props.totalAssignToMe}/>
        </Fragment>
    )
}
const mapStateToProps = state => {
    return {
        totalAssignToMe: state.WorkSpace_YourWork_AssignToMe.totalAssignToMe
    }
}
const mapDispatchToProps = dispatch => {
    return {
        fetchTotalAssignToMe: () => dispatch(fetchTotalAssignToMe()),
        getNavigation : (pageName, data) => dispatch(pageContextualNavigation(pageName,data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(YourWorkContainer);