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
        </Fragment>
    )
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
                onChange={(e) => props.formAddLinkWorkFlowChange(e)}
                SelectProps={{
                    native: true,
                }}
                variant="outlined"
                fullWidth
                margin="dense"
            >
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
                onChange={(e) => props.formAddLinkWorkFlowChange(e)}
                SelectProps={{
                    native: true,
                }}
                variant="outlined"
                fullWidth
                margin="dense"
            >
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
    const [currentWorkFlow, setCurrentWorkFlow] = React.useState(listWorkFlow[0])

    const handleWorkFlowSelected = (id) => {
        setCurrentWorkFlow(getWorkFlowById(id));
    }

    // create workflow form
    const [openCreateWorkFlowDialog, setOpenDeleteDialog] = React.useState(false)
    const handleCloseCreateWorkFlowDialog = () => {
        setOpenDeleteDialog(false)
    }

    const [createWorkFlowForm, setCreateWorkFlowForm] = React.useState({
        name: ''
    })

    const formCreateWorkflowChange = function (event) {
        let formData = { ...createWorkFlowForm }
        formData[event.target.name] = event.target.value
        setCreateWorkFlowForm(formData)
    }

    const isFormValid = () => {
        let requiredAllNoneNull = true
        Object.keys(createWorkFlowForm).forEach(name => {
            if (createWorkFlowForm[name] == null || createWorkFlowForm[name] == '' || createWorkFlowForm[name].length == 0)
                requiredAllNoneNull = false
        })
        return !requiredAllNoneNull
    }

    const handleCreateWorkFlowSubmit = function(){
        console.log(createWorkFlowForm)
        props.createProject(createWorkFlowForm)
    }

    // add workflow-item form
    const [openAddWorkFlowItemDialog, setOpenAddWorkFlowItemDialog] = React.useState(false)
    const handleCloseAddWorkFlowItemDialog = () => {
        setOpenAddWorkFlowItemDialog(false)
    }

    const [addWorkFlowItemForm, setAddWorkFlowItemForm] = React.useState({
        name: ''
    })

    const formAddWorkFlowItemChange = function (event) {
        let formData = { ...addWorkFlowItemForm }
        formData[event.target.name] = event.target.value
        setAddWorkFlowItemForm(formData)
    }

    const handleAddWorkFlowItemSubmit = function(){
        console.log(addWorkFlowItemForm)
        props.createProject(addWorkFlowItemForm)
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

    const handleAddLinkWorkFlowSubmit = function(){
        console.log(addLinkWorkFlowForm)
        props.createProject(addLinkWorkFlowForm)
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
                                disabled={isFormValid()}
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
                                <ListItem button onClick={() => handleWorkFlowSelected(item.id)}>
                                    <ListItemText id={"workflow"+item.id} primary={item.name} />
                                </ListItem>
                            ))}
                        </List>
                    </div>
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
                                    <AddWorkFlowItemForm formAddWorkFlowItemChange={formAddWorkFlowItemChange} addWorkFlowItemForm={addWorkFlowItemForm} />
                                </DialogContent>
                                <DialogActions>
                                    <Button
                                        disabled={isFormValid()}
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
                                        onClick={handleAddLinkWorkFlowSubmit}
                                        color="primary">
                                        Add
                                    </Button>
                                    <Button onClick={handleCloseAddLinkWorkFlowDialog} color="primary" autoFocus>Quit</Button>
                                </DialogActions>
                            </Dialog>
                        </div>
                        <WorkFlowChart nodeDataArray={currentWorkFlow.nodeDataArray} linkDataArray={currentWorkFlow.linkDataArray}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WorkFlow;
