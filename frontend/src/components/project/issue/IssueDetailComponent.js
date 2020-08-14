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
let MyBreadCrumbs = function (props) {
    let projectId = props.project ? props.project.id : 0
    let projectCode = props.project ? props.project.code : ''
    let projectName = props.project ? props.project.name : ''
    let issueId = props.issue ? props.issue.id : ''
    let issueCode = props.issue ? props.issue.code : ''
    let issueName = props.issue ? props.issue.name : ''
    return (
        <Breadcrumbs aria-label="breadcrumb" style={{ marginTop: "1.5rem" }}>
            <Link color="inherit" href="/projects">
                Projects
            </Link>
            <Link color="inherit" href={`/project/${projectId}/settings/details`}>
                {projectCode == null ? projectName : projectCode}
            </Link>
            <Typography color="textPrimary">{issueCode}</Typography>
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

let IssueName = (props) => {
    let [isFocusIssueName, setIsFocusIssueName] = React.useState(false);
    const handleFocusEdit = () => {
        setIsFocusIssueName(!isFocusIssueName)
    }

    return (
        <div style={{width:'100%'}}>
            <div style={{fontSize: '1.5rem', fontWeight:'500'}}>
                <span>{props.issueName}</span>
            </div>
        {/*{!isFocusIssueName &&*/}
        {/*    <Tooltip title="Click to edit">*/}
        {/*        <Button*/}
        {/*            style={{width: '100%',cursor: 'text',justifyContent:'left', textTransform:'none',fontSize:'1.5rem'}}*/}
        {/*            onClick={handleFocusEdit}*/}
        {/*        >*/}
        {/*            {props.issueName}*/}
        {/*        </Button>*/}
        {/*    </Tooltip>*/}
        {/*}*/}
        {/*{isFocusIssueName &&*/}
        {/*    <div style={{display: 'grid', gridGap: '1px', gridTemplateColumns: 'auto 10% 10%'}}>*/}
        {/*        <Input type="text" style={{padding:'6px 8px',fontSize:'1.5rem',fontWeight:'500',letterSpacing:'0.02857em'}} placeholder="Enter Issue Name..." defaultValue={props.issueName}></Input>*/}
        {/*        <Button variant="contained" color="primary"><CheckIcon/></Button>*/}
        {/*        <Button onClick={handleFocusEdit}><CloseIcon/></Button>*/}
        {/*    </div>*/}
        {/*}*/}
        </div>
    )
}

let IssueDescription = (props) => {
    let [updateDescriptionForm, setUpdateDescriptionForm] = React.useState({
        issueId: props.issueId,
        description: ''
    })

    let [isFocusDescription, setIsFocusDescription] = React.useState()
    const handleFocusEdit = () => {
        setIsFocusDescription(!isFocusDescription)
        setUpdateDescriptionForm({...updateDescriptionForm, description: ''})
    }

    const update = () => {
        props.update(updateDescriptionForm)
        handleFocusEdit()
    }

    return (
        <div style={{width: '100%', padding: '8px'}}>
            <div style={{marginTop:'10px', fontWeight:'500'}}>
                Description
            </div>
            {!isFocusDescription &&
            <Tooltip title="Click to edit">
                <Button
                    style={{width: '100%',cursor: 'text',justifyContent:'left', textTransform:'none',fontSize:'14px',fontWeight:'400'}}
                    onClick={handleFocusEdit}
                >
                    {props.content}
                </Button>
            </Tooltip>
            }
            {isFocusDescription &&
                <div>
                    <textarea style={{width: '100%', height: '150px', padding: '5px'}} onChange={(event) => setUpdateDescriptionForm({...updateDescriptionForm, description:event.target.value})} placeholder="Add a description..." defaultValue={props.content}/>
                    {updateDescriptionForm.description == '' &&
                    <button className='custom-button' style={{backgroundColor:'#e5e5e5',color:'rgb(174 174 174)'}}>Update</button>
                    }
                    {updateDescriptionForm.description != '' &&
                    <button className='custom-button' onClick={update} style={{backgroundColor:'blue',color:'white'}}>Update</button>
                    }
                    <button className='custom-button custom-hover' onClick={handleFocusEdit} style={{backgroundColor:'white', marginLeft:'2px'}}>Cancel</button>
                </div>
            }
        </div>
    )
}

let ListSubTask = (props) => {
    let [isFocusAddSubTask,setIsFocusAddSubTask] = React.useState(false);
    let [createSubTaskForm,setCreateSubTaskForm] = React.useState({
        projectId: props.projectId,
        issueId: props.issueId,
        name:''
    });
    const handleIsFocus = () => {
        setIsFocusAddSubTask(!isFocusAddSubTask)
    }
    const createSubTask = () => {
        props.createSubTask(createSubTaskForm);
        setCreateSubTaskForm({...createSubTaskForm, name: ''})
        handleIsFocus()
    }
    return (
        <div style={{width: '100%', padding: '8px'}}>
            <div style={{marginTop:'10px', fontWeight:'500'}}>
                <span>SubTasks</span>
                <div style={{display: "inline-block", float:'right'}}>
                    <AddIcon onClick={handleIsFocus} className='custom-hover'/>
                </div>
            </div>
            <div>
                {props.subTasks.map((subTask) => (
                    <div key={subTask.id} className='subTask custom-hover'>
                        <span style={{paddingLeft:'9px'}}>{subTask.code + " " + subTask.name}</span>
                    </div>
                ))}

                {isFocusAddSubTask &&
                <div style={{marginTop: '10px'}}>
                    <input className='subTask-input' defaultValue={createSubTaskForm.name} type="text" autoFocus={true} onChange={(event) => setCreateSubTaskForm({...createSubTaskForm, name:event.target.value})} placeholder="What needs to be done?"></input>
                    <div style={{display:'block', float:'right', marginTop:'5px'}}>
                        {createSubTaskForm.name == '' &&
                            <button className='custom-button' style={{backgroundColor:'#e5e5e5',color:'rgb(174 174 174)'}}>Create</button>
                        }
                        {createSubTaskForm.name != '' &&
                            <button className='custom-button' onClick={createSubTask} style={{backgroundColor:'blue',color:'white'}}>Create</button>
                        }
                        <button className='custom-button custom-hover' onClick={handleIsFocus} style={{backgroundColor:'white', marginLeft:'2px'}}>Cancel</button>
                    </div>
                </div>
                }
            </div>
        </div>
    )
}

let IssueComment = (props) => {
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

let IssueHistory = (props) => {
    return (
        <div style={{width: '100%', marginTop:'10px'}}>
            <span>This function has not been develop </span>
        </div>
    )
}

let IssueActivity = (props) => {
    let [tabComponent, setTabComponent] = React.useState({
        comment:false,
        history:false
    })
    const handleOpenTab = (comment, history) => {
        setTabComponent({...tabComponent, comment: comment, history: history});
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
                        onClick={() => handleOpenTab(true, false)}
                >Comment</button>
                <button className='custom-button custom-hover btn-activity'
                        style={{marginLeft:'5px', borderRadius:'10px', backgroundColor:'#f6f6f6'}}
                        onClick={() => handleOpenTab(false, true)}
                >History</button>
            </div>
            {tabComponent.comment &&
            <IssueComment/>
            }
            {tabComponent.history &&
            <IssueHistory/>
            }

        </div>
    )
}

let IssueMenu = (props) => {
    let [openMenu, setOpenMenu] = React.useState(null);
    const handleOpenMenu = (event) => {
        setOpenMenu(event.currentTarget);
    };
    const handleCloseOptsMenu = () => {
        setOpenMenu(null);
    };
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
            </Menu>
        </div>
    )
}

let IssueStatus = (props) => {
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

let IssueType = (props) => {
    return (
        <div style={{padding: '8px'}}>
            <div style={{marginTop:'10px', fontWeight:'500'}}>
                <span>Issue Type</span>
            </div>
            <Select style={{marginTop:'10px', width:'200px'}}
                    labelId="label-issue-type"
                    name="issueType"
                    onChange={(event) => props.setChange(event)}
                    defaultValue={props.currentIssueType.id}
            >
                {props.issueTypes.map((item) => (
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

let IssueAssignment = (props) => {
    return (
        <div style={{padding: '8px'}}>
            <div style={{marginTop:'10px', fontWeight:'500'}}>
                <span>Assignee</span>
            </div>
            <Select style={{marginTop:'10px', width:'200px'}}
                    labelId="label-issue-type"
                    name="assignmentEmail"
                    onChange={(event) => props.setChange(event)}
                    defaultValue={props.currentAssignee != null ? props.currentAssignee.email : ''}
            >
                {props.devTeam.map((dev) => (
                    <MenuItem
                        key={dev.id}
                        className="ml-1"
                        value={dev.email}>
                        {dev.nickName}
                    </MenuItem>
                ))}
            </Select>
        </div>
    )
}

let Priority = (props) => {
    return (
        <div style={{padding: '8px'}}>
            <div style={{marginTop:'10px', fontWeight:'500'}}>
                <span>Priority</span>
            </div>
            <Select style={{marginTop:'10px', width:'200px'}}
                    labelId="label-issue-type"
                    name="priority"
                    onChange={(event) => props.setChange(event)}
                    defaultValue={props.currentPriority ? props.currentPriority.id : ''}
            >
                {props.priority.map(item => (
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

let IssueStoryPoint = (props) => {
    return (
        <div style={{padding: '8px'}}>
            <div style={{marginTop:'10px', fontWeight:'500'}}>
                <span>Story Point</span>
            </div>
            <TextField
                style={{width:'200px'}}
                name="storyPoint"
                className="mt-1"
                onChange={(event) => props.setChange(event)}
                defaultValue={props.storyPoint}
                required={true}
                size='small'
                type='number'
            />
        </div>
    )
}

let IssueDetailComponent = function (props) {

    const classes = useStyles();
    const [updateIssueForm, setUpdateWorkFlowForm] = React.useState({
        issueId: null,
        storyPoint: null,
        issueType: null,
        assignmentEmail: null,
        workflowStatus: null,
        priority: null
    })

    const updateIssue = () => {
        let newForm = {...updateIssueForm, issueId: props.issue.id}
        console.log(newForm)
        setUpdateWorkFlowForm(newForm)
        props.updateIssue(newForm);
    }

    const onFormChange = (event) => {
        setUpdateWorkFlowForm({...updateIssueForm, [event.target.name]: event.target.value})
    }

    return (
        <Fragment>
            <MyBreadCrumbs project={props.project} issue={props.issue} />
            <div className={classes.main}>
                <div className={classes.issueMainDetail}>
                    {props.issue &&
                    <div>
                        <IssueName issueName={props.issue.name}/>
                        <IssueDescription content={props.issue.description} issueId={props.issue.id} update={props.updateIssueDescription}/>
                        <ListSubTask subTasks={props.subTasks} createSubTask={props.createSubTask}
                                     projectId={props.project.id} issueId={props.issue.id}/>
                        <IssueActivity/>
                    </div>
                    }
                </div>
                <div className={classes.issueSubDetail} style={{paddingLeft:'20px'}}>
                    {props.issue &&
                    <div>
                        <IssueMenu/>
                        <IssueStatus status={props.issue.status} workFlow={props.workFlow} setChange={onFormChange}/>
                        <IssueType issueTypes={props.issueTypes} currentIssueType={props.issue.issueType} setChange={onFormChange}/>
                        <IssueAssignment currentAssignee={props.issue.assignment} devTeam={props.devTeam} setChange={onFormChange}/>
                        <Priority priority={props.priority} currentPriority={props.issue.priority} setChange={onFormChange}/>
                        <IssueStoryPoint storyPoint={props.issue.storyPoint} setChange={onFormChange}/>
                        <div style={{padding: '8px'}}>
                            <button onClick={updateIssue} className='custom-button' style={{backgroundColor: 'blue', color: 'white'}}>Save
                            </button>
                        </div>
                    </div>
                    }
                </div>
            </div>
        </Fragment>
    )
}
export default IssueDetailComponent