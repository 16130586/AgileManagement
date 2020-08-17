import React , {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import {pageContextualNavigation} from '../../actions/global'
import ProjectSetting from '../../components/workplace/project/ProjectSetting'
import {requestProjectDetail, requestUpdateProject, requestProjectAddMember, requestProjectRemoveMember} from '../../actions/project'

const Settings = function(props){
    const {projectId} = props.match.params

    useEffect(() => {
        props.getNavigation('SETTINGS', props.match.params)
    }, [])
    useState(() => {
        props.requestProjectDetail(projectId)
    }, [])

    console.log('project id', projectId)
    return(
        <ProjectSetting
            project={props.project}
            request={props.requestProjectDetail}
            update={props.requestUpdateProject}
            add={props.requestProjectAddMember}
            remove={props.requestProjectRemoveMember}
        />
    )
}
const mapStateToProps = state => {
    return {
        project: state.Project_Setting.project
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getNavigation : (pageName,data) => dispatch(pageContextualNavigation(pageName,data)),
        requestProjectDetail: (projectId) => dispatch(requestProjectDetail(projectId)),
        requestUpdateProject: (data) => dispatch(requestUpdateProject(data)),
        requestProjectAddMember: (data) => dispatch(requestProjectAddMember(data)),
        requestProjectRemoveMember: (data) => dispatch(requestProjectRemoveMember(data)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Settings)