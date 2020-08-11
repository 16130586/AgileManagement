import React, { Fragment, useState } from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from "@material-ui/core/styles";
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Checkbox from '@material-ui/core/Checkbox';
import WorkFlowChart from "./WorkFlowChart";

const useStyles = makeStyles((theme) => ({
    main: {
        height: '100%',
        marginBottom: '10px',
        marginTop: '10px',
        display: 'grid',
        gridGap: '7px',
        gridTemplateColumns: '20% auto'
    }
}));

let CreateWorkFlowForm = function (props) {
    return (
        <Fragment>
            <TextField
                name="name"
                value={props.createWorkFlowForm.name}
                onChange={(e) => props.formCreateWorkflowChange(e)}
                autoFocus
                margin="dense"
                label="Name"
                type="text"
                fullWidth
            />
        </Fragment>
    )
}

let AddWorkFlowItemForm = function (props) {
    return (
        <Fragment>
            <TextField
                name="name"
                value={props.addWorkFlowItemForm.name}
                onChange={(e) => props.formAddWorkFlowItemChange(e)}
                autoFocus
                margin="dense"
                label="Name"
                type="text"
                fullWidth
            />
            <FormControlLabel
                disabled={props.isExistedStartPoint}
                checked={props.addWorkFlowItemForm.isStart}
                onChange={(e) => props.formAddWorkFlowItemChange(e)}
                control={<Checkbox name="isStart" />}
                label="Set as start point"
            />
            <br/>
            <FormControlLabel
                disabled={props.isExistedEndPoint}
                checked={props.addWorkFlowItemForm.isEnd}
                onChange={(e) => props.formAddWorkFlowItemChange(e)}
                control={<Checkbox name="isEnd" />}
                label="Set as end point"
            />
        </Fragment>
    )
}

const isExistedStartPoint = (dataNodeArray) => {
    let result = false;
    dataNodeArray.forEach(node => {
        if (node.color == 'lightgray')
            result = true;
    })
    return result;
}

const isExistedEndPoint = (dataNodeArray) => {
    let result = false;
    dataNodeArray.forEach(node => {
        if (node.color == 'blue')
            result = true;
    })
    return result;
}

let AddLinkWorkFlowForm = function (props) {
    const nodeDataArray = props.nodeDataArray
    return (
        <Fragment>
            <TextField
                id="outlined-select-currency-native"
                select
                name="from"
                label="From Item"
                defaultValue="0"
                onChange={(e) => props.formAddLinkWorkFlowChange(e)}
                SelectProps={{
                    native: true,
                }}
                variant="outlined"
                fullWidth
                margin="dense"
            >
                <option disabled value="0">Select Item...</option>
                {nodeDataArray.map((option) => (
                    <option key={option.key} value={option.key}>
                        {option.text}
                    </option>
                ))}
            </TextField>
            <TextField
                id="outlined-select-currency-native"
                select
                name="to"
                label="To Item"
                defaultValue="0"
                onChange={(e) => props.formAddLinkWorkFlowChange(e)}
                SelectProps={{
                    native: true,
                }}
                variant="outlined"
                fullWidth
                margin="dense"
            >
                <option disabled value="0">Select Item...</option>
                {nodeDataArray.map((option) => (
                    <option key={option.key} value={option.key}>
                        {option.text}
                    </option>
                ))}
            </TextField>
        </Fragment>
    )
}

let WorkFlow = function (props) {
    const classes = useStyles();
    const listWorkFlow = props.listWorkFlow;
    const getWorkFlowById = (id) => {
        for (let i = 0; i < listWorkFlow.length; i++) {
            if (listWorkFlow[i].id == id)
                return listWorkFlow[i];
        }
        return null;
    }
    const [currentWorkFlow, setCurrentWorkFlow] = React.useState(listWorkFlow.length > 0 ? listWorkFlow[0] : null)

    const handleWorkFlowSelected = (id) => {
        setCurrentWorkFlow(getWorkFlowById(id));
    }

    // create workflow form
    const [openCreateWorkFlowDialog, setOpenDeleteDialog] = React.useState(false)
    const handleCloseCreateWorkFlowDialog = () => {
        setOpenDeleteDialog(false)
    }

    const [createWorkFlowForm, setCreateWorkFlowForm] = React.useState({
        projectId: props.projectId,
        name: ''
    })

    const formCreateWorkflowChange = function (event) {
        let formData = { ...createWorkFlowForm }
        formData[event.target.name] = event.target.value
        setCreateWorkFlowForm(formData)
    }

    const isFormCreateWorkFlowValid = () => {
        let requiredAllNoneNull = true
        Object.keys(createWorkFlowForm).forEach(name => {
            if (createWorkFlowForm[name] == null || createWorkFlowForm[name] == '' || createWorkFlowForm[name].length == 0)
                requiredAllNoneNull = false
        })
        return !requiredAllNoneNull
    }

    const handleCreateWorkFlowSubmit = function(){
        props.createWorkFlow(createWorkFlowForm)
        handleCloseCreateWorkFlowDialog()
    }

    // add workflow-item form
    const [openAddWorkFlowItemDialog, setOpenAddWorkFlowItemDialog] = React.useState(false)
    const handleCloseAddWorkFlowItemDialog = () => {
        setOpenAddWorkFlowItemDialog(false)
        setAddWorkFlowItemForm(initialAddWorkFlowItemForm)
    }

    const initialAddWorkFlowItemForm = {
        workFlowId: '',
        name: '',
        isStart: false,
        isEnd: false
    }

    const [addWorkFlowItemForm, setAddWorkFlowItemForm] = React.useState(initialAddWorkFlowItemForm)

    const formAddWorkFlowItemChange = function (event) {
        let formData;
        if (event.target.name == "isStart") {
            let isEndNewValue = event.target.checked == addWorkFlowItemForm.isEnd == true ? false : addWorkFlowItemForm.isEnd;
            formData = {...addWorkFlowItemForm, isStart: event.target.checked, isEnd: isEndNewValue, workFlowId: currentWorkFlow.id}
        } else if (event.target.name == "isEnd") {
            let isStartNewValue = event.target.checked == addWorkFlowItemForm.isStart == true ? false : addWorkFlowItemForm.isStart;
            formData = {...addWorkFlowItemForm, isEnd: event.target.checked, isStart: isStartNewValue, workFlowId: currentWorkFlow.id}
        } else
            formData = {...addWorkFlowItemForm, [event.target.name] : event.target.value, workFlowId: currentWorkFlow.id}
        setAddWorkFlowItemForm(formData)
    }

    const isFormAddWorkFlowItemValid = () => {
        return addWorkFlowItemForm.name == null || addWorkFlowItemForm.name == '' || addWorkFlowItemForm.name.length == 0
    }

    const handleAddWorkFlowItemSubmit = function(){
        props.addWorkFlowItem(addWorkFlowItemForm)
        handleCloseAddWorkFlowItemDialog()
    }

    // add link-workflow form
    const [openAddLinkWorkFlowDialog, setOpenAddLinkWorkFlowDialog] = React.useState(false)
    const handleCloseAddLinkWorkFlowDialog = () => {
        setOpenAddLinkWorkFlowDialog(false)
    }

    const [addLinkWorkFlowForm, setAddLinkWorkFlowForm] = React.useState({
        from: '',
        to: ''
    })

    const formAddLinkWorkFlowChange = function (event) {
        let formData = { ...addLinkWorkFlowForm }
        formData[event.target.name] = event.target.value
        setAddLinkWorkFlowForm(formData)
    }

    const isFormAddWorkFlowLinkValid = () => {
        let requiredAllNoneNull = true
        Object.keys(addLinkWorkFlowForm).forEach(name => {
            if (addLinkWorkFlowForm[name] == null || addLinkWorkFlowForm[name] == 0)
                requiredAllNoneNull = false
        })
        return !requiredAllNoneNull
    }

    const handleAddLinkWorkFlowSubmit = function(){
        props.addWorkFlowLink(addLinkWorkFlowForm)
        handleCloseAddLinkWorkFlowDialog()
    }

    return(
        <div className="body" style={{height: "82%"}}>
            <div className="header">
                <div className="header__title">
                    WorkFlow
                </div>
                <div className="header__list-btns">
                    <button onClick={() => setOpenDeleteDialog(true)} className="btn btn--blue">
                        Create WorkFlow
                    </button>
                    <Dialog
                        open={openCreateWorkFlowDialog}
                        onClose={handleCloseCreateWorkFlowDialog}
                        aria-labelledby="create-workflow-dialog-title"
                        aria-describedby="create-workflow-dialog-description">
                        <DialogTitle
                            id="create-workflow-dialog-title">
                            Create new WorkFlow
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="create-workflow-dialog-description">
                            </DialogContentText>
                            <CreateWorkFlowForm formCreateWorkflowChange={formCreateWorkflowChange} createWorkFlowForm={createWorkFlowForm} />
                        </DialogContent>
                        <DialogActions>
                            <Button
                                disabled={isFormCreateWorkFlowValid()}
                                onClick={handleCreateWorkFlowSubmit}
                                color="primary">
                                Create now
                            </Button>
                            <Button onClick={handleCloseCreateWorkFlowDialog} color="primary" autoFocus>Quit</Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
            <div className="content" style={{height: "100%"}}>
                <hr/>
                <div className={classes.main}>
                    <div style={{backgroundColor: "#f5f5f5"}}>
                        <List
                            component="nav"
                            aria-labelledby="nested-list-subheader"
                            subheader={
                                <ListSubheader component="div" id="nested-list-subheader" style={{backgroundColor: "rgb(229 229 229)"}}>
                                    Project's WorkFlow
                                </ListSubheader>
                            }>
                            {listWorkFlow.map((item) => (
                                <ListItem button key={item.id} onClick={() => handleWorkFlowSelected(item.id)}>
                                    <ListItemText id={"workflow"+item.id} primary={item.name} />
                                </ListItem>
                            ))}
                        </List>
                    </div>
                    {currentWorkFlow != null &&
                    <div style={{backgroundColor: "#f5f5f5"}}>
                        <div style={{backgroundColor: "rgb(229 229 229)"}}>
                            <span style={{padding: "0 16px", color: "rgba(0, 0, 0, 0.54)", fontWeight: "500", lineHeight: "48px", fontSize: "15px"}}>
                                {currentWorkFlow.name}
                            </span>
                            <button onClick={() => setOpenAddWorkFlowItemDialog(true)} style={{border: "none", padding: "8px", backgroundColor: "#f6f6f6"}}>
                                +Item
                            </button>
                            <Dialog
                                open={openAddWorkFlowItemDialog}
                                onClose={handleCloseAddWorkFlowItemDialog}
                                aria-labelledby="add-workflow-item-dialog-title"
                                aria-describedby="add-workflow-item-dialog-description">
                                <DialogTitle
                                    id="add-workflow-item-dialog-title">
                                    Add new Item
                                </DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="add-workflow-item-dialog-description">
                                    </DialogContentText>
                                    <AddWorkFlowItemForm
                                        formAddWorkFlowItemChange={formAddWorkFlowItemChange}
                                        addWorkFlowItemForm={addWorkFlowItemForm}
                                        isExistedStartPoint={isExistedStartPoint(currentWorkFlow.nodeDataArray)}
                                        isExistedEndPoint={isExistedEndPoint(currentWorkFlow.nodeDataArray)}
                                    />
                                </DialogContent>
                                <DialogActions>
                                    <Button
                                        disabled={isFormAddWorkFlowItemValid()}
                                        onClick={handleAddWorkFlowItemSubmit}
                                        color="primary">
                                        Add
                                    </Button>
                                    <Button onClick={handleCloseAddWorkFlowItemDialog} color="primary" autoFocus>Quit</Button>
                                </DialogActions>
                            </Dialog>
                            <button onClick={() => setOpenAddLinkWorkFlowDialog(true)} style={{border: "none", padding: "8px", backgroundColor: "#f6f6f6", marginLeft: "8px"}}>
                                +Link
                            </button>
                            <Dialog
                                open={openAddLinkWorkFlowDialog}
                                onClose={handleCloseAddLinkWorkFlowDialog}
                                aria-labelledby="add-workflow-link-dialog-title"
                                aria-describedby="add-workflow-link-dialog-description">
                                <DialogTitle
                                    id="add-workflow-link-dialog-title">
                                    Add new Link
                                </DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="add-workflow-link-dialog-description">
                                    </DialogContentText>
                                    <AddLinkWorkFlowForm nodeDataArray={currentWorkFlow.nodeDataArray} formAddLinkWorkFlowChange={formAddLinkWorkFlowChange}/>
                                </DialogContent>
                                <DialogActions>
                                    <Button
                                        disabled={isFormAddWorkFlowLinkValid()}
                                        onClick={handleAddLinkWorkFlowSubmit}
                                        color="primary">
                                        Add
                                    </Button>
                                    <Button onClick={handleCloseAddLinkWorkFlowDialog} color="primary" autoFocus>Quit</Button>
                                </DialogActions>
                            </Dialog>
                        </div>
                        <WorkFlowChart
                            updateWorkFlowItem={props.updateWorkFlowItem}
                            workFlow={currentWorkFlow}
                            removeWorkFlowItem={props.removeWorkFlowItem}
                            removeWorkFlowLink={props.removeWorkFlowLink}
                            updateDiagram={props.updateWorkFlow}
                        />
                    </div>
                        }
                </div>
            </div>
        </div>
    )
}

export default WorkFlow;
