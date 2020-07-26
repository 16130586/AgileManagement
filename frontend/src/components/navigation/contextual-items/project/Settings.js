import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from "react-router-dom"
import SettingsIcon from '@material-ui/icons/Settings';
function Settings(props) {
    let {projectId} = props.data 
    return (
        <Link to={`/project/${projectId}/settings/details`} className={props.className} style={{ display: "block", textDecoration: "none" }}>
            <div style={{ display: "flex", textDecoration: "none", alignItems: "center" }}>
                <SettingsIcon /> <span className="ml-2">Project settings</span>
            </div>
        </Link>
    )
}

Settings.propTypes = {
    changeContext: PropTypes.func.isRequired
}

export default Settings;