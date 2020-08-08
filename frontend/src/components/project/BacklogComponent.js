import React, { Fragment, useState, useEffect, createRef, useRef } from 'react'
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
import Select from '@material-ui/core/Select';
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
import * as moment from 'moment'
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

let IssueItem = function (props) {
    console.log(props)
    const data = props.data
    let [anchorEl, setAnchorEl] = React.useState(null)
    const handleOpenMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseOptsMenu = () => {
        setAnchorEl(null);
    };

    let genratedId = "backlog-item".concat("_").concat(Date.now()).concat(Math.random() * 10)

    const handleDelete = (issueId, projectId) => {
        handleCloseOptsMenu()
        console.log(issueId + "   " + projectId)
        props.deleteIssue(issueId, projectId)
    }
    return (
        <div style={{ width: "100%", display: "flex", alignItems: "center" }}>
            <div>
                <img />
                <Typography className="ml-1" style={{ display: "inline-block" }}>{data.name}</Typography>
                <Typography className="ml-2" style={{ display: "inline-block" }}>{data.description}</Typography>
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
                    <MenuItem onClick={(e) => { e.stopPropagation(); handleCloseOptsMenu() }}>
                        Coppy issue link</MenuItem>
                    <MenuItem onClick={(e) => { e.stopPropagation(); handleDelete(data.id, props.projectId) }}>Delete</MenuItem>
                    <MenuItem onClick={(e) => { e.stopPropagation(); handleCloseOptsMenu() }}
                        disabled
                    >
                        Move to</MenuItem>
                    {props.sprints != null && props.sprints.length > 0 &&

                        props.sprints.filter(s1 => s1.id != props.sprint.id).map(sprint =>
                            <MenuItem
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleCloseOptsMenu();
                                    props.moveIssueToSprint(props.sprint.id , sprint.id , data.id)
                                }}>
                                {sprint.name}</MenuItem>
                        )
                    }

                    <MenuItem onClick={(e) => { e.stopPropagation(); props.topOfBacklog(data.id, data.backLog.id) }}>
                        Top of backlog</MenuItem>
                    <MenuItem onClick={(e) => { e.stopPropagation(); props.bottomOfBacklog(data.id, data.backLog.id) }}>
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
    //console.log(props)
    const data = props.data
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

    const [editSprint, setEditSprint] = useState({ newName: data.name, newGoal: data.goal })
    const handleEditSprintSubmit = (sprintId) => {
        handleCloseEditDialog()
        handleCloseOptsMenu()
        props.editSprint({
            sprintId: sprintId,
            name: editSprint.newName,
            goal: editSprint.newGoal
        })
    }
    const handleEditSprintChange = (event) => {
        let newState = {
            ...editSprint
        }
        newState[event.target.name] = event.target.value
        setEditSprint(newState)
    }

    const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false)
    const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false)
    }

    const handleDeleteSprint = (sprintId) => {
        handleCloseDeleteDialog()
        handleCloseOptsMenu()
        props.deleteSprint(sprintId)
    }
    const handleMoveUpSprint = (sprintId) => {
        handleCloseDeleteDialog()
        handleCloseOptsMenu()
        props.moveUpSprint(sprintId)
    }
    const handleMoveDownSprint = (sprintId) => {
        handleCloseDeleteDialog()
        handleCloseOptsMenu()
        props.moveDownSprint(sprintId)
    }

    const [openCompleteDialog, setOpenCompleteDialog] = React.useState(false)
    const handleCloseCompleteDialog = () => {
        setOpenCompleteDialog(false)
    }


    const [openStartSprintDialog, setOpenStartSprintDialog] = React.useState(false)
    const handleCloseStartSprintDialog = () => {
        setOpenStartSprintDialog(false)
    }


    const durations = [
        { id: 1, text: "1 week" },
        { id: 2, text: "2 weeks" },
        { id: 3, text: "3 weeks" },
        { id: 4, text: "custom" }
    ]
    const dateFormat = 'YYYY-MM-DD'

    const [startSprintState, setStartSprintState] = useState({
        name: data.name,
        duration: durations[0],
        startDate: moment().format(dateFormat),
        endDate: moment().add(7, 'days').format(dateFormat),
        goal: data.goal,
        isStartDateDisabled: true,
        isEndDateDisable: true
    })


    const handleStartSprintChange = (event) => {
        let newState = { ...startSprintState }
        if (event.target.name !== 'duration') {
            newState[event.target.name] = event.target.value
            setStartSprintState(newState)
        } else if (event.target.name === 'duration') {
            let selectedDuration = durations[
                durations.findIndex(dr => dr.id == event.target.value)
            ]
            let newStartDate = ''
            let newEndDate = ''
            let newSsStartDateDisabled = true
            let newIsEndDateDisable = true

            if (selectedDuration.id <= 3) {
                newStartDate = moment().format(dateFormat)
                newEndDate = moment().add(7 * selectedDuration.id, 'days').format(dateFormat)
            } else {
                newStartDate = moment().format(dateFormat)
                newEndDate = moment().add(7, 'days').format(dateFormat)
                newSsStartDateDisabled = false
                newIsEndDateDisable = false
            }
            setStartSprintState(
                {
                    ...startSprintState,
                    duration: selectedDuration,
                    startDate: newStartDate,
                    endDate: newEndDate,
                    isStartDateDisabled: newSsStartDateDisabled,
                    isEndDateDisable: newIsEndDateDisable
                }
            )
        }

    }

    const handleStartSprintSubmit = (sprintId) => {
        handleCloseStartSprintDialog()
        let submitData = {
            sprintId: sprintId,
            startDate: startSprintState.startDate,
            endDate: startSprintState.endDate,
            name: startSprintState.name,
            goal: startSprintState.goal
        }
        props.startSprint(submitData)
    }
    const handleCompleteSprint = (sprintId) => {
        handleCloseCompleteDialog()
        console.log('close' + sprintId)
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
                            <Typography>
                                <span className="text--bold" style={{ textTransform: "uppercase" }}>
                                    {data.project.code}
                                </span>
                                <span className="text--bold ml-1" style={{ textTransform: "capitalize" }}>
                                    {data.name}
                                </span>
                            </Typography>
                            <span className="ml-1"
                                style={{
                                    color: "rgb(107, 119, 140)",
                                    marginLeft: ".7rem",
                                    fontSize: "1rem"
                                }}
                            >
                                {data.issues.length} issues
                            </span>
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
                                <MenuItem onClick={(e) => { e.stopPropagation(); handleMoveUpSprint(data.id) }}>Move sprint up</MenuItem>
                                <MenuItem onClick={(e) => { e.stopPropagation(); handleMoveDownSprint(data.id) }}>Move sprint down</MenuItem>
                                <MenuItem onClick={(e) => { e.stopPropagation(); setOpenEditDialog(true) }}>Edit sprint</MenuItem>
                                <MenuItem onClick={(e) => { e.stopPropagation(); setOpenDeleteDialog(true) }}>Delete sprint</MenuItem>
                            </Menu>

                            <Button
                                onClick={(event) => {
                                    event.stopPropagation()
                                    setOpenStartSprintDialog(true)
                                }}
                                variant="contained"
                                color="primary"
                                disabled={!props.canStart}
                                style={{
                                    marginRight: "1rem"
                                }}>Start sprint
                            </Button>
                            {data.status == 1 &&
                                <Button
                                    onClick={(event) => { event.stopPropagation(); setOpenCompleteDialog(true) }}
                                    className="my-btn--hover" style={{
                                        backgroundColor: "rgba(9,30,66,0.04)",
                                        marginRight: "1rem"
                                    }}>Complete sprint
                                </Button>
                            }
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
                                    Edit sprint: {data.project.code} - {data.name}
                                </DialogTitle>
                                <DialogContent>
                                    <DialogContentText id={"edit-dialog-description".concat(genratedId)}>
                                    </DialogContentText>
                                    <div style={{ width: "100%", height: "auto" }}>
                                        <div style={{ display: "flex", flexDirection: "column" }}>
                                            <label>Sprint name*</label>
                                            <TextField
                                                name="newName"
                                                onClick={(event) => event.stopPropagation()}
                                                onChange={(event) => handleEditSprintChange(event)}
                                                value={editSprint.newName}
                                                className="mt-1"
                                                style={{ width: "50%" }}
                                                variant="outlined" />
                                        </div>
                                        <div className="mt-2" style={{ display: "flex", flexDirection: "column" }}>
                                            <label>Sprint goal</label>
                                            <TextareaAutosize
                                                name="newGoal"
                                                onClick={(event) => event.stopPropagation()}
                                                onChange={(event) => handleEditSprintChange(event)}
                                                value={editSprint.newGoal}
                                                className="mt-1"
                                                rows={8}
                                                rowsMax={16}
                                            />
                                        </div>
                                    </div>
                                </DialogContent>
                                <DialogActions>
                                    <Button
                                        onClick={(e) => { e.stopPropagation(); handleEditSprintSubmit(data.id) }}
                                        color="primary">
                                        Update
                                    </Button>
                                    <Button onClick={(e) => { e.stopPropagation(); handleCloseEditDialog(); handleCloseOptsMenu() }} color="primary" autoFocus>
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
                                        Are you sure you want to delete sprint {data.project.code} - {data.name}?
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button
                                        onClick={(e) => { e.stopPropagation(); handleDeleteSprint(data.id) }}
                                        color="primary">
                                        Delete
                                    </Button>
                                    <Button onClick={(e) => { e.stopPropagation(); handleCloseDeleteDialog(); handleCloseOptsMenu() }} color="primary" autoFocus>
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
                            <Dialog
                                fullWidth={true}
                                open={openStartSprintDialog}
                                onClose={handleCloseStartSprintDialog}
                                aria-labelledby={"start-sprint-dialog-title".concat(genratedId)}
                                aria-describedby={"start-sprint-description".concat(genratedId)}>
                                <DialogTitle
                                    id={"start-sprint-dialog-title".concat(genratedId)}>
                                    Start sprint
                                 </DialogTitle>
                                <DialogContent>
                                    <DialogContentText id={"delete-dialog-description".concat(genratedId)}>
                                        {data.issues.length} issues will be included in this sprint.
                                    </DialogContentText>
                                    <div
                                        onClick={(event) => event.stopPropagation()}
                                        style={{ width: "100%", height: "auto" }}>
                                        <div style={{
                                            display: "flex",
                                            flexDirection: "column"
                                        }}>
                                            <label>Sprint name*</label>
                                            <TextField
                                                name="name"
                                                onClick={(event) => event.stopPropagation()}
                                                onChange={(event) => handleStartSprintChange(event)}
                                                value={startSprintState.name}
                                                className="mt-1"
                                                style={{ width: "50%" }}
                                                variant="outlined" />
                                        </div>
                                        <div className="mt-2"
                                            style={{
                                                display: "flex",
                                                flexDirection: "column"
                                            }}>
                                            <label>Duration*</label>
                                            <Select
                                                name="duration"
                                                className="mt-1"
                                                style={{ width: "50%" }}
                                                onClick={(e) => e.stopPropagation()}
                                                value={startSprintState.duration.id}
                                                onChange={(event) => handleStartSprintChange(event)}
                                            >
                                                {durations.map(dr =>
                                                    <MenuItem
                                                        className="ml-1"
                                                        value={dr.id}>
                                                        {dr.text}
                                                    </MenuItem>)
                                                }
                                            </Select>
                                        </div>
                                        <div className="mt-2"
                                            style={{
                                                display: "flex",
                                                flexDirection: "column"
                                            }}>
                                            <label>Start date*</label>
                                            <TextField
                                                name="startDate"
                                                onChange={(event) => handleStartSprintChange(event)}
                                                disabled={startSprintState.isStartDateDisabled}
                                                type="date"
                                                value={startSprintState.startDate}
                                            />
                                        </div>
                                        <div className="mt-2"
                                            style={{
                                                display: "flex",
                                                flexDirection: "column"
                                            }}>
                                            <label>End date*</label>
                                            <TextField
                                                name="endDate"
                                                onChange={(event) => handleStartSprintChange(event)}
                                                disabled={startSprintState.isEndDateDisable}
                                                type="date"
                                                value={startSprintState.endDate}
                                            />
                                        </div>
                                        <div className="mt-2"
                                            style={{
                                                display: "flex",
                                                flexDirection: "column"
                                            }}>
                                            <label>Sprint goal</label>
                                            <TextareaAutosize
                                                name="goal"
                                                onChange={(event) => handleStartSprintChange(event)}
                                                onClick={(event) => event.stopPropagation()}
                                                value={startSprintState.goal}
                                                className="mt-1"
                                                rows={8}
                                                rowsMax={16}
                                            />
                                        </div>
                                    </div>
                                </DialogContent>
                                <DialogActions>
                                    <Button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleStartSprintSubmit(data.id)
                                        }}
                                        color="primary"
                                        variant="contained">
                                        Start
                                    </Button>
                                    <Button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleCloseStartSprintDialog();
                                        }}
                                        color="default" autoFocus>
                                        Cancle
                                    </Button>
                                </DialogActions>
                            </Dialog>

                        </div>
                    </div>
                </AccordionSummary>
                <AccordionDetails>
                    <div style={{ width: "96%", marginLeft: "auto", display: "flex", flexDirection: "column" }}>
                        {(data.issues == null || data.issues.length == 0) &&
                            <div className="pd-1" style={{ paddingTop: "0px", border: "2px solid rgb(223, 225, 230)", borderStyle: "dashed" }}>
                                <Typography>
                                    Plan your sprint
                                    Choose issues from the <bold>Backlog</bold> section, or create new issues, to plan
                                    the work for this sprint. Select <bold>Start</bold> sprint when your're ready
                                </Typography>
                            </div>
                        }
                        {(data.issues != null && data.issues.length > 0) &&
                            data.issues.map(iss =>
                                <IssueItem
                                    data={iss}
                                    sprint={data}
                                    sprints={props.sprints}
                                    topOfBacklog={props.topOfBacklog}
                                    bottomOfBacklog={props.bottomOfBacklog}
                                    deleteIssue={props.deleteIssue}
                                    projectId={props.projectId}
                                    moveIssueToSprint={props.moveIssueToSprint}
                                />)
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
    console.log(props)
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
                            <span className="ml-1"
                                style={{
                                    color: "rgb(107, 119, 140)",
                                    marginLeft: ".7rem",
                                    fontSize: "1rem"
                                }}
                            >
                                {props.backlogItems.length} issues
                            </span>
                        </div>
                        <div style={{ flexGrow: 8, display: "flex", flexDirection: "row-reverse" }}>
                            <Button
                                onClick={(event) => { event.stopPropagation(); props.createSprint() }}
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
                        {(props.backlogItems == null || props.backlogItems.length == 0) &&
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
                        {(props.backlogItems != null && props.backlogItems.length > 0) &&
                            props.backlogItems.map(iss =>
                                <IssueItem
                                    data={iss}
                                    sprints={props.sprints}
                                    projectId={props.projectId}
                                    topOfBacklog={props.topOfBacklog}
                                    bottomOfBacklog={props.bottomOfBacklog}
                                    deleteIssue={props.deleteIssue}
                                />)
                        }
                        <CreateNewBacklogItem className="mt-1" />
                    </div>
                </AccordionDetails>
            </Accordion>
        </Fragment>
    )
}

let BacklogSpaceComponent = function (props) {
    const sprints = props.workingSprints
    const anySprintStarted = sprints.filter(sprint => sprint.status == 1)

    const isSprintCanStart = (sprintId) => {
        if (anySprintStarted != null && anySprintStarted.length > 0) {
            return false;
        }
        const idoSprint = sprints.findIndex(sprint => sprint.id == sprintId)
        return idoSprint == 0 && sprints[idoSprint].issues != null
            && sprints[idoSprint].issues.length > 0
    }
    return (
        <Fragment>
            <MyBreadCrumbs />   
            {
                sprints && sprints.map(sprint =>
                    <SprintComponent
                        projectId={props.projectId}
                        data={sprint}
                        sprints={sprints}
                        canStart={isSprintCanStart(sprint.id)}
                        deleteSprint={props.deleteSprint}
                        moveUpSprint={props.moveUpSprint}
                        moveDownSprint={props.moveDownSprint}
                        editSprint={props.editSprint}
                        startSprint={props.startSprint}
                        deleteIssue={props.deleteIssue}
                        moveSprintTo={props.moveSprintTo}
                        moveIssueToSprint={props.moveIssueToSprint}

                    />)
            }
            <BacklogComponent
                projectId={props.projectId}
                sprints={sprints}
                backlogItems={props.backlogItems}
                createSprint={() => props.createSprint(props.projectId)}
                deleteIssue={props.deleteIssue}
                moveSprintTo={props.moveSprintTo}
                moveIssueToSprint={props.moveIssueToSprint}
            />
        </Fragment>
    )
}
export default BacklogSpaceComponent