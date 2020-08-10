import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from "react-router-dom"
import ClassIcon from '@material-ui/icons/Class';
function Backlog(props) {
    let {projectId} = props.data 
    return (
        <Link to={`/project/${projectId}/backlog`} className={props.className} style={{ display: "block", textDecoration: "none" }}>
            <div style={{ display: "flex", textDecoration: "none", alignItems: "center" }}>
                <ClassIcon /> <span className="ml-2">Backlog</span>
            </div>
        </Link>
    )
}

Backlog.propTypes = {
    changeContext: PropTypes.func.isRequired
}

export default Backlog;