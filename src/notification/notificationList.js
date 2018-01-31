import React from 'react';
import axios from 'axios';


export default class NotificationList extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			notifications: []
		}
	}


	createNotification(item, index){
		let active = false;
		if(index == 0) active = true;
		let date = new Date(item.created_at);
		let time = `${date.getHours()}:${date.getMinutes()}`;
		return <AddEvent event={item.message} time={time} id={item.id} onChange={this.setviewed.bind(this)} active={item.viewed} name="Bohdan"/>
	}
	render(){
		return (
			<div className="notifications">
				<div className="events">
					{this.state.notifications}
				</div>
			</div>
		)
	}
}


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
	return (
		<div className={this.props.active ? "addEvent" : this.state.alertclass + " addEvent"} onClick={this.removeAlarm.bind(this)}>
			<img src={defaulticon} alt="" />
			<div>
				<h3>{this.props.name}<span>&bull;</span><span>{this.props.time}</span></h3>
				<p>{this.props.event}</p>
			</div>
		</div>)
  }
}