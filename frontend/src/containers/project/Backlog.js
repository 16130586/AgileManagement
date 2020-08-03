import React , {useEffect} from 'react'
import { connect } from 'react-redux'
import {pageContextualNavigation} from '../../actions/global'
import BacklogComponent from '../../components/project/BacklogComponent'
const Backlog = function(props){

    useEffect(() => {
        props.getNavigation('BACKLOG', props.match.params)
    }, [])
    const {projectId} = props.match.params
    return(
      <BacklogComponent data={props.match.params}></BacklogComponent>
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
export default connect(mapStateToProps, mapDispatchToProps)(Backlog)