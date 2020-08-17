import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from "react-router-dom"
import BarChartIcon from '@material-ui/icons/BarChart'
function Charts(props) {
    let { projectId } = props.data
    return (
        <Link to="#" onClick={props.onClick} className={props.className} style={{ display: "block", textDecoration: "none" }}>
            <div style={{ display: "flex", textDecoration: "none", alignItems: "center" }}>
                <BarChartIcon /> <span className="ml-2">Charts</span>
            </div>
        </Link>
    )
}

Charts.propTypes = {
    changeContext: PropTypes.func.isRequired
}

export default Charts;