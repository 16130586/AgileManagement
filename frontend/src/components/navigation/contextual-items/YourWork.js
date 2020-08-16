import React from 'react';
import PropTypes from 'prop-types'
import { Link } from "react-router-dom";
import AssignmentIcon from '@material-ui/icons/Assignment';

function YourWork(props) {
    return (
        <Link to="/your-work" className={props.className} style={{ display: "block", textDecoration: "none"}}>
            <div style={{ display: "flex", textDecoration: "none", alignItems: "center" }}> 
                <AssignmentIcon /> <span className="ml-2">Your work</span>
            </div>
        </Link>
    )
}
export default YourWork;