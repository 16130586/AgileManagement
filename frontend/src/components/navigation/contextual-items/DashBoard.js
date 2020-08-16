import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from "react-router-dom"
import DashboardIcon from '@material-ui/icons/Dashboard';


function DashBoard(props) {
    return (
        <Link to="/dashboard" className={props.className} style={{ display: "block", textDecoration: "none" }}>
            <div style={{ display: "flex", textDecoration: "none", alignItems: "center" }}>
                <DashboardIcon /> <span className="ml-2">DashBoard</span>
            </div>
        </Link>
    )
}

export default DashBoard;