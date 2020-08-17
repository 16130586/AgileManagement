import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from "react-router-dom"
import GroupIcon from '@material-ui/icons/Group';

function People(props) {
    return (
        <Link to="/people" className={props.className} style={{ display: "block", textDecoration: "none" }}>
            <div style={{ display: "flex", textDecoration: "none", alignItems: "center" }}>
                <GroupIcon /> <span className="ml-2">People</span>
            </div>
        </Link>
    )
}


export default People;