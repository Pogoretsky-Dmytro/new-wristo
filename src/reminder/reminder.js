import React, { Component } from 'react';
import './reminder.scss';
//import './groups/groups.scss';
import Header from "../settings/wearer-settings/header/header";
import userImage from "../assets/icons/person.svg";
import Calendar from './calendar';
import axios from 'axios';
import group from '../assets/icons/group.svg';
import {master} from "../login/loginForm.js"
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';
import WearersLoading from '../settings/wearer-settings/wearers-configuration-page/wearer-loading.js';
import Modal from "react-responsive-modal";
import defaultavatar from '../settings/default_avatar.png';
import arrow from '../assets/icons/back-arrow.svg';

let reminders = [];
class Reminder extends React.Component {
  constructor(props){
  	super(props);
  	this.state = {
  		cmbbox: "All wearers",
  		groups: [],
  		groupid: 0,
  		wearershow: "All wearers",
  		search: 0,
  		filteredreminders: [],
  		eventfilter: "",
		rerender: true,
		redirectToLogin: null,
		accesstoken: null,
      	uid: null,
      	client: null,
      	wearername: "All wearers"
  	}
  	this.changeWearer = this.changeWearer.bind(this);
  	this.onGroupClick = this.onGroupClick.bind(this);
  	this.getWearers = this.getWearers.bind(this);
  	this.switchwearer = this.switchwearer.bind(this);
  	this.getReminders = this.getReminders.bind(this);
  	this.clearsame = this.clearsame.bind(this);
	this.createreminder = this.createreminder.bind(this);
	this.redirectToLogin = this.redirectToLogin.bind(this);
  	this.ch = this.ch.bind(this);
}

componentWillMount(){
  if( sessionStorage.getItem("accesstoken") !== null && sessionStorage.getItem("uid") !== null && sessionStorage.getItem("client") !== null){
	//	location.reload();
		this.setState({
			client: sessionStorage.getItem("client"),
			accesstoken: sessionStorage.getItem("accesstoken"),
			uid: sessionStorage.getItem("uid"),
		})  
		}
}


addGroup(item){
	let clas;
	if(item.id == this.state.groupid) {
			clas = "active group"
		} else clas = "group"
	return <div className={clas} onClick={() => this.onGroupClick(item.id)}>
			<div className="groupbutton"><img src={group} alt="" />
			<p>{item.name}</p></div>
		</div>
}
switchwearer(item){
	this.state.wearershow = item.id;
	this.state.wearername = item.full_name;
	item.image ? this.state.wearerimg = item.image.url: this.state.wearerimg = defaultavatar;
	this.changeWearer(item);
}
onGroupClick(id){
	this.setState({groupid: id, wearershow: "All wearers", cmbbox: "All wearers"});
	this.getWearers(id);
}
changeWearer(item){
	this.setState({cmbbox: item.full_name});
}
getWearers(id){
	this.state.wearers = [];
	axios({
	      method: 'get',
	      url: 'https://wristo-platform-backend-stg.herokuapp.com/api/v1/groups/' + id + '/wearers',
	      headers: {'X-Requested-With': 'XMLHttpRequest', 'accept': 'application/json', 'content-type': 'application/json', 
				'uid': sessionStorage.getItem("uid"), 'client': sessionStorage.getItem("client"), 'access-token': sessionStorage.getItem("accesstoken")},
	      responseType: 'json'
	   	}).then(response => {
	   		this.setState({wearers: response.data});
	    }).then(response => {
	    }).catch((error) => { 
	        console.log(error);
	    });
}

componentDidMount(){
	axios({
		method: 'get',
		url: 'https://wristo-platform-backend-stg.herokuapp.com/api/v1/groups',
		headers: {'X-Requested-With': 'XMLHttpRequest', 'accept': 'application/json', 'content-type': 'application/json', 
 'uid': sessionStorage.getItem("uid"), 'client': sessionStorage.getItem("client"), 'access-token': sessionStorage.getItem("accesstoken")},
		responseType: 'json'
	 }).then(response => {
		if(response.status == 200){
			this.setState({
				redirectToLogin: false
			})
		}
		 this.setState({groups:  response.data});
		 return response.data;
	}, error => { 
		console.log(error.response);
		if(error.response.status === 401){
				this.setState({
					redirectToLogin: true
				})
		}
		this.setState({error: true})


	}).then(response => {
		this.state.groupid = response[0].id;
		this.getWearers(this.state.groupid)
	}, error => { 
		console.log(error.response);
		if(error.response.status === 401){
				this.setState({
					redirectToLogin: true
				})
		}
		this.setState({error: true})
	}).then(response => {
		this.getReminders()
	}, error => { 
		this.setState({error: true})
	});
		if(this.state.groupid) this.getReminders();
}
getReminders(){
		axios({
	      method: 'get',
	      url: 'https://wristo-platform-backend-stg.herokuapp.com/api/v1/groups/'+this.state.groupid+'/reminders',
	      headers: {'X-Requested-With': 'XMLHttpRequest', 'accept': 'application/json', 'content-type': 'application/json', 
     	 'uid': sessionStorage.getItem("uid"), 'client': sessionStorage.getItem("client"), 'access-token': sessionStorage.getItem("accesstoken")},
	      responseType: 'json'
	   	}).then(response => {
	   		this.state.reminders = response.data;
	    }).catch((error) => { 
	        console.log("error", error);
	    });
}
findreminder(){
	this.setState({rerender: false});
	let find, rem;
	this.state.eventfilter = find = this.refs.reminder.value;
	rem = this.state.reminders.filter(item => {
		return item.title.toLowerCase().indexOf(find.toLowerCase()) !== -1;})
	this.setState({filteredreminders: rem});
}
createreminder(item){
	return <li key={item.id} onClick={() => this.ch(item)}>{item.title}</li>
}
ch(e){
	this.setState({eventfilter: e.title, rerender: true});
}

redirectToLogin() {          
	if( this.state.client == null && this.state.accesstoken == null && this.state.uid == null){
		this.setState({
			redirectToLogin: true
		})
	}
};
clearsame(){
	let filter = [], is = false, iterator = 1;
	for(let i = 0; i < this.state.filteredreminders.length; i++){
		for(let j = 0; j < filter.length; j++){
			if(filter[j] == undefined){
				is = false
			} else {
					filter[j].title == this.state.filteredreminders[i].title ? is = true : is = false
			}
		}
		if(!is){
			filter[iterator++] = this.state.filteredreminders[i];
			is = false;
		}
	}
	return filter;
}

render(){
	let listOfGroups = this.state.groups.map(this.addGroup.bind(this))
	let listWearers, createreminders = [];
  	if(this.state.wearers)listWearers = this.state.wearers.map((item) => {
  		return <li onClick={(e) => this.switchwearer(item, e)} key={item.id}>{item.full_name}</li>
  	});
  	let clearsamereminders = this.clearsame();
	if(this.state.filteredreminders){
		createreminders = clearsamereminders.map(this.createreminder);
		createreminders.unshift(<li key={999} onClick={() => this.ch({title: ""})}>All Reminders</li>)
	}
	return( 
		<div>{
			this.state.redirectToLogin ?  <Redirect to={{
				pathname: '/'
			}}/> : this.state.redirectToLogin === false ?
		<div className="reminders">
		<Header redirectToLogin = {this.redirectToLogin}/>
			<div className="switch-wearers">
				<div className="add-group" style={{display: this.state.wearername == "All wearers" ? "flex" : "none"}}>
					{listOfGroups}
				</div>
				<div className="return-to-wearers" onClick={() => this.switchwearer({full_name: "All wearers", id: 0})} style={{display: this.state.wearername !== "All wearers" ? "flex" : "none"}}>
					<img src={arrow}/>
					<p>Back to All Wearers</p>
				</div>

				<div className="wearericon" style={{display: "flex"}}>
					<img src={this.state.wearerimg} style={{display: this.state.wearername !== "All wearers" ? "flex" : "none"}}/>
					<p>{this.state.wearername}</p>
				</div>

				<div>
					<div className="user-image"><img src={userImage}/></div>
					<div className="combobox">
						<button className="dropbtn">{this.state.cmbbox}</button>
						<ul className="dropdown-content">
						<li key="" onClick={(e) => this.switchwearer({full_name: "All wearers", id: 0}, e)} >
						All users</li>{listWearers}</ul>
					</div>
					<div className="search">
					<form onSubmit={() => this.ch({title: this.refs.reminder.value})} onChange={this.findreminder.bind(this)}>
						  <input placeholder="Search" className="input" ref="reminder" value={this.state.eventfilter}/>
						  <ul className="reminderslist">
						  {createreminders}
						  </ul>
					</form>
					</div>
				</div>
			</div>

			<div className="reminders-table">
				<Calendar rerender={this.state.rerender} event={this.state.eventfilter} wearers={this.state.wearers} 
				id={this.state.groupid} wearershow={this.state.wearershow} filter={this.state.search}/>
			</div>
		</div>:
			<WearersLoading/> 
		}
		</div> 
	)
}
}
export default Reminder;