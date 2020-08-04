import React, { Fragment, useState } from 'react'
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import { withStyles } from "@material-ui/core/styles";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Icon from '@material-ui/core/Icon'

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'

import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
let MyBreadCrumbs = function (props) {
    let projectId = 0;
    return (
        <Breadcrumbs aria-label="breadcrumb" style={{ marginTop: "1.5rem" }}>
            <Link color="inherit" href="/projects">
                Projects
        </Link>
            <Link color="inherit" href={`/project/${projectId}/settings/details`}>
                Projects Key
        </Link>
            <Typography color="textPrimary">Backlog</Typography>
        </Breadcrumbs>
    )
}


const Accordion = withStyles({
    root: {
        border: "1px solid rgba(0, 0, 0, .125)",
        boxShadow: "none",
        "&:not(:last-child)": {
            borderBottom: 0
        },
        "&:before": {
            display: "none"
        },
        "&$expanded": {
            margin: "auto"
        }
    },
    expanded: {}
})(MuiAccordion);

const AccordionSummary = withStyles({
    root: {
        backgroundColor: "white",
        borderBottom: "1px solid rgba(0, 0, 0, .125)",
        marginBottom: -1,
        minHeight: 56,
        "&$expanded": {
            minHeight: 56
        }
    },
    content: {
        "&$expanded": {
            margin: "12px 0"
        }
    },
    expanded: {}
})(MuiAccordionSummary);

const AccordionDetails = withStyles(theme => ({
    root: {
        padding: theme.spacing(2)
    }
}))(MuiAccordionDetails);


let SprintComponent = function (props) {
    let [anchorEl, setAnchorEl] = React.useState(null);
    let genratedId = "".concat("_").concat(Date.now()).concat(Math.random() * 10)
    const handleOpenMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseOptsMenu = () => {
        setAnchorEl(null);
    };
    const [openEditDialog, setOpenEditDialog] = React.useState(false)
    const handleCloseEditDialog = () => {
        setOpenEditDialog(false)
    }
    const handleEditSprint = (sprintId) => {
        console.log('edit ' + sprintId)
        handleCloseEditDialog()
    }

    const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false)
    const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false)
    }

    const handleDeleteSprint = (sprintId) => {
        console.log('delete ' + sprintId)
        handleCloseDeleteDialog()
    }
    return (
        <Fragment>
            <Accordion
                square
                expanded={true}
                onChange={function () { console.log('expanding') }}
            >
                <AccordionSummary
                    className="Mui-accordion-summary--reverse"
                    expandIcon={<ExpandMoreIcon className="flex-order-1" />}
                    aria-controls="panel1d-content"
                    id="panel1d-header"
                >

                    <div style={{ display: "flex", width: "100%" }}>
                        <div style={{ flexGrow: 2, display: "flex", alignItems: "center" }}>
                            <Typography>Project key here</Typography>
                            <span className="ml-1">total sprint backlog count here</span>
                        </div>
                        <div style={{ flexGrow: 8, display: "flex", flexDirection: "row-reverse" }}>
                            <Icon
                                className="pd-1 my-btn my-btn--hover cursor--pointer"
                                aria-controls={"sprint_menu".concat(genratedId)}
                                aria-haspopup="true"
                                onClick={(e) => { e.stopPropagation(); handleOpenMenu(e) }}>
                                more_horiz
                            </Icon>
                            <Menu
                                id={"sprint_menu".concat(genratedId)}
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleCloseOptsMenu}
                            >
                                <MenuItem onClick={(e) => { e.stopPropagation(); handleCloseOptsMenu() }}>Move sprint up</MenuItem>
                                <MenuItem onClick={(e) => { e.stopPropagation(); handleCloseOptsMenu() }}>Move sprint down</MenuItem>
                                <MenuItem onClick={(e) => { e.stopPropagation(); setOpenEditDialog(true) }}>Edit sprint</MenuItem>
                                <MenuItem onClick={(e) => { e.stopPropagation(); setOpenDeleteDialog(true) }}>Delete sprint</MenuItem>
                            </Menu>
                            <Dialog
                                fullWidth={true}
                                open={openEditDialog}
                                onClose={handleCloseEditDialog}
                                aria-labelledby={"edit-dialog-title".concat(genratedId)}
                                aria-describedby={"edit-dialog-description".concat(genratedId)}>
                                <DialogTitle
                                    id={"edit-dialog-title".concat(genratedId)}>
                                    Edit sprint: Project key - sprint name
                                 </DialogTitle>
                                <DialogContent>
                                    <DialogContentText id={"edit-dialog-description".concat(genratedId)}>
                                    </DialogContentText>
                                    <div style={{ width: "100%", height: "auto" }}>
                                        <div style={{ display: "flex", flexDirection: "column" }}>
                                            <label>Sprint name*</label>
                                            <TextField value="Sprint name" className="mt-1" style={{ width: "50%" }} variant="outlined" />
                                        </div>
                                        <div className="mt-2" style={{ display: "flex", flexDirection: "column" }}>
                                            <label>Sprint goal</label>
                                            <TextareaAutosize
                                                className="mt-1"
                                                rows={8}
                                                rowsMax={16}
                                            />
                                        </div>
                                    </div>
                                </DialogContent>
                                <DialogActions>
                                    <Button
                                        onClick={(e) => { e.stopPropagation(); handleEditSprint(0) }}
                                        color="primary">
                                        Update
                                    </Button>
                                    <Button onClick={(e) => { e.stopPropagation(); handleCloseEditDialog() }} color="primary" autoFocus>
                                        Cancle
                                    </Button>
                                </DialogActions>
                            </Dialog>
                            <Dialog
                                open={openDeleteDialog}
                                onClose={handleCloseDeleteDialog}
                                aria-labelledby={"delete-dialog-title".concat(genratedId)}
                                aria-describedby={"delete-dialog-description".concat(genratedId)}>
                                <DialogTitle
                                    id={"delete-dialog-title".concat(genratedId)}>
                                    Delete sprint
                                 </DialogTitle>
                                <DialogContent>
                                    <DialogContentText id={"delete-dialog-description".concat(genratedId)}>
                                        Are you sure you want to delete sprint Project Key - Sprint Name?
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button
                                        onClick={(e) => { e.stopPropagation(); handleDeleteSprint(0) }}
                                        color="primary">
                                        Delete
                                    </Button>
                                    <Button onClick={(e) => { e.stopPropagation(); handleCloseDeleteDialog() }} color="primary" autoFocus>
                                        Cancle
                                    </Button>
                                </DialogActions>
                            </Dialog>
                            <Button className="my-btn--hover" style={{backgroundColor : "rgba(9,30,66,0.04)", marginRight:"1rem"}}>Start sprint</Button>
                            <span>2</span>
                            <span>3</span>
                            <span>4</span>
                        </div>
                    </div>
                </AccordionSummary>
                <AccordionDetails>
                    {(props.issues == null || props.isues.length == 0) &&
                        <Typography>
                           Plan your sprint
                           Choose issues from the <bold>Backlog</bold> section, or create new issues, to plan
                           the work for this sprint. Select <bold>Start</bold> sprint when your're ready
                        </Typography>
                    }
                    
                </AccordionDetails>
            </Accordion>
        </Fragment>
    )
}
let BacklogComponent = function (props) {
    return (
        <Fragment>
            <MyBreadCrumbs />
            <h1>I'm backblog</h1>
            <SprintComponent />
        </Fragment>
    )
}
export default BacklogComponent