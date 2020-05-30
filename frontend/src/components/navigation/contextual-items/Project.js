import React from 'react';
import PropTypes from 'prop-types'
import { Link } from "react-router-dom";
import FileCopyIcon from '@material-ui/icons/FileCopy';
function Projects(props) {
    return (
        <Link to="/projects" className={props.className} style={{ display: "block", textDecoration: "none" }}>
            <div style={{ display: "flex", textDecoration: "none", alignItems: "center" }}>
                <FileCopyIcon /> <span className="ml-2"> Projects</span>
            </div>
        </Link>
    )
}

Projects.propTypes = {
    changeContext: PropTypes.func.isRequired
}
export default Projects;