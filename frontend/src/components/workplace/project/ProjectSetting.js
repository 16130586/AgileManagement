import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Avatar, TextField } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import Alert from '@material-ui/lab/Alert';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";

const style = makeStyles(() => ({
	div: {
		marginBottom: "10px",
		marginTop: "10px"
	},
	demo: {
		backgroundColor: "white",
	},
	grid: {
		marginTop: "5px",
		marginBottom: "20px",
		borderLeft: "2px solid black"
	},
	container: {

	},
	noti: {
		height: "30px"
	},
	bigImg: {
		width: "100px",
		height: "100px",
		marginBottom: "20px",
		marginTop: "10px"
	},
	item: {
		width: "1000px !important"
	},
	button: {
		height: "50px"
	}
}))

let Notification = function (props) {
	const classes = style();
	const [open, setOpen] = React.useState(true);

	return (
	  <div>
		<Collapse in={open}>
		  <Alert>
			{props.save}
		  </Alert>
		</Collapse>
	  </div>
	);
}

const MemberComponent = function (props) {
	const dev = props.dev;
	const handleRemoveMember = function() {
		const data = {
			userID: dev.id,
			projectID: props.project.id
		}
		console.log('remove member data', data);
		props.remove(data);
	}
	return (
		<div>
			<ListItem>
				<ListItemAvatar>
					<Avatar src={dev.avatarUrl}>
					</Avatar>
				</ListItemAvatar>
				<ListItemText 
					primary={`${dev.nickName} / ${dev.email}`}
					secondary="member"
				/>
				{props.me.id == props.project.owner.id &&
				<ListItemSecondaryAction>
					<IconButton edge="end" aria-label="delete">
						<DeleteIcon onClick={handleRemoveMember}/>
					</IconButton>
				</ListItemSecondaryAction>
				}
			</ListItem>
		</div>
	)
}

const ListMember = function (props) {
	const classes = style();
	return (
		<Grid className={classes.grid} item xs={12} md={6}>
            <List>
				{props.project.devTeam.map(function(dev, id){
					return (<MemberComponent me={props.me} remove={props.remove} dev={dev} project={props.project}></MemberComponent>)
				})}
            </List>
        </Grid>
	)
}

let AddMemberForm = function (props) {
	const classes = style();
	const [userName, setUserName] = React.useState("");
	const handleAddMember = function() {
		let data = {
			userName: userName,
			projectID: props.project.id
		}
		console.log('add member data', data)
		props.add(data)
	}

	return (
		<div>
			<form className={classes.root} noValidate autoComplete="off">
				<TextField onChange={event => setUserName(event.target.value)} value={userName} id="name"
						   label="email" variant="outlined"/>
				<Button className={classes.button} variant="contained" href="#contained-buttons"
						onClick={handleAddMember}>
					Add member
				</Button>
			</form>
		</div>

	)
}

let ProjectSetting = function (props) {
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [workFlow, setWorkFlow] = useState(null)
	useEffect(() => {
		if(props.project != null){
			setName(props.project.name)
			setDescription(props.project.description)
		}
	}, [props.project])

	let classes = style();

	console.log("project", props.project)

	const handleUpdateProject = function() {
		let data = {
			id: props.project.id,
			name: name,
			description: description,
			key: props.project.code,
			leader: props.project.leader.id,
			workFlow: workFlow
		}
		console.log('update data ', data);
		props.update(data);
	}

	let saveNoti = <div></div>
	if (props.project != null && props.project.save !== undefined) {
		saveNoti = <Notification save={props.project.save}></Notification>
	}
	if(props.project == null) return <div></div>
	return (
		<div>
			<h1>Project Setting</h1>

			<h3>Summary</h3>

			{saveNoti}
			<div>
				<div>
					<Avatar className={classes.bigImg} alt="Remy Sharp" src={props.project.imgUrl} variant="square"/>
				</div>
				<div className={classes.div}>
					<TextField onChange={event => setName(event.target.value)} id="name" label="Name" value={name} variant="outlined" fullWidth />
				</div>
				<div className={classes.div}>
					<TextField id="outlined-basic" label="Code" value={props.project.code} variant="outlined" fullWidth disabled/>
				</div>
				<div className={classes.div}>
					<TextField onChange={event => setDescription(event.target.value)} id="outlined-basic" label="Description" value={description} variant="outlined" fullWidth multiline rows={4} />
				</div>
				<div className={classes.div}>
					{props.project &&
					<FormControl className="mt-3">
						<InputLabel shrink id="label-assignee-email">
							WorkFlow
						</InputLabel>
						<Select
							onChange={event => setWorkFlow(event.target.value)}
							labelId="workflow-sl-id"
							name="workflow"
							defaultValue={props.project.currentWorkFlow.id}>
							{props.workFlows && props.workFlows.map((workFlowItem) => (
								<MenuItem
									key={workFlowItem.id}
									className="ml-1"
									value={workFlowItem.id}
								>{workFlowItem.name}</MenuItem>
							))}
						</Select>
					</FormControl>
					}
				</div>
				{props.me.id == props.project.leader.id &&
				<div>
					<Button onClick={() => {
						{handleUpdateProject()}
					}} color="primary" variant="contained">Save</Button>
				</div>
				}
			</div>
			
			<h3>Team Member</h3>
			<div className={classes.container}>
				{props.me.id == props.project.leader.id &&
				<AddMemberForm
					add={props.add}
					project={props.project}>
				</AddMemberForm>
				}
				<ListMember
					project={props.project}
					remove={props.remove}
					me={props.me}
				></ListMember>
			</div>
		</div>
	)
}

export default ProjectSetting