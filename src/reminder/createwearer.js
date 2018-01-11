import React, { Component } from 'react';
import './reminder.scss';
import axios from 'axios';
import social from '../assets/icons/group.svg';
import AddEvent from './modal/addevent';
import Event from './modal/event';
import {UserName, Hell} from './modal/modal';



class Createwearer extends React.Component{
	constructor(props){
		super(props);
		this.createevent = this.createevent.bind(this);
		this.getReminders = this.getReminders.bind(this);
		this.state = {
			flag: false,
			number: 0,
			event: "",
			style: [],
			monday: [],
			tuesday: [],
			wednesday: [],
			thursday: [],
			friday: [],
			saturday: [],
			sunday: []
		}
	}
	sortbydate(){

	}
	createevent(item){
		var date = new Date(item.start_date);
		var hours = date.getHours(), minutes = date.getMinutes(),day = date.getDay() , color, icon, cross;
		if(hours < 10) hours = '0' + hours;
		if(minutes < 10) minutes = '0' + minutes;
		var time = `${hours}:${minutes}`;
		var category = item.category;
		if(day == 1 && this.props.weekarray[0].day == date.getDate() && this.props.id == item.wearer_id){
			this.state.monday.push(returnevent.call(this))
		}else if(day == 2 && this.props.weekarray[1].day == date.getDate() && this.props.id == item.wearer_id){
			this.state.tuesday.push(returnevent.call(this))
		}else if(day == 3 && this.props.weekarray[2].day == date.getDate() && this.props.id == item.wearer_id){
			this.state.wednesday.push(returnevent.call(this))
		}else if(day == 4 && this.props.weekarray[3].day == date.getDate() && this.props.id == item.wearer_id){
			this.state.thursday.push(returnevent.call(this))
		}else if(day == 5 && this.props.weekarray[4].day == date.getDate() && this.props.id == item.wearer_id){
			this.state.friday.push(returnevent.call(this))
		}else if(day == 6 && this.props.weekarray[5].day == date.getDate() && this.props.id == item.wearer_id){
			this.state.saturday.push(returnevent.call(this))
		}else if(day == 0 && this.props.weekarray[6].day == date.getDate() && this.props.id == item.wearer_id){
			this.state.sunday.push(returnevent.call(this))
		}
		function returnevent(){
			switch (category) 
			{
			case "social": 
				icon = "s";
				cross = "y"
				color = "#FFF0D0"; break;
			case "medical": 
				icon = "m";
				cross = "b"
				color = "#E3F0F9"; break;
			default: 
				color = "#000"; break;
			}
			return (
			<Event cros={cross} onChange={this.getReminders} gid={this.props.groupid} time={time} color={color} item={item} title={item.title} icon={icon}/>
		) 
		}
	}
	componentWillReceiveProps(nextProps){
		this.setState({
			done: false,
			monday: [],
			tuesday: [],
			wednesday: [],
			thursday: [],
			friday: [],
			saturday: [],
			sunday: []
		})
		this.state.wearershow = nextProps.wearershow;
		this.state.event = nextProps.event;
		this.setState({filteredreminders: []});
		this.state.idid = nextProps.id;
		this.getReminders();
	}

	getReminders(){
		this.state.reminders = [];
		this.setState({
			done: false,
			monday: [],
			tuesday: [],
			wednesday: [],
			thursday: [],
			friday: [],
			saturday: [],
			sunday: []
		});
		axios({
	      method: 'get',
	      url: 'https://wristo-platform-backend-stg.herokuapp.com/api/v1/groups/' + this.props.groupid + '/wearers/' + this.state.idid + '/reminders',
	      headers: {'X-Requested-With': 'XMLHttpRequest', 'accept': 'application/json', 'content-type': 'application/json', 
     	 'uid': sessionStorage.getItem("uid"), 'client': sessionStorage.getItem("client"), 'access-token': sessionStorage.getItem("accesstoken")},
	      responseType: 'json'
	   	}).then(response => {
	   		this.setState({reminders:  response.data});
	    }).then(response => {
	   		this.state.reminders.sort(function(a, b) {
			    a = new Date(a.start_date);
			    b = new Date(b.start_date);
			    return a-b;
			});
	    }).then(response => {
	    	this.filterReminders(this.state.reminders);
	    	this.setState({done: true});
	    }).catch((error) => { 
	        console.log(error);
	    });
	}
	componentWillMount(){
		this.state.idid = this.props.id;
		this.getReminders();
	}

	filterReminders(reminders){
		this.state.filteredreminders = [];
		this.state.filteredreminders = reminders.filter(item => {
			let date = new Date(item.start_date);
			if(this.state.event == "" && date.getDate() >= this.props.weekarray[0].day && date.getDate() <= this.props.weekarray[6].day
				&& date.getMonth() >= this.props.weekarray[0].month && date.getMonth() <= this.props.weekarray[6].month){
				return item;	
			} else if(this.state.event == item.title && date.getDate() >= this.props.weekarray[0].day && date.getDate() <= this.props.weekarray[6].day
				&& date.getMonth() >= this.props.weekarray[0].month && date.getMonth() <= this.props.weekarray[6].month){
				return item;	
			}
		})
		this.state.filteredreminders.forEach(this.createevent);
		this.state.monday.push(<AddEvent time={this.props.weekarray[0]} wearershow={this.props.wearershow} onChange={this.getReminders} lastname={this.props.lastname} 
			url={this.props.url} id={this.props.id} groupid={this.props.groupid} firstname={this.props.firstname}/>);
		this.state.tuesday.push(<AddEvent time={this.props.weekarray[1]} wearershow={this.props.wearershow} onChange={this.getReminders} lastname={this.props.lastname} 
			url={this.props.url} id={this.props.id} groupid={this.props.groupid} firstname={this.props.firstname}/>);
		this.state.wednesday.push(<AddEvent time={this.props.weekarray[2]} wearershow={this.props.wearershow} onChange={this.getReminders} lastname={this.props.lastname} 
			url={this.props.url} id={this.props.id} groupid={this.props.groupid} firstname={this.props.firstname}/>);
		this.state.thursday.push(<AddEvent time={this.props.weekarray[3]} wearershow={this.props.wearershow} onChange={this.getReminders} lastname={this.props.lastname} 
			url={this.props.url} id={this.props.id} groupid={this.props.groupid} firstname={this.props.firstname}/>);
		this.state.friday.push(<AddEvent time={this.props.weekarray[4]} wearershow={this.props.wearershow} onChange={this.getReminders} lastname={this.props.lastname} 
			url={this.props.url} id={this.props.id} groupid={this.props.groupid} firstname={this.props.firstname}/>);
		this.state.saturday.push(<AddEvent time={this.props.weekarray[5]} wearershow={this.props.wearershow} onChange={this.getReminders} lastname={this.props.lastname} 
			url={this.props.url} id={this.props.id} groupid={this.props.groupid} firstname={this.props.firstname}/>);
		this.state.sunday.push(<AddEvent time={this.props.weekarray[6]} wearershow={this.props.wearershow} onChange={this.getReminders} lastname={this.props.lastname} 
			url={this.props.url} id={this.props.id} groupid={this.props.groupid} firstname={this.props.firstname}/>);
	}
	render(){
		if(this.props.wearershow == "All wearers" || this.props.wearershow === 0){
			this.state.style[0] = {display: "flex"}
			this.state.style[1] = {width: "12%"} 
		}else {
			this.state.style[0] = {display: "none"}
			this.state.style[1] = {width: "14.2857143%", maxHeight: "100%"}
		}
		if(this.state.done){
			return (
				<div className="user">
					<UserName style={this.state.style[0]} onChange={this.getReminders} lastname={this.props.lastname}
					 url={this.props.url} id={this.props.id} groupid={this.props.groupid} firstname={this.props.firstname}/>
					<div className="events" style={this.state.style[1]} >
						{this.state.monday}
					</div>
					<div className="events" style={this.state.style[1]} >
						{this.state.tuesday}
					</div>
					<div className="events" style={this.state.style[1]} >
						{this.state.wednesday}
					</div>
					<div className="events" style={this.state.style[1]} >
						{this.state.thursday}
					</div>
					<div className="events" style={this.state.style[1]} >
						{this.state.friday}
					</div>
					<div className="events" style={this.state.style[1]} >
						{this.state.saturday}
					</div>
					<div className="events" style={this.state.style[1]} >
						{this.state.sunday}
					</div>
				</div>
			)
	} else { return null}
	}
}

export default Createwearer;