import React from 'react';
import axios from 'axios';
import './notifications.scss'
import {HeaderNoBtn} from '../otherComponents/header';



class AddEvent extends React.Component{
	constructor(props){
	super(props);
	this.state = {
		alertclass: "sos"
	}
}
removeAlarm(){
	this.props.onChange(this.props.id);
	this.setState({alertclass: ""})
}
componentWillReceiveProps(nextProps){
	this.setState({alertclass: "sos"})
}

render(){
	return <div className={this.props.active ? "addEvent" : this.state.alertclass + " addEvent"} onClick={this.removeAlarm.bind(this)}>
				<img src={this.props.link} alt="" />
				<div>
					<h3>{this.props.name}<span>&bull;</span><span>{this.props.time}</span></h3>
					<p>{this.props.event}</p>
				</div>
			</div>
}
}

class Notifications extends React.Component{
constructor(props){
	super(props);
	this.state = {
		alerts: []
	}
}
setviewed(id){
	axios({
		method: 'put',
		url: 'https://wristo-platform-backend-stg.herokuapp.com/api/v1/alerts/' + id,	
		headers: {'X-Requested-With': 'XMLHttpRequest', 'accept': 'application/json', 'content-type': 'application/json', 
 		'uid': sessionStorage.getItem("uid"), 'client': sessionStorage.getItem("client"), 'access-token': sessionStorage.getItem("accesstoken")},
	 	responseType: 'json',
	 	data: {
		  "alert": {
		    "viewed": true
		  }
		}	
	}).then(
		response => {
			console.log(response.data);
		},
		error => { 
			console.log(error)
		}
	)
}
createNotification(item, index){
	console.log(item)
	let active = false;
	if(index == 0) active = true;
	let date = new Date(item.created_at);
	let time = `${date.getHours()}:${date.getMinutes()}`;
	return <AddEvent event={item.message} time={time} id={item.id} onChange={this.setviewed.bind(this)} active={item.viewed} name="Bohdan" link="https://wristoapp.s3.amazonaws.com/staging/uploads/wearer/image/15/image.jpeg"/>
}
componentWillReceiveProps(nextProps){
	if(Object.keys(nextProps.alert).length !== 0){
		let arr = this.state.alerts;
		arr.unshift(nextProps.alert);
		this.state.notifications = arr.map(this.createNotification.bind(this))
		this.setState({alerts: arr});
	}
}


render(){
	return (
		<div className="notifications">
			<HeaderNoBtn header="Notifications"/>
			<div className="events">
				{this.state.notifications}	
			</div>
			<div className="showAll">
					<p>see all</p>
			</div>
		</div>
	)
}
}
export default Notifications;