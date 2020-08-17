import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { pageContextualNavigation } from '../../actions/global'
import { fetchVelocityChart, fetchProject } from '../../actions/project'
import { navigateTo} from '../../actions/global'
import VelocityChartComponent from '../../components/project/chart/Velocity'
const Velocity = function (props) {
    const { projectId } = props.match.params
    useEffect(() => {
        props.getNavigation('CHARTS', props.match.params)
    }, [])
    useEffect(() => {
        if (!props.isLoadPage) {
            props.fetchProject(parseInt(projectId))
            props.fetchVelocityChart(parseInt(projectId))
        }
    }, [props.isLoadPage])

    return (
        <VelocityChartComponent
            project={props.project}
            feedData={props.feedData}
            navigateTo={props.navigateTo}
        />
    )
}
const mapStateToProps = state => {
    return {
        isLoadPage: state.Project_Chart_Velocity.isLoadPage,
        project: state.Project_Chart_Velocity.project,
        feedData: state.Project_Chart_Velocity.feedData,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        navigateTo: (url) => dispatch(navigateTo(url)),
        getNavigation: (pageName, data) => dispatch(pageContextualNavigation(pageName, data)),
        fetchVelocityChart: (projectId) => dispatch(fetchVelocityChart(projectId)),
        fetchProject: (projectId) => dispatch(fetchProject(projectId))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Velocity)