import React, { Fragment, useState, useEffect, createRef, useRef } from 'react'
import Typography from '@material-ui/core/Typography'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import Link from '@material-ui/core/Link'
let MyBreadCrumbs = function (props) {
    let projectId = props.project ? props.project.id : 0
    let projectCode = props.project ? props.project.code : ''
    let projectName = props.project ? props.project.name : ''
    return (
        <Breadcrumbs aria-label="breadcrumb" style={{ marginTop: "1.5rem" }}>
            <Link color="inherit" href="/projects">
                Projects
            </Link>
            <Link color="inherit" href={`/project/${projectId}/settings/details`}>
                {projectCode == null ? projectName : projectCode}
            </Link>
            <Typography color="textPrimary">Board</Typography>
        </Breadcrumbs>
    )
}
let Burndown = function (props) {
    return (
        <div className="pd-2">
            {/* <MyBreadCrumbs project={props.project}/> */}
        </div>
    )
}

export default Burndown