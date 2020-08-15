import React, { Fragment, useState, useEffect, createRef, useRef } from 'react'
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import {makeStyles} from "@material-ui/core/styles";
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import Input from '@material-ui/core/Input';
import AddIcon from '@material-ui/icons/Add';
import '../../../App.css'
import Icon from "@material-ui/core/Icon";
import Menu from "@material-ui/core/Menu/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select/Select";
import TextField from "@material-ui/core/TextField/TextField";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Dialog from "@material-ui/core/Dialog/Dialog";
let MyBreadCrumbs = function (props) {
    let projectId = props.project ? props.project.id : 0
    let projectCode = props.project ? props.project.code : ''
    let projectName = props.project ? props.project.name : ''
    let issueId = props.issue ? props.issue.id : ''
    let issueCode = props.issue ? props.issue.code : ''
    let issueName = props.issue ? props.issue.name : ''
    let subTaskId = props.subTask ? props.subTask.id : ''
    let subTaskCode = props.subTask ? props.subTask.code : ''
    return (
        <Breadcrumbs aria-label="breadcrumb" style={{ marginTop: "1.5rem" }}>
            <Link color="inherit" href="/projects">
                Projects
            </Link>
            <Link color="inherit" href={`/project/${projectId}/settings/details`}>
                {projectCode == null ? projectName : projectCode}
            </Link>
            <Link color="inherit" href={`/project/${projectId}/issue/${issueId}`}>
                {issueName}
            </Link>
            <Typography color="textPrimary">{subTaskCode}</Typography>
        </Breadcrumbs>
    )
}

const useStyles = makeStyles((theme) => ({
    main: {
        height: '90%',
        marginBottom: '10px',
        marginTop: '10px',
        display: 'grid',
        gridGap: '7px',
        gridTemplateColumns: '70% auto'
    },
    issueMainDetail: {
        height: '80%',
        width: '95%'
    },
    issueSubDetail: {
        height: '80%',
        width: '95%'
    },
}));

let SubTaskName = (props) => {
    let [isFocusSubTaskName, setIsFocusSubTaskName] = React.useState(false);
    const handleFocusEdit = () => {
        if (props.hasRightEdit)
            setIsFocusSubTaskName(!isFocusSubTaskName)
    }

    return (
        <div style={{width:'100%'}}>
            {!isFocusSubTaskName &&
                <Tooltip title="Click to edit">
                    <Button
                        style={{width: '100%',cursor: 'text',justifyContent:'left', textTransform:'none',fontSize:'1.5rem'}}
                        onClick={handleFocusEdit}
                    >
                        {props.subTaskName}
                    </Button>
                </Tooltip>
            }
            {isFocusSubTaskName &&
                <div style={{display: 'grid', gridGap: '1px', gridTemplateColumns: 'auto 5%'}}>
                    <Input autoFocus={true} type="text" name='name' onChange={(e) => props.setChange(e)} style={{padding:'6px 8px',fontSize:'1.5rem',fontWeight:'500',letterSpacing:'0.02857em'}} placeholder="Enter SubTask Name..." defaultValue={props.subTaskName}></Input>
                    <CheckIcon className="custom-hover" style={{cursor:'pointer', height:'100%', padding:'0 7px'}} onClick={handleFocusEdit}/>
                </div>
            }
        </div>
    )
}

let SubTaskDescription = (props) => {

    let [isFocusDescription, setIsFocusDescription] = React.useState()
    const handleFocusEdit = () => {
        if (props.hasRightEdit)
            setIsFocusDescription(!isFocusDescription)
    }

    return (
        <div style={{width: '100%', padding: '8px'}}>
            <div style={{marginTop:'10px', fontWeight:'500'}}>
                <span>Description</span>
            </div>
            {!isFocusDescription &&
            <Tooltip title="Click to edit">
                <Button
                    style={{padding:'10px',width: '100%',cursor: 'text',justifyContent:'left', textTransform:'none',fontSize:'14px',fontWeight:'400'}}
                    onClick={handleFocusEdit}
                >
                    {props.content}
                </Button>
            </Tooltip>
            }
            {isFocusDescription &&
            <div>
                <textarea name="description" style={{width: '100%', height: '150px', padding: '5px',marginTop:'10px'}} onChange={(e) => props.setChange(e)} placeholder="Add a description..." defaultValue={props.content}/>
                <CheckIcon className="custom-hover" style={{cursor: 'pointer'}}
                           onClick={handleFocusEdit}/>
            </div>
            }
        </div>
    )
}

let SubTaskComment = (props) => {
    let [isFocusComment, setIsFocusComment] = React.useState(false)
    let [createCommentForm,setCreateCommentForm] = React.useState({
        content:''
    });
    return (
        <div style={{width: '100%', marginTop:'10px'}}>
            <input className='subTask-input' onFocus={() => setIsFocusComment(true)} type="text" onChange={(event) => setCreateCommentForm({...createCommentForm, content:event.target.value})} placeholder="Add a comment..."/>
            {isFocusComment &&
            <div style={{marginTop: '5px'}}>
                {createCommentForm.content == '' &&
                <button className='custom-button'
                        style={{backgroundColor: '#e5e5e5', color: 'rgb(174 174 174)'}}>Create</button>
                }
                {createCommentForm.content != '' &&
                <button className='custom-button' style={{backgroundColor: 'blue', color: 'white'}}>Create</button>
                }
                <button className='custom-button custom-hover' onClick={() => setIsFocusComment(false)}
                        style={{backgroundColor: 'white', marginLeft: '2px'}}>Cancel
                </button>
            </div>
            }
        </div>
    )
}

let SubTaskHistory = (props) => {
    return (
        <div style={{width: '100%', marginTop:'10px'}}>
            <span>This function has not been develop </span>
        </div>
    )
}

let SubTaskLogWork = (props) => {
    return (
        <div>
            {props.logWorkList.map(item => (
            <div style={{width: '100%', marginTop:'10px'}}>

                <span key={item.id}>{`${item.owner.nickName} logged ${item.hours}h`}</span>

            </div>
            ))}
        </div>
    )
}

let SubTaskActivity = (props) => {
    let [tabComponent, setTabComponent] = React.useState({
        comment:false,
        history:false,
        logWork:false
    })
    const handleOpenTab = (comment, history, logWork) => {
        setTabComponent({...tabComponent, comment: comment, history: history, logWork: logWork});
    }

    return (
        <div style={{width: '100%', padding: '8px'}}>
            <div style={{marginTop:'10px', fontWeight:'500'}}>
                <span>Activity</span>
            </div>
            <div style={{marginTop:'10px'}}>
                <span>Show :</span>
                <button className='custom-button custom-hover btn-activity'
                        style={{marginLeft:'5px', borderRadius:'10px', backgroundColor:'#f6f6f6'}}
                        onClick={() => handleOpenTab(true, false, false)}
                >Comment</button>
                <button className='custom-button custom-hover btn-activity'
                        style={{marginLeft:'5px', borderRadius:'10px', backgroundColor:'#f6f6f6'}}
                        onClick={() => handleOpenTab(false, true, false)}
                >History</button>
                <button className='custom-button custom-hover btn-activity'
                        style={{marginLeft:'5px', borderRadius:'10px', backgroundColor:'#f6f6f6'}}
                        onClick={() => handleOpenTab(false, false, true)}
                >Work Log</button>
            </div>
            {tabComponent.comment &&
            <SubTaskComment/>
            }
            {tabComponent.history &&
            <SubTaskHistory/>
            }
            {tabComponent.logWork &&
            <SubTaskLogWork logWorkList={props.logWorkList}/>}

        </div>
    )
}

let SubTaskMenu = (props) => {
    let [openMenu, setOpenMenu] = React.useState(null);
    const handleOpenMenu = (event) => {
        setOpenMenu(event.currentTarget);
    };
    const handleCloseOptsMenu = () => {
        setOpenMenu(null);
    };

    let [openLogWorkDialog, setOpenLogWorkDialog] = React.useState(false);
    const handleCloseLogWorkDialog = () => {
        setOpenLogWorkDialog(false)
    }

    let[logWorkForm, setLogWorkForm] = React.useState({
        subTaskId:null,
        logWorkTime: null
    })

    const logWork = () => {
        let newForm = {...logWorkForm, subTaskId: props.subTaskId}
        setLogWorkForm(newForm)
        props.logWork(newForm)
        handleCloseLogWorkDialog()
    }
    return (
        <div style={{padding: '8px'}}>
            <Icon
                className="cursor--pointer"
                aria-controls={"lead_mor_hoz_menu"}
                aria-haspopup="true"
                onClick={handleOpenMenu}>
                more_horiz
            </Icon>
            <Menu
                id="lead_mor_hoz_menu"
                anchorEl={openMenu}
                keepMounted
                open={Boolean(openMenu)}
                onClose={handleCloseOptsMenu}
            >
                <MenuItem>Delete</MenuItem>
                <MenuItem onClick={() => setOpenLogWorkDialog(true)}>Log Work</MenuItem>
                <Dialog
                    open={openLogWorkDialog}
                    onClose={handleCloseLogWorkDialog}
                    aria-labelledby={"alert-dialog-title"}
                    aria-describedby={"alert-dialog-description"}>
                    <DialogTitle
                        id={"alert-dialog-title"}>
                        Log Work
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id={"alert-dialog-description"}>
                            Enter Time (hours)
                        </DialogContentText>
                        <TextField
                            style={{width:'200px'}}
                            name="logWorkTime"
                            className="mt-1"
                            onChange={(e) => setLogWorkForm({...logWorkForm, logWorkTime:e.target.value})}
                            required={true}
                            size='small'
                            type='number'
                            disabled={!props.hasRightEdit}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={logWork}
                            disabled={logWorkForm.logWorkTime == null || logWorkForm.logWorkTime == '' || logWorkForm.logWorkTime <= 0}
                            color="primary">
                            Log
                        </Button>
                        <Button onClick={handleCloseLogWorkDialog} color="primary" autoFocus>
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
            </Menu>
        </div>
    )
}

let SubTaskStatus = (props) => {
    return (
        <div style={{padding: '8px'}}>
            <div style={{marginTop:'10px', fontWeight:'500'}}>
                <span style={{display:"block"}} >Status</span>
            </div>
            <Select style={{marginTop:'10px', width:'200px'}}
                    labelId="label-workflow-status"
                    name="workflowStatus"
                    onChange={(event) => props.setChange(event)}
                    defaultValue={props.status.id}
                    disabled={!props.hasRightEdit}
            >
                {props.workFlow.items.map((item) => (
                    <MenuItem
                        key={item.id}
                        className="ml-1"
                        value={item.id}>
                        {item.name}
                    </MenuItem>
                ))}
            </Select>
        </div>
    )
}

let SubTaskAssignment = (props) => {
    return (
        <div style={{padding: '8px'}}>
            <div style={{marginTop:'10px', fontWeight:'500'}}>
                <span>Assignee</span>
            </div>
            <Select style={{marginTop:'10px', width:'200px'}}
                    labelId="label-issue-type"
                    name="assignment"
                    onChange={(event) => props.setChange(event)}
                    defaultValue={props.currentAssignee != null ? props.currentAssignee.id : ''}
                    disabled={!props.hasRightEdit}
            >
                {props.devTeam.map((dev) => (
                    <MenuItem
                        key={dev.id}
                        className="ml-1"
                        value={dev.id}>
                        {dev.nickName}
                    </MenuItem>
                ))}
            </Select>
        </div>
    )
}

let SubTaskEstimate = (props) => {
    return (
        <div style={{padding: '8px'}}>
            <div style={{marginTop:'10px', fontWeight:'500'}}>
                <span>Estimate (hours)</span>
            </div>
            <TextField
                style={{width:'200px'}}
                name="estimateTime"
                className="mt-1"
                onChange={(event) => props.setChange(event)}
                defaultValue={props.estimate}
                required={true}
                size='small'
                type='number'
                disabled={!props.hasRightEdit}
            />
        </div>
    )
}

let SubTaskDetailComponent = function (props) {
    let hasRightEdit = false;
    const classes = useStyles();
    const [updateSubTaskForm, setUpdateSubTaskForm] = React.useState({
        subTaskId: null,
        name: null,
        description: null,
        assignment: null,
        estimateTime: null,
        workflowStatus: null
    })

    const updateSubTask = () => {
        let newForm = {...updateSubTaskForm, subTaskId: props.subTask.id}
        setUpdateSubTaskForm(newForm)
        props.updateSubTask(newForm);
    }

    const onFormChange = (event) => {
        setUpdateSubTaskForm({...updateSubTaskForm, [event.target.name]: event.target.value})
    }

    const checkIsDevMember = (dev, team) => {
        team.forEach(i => {
            if (i.id == dev.id)
                hasRightEdit = true;
        })
    }

    return (
        <Fragment>
            {props.me && props.devTeam && checkIsDevMember(props.me, props.devTeam)}
            <MyBreadCrumbs project={props.project} issue={props.issue} subTask={props.subTask} />
            <div className={classes.main}>
                <div className={classes.issueMainDetail}>
                    {props.subTask &&
                    <div>
                        <SubTaskName hasRightEdit={hasRightEdit} subTaskName={updateSubTaskForm.name || props.subTask.name} setChange={onFormChange}/>
                        <SubTaskDescription hasRightEdit={hasRightEdit} content={updateSubTaskForm.description || props.subTask.description} setChange={onFormChange}/>
                        <SubTaskActivity logWorkList={props.subTask.logWorkList}/>
                    </div>
                    }
                </div>
                <div className={classes.issueSubDetail} style={{paddingLeft:'20px'}}>
                    {props.issue &&
                    <div>
                        <SubTaskMenu hasRightEdit={hasRightEdit} subTaskId={props.subTask.id} logWork={props.logWork}/>
                        <SubTaskStatus hasRightEdit={hasRightEdit} status={props.subTask.status} workFlow={props.workFlow} setChange={onFormChange}/>
                        <SubTaskAssignment hasRightEdit={hasRightEdit} currentAssignee={props.subTask.assignment} devTeam={props.devTeam} setChange={onFormChange}/>
                        <SubTaskEstimate hasRightEdit={hasRightEdit} estimate={props.subTask.estimateTime} setChange={onFormChange}/>
                        {hasRightEdit &&
                        <div style={{padding: '8px'}}>
                            <button onClick={updateSubTask} className='custom-button'
                                    style={{backgroundColor: 'blue', color: 'white'}}>Save
                            </button>
                        </div>
                        }
                    </div>
                    }
                </div>
            </div>
        </Fragment>
    )
}
export default SubTaskDetailComponent