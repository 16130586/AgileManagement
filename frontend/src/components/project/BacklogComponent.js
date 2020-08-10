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
import Select from '@material-ui/core/Select'
import Icon from '@material-ui/core/Icon'
import CloseIcon from '@material-ui/icons/Close'
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
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
import Tooltip from '@material-ui/core/Tooltip';
import * as moment from 'moment'
let MyBreadCrumbs = function (props) {
    let projectId = props.project ? props.project.id : 0
    let projectCode = props.project ? props.project.code : ''
    let projectName = props.project ? props.project.name : ''
    return (
        <Breadcrumbs aria-label="breadcrumb" style={{ marginTop: "1.5rem" }}>
            <Link color="inherit" href="/projects">
                Projects
        </Link>
            <Link color="inherit" href={`/project/${projectId}/settings/details`}>
                {projectCode == null ? projectName : projectCode}
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

let StoryPointItem = function (props) {
    let style = props.style
    let fullStyle = style != null ? style : {}
    if (props.isStart) {
        fullStyle = { ...style, backgroundColor: "rgb(0, 82, 204)", color: "rgb(255, 255, 255)" }
    }
    if (props.isEnd) {
        fullStyle = { ...style, backgroundColor: "rgb(0, 135, 90)", color: "rgb(255, 255, 255)" }
    } if (!props.isStart && !props.isEnd) {
        fullStyle = { ...style, backgroundColor: "rgb(223, 225, 230)", color: "rgb(23, 43, 77)" }
    }

    fullStyle = {
        ...fullStyle,
        borderRadius: "2rem",
        display: "inline-block",
        fontSize: ".86rem",
        padding: "0.166667em 0.5em",
        height: "1.2rem",

    }
    return (
        <Tooltip onClick={props.onClick} title={props.statusName.concat(' - Story points')}>
            <span className={props.className} style={fullStyle}>
                {props.totalStoryPoint}
            </span>
        </Tooltip>
    )
}
let IssueItem = function (props) {
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
        props.deleteIssue(issueId, projectId)
    }

    const handleOnClick = (event) => {
        if (!props.onClick) {
            return;
        }
        props.onClick(props.data)
    }
    return (
        <div
            onClick={(event) => handleOnClick(event)}
            className={props.className}
            style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                cursor: props.onClick ? 'pointer' : 'default'
            }}>
            <div>
                <img
                    src={data.issueType.iconUrl}
                    style={{ width: "1rem", height: "1rem" }}
                />
                <Typography className="ml-1" style={{ display: "inline-block", textTransform: "uppercase" }}>{data.name}</Typography>
                <Typography className="ml-2" style={{ display: "inline-block" }}>{data.description}</Typography>
            </div>
            <div style={{ display: "flex", marginLeft: "auto" }}>
                {data.storyPoint > 0 &&
                    <StoryPointItem className="mr-1"
                        isStart={data.status.start}
                        isEnd={data.status.end}
                        statusName={data.status.name}
                        totalStoryPoint={data.storyPoint}
                    />
                }
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
                    onClose={(event) => { event.stopPropagation(); handleCloseOptsMenu() }}
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
                    {props.sprints != null && props.sprints.length > 0 && props.sprint &&

                        props.sprints.filter(s1 => s1.id != props.sprint.id).map(sprint =>
                            <MenuItem
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleCloseOptsMenu();
                                    props.moveIssueToSprint(props.sprint.id, sprint.id, data.id)
                                }}>
                                {sprint.name}</MenuItem>
                        )
                    }
                    {
                        props.sprints != null && props.sprints.length > 0 && props.sprint == null &&
                        props.sprints.map(sprint =>
                            <MenuItem
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleCloseOptsMenu();
                                    props.moveIssueToSprint(-1, sprint.id, data.id)
                                }}>
                                {sprint.name}</MenuItem>
                        )
                    }
                    {
                        props.sprint != null &&
                        <MenuItem onClick={(e) => { e.stopPropagation(); handleCloseOptsMenu(); props.topOfBacklog(data.id, props.sprint.id) }}>
                            Top of backlog
                        </MenuItem>
                    }
                    {
                        props.sprint != null &&
                        <MenuItem onClick={(e) => { e.stopPropagation(); handleCloseOptsMenu(); props.bottomOfBacklog(data.id, props.sprint.id) }}>
                            Bottom of backlog
                        </MenuItem>
                    }

                </Menu>

            </div>
        </div>
    )
}

let CreateNewBacklogItem = function (props) {
    const self = createRef()
    const [isOpenCreateInput, setIsOpenCreateInput] = useState(false)

    let [cbIssueValue, setCbIssueValue] = useState(props.issueTypes == null ? null : props.issueTypes[0])
    let [issueDescription, setIssueDescription] = useState('')

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
            setIsOpenCreateInput(false)
            props.createNewIssue({
                issueDescription: issueDescription,
                issueTypeId: cbIssueValue.id,
                sprintId: props.sprintId,
                projectId: props.projectId
            })
            setIssueDescription('')
            setCbIssueValue(props.issueTypes == null ? null : props.issueTypes[0])
        }
    }


    const itemRender = (li, itemProps) => {
        const iconSrc = itemProps.dataItem.iconUrl
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
                        data={props.issueTypes}
                        textField="name"
                        dataItemKey="id"
                        value={cbIssueValue}
                        onChange={(event) => { setCbIssueValue(event.target.value) }}
                        footer={<span className="mt-1">footer</span>}
                    />
                    <TextField className="ml-1"
                        onChange={(event) => { setIssueDescription(event.target.value) }}
                        value={issueDescription}
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
    const data = props.data
    const issueSumary = {}
    data.issues.forEach(iss => {
        if (issueSumary[iss.status.id] == null) {
            issueSumary[iss.status.id] = {}
            issueSumary[iss.status.id].totalStoryPoint = 0
            issueSumary[iss.status.id].statusName = ''
            issueSumary[iss.status.id].isStart = false
            issueSumary[iss.status.id].isEnd = false
            issueSumary[iss.status.id].count = 0

        }
        issueSumary[iss.status.id].totalStoryPoint += iss.storyPoint
        issueSumary[iss.status.id].statusName = iss.status.name
        issueSumary[iss.status.id].isStart = iss.status.start
        issueSumary[iss.status.id].isEnd = iss.status.end
        issueSumary[iss.status.id].count += 1
    });

    const storyPoints = []
    Object.keys(issueSumary).forEach(key => {
        storyPoints.push(
            {
                statusName: issueSumary[key].statusName,
                totalStoryPoint: issueSumary[key].totalStoryPoint,
                isStart: issueSumary[key].isStart,
                isEnd: issueSumary[key].isEnd,
            }
        )
    })

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
        props.completeSprint(sprintId)
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

                            {data.status != 1 &&
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
                            }

                            {data.status == 1 &&
                                <Button
                                    onClick={(event) => { event.stopPropagation(); setOpenCompleteDialog(true) }}
                                    className="my-btn--hover" style={{
                                        backgroundColor: "rgba(9,30,66,0.04)",
                                        marginRight: "1rem"
                                    }}>Complete sprint
                                </Button>
                            }
                            {
                                storyPoints.map((e, index) =>
                                    <StoryPointItem key={index} onClick={(event) => event.stopPropagation()} className="mr-1" {...e} />
                                )
                            }
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
                                    Complete Sprint {data.code && '-'.concat(data.code)}{data.name && '-'.concat(data.name)}
                                </DialogTitle>
                                <DialogContent>
                                    <DialogContentText id={"delete-dialog-description".concat(genratedId)}>
                                        The sprint contains:
                                    </DialogContentText>
                                    <div>
                                        {Object.keys(issueSumary).length > 0 &&
                                            <ul>
                                                {Object.keys(issueSumary).map(key =>
                                                    <li className="mt-1">
                                                        {issueSumary[key].count}
                                                        {issueSumary[key].count > 1 && ' items are '}
                                                        {issueSumary[key].count <= 1 && ' item is '}
                                                        <span style={{ textTransform: 'lowercase' }}>
                                                            {issueSumary[key].statusName}
                                                        </span>
                                                    </li>
                                                )}

                                            </ul>
                                        }
                                    </div>
                                </DialogContent>
                                <DialogActions>
                                    <Button
                                        onClick={(e) => { e.stopPropagation(); handleCompleteSprint(data.id) }}
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
                                    Choose issues from the <span style={{fontWeight: "600"}}>Backlog</span> section, or create new issues, to plan
                                    the work for this sprint. Select <span style={{fontWeight: "600"}}>Start</span> sprint when your're ready
                                </Typography>
                            </div>
                        }
                        {(data.issues != null && data.issues.length > 0) &&
                            data.issues.map(iss =>
                                <IssueItem
                                    key={iss.id}
                                    onClick={props.openIssueDetail}
                                    className="mt-1"
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
                        <CreateNewBacklogItem
                            className="mt-1"
                            issueTypes={props.issueTypes}
                            sprintId={props.data.id}
                            projectId={props.projectId}
                            createNewIssue={props.createNewIssue}
                        />
                    </div>
                </AccordionDetails>
            </Accordion>
        </Fragment>
    )
}

let DetailIssueEdit = function (props) {
    const projectId = props.projectId
    const closeIssueDetail = props.closeIssueDetail
    const [updateDetailState, setUpdateDetailState] = useState(null)
    console.log(props)
    let devTeam = [...props.devTeam.map(sl => sl.email)]
    devTeam.unshift('None')

    useEffect(() => {
        setUpdateDetailState({
            description: props.data.description,
            issueTypeId: props.data.issueType.id,
            storyPoint: props.data.storyPoint,
            assigneeEmail: props.data.assignee == null ? 'None' : props.data.assignee,
        })
    }, [props.data])

    const editDetailIssueChange = (event, value) => {
        console.log(event)
        console.log(value)
        let changedIssue = { ...updateDetailState }
        changedIssue[event.target.name] = event.target.value
        setUpdateDetailState(changedIssue)
        console.log(changedIssue)
    }
    const submit = () => {
        if (props.updateDetailIssue) props.updateDetailIssue(updateDetailState)
    }
    if (updateDetailState == null) return <div></div>
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            overflowY: "scroll",
            width: "50%"
        }}>
            <div style={{
                display: "flex",
                alignItems: "center",
                paddingBottom: "1rem",
                borderBottom: "1px solid #bdbdbd"
            }}>
                <Breadcrumbs aria-label="breadcrumb" className="mt-1 ml-1">
                    <Link color="inherit" href={'/projects/'.concat(projectId).concat('/issues/').concat(props.data.id)}>
                        {props.data.code && props.data.code.toUpperCase().concat('-')}  {props.data.name && props.data.name.toUpperCase()}
                    </Link>
                </Breadcrumbs>
                <div style={{ marginLeft: "auto" }}>
                    <Button onClick={() => closeIssueDetail()}>
                        <CloseIcon />
                    </Button>
                </div>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <form style={{
                    display: "flex",
                    flexDirection: "column",
                    maxWidth: "80%",
                    padding: "1rem"
                }}>
                    <div>
                        List of function here
                    </div>
                    <FormControl className="mt-3">
                        <InputLabel shrink id="label-description">
                            Description
                        </InputLabel>
                        <TextField
                            labelId="label-description"
                            name="description"
                            value={updateDetailState.description == null ? '' : updateDetailState.description}
                            variant="outlined"
                            size={'small'}
                            type={'string'}
                            className="mt-3"
                            onChange={(event) => editDetailIssueChange(event)}
                        />
                    </FormControl>
                    <FormControl className="mt-3">
                        <InputLabel shrink id="label-issueType-id">
                            Issue type
                        </InputLabel>
                        <Select
                            labelId="label-issueType-id"
                            name="issueTypeId"
                            value={updateDetailState.issueTypeId}
                            onClick={(e) => e.stopPropagation()}
                            onChange={(event) => editDetailIssueChange(event)}
                        >
                            {props.issueTypes.map(item =>
                                <MenuItem
                                    className="ml-1"
                                    value={item.id}>
                                    {item.name}
                                </MenuItem>)
                            }
                        </Select>
                    </FormControl>
                    <FormControl className="mt-3">
                        <InputLabel shrink id="label-assignee-email">
                            Age
                        </InputLabel>
                        <Select
                            labelId="label-assignee-email"
                            name="assigneeEmail"
                            required={true}
                            size={'small'}
                            value={updateDetailState.assigneeEmail}
                            onChange={(event) => editDetailIssueChange(event)}
                        >
                            {devTeam.map(item =>
                                <MenuItem
                                    className="ml-1"
                                    value={item}>
                                    {item}
                                </MenuItem>)
                            }
                        </Select>
                    </FormControl>
                    <TextField
                        name="storyPoint"
                        className="mt-4"
                        label="Story point"
                        value={updateDetailState.storyPoint == null ? 0 : updateDetailState.storyPoint}
                        variant="outlined"
                        required={true}
                        size={'small'}
                        type={'number'}
                        onChange={(event) => editDetailIssueChange(event)}
                    />
                    <div
                        className="mt-4"
                        style={{
                            display: "flex",
                            width: "100%",
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={submit}>Update
                        </Button>
                        <Button
                            className="ml-1"
                            onClick={closeIssueDetail}>Cancle</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
let BacklogComponent = function (props) {
    let [isExpanding, setExpanding] = React.useState(false)
    let genratedId = "backlog-component".concat("_").concat(Date.now()).concat(Math.random() * 10)
    const issueSumary = {}
    props.backlogItems.forEach(iss => {
        if (issueSumary[iss.status.id] == null) {
            issueSumary[iss.status.id] = {}
            issueSumary[iss.status.id].totalStoryPoint = 0
            issueSumary[iss.status.id].statusName = ''
            issueSumary[iss.status.id].isStart = false
            issueSumary[iss.status.id].isEnd = false
        }
        issueSumary[iss.status.id].totalStoryPoint += iss.storyPoint
        issueSumary[iss.status.id].statusName = iss.status.name
        issueSumary[iss.status.id].isStart = iss.status.start
        issueSumary[iss.status.id].isEnd = iss.status.end
    });

    const storyPoints = []
    Object.keys(issueSumary).forEach(key => {
        storyPoints.push(
            {
                statusName: issueSumary[key].statusName,
                totalStoryPoint: issueSumary[key].totalStoryPoint,
                isStart: issueSumary[key].isStart,
                isEnd: issueSumary[key].isEnd,
            }
        )
    })
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
                            {
                                storyPoints.map(e =>
                                    <StoryPointItem onClick={(event) => event.stopPropagation()} className="mr-1" {...e} />
                                )
                            }
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
                                    key={iss.id}
                                    onClick={props.openIssueDetail}
                                    className="mt-1"
                                    data={iss}
                                    sprints={props.sprints}
                                    projectId={props.projectId}
                                    topOfBacklog={props.topOfBacklog}
                                    bottomOfBacklog={props.bottomOfBacklog}
                                    deleteIssue={props.deleteIssue}
                                    moveIssueToSprint={props.moveIssueToSprint}
                                />)
                        }
                        <CreateNewBacklogItem
                            className="mt-1"
                            issueTypes={props.issueTypes}
                            projectId={props.projectId}
                            createNewIssue={props.createNewIssue}
                        />
                    </div>
                </AccordionDetails>
            </Accordion>
        </Fragment>
    )
}

let BacklogSpaceComponent = function (props) {
    const projectId = parseInt(props.projectId)
    const anySprintStarted = []
    const [isIssueDetailOpen, setIsIssueDetailOpen] = useState(false)
    const [issueSelected, setIssueSelected] = useState(null)
    if (props.workingSprints != null)
        props.workingSprints.filter(sprint => sprint.status == 1)

    const isSprintCanStart = (sprintId) => {
        if (anySprintStarted != null && anySprintStarted.length > 0) {
            return false;
        }
        const idoSprint = props.workingSprints.findIndex(sprint => sprint.id == sprintId)
        return idoSprint == 0 && props.workingSprints[idoSprint].issues != null
            && props.workingSprints[idoSprint].issues.length > 0
    }

    const openIssueDetail = (data) => {
        setIsIssueDetailOpen(true)
        setIssueSelected({
            issueId: data.id,
            projectId: projectId,
            sprintId: data.sprint && data.sprint.id,
            description: data.description,
            issueType: data.issueType,
            storyPoint: data.storyPoint,
            assignee: data.assignment && data.assignment.email,
            name: data.name,
            code: data.code,
        })
    }
    const closeIssueDetail = () => {
        setIsIssueDetailOpen(false)
    }



    return (
        <Fragment>
            <MyBreadCrumbs project={props.project} />
            <div style={{ display: "flex", height: '100%' }}>
                <div style={{ overflowY: isIssueDetailOpen ? "scroll" : '', width: "100%" }}>
                    {
                        props.workingSprints && props.workingSprints.map(sprint =>
                            <SprintComponent
                                key={sprint.id}
                                data={sprint}
                                sprints={props.workingSprints}
                                projectId={projectId}
                                issueTypes={props.issueTypes}
                                canStart={isSprintCanStart(sprint.id)}
                                deleteSprint={props.deleteSprint}
                                moveUpSprint={props.moveUpSprint}
                                moveDownSprint={props.moveDownSprint}
                                editSprint={props.editSprint}
                                startSprint={props.startSprint}
                                deleteIssue={props.deleteIssue}
                                moveSprintTo={props.moveSprintTo}
                                moveIssueToSprint={props.moveIssueToSprint}
                                topOfBacklog={props.topOfBacklog}
                                bottomOfBacklog={props.bottomOfBacklog}
                                createNewIssue={props.createNewIssue}
                                completeSprint={props.completeSprint}
                                openIssueDetail={openIssueDetail}
                            />)
                    }
                    <BacklogComponent
                        projectId={projectId}
                        sprints={props.workingSprints}
                        issueTypes={props.issueTypes}
                        backlogItems={props.backlogItems}
                        createSprint={() => props.createSprint(props.projectId)}
                        deleteIssue={props.deleteIssue}
                        moveSprintTo={props.moveSprintTo}
                        moveIssueToSprint={props.moveIssueToSprint}
                        createNewIssue={props.createNewIssue}
                        openIssueDetail={openIssueDetail}
                    />
                </div>
                {isIssueDetailOpen &&
                    <DetailIssueEdit
                        closeIssueDetail={closeIssueDetail}
                        devTeam={props.project.devTeam}
                        data={issueSelected}
                        projectId
                        updateDetailIssue={props.updateDetailIssue}
                        issueTypes={props.issueTypes}
                    />
                }

            </div>
        </Fragment>
    )
}
export default BacklogSpaceComponent