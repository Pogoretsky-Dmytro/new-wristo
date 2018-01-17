import React from 'react';
import axios from 'axios';
import './notifications.scss'
import {HeaderTwoBtn} from '../otherComponents/header';



class AddEvent extends React.Component{
	constructor(props){
	super(props);
	this.state = {
		alertclass: "sos"
	}
	this.removeAlarm = this.removeAlarm.bind(this);
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
		hide: false,
		alerts: [{
			address: "Miskevycha Square, 9, L'viv, Lviv Oblast, Ukraine, 79000",
			created_at:"2018-01-15T15:17:35.938Z",
			id:0,
			latitude:49.839683,
			longitude:24.029717,
			message:"SOS",
			unique_wristo_id:"69M2VL",
			updated_at:"2018-01-15T15:17:59.787Z",
			viewed:true
		}]
	}
	this.reduceheight = this.reduceheight.bind(this);
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
			for(let i = 0; i < this.state.alerts.length; i++){
				if(this.state.alerts[i].id == id){
					this.props.onChange(this.state.alerts[i]);
					this.state.alerts[i].viewed = true;
				}
			}
		},
		error => { 
			console.log(error)
		}
	)
}
createNotification(item, index){
	let active = false;
	if(index == 0) active = true;
	let date = new Date(item.created_at);
	let time = `${date.getHours()}:${date.getMinutes()}`;
	return <AddEvent event={item.message} time={time} id={item.id} onChange={this.setviewed.bind(this)} active={item.viewed} name="Bohdan" link="https://wristoapp.s3.amazonaws.com/staging/uploads/wearer/image/15/image.jpeg"/>
}
componentWillReceiveProps(nextProps){
	if(Object.keys(nextProps.alert).length !== 0){
		if(nextProps.alert.id !== this.state.alerts[0].id){
			let arr = this.state.alerts;
			arr.unshift(nextProps.alert);
			this.state.notifications = arr.map(this.createNotification.bind(this))
			this.setState({alerts: arr});
		}
	}
	if(this.state.hide !== nextProps.hide){
      this.reduceheight(this.divElement, nextProps.hide);
    }
}
hidelist(){
	this.state.hide = !this.state.hide;
	this.reduceheight(this.divElement, this.state.hide);
}
reduceheight(elem, hide){
   this.divElement.style.maxHeight = !hide ? "195px" : "0px"
   this.divElement.style.transitionDuration = "3s";
}
render(){
	return (
		<div className="notifications">
			<HeaderTwoBtn onChange={this.hidelist.bind(this)} header="Notifications"/>
			<div className="events" ref={ (divElement) => this.divElement = divElement}>
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