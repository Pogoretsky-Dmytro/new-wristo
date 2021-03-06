import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Link, Redirect, withRouter} from 'react-router-dom';
import axios from 'axios';

import RenameGroup from './modals/rename';
import Delete from './modals/delete';
import Duplicate from './modals/duplicate';
import NewGroup from './modals/newgroup';
import Modal from './modals/deletewearer';
import Contacts from '../contacts/contacts';
import MapContainer from '../maps/google-map';
import AddGroup from '../groups/addGroup';

import '../maps/maps.scss';
import './masterpage.scss';
import '../../../node_modules/react-grid-layout/css/styles.scss';
import '../../../node_modules/react-resizable/css/styles.scss';

import Notifications from '../notifications/notifications'
import List from '../contacts/List';
import Header from "../../settings/wearer-settings/header/header";
import WearersLoading from '../../settings/wearer-settings/wearers-configuration-page/wearer-loading.js';

import {Responsive, WidthProvider} from 'react-grid-layout';
const ResponsiveReactGridLayout = WidthProvider(Responsive)


export let latArray = [{ lat: 0, lng: 0 }]

var n = 0;
class MasterPage extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			isModal: false,
			showmodal: false, 
			todelete: "", 
			confirm: false, 
			axiosData: "none", 
			usertodeletename: "",
			groups: [],
			wearers: [],
			carers: [],
			renamegroup: false,
			deleteGroup: false,
			duplicateGroup: false,
			newGroup: false,
			toedit: "",
			redirectToLogin: null,
      		accesstoken: null,
      		uid: null,
			client: null,
			amountof: 0,
			alarm: false,
			lastalarm: {lat: 40, lng: 40},
			alert: {},
			center: { lat: 43.83, lng: 24.05 },
			windowwidth: 0,
			loading: true
		};

		this.onchangestate = this.onchangestate.bind(this);
		this.deleteListItem = this.deleteListItem.bind(this);
		this.getWearers = this.getWearers.bind(this);
		this.getCarers = this.getCarers.bind(this);
		this.getGroups = this.getGroups.bind(this);
		this.onGroupClick = this.onGroupClick.bind(this);
		this.listClick = this.listClick.bind(this);
		this.redirectToLogin = this.redirectToLogin.bind(this);
		this.getAlert = this.getAlert.bind(this);
		this.getCoords = this.getCoords.bind(this)
		this.setAlarm = this.setAlarm.bind(this);
		this.setNormAlarm = this.setNormAlarm.bind(this);
		this.updateDimensions =  this.updateDimensions.bind(this);
		this.onMouseOver = this.onMouseOver.bind(this);

	}

componentWillUnmount(){
	window.removeEventListener("resize", this.updateDimensions);
	clearInterval(this.state.interval)
}

componentWillMount() {
	this.setState({windowwidth: window.innerWidth})
	this.state.interval = setInterval(() => this.getAlert(), 2000);
  	if( sessionStorage.getItem("accesstoken") !== null && sessionStorage.getItem("uid") !== null && 
  		sessionStorage.getItem("client") !== null){
			setTimeout(() => {
				this.setState({
				client: sessionStorage.getItem("client"),
				accesstoken: sessionStorage.getItem("accesstoken"),
				uid: sessionStorage.getItem("uid"),
				loading: false
			}); console.log("done"); 
			}, 0)
	}
};

setAlarm(item){
	latArray[0] = {lat: item.latitude, lon: item.longitude};
	this.setState({alarm: true, lastalarm: {lat: item.latitude, lng: item.longitude}, alert: item})
}
setNormAlarm(){
	this.setState({alarm: false});
}
getAlert(){
	axios({
		method: 'get',
		url: 'https://wristo-platform-backend-stg.herokuapp.com/api/v1/alerts',	
		headers: {'X-Requested-With': 'XMLHttpRequest', 'accept': 'application/json', 'content-type': 'application/json', 
 		'uid': sessionStorage.getItem("uid"), 'client': sessionStorage.getItem("client"), 'access-token': sessionStorage.getItem("accesstoken")},
	 responseType: 'json'		
	}).then(
		response => {
			response.data.sort((a,b) => {
				return a.id - b.id;
			})
			if(this.state.amountof !== response.data.length){
				this.setState({zoom: 8})
				this.state.amountof = response.data.length;
				this.setAlarm(response.data[response.data.length-1])
			}
		},
		error => { 
			console.log(error)
		}
	)
 }

componentDidMount(){
	window.addEventListener("resize", this.updateDimensions.bind(this));
	this.getGroups();
}

listClick(action, item){
	this.state.isModal = !this.state.isModal;
	if(action == "rename"){
		if(this.state.renamegroup == false) {
			this.setState({renamegroup: true, todelete: item.id, groupdelete: item.name});
		} else {
			this.setState({renamegroup: false, todelete: ""})
		}
	} else if(action == "delete"){
		if(this.state.deleteGroup == false) {
			this.setState({deleteGroup: true, todelete: item.id, groupdelete: item.name});
		} else {
			this.setState({deleteGroup: false, todelete: ""})
		}
	} else if(action == "duplicate"){
		if(this.state.duplicateGroup == false) {
			this.setState({duplicateGroup: true, todelete: item.id, groupdelete: item.name});
		} else {
			this.setState({duplicateGroup: false, todelete: ""})
		}
	} else if(action == "new"){
		if(this.state.newGroup == false) {
			this.setState({newGroup: true});
		} else {
			this.setState({newGroup: false})
		}
	}
}
getWearers(id){
	axios({
	      method: 'get',
	      url: 'https://wristo-platform-backend-stg.herokuapp.com/api/v1/groups/' + id + '/wearers',
	      headers: {'X-Requested-With': 'XMLHttpRequest', 'accept': 'application/json', 'content-type': 'application/json', 
      	 'uid': sessionStorage.getItem("uid"), 'client': sessionStorage.getItem("client"), 'access-token': sessionStorage.getItem("accesstoken")},
	      responseType: 'json'
	   	}).then(response => {

	   		this.setState({wearers: response.data}); 
	    }).catch((error) => { 
	        console.log(error);
	    });
}
getCarers(id){
	axios({
	      method: 'get',
	      url: 'https://wristo-platform-backend-stg.herokuapp.com/api/v1/carers/',
	      headers: {'X-Requested-With': 'XMLHttpRequest', 'accept': 'application/json', 'content-type': 'application/json', 
      	 'uid': sessionStorage.getItem("uid"), 'client': sessionStorage.getItem("client"), 'access-token': sessionStorage.getItem("accesstoken")},
	      responseType: 'json'
	   	}).then(response => {
	   		this.setState({carers: response.data}); 
	    }).catch((error) => { 
	        console.log(error);
	    });
}
getGroups(){
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
	   		this.state.group = response.data[0].id;
	   		this.state.groupname = response.data[0].name;
	   		this.getWearers(response.data[0].id);
	   		this.getCarers(response.data[0].id);
	    },error => { 
				console.log(error);
				if(error.response.status === 401)
				this.setState({
					redirectToLogin: true
				})
		})
}
onchangestate(item){
	if(this.state.showmodal == false) {
		this.setState({showmodal: true, todelete: item.id, usertodeletename: item.full_name});
	} else {
		this.setState({showmodal: false, todelete: ""})
	}
}
onGroupClick(item){
	this.state.group = item.id;
	this.state.groupname = item.name;
	this.getWearers(item.id);
}
deleteListItem(){
	axios({
		 	method: 'delete',
		    url: 'https://wristo-platform-backend-stg.herokuapp.com/api/v1/groups/' + this.state.group + '/wearers/' + this.state.todelete,
		    headers: {'X-Requested-With': 'XMLHttpRequest', 'accept': 'application/json', 'content-type': 'application/json', 
	        'uid': sessionStorage.getItem("uid"), 'client': sessionStorage.getItem("client"), 'access-token': sessionStorage.getItem("accesstoken")},
		    responseType: 'json',
	 	}).then(res => {
	 		this.getWearers(this.state.group);		
        })
        .catch(function (error) {
            console.log(error);
        })
}

redirectToLogin() {          
	if( this.state.client == null && this.state.accesstoken == null && this.state.uid == null){
		this.setState({
			redirectToLogin: true
		})
	}
	};

getCoords(item){
	this.setState({zoom: 16})
}
updateDimensions(){
	this.setState({windowwidth: window.innerWidth});
}
onMouseOver(e){
	if(e.target.className == ""){
		//this.setState({dragableMap: true});
	} else {
		//this.setState({dragableMap: false});
	}
}
render(){
	let modal = null, renamemodal = null, deleteGroup = null, duplicateGroup = null, newGroup = null;
	if(this.state.showmodal === true){
		modal = <Modal onchangestate={this.onchangestate} todelete={this.state.usertodeletename}
			group={this.state.groupname} deleteListItem={this.deleteListItem}/>
	} else {
		modal = null;
	}
	if(this.state.renamegroup === true){
		renamemodal = <RenameGroup reloadgroup={this.getGroups} onchangestate={this.listClick} 
			torename={this.state.groupdelete} id={this.state.group}/>
	} else {
		renamemodal = null;
	}
	if(this.state.deleteGroup === true){
		deleteGroup = <Delete reloadgroup={this.getGroups} onchangestate={this.listClick} 
		todelete={this.state.groupdelete} id={this.state.group}/>
	} else {
		deleteGroup = null;
	}
	if(this.state.duplicateGroup === true){
		duplicateGroup = <Duplicate reloadgroup={this.getGroups} onchangestate={this.listClick} 
		todelete={this.state.groupdelete} id={this.state.todelete}/>
	} else {
		duplicateGroup = null;
	}
	if(this.state.newGroup === true){
		newGroup = <NewGroup reloadgroup={this.getGroups} onchangestate={this.listClick}/>
	} else {
		newGroup = null;
	}
	if(this.state.loading){
		return <div class="loader"></div>;
	}
	var layouts = {lg: [
      {i: 'a', x: 0, y: 0, w: 8, h: 2, static: true},
      {i: 'b', x: 8, y: 2, w: 4, h: 2},
      {i: 'c', x: 8, y: 4, w: 4, h: 2}
    ], md: [
      {i: 'a', x: 0, y: 0, w: 8, h: 2, static: true},
      {i: 'b', x: 8, y: 2, w: 4, h: 2},
      {i: 'c', x: 8, y: 4, w: 4, h: 2}
    ], sm: [
      {i: 'a', x: 0, y: 4, w: 12, h: 2, static: false},
      {i: 'b', x: 0, y: 0, w: 12, h: 2},
      {i: 'c', x: 0, y: 2, w: 12, h: 2}
    ]};
	return (
	<div>{
		this.state.redirectToLogin ?  <Redirect to={{
			pathname: '/'
		}}/> : this.state.redirectToLogin === false ? <div className="masterpage">
		<Header redirectToLogin = {this.redirectToLogin}/>
		<AddGroup 
				show={this.state.isModal}
				active={this.state.group}
				groups={this.state.groups}
				onGroupClick={this.onGroupClick}
				onListClick={this.listClick}/>
			<ResponsiveReactGridLayout breakpoints={{lg: 1300, md: 850, sm: 830, xs: 480, xxs: 0}}
      cols={{lg: 12, md: 12, sm: 12, xs: 4, xxs: 2}}
      				layouts={layouts}
					className="layout contacts-body" 
					width={this.state.windowwidth-10}>
				<div onMouseMove={this.onMouseOver} key="a">
					<MapContainer
						zoom={this.state.zoom} 
						onGet={this.setNormAlarm} 
						coords={this.state.lastalarm} 
						center={this.state.center}/>
				</div>
				<div key="b" data-grid={{x: 8, y: 0, w: 4, h: 2}}>
					<Contacts 
						id={this.state.group} 
						reloadwearers={this.getWearers} 
						group={this.state.groupname} 
						usersdata={this.state.wearers} 
						carers={this.state.carers} 
						onchangestate={this.onchangestate} 
						deleteconfirm={this.state.confirm}/>
				</div>
				<div key="c" data-grid={{x: 9, y: 3, w: 4, h: 2}}>
					<Notifications alert={this.state.alert} onChange={this.getCoords}/>
				</div>
				
			</ResponsiveReactGridLayout>
			{duplicateGroup}
			{renamemodal}
			{modal}
			{newGroup}
			{deleteGroup}
	</div>
    : <WearersLoading/>}
	
	</div>)
}
}

export default MasterPage;