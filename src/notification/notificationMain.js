import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Header from "../settings/wearer-settings/header/header";
import PopUp from './pop-up';
import AddGroup from '../components/groups/addGroup';
import NotificationList from './notificationList'

import userImage from "../assets/icons/person.svg";


export default class NotificationsMain extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			isModalOpen: false,
			groups: [],
			groupId: 0,
			cmbbox: "All wearers"
		}
		this.getGroups = this.getGroups.bind(this);
		this.onGroupClick = this.onGroupClick.bind(this);
		this.switchwearer = this.switchwearer.bind(this);
		this.ch = this.ch.bind(this);
	  	this.hideDropdown = this.hideDropdown.bind(this);
		this.hideDropdownRem = this.hideDropdownRem.bind(this);
	}
	componentDidMount(){
		setTimeout(() => {
			this.setState({isModalOpen: true})
		},1000 * 2)
	}
	tooglemodal(){
    	this.setState(state => ({isModalOpen: !state.isModalOpen}))
  	}
  	componentWillMount(){
  		this.getGroups();
  	}
  	getGroups(){
		axios({
	      method: 'get',
	      url: 'https://wristo-platform-backend-stg.herokuapp.com/api/v1/groups',
	      headers: {'X-Requested-With': 'XMLHttpRequest', 'accept': 'application/json', 'content-type': 'application/json', 
     	  'uid': sessionStorage.getItem("uid"), 'client': sessionStorage.getItem("client"), 'access-token': sessionStorage.getItem("accesstoken")},
	      responseType: 'json'
	   	}).then(response => {
	   		this.setState({groups: response.data, groupId: response.data[0].id});
	   		this.getWearers(response.data[0].id);
	    },error => { 
			console.log(error);
		})
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
	switchwearer(item){
		this.setState({cmbbox: item.full_name, currentWearer: item})
	}
	ch(e){
		this.setState({eventfilter: e.title, rerender: true});
	}
	hideDropdown(e){
		if(this.refs.listwearers.style.display == "block" || this.refs.listwearers.style.display == undefined){
			this.refs.listwearers.style.display = "none";
		} else {
			this.refs.listwearers.style.display = "block";
		}
	}
	hideDropdownRem(e){
		if(this.refs.reminderlist.style.display == "block" || this.refs.reminderlist.style.display == undefined){
			this.refs.reminderlist.style.display = "none";
		} else {
			this.refs.reminderlist.style.display = "block";
		}
	}
	findreminder(){
		// this.setState({rerender: false});
		// let find, rem;
		// this.state.eventfilter = find = this.refs.reminder.value;
		// rem = this.state.reminders.filter(item => {
		// return item.title.toLowerCase().indexOf(find.toLowerCase()) !== -1;})
		// this.setState({filteredreminders: rem});
	}
	onGroupClick(item){
		this.setState({
			groupId: item.id
		})
		this.getWearers(item.id)
	}

	render(){
		let listWearers, createreminders = [];

		if(this.state.wearers)listWearers = this.state.wearers.map((item) => {
  			return <li onClick={(e) => {this.switchwearer(item, e), this.hideDropdown()}} key={item.id}>{item.full_name}</li>
  		});

		return (
			<div className="main-notifications">
				<Header />
				       {this.state.isModalOpen && ReactDOM.createPortal(<PopUp 
				       	onClose={this.tooglemodal.bind(this)}/>, document.getElementById("portal"))}
				<div style={{displat: "flex", padding: "20px", justyfyContent: "center", textAlign: "center"}}>
					<p style={{color: "#b52f54", fontSize: "16px"}}>Notifications</p>
				</div>
				<div className="main-content">
					<div className="help-block">
						<AddGroup 
							onGroupClick={this.onGroupClick} 
							active={this.state.groupId} 
							groups={this.state.groups} />

						<div className="switch-wearers">
							<div>
								<div className="user-image"><img src={userImage}/></div>
								<div className="combobox">
									<button className="dropbtn" onClick={this.hideDropdown}>{this.state.cmbbox}</button>
									<ul className="dropdown-content" ref="listwearers">
									<li key="" onClick={() => {this.switchwearer({full_name: "All wearers", id: 0}), this.hideDropdown()}}>
									All users</li>{listWearers}</ul>
								</div>
								<div className="search">
								<form onSubmit={() => {this.ch({title: this.refs.reminder.value}), this.hideDropdownRem()}} onChange={this.findreminder.bind(this)}>
									  <input placeholder="Search" className="input" ref="reminder" onClick={this.hideDropdownRem} value={this.state.eventfilter}/>
									  <ul className="reminderslist" ref="reminderlist">
									  {createreminders}
									  </ul>
								</form>
								</div>
							</div>
						</div>
					</div>
					<NotificationList />
				</div>
			</div>
		)
	}
}