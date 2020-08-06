import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { pageContextualNavigation } from '../../actions/global'
import { fetchBacklogPage } from '../../actions/project'
import BacklogComponent from '../../components/project/BacklogComponent'
const Backlog = function (props) {
    const { projectId } = props.match.params
    useEffect(() => {
        props.getNavigation('BACKLOG', props.match.params)
    }, [])
    useEffect(() => {
        if (!props.isLoadBacklogPage) {
            props.fetchBacklogPage(projectId)
        }
    }, [props.isLoadBacklogPage])

    
    return (
        <BacklogComponent
            projectId={projectId}
            backlogPage={props.backlogPage}>
        </BacklogComponent>
    )
}
const mapStateToProps = state => {
    return {
        backlogPage: state.Project_Backlog.backlogPage,
        isLoadBacklogPage: state.Project_Backlog.isLoadBacklogPage
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getNavigation: (pageName, data) => dispatch(pageContextualNavigation(pageName, data)),
        fetchBacklogPage: (projectId) => dispatch(fetchBacklogPage(projectId)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Backlog)