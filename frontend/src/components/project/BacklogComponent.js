import React, { Fragment, useState, useEffect, createRef } from 'react'
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
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { ReactReduxContext } from 'react-redux';
import { DropDownList } from '@progress/kendo-react-dropdowns';
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
        border: "none",
        boxShadow: "none",
        "&:before": {
            display: "none"
        },
        "&:after": {
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
        padding: theme.spacing(2),
        paddingTop: "0px"
    }
}))(MuiAccordionDetails);

let BacklogItem = function (props) {
    let [anchorEl, setAnchorEl] = React.useState(null)
    const handleOpenMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseOptsMenu = () => {
        setAnchorEl(null);
    };
    let genratedId = "backlog-item".concat("_").concat(Date.now()).concat(Math.random() * 10)
    return (
        <div style={{ width: "100%", display: "flex", alignItems: "center" }}>
            <div>
                <img />
                <Typography className="ml-1" style={{ display: "inline-block" }}>Backlog item name</Typography>
                <Typography className="ml-2" style={{ display: "inline-block" }}>Content</Typography>
            </div>
            <div style={{ display: "flex", marginLeft: "auto" }}>
                <Icon
                    className="pd-1 my-btn my-btn--hover cursor--pointer"
                    aria-controls={"item_menu".concat(genratedId)}
                    aria-haspopup="true"
                    onClick={(e) => { e.stopPropagation(); handleOpenMenu(e) }}>
                    more_horiz
                </Icon>
                <Menu
                    id={"item_menu".concat(genratedId)}
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleCloseOptsMenu}
                >
                    <MenuItem onClick={(e) => { e.stopPropagation(); handleCloseOptsMenu() }}
                        disabled
                    >Actions</MenuItem>
                    <MenuItem onClick={(e) => { e.stopPropagation(); handleCloseOptsMenu() }}
                    >Add flag</MenuItem>
                    <MenuItem onClick={(e) => { e.stopPropagation(); handleCloseOptsMenu() }}>
                        Coppy issue link</MenuItem>
                    <MenuItem onClick={(e) => { e.stopPropagation(); handleCloseOptsMenu() }}>Delete</MenuItem>
                    <MenuItem onClick={(e) => { e.stopPropagation(); handleCloseOptsMenu() }}
                        disabled
                    >
                        Move to</MenuItem>
                    <MenuItem onClick={(e) => { e.stopPropagation(); handleCloseOptsMenu() }}>
                        XXXX sprint name</MenuItem>
                    <MenuItem onClick={(e) => { e.stopPropagation(); handleCloseOptsMenu() }}>
                        XXXX sprint name</MenuItem>
                    <MenuItem onClick={(e) => { e.stopPropagation(); handleCloseOptsMenu() }}>
                        Top of backlog</MenuItem>
                    <MenuItem onClick={(e) => { e.stopPropagation(); handleCloseOptsMenu() }}>
                        Bottom of backlog</MenuItem>
                </Menu>
            </div>
        </div>
    )
}

let CreateNewBacklogItem = function (props) {
    const self = createRef()
    const [isOpenCreateInput, setIsOpenCreateInput] = useState(false)
    let handleClickDismiss = (event) => {
        const { target } = event
        if (self.current && !self.current.contains(target)) {
            setIsOpenCreateInput(false)
        }
    }
    useEffect(() => {
        document.addEventListener('click', handleClickDismiss)
        return function cleanUp() { document.removeEventListener('click', handleClickDismiss) }
    }, [self])


    let handleEnterPress = (event) => {
        if ('Enter' === event.key) {
            console.log('user submit new issue type')
            setIsOpenCreateInput(false)
        }
    }
    let issueTypes = [
        { id: 1, icon: "https://picsum.photos/24", name: "Bug" },
        { id: 2, icon: "https://picsum.photos/24", name: "Task" },
        { id: 3, icon: "https://picsum.photos/24", name: "Story" },
    ]
    let [cbIssueValue, setCbIssueValue] = useState(issueTypes[2])

    const itemRender = (li, itemProps) => {
        const iconSrc = itemProps.dataItem.icon
        const name = itemProps.dataItem.name
        const itemChildren =
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-around"
                }}>
                <img src={iconSrc} style={{ width: "24px", height: "24px" }} />
                <span className="ml-1" style={{ size: "1rem", textTransform: "capitalize" }}>{name}</span>
            </div>
        return React.cloneElement(li, li.props, itemChildren);
    }
    const valueRender = (element, value) => {
        if (!value) {
            return element;
        }
        const children =
            <span style={{ size: "1rem", textTransform: "capitalize" }}>
                {value.name}
            </span>
        return React.cloneElement(element, { ...element.props }, children);
    }

    return (
        <div className={props.className} style={props.style} ref={self}>

            {!isOpenCreateInput &&
                <div onClick={() => setIsOpenCreateInput(true)}
                    className="btn mt-1"
                    style={{ display: "flex", alignItems: "center" }}
                >
                    <AddIcon />
                    <Typography className="ml-1">Create issue</Typography>
                </div>
            }
            {
                isOpenCreateInput &&
                <div style={{ display: "flex", alignItems: "center" }}>
                    <DropDownList
                        itemRender={itemRender}
                        valueRender={valueRender}
                        data={issueTypes}
                        textField="name"
                        dataItemKey="id"
                        value={cbIssueValue}
                        onChange={(event) => { setCbIssueValue(event.target.value) }}
                        footer={<span className="mt-1">footer</span>}
                    />
                    <TextField className="ml-1"
                        onKeyPress={handleEnterPress}
                        autoFocus={true}
                        fullWidth={true}
                        size={'small'}
                        required={true}
                        label="What needs to be done?"
                        variant="outlined" />
                </div>
            }


        </div>
    )
}
let SprintComponent = function (props) {
    let [anchorEl, setAnchorEl] = React.useState(null)
    let [isExpanding, setExpanding] = React.useState(false)

    let genratedId = "sprint-component".concat("_").concat(Date.now()).concat(Math.random() * 10)
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

    const [openCompleteDialog, setOpenCompleteDialog] = React.useState(false)
    const handleCloseCompleteDialog = () => {
        setOpenCompleteDialog(false)
    }

    const handleCompleteSprint = (sprintId) => {
        console.log('complete ' + sprintId)
        handleCloseCompleteDialog()
    }

    return (
        <Fragment>
            <Accordion
                className={props.className}
                square
                expanded={isExpanding}
                onChange={() => { setExpanding(!isExpanding) }}
            >
                <AccordionSummary
                    className="Mui-accordion-summary--reverse"
                    expandIcon={<ExpandMoreIcon className="flex-order-1" />}
                    aria-controls="panel1d-content"
                    id="panel1d-header"
                >

                    <div style={{ display: "flex", width: "100%" }}>
                        <div style={{ flexGrow: 2, display: "flex", alignItems: "center" }}>
                            <Typography>Project key here | Sprint name here</Typography>
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

                            <Button className="my-btn--hover" style={{ backgroundColor: "rgba(9,30,66,0.04)", marginRight: "1rem" }}>Start sprint</Button>
                            <Button onClick={(event) => { event.stopPropagation(); setOpenCompleteDialog(true) }} className="my-btn--hover" style={{ backgroundColor: "rgba(9,30,66,0.04)", marginRight: "1rem" }}>Complete sprint</Button>
                            <span>2</span>
                            <span>3</span>
                            <span>4</span>
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
                            <Dialog
                                open={openCompleteDialog}
                                onClose={handleCloseCompleteDialog}
                                aria-labelledby={"complete-dialog-title".concat(genratedId)}
                                aria-describedby={"complete-dialog-description".concat(genratedId)}>
                                <DialogTitle
                                    id={"complete-dialog-title".concat(genratedId)}>
                                    Complete Sprint - key , sprint name
                                 </DialogTitle>
                                <DialogContent>
                                    <DialogContentText id={"delete-dialog-description".concat(genratedId)}>
                                        There are numbers issues in this sprint
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button
                                        onClick={(e) => { e.stopPropagation(); handleCompleteSprint(0) }}
                                        color="primary">
                                        Complete sprint
                                    </Button>
                                    <Button onClick={(e) => { e.stopPropagation(); handleCloseCompleteDialog() }} color="primary" autoFocus>
                                        Cancle
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </div>
                    </div>
                </AccordionSummary>
                <AccordionDetails>
                    <div style={{ width: "96%", marginLeft: "auto", display: "flex", flexDirection: "column" }}>
                        {(props.issues == null || props.isues.length == 0) &&
                            <div className="pd-1" style={{ paddingTop: "0px", border: "2px solid rgb(223, 225, 230)", borderStyle: "dashed" }}>
                                <Typography>
                                    Plan your sprint
                                    Choose issues from the <bold>Backlog</bold> section, or create new issues, to plan
                                    the work for this sprint. Select <bold>Start</bold> sprint when your're ready
                                </Typography>
                            </div>
                        }
                        <CreateNewBacklogItem className="mt-1" />
                    </div>
                </AccordionDetails>
            </Accordion>
        </Fragment>
    )
}

let BacklogComponent = function (props) {
    let [isExpanding, setExpanding] = React.useState(false)
    let genratedId = "backlog-component".concat("_").concat(Date.now()).concat(Math.random() * 10)

    return (
        <Fragment>
            <Accordion
                className={props.className}
                square
                expanded={isExpanding}
                onChange={() => { setExpanding(!isExpanding) }}
            >
                <AccordionSummary
                    className="Mui-accordion-summary--reverse"
                    expandIcon={<ExpandMoreIcon className="flex-order-1" />}
                    aria-controls="panel1d-content"
                    id="panel1d-header"
                >

                    <div style={{ display: "flex", width: "100%" }}>
                        <div style={{ flexGrow: 2, display: "flex", alignItems: "center" }}>
                            <Typography>Backlog</Typography>
                            <span className="ml-1">total sprint backlog count here</span>
                        </div>
                        <div style={{ flexGrow: 8, display: "flex", flexDirection: "row-reverse" }}>
                            <Button
                            onClick={(event) => event.stopPropagation()} 
                            className="my-btn--hover" 
                            style={{ backgroundColor: "rgba(9,30,66,0.04)" }}>Create sprint</Button>
                            <span>2</span>
                            <span>3</span>
                            <span>4</span>
                        </div>
                    </div>
                </AccordionSummary>
                <AccordionDetails>
                    <div
                        style={{
                            width: "96%",
                            marginLeft: "auto",
                            display: "flex",
                            flexDirection: "column"
                        }}>
                        {(props.issues == null || props.isues.length == 0) &&
                            <div className="pd-1"
                                style={{
                                    paddingTop: "0px",
                                    border: "2px solid rgb(223, 225, 230)",
                                    borderStyle: "dashed",
                                    textAlign: "center"
                                }}>
                                <Typography
                                    style={{
                                        fontSize: ".8em",
                                        fontWeight: "300"
                                    }}>
                                    Your backlog is empty.
                                </Typography>
                            </div>
                        }
                        <CreateNewBacklogItem className="mt-1" />
                    </div>
                </AccordionDetails>
            </Accordion>
        </Fragment>
    )
}

let BacklogSpaceComponent = function (props) {
    let sprints = [1, 2, 3, 4, 5, 6, 7, 8]
    return (
        <Fragment>
            <MyBreadCrumbs />
            {
                sprints && sprints.map(sprint => <SprintComponent sprint={sprint} />)
            }
            <BacklogComponent />
        </Fragment>
    )
}
export default BacklogSpaceComponent