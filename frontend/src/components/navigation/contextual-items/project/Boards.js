import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from "react-router-dom"
import TableChartIcon from '@material-ui/icons/TableChart';
function Boards(props) {
    let {projectId} = props.data 
    return (
        <Link to={`/project/${projectId}/Boards`} className={props.className} style={{ display: "block", textDecoration: "none" }}>
            <div style={{ display: "flex", textDecoration: "none", alignItems: "center" }}>
                <TableChartIcon /> <span className="ml-2">Boards</span>
            </div>
        </Link>
    )
}

Boards.propTypes = {
    changeContext: PropTypes.func.isRequired
}

export default Boards