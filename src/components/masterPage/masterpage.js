import React from 'react';
import { browserHistory } from 'react-router';
//import Navbar from '../otherComponents/navBar';
import Contacts from '../contacts/contacts';
import MapContainer from '../maps/google-map';
import AddGroup from '../groups/addGroup';
import '../maps/maps.scss';
import './masterpage.scss';
import Notifications from '../notifications/notifications'
import List from '../contacts/List';
import axios from 'axios';
import Header from "../../settings/wearer-settings/header/header";


class MasterPage extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			showmodal: false, 
			todelete: "", 
			confirm: false, 
			axiosData: "none", 
			usertodeletename: "",
			groups: [],
			wearers: [],
			renamegroup: false,
			deleteGroup: false,
			duplicateGroup: false,
			newGroup: false,
			toedit: ""
		};
		this.onchangestate = this.onchangestate.bind(this);
		this.deleteListItem = this.deleteListItem.bind(this);
		this.getWearers = this.getWearers.bind(this);
		this.getGroups = this.getGroups.bind(this);
		this.onGroupClick = this.onGroupClick.bind(this);
		this.listClick = this.listClick.bind(this);
	}

// componentWillMount(){
// 	//if(fakeAuth.isAuthenticated == false)browserHistory.push('/login');
// }
componentWillMount() { 
	this.getGroups();
};
listClick(action, item){
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
      'uid': 'boretskairuna23@gmail.com', 'client': 'ldhWd6MKE0QI-pn39bcuag', 'access-token': 'NOoEY1SGJa_Sy_TVwq_jYA'},
	      responseType: 'json'
	   	}).then(response => {
	   		this.setState({axiosData: response.data}); 
	    }).catch((error) => { 
	        console.log(error);
	    });
}
getGroups(){
	axios({
	      method: 'get',
	      url: 'https://wristo-platform-backend-stg.herokuapp.com/api/v1/groups',
	      headers: {'X-Requested-With': 'XMLHttpRequest', 'accept': 'application/json', 'content-type': 'application/json', 
      'uid': 'boretskairuna23@gmail.com', 'client': 'ldhWd6MKE0QI-pn39bcuag', 'access-token': 'NOoEY1SGJa_Sy_TVwq_jYA'},
	      responseType: 'json'
	   	}).then(response => {
	   		this.setState({groups:  response.data});
	   		this.state.group = response.data[0].id;
	   		this.state.groupname = response.data[0].name;
	   		this.getWearers(response.data[0].id);
	    }).catch((error) => { 
	        console.log(error);
	    });
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
	        'uid': 'boretskairuna23@gmail.com', 'client': 'ldhWd6MKE0QI-pn39bcuag', 'access-token': 'NOoEY1SGJa_Sy_TVwq_jYA'},
		    responseType: 'json',
	 	}).then(res => {
	 		this.getWearers(this.state.group);		
        })
        .catch(function (error) {
            console.log(error);
        })
	// const filteredUsers = this.state.axiosData.filter(user => user.id != this.state.todelete);
	// this.setState({ confirm: true, axiosData: filteredUsers });
}
render(){
	let modal = null, renamemodal = null, deleteGroup = null, duplicateGroup = null, newGroup = null;
	if(this.state.showmodal === true){
		modal = <Modal onchangestate={this.onchangestate} todelete={this.state.usertodeletename} group={this.state.groupname} deleteListItem={this.deleteListItem}/>
	} else {
		modal = null;
	}
	if(this.state.renamegroup === true){
		renamemodal = <RenameGroup reloadgroup={this.getGroups} onchangestate={this.listClick} torename={this.state.groupdelete} id={this.state.group}/>
	} else {
		renamemodal = null;
	}
	if(this.state.deleteGroup === true){
		deleteGroup = <Delete reloadgroup={this.getGroups} onchangestate={this.listClick} todelete={this.state.groupdelete} id={this.state.group}/>
	} else {
		deleteGroup = null;
	}
	if(this.state.duplicateGroup === true){
		duplicateGroup = <Duplicate reloadgroup={this.getGroups} onchangestate={this.listClick} todelete={this.state.groupdelete} id={this.state.todelete}/>
	} else {
		duplicateGroup = null;
	}
	if(this.state.newGroup === true){
		newGroup = <NewGroup reloadgroup={this.getGroups} onchangestate={this.listClick}/>
	} else {
		newGroup = null;
	}

	return <div className="masterpage">
		<Header />
			<div className="contacts-body">
				<div className="left-bar">
					<AddGroup active={this.state.group} groups={this.state.groups} onGroupClick={this.onGroupClick} onListClick={this.listClick}/>
					<MapContainer />
					<div className="terms">
						<p onClick={() => console.log(this.state)}>About Wristo</p>
						<p>Terms and Conditions</p>
					</div>
				</div>
				<div className="right-bar">
					<Contacts id={this.state.group} reloadwearers={this.getWearers} group={this.state.groupname} usersdata={this.state.axiosData} onchangestate={this.onchangestate} deleteconfirm={this.state.confirm}/>
					<Notifications />
				</div>
			</div>
			{duplicateGroup}
			{renamemodal}
			{modal}
			{newGroup}
			{deleteGroup}
	</div>
}
}

export default MasterPage;

class Modal extends React.Component {
	constructor(props){
		super(props);
	}
	deletewearer(){
		this.props.deleteListItem();
		this.props.onchangestate();
	}
  render() {
    return (
      <div className="backdrop">
        <div className="modal">
        <p>Delete member</p>
          {this.props.children}
          <div className="message">Are you sure you want to delete the wearer {this.props.todelete} <br/> from {this.props.group}?</div>
          <div className="footer">
            <button onClick={this.props.onchangestate}>
              cancel
            </button>
            <button onClick={this.deletewearer.bind(this)}>
              accept
            </button>
          </div>
        </div>
      </div>
    );
  }
}
class RenameGroup extends React.Component {
	constructor(props){
		super(props);
		this.setName = this.setName.bind(this);
		this.state = {
			newname: ""
		}
	}
	renamegroup(){
		this.props.onchangestate("rename");
	}
	setName(){
		this.state.newname = this.textInput.value;
	}
	componentDidMount(){
		this.textInput.focus();
	}
	changename(e){
		e.preventDefault();
		axios({
		 	method: 'put',
		    url: 'https://wristo-platform-backend-stg.herokuapp.com/api/v1/groups/' + this.props.id,
		    headers: {'X-Requested-With': 'XMLHttpRequest', 'accept': 'application/json', 'content-type': 'application/json', 
	        'uid': 'boretskairuna23@gmail.com', 'client': 'ldhWd6MKE0QI-pn39bcuag', 'access-token': 'NOoEY1SGJa_Sy_TVwq_jYA'},
		    responseType: 'json',
		    data: {"name": this.state.newname}
	 	}).then(res => {
	 		this.props.reloadgroup();
	 		this.props.onchangestate("rename");	
        }).catch(function (error) {
            console.log(error);
        })
	}
  render() {
    return (
      <div className="backdrop">
        <div className="modal-rename">
        <p>Rename Group</p>
          {this.props.children}
          <div className="message">Please enter new name of group {this.props.torename}.</div>
          <form onSubmit={this.changename.bind(this)}>
          	<input type="text"  ref={(input) => { this.textInput = input; }} onChange={this.setName}/>
          </form>	
          <div className="footer">
            <button onClick={this.renamegroup.bind(this)}>
              cancel
            </button>
            <button onClick={this.changename.bind(this)}>
              accept
            </button>
          </div>
        </div>
      </div>
    );
  }
}
class Delete extends React.Component {
	constructor(props){
		super(props);
	}
	renamegroup(){
		this.props.onchangestate("delete");
	}
	delete(e){
		e.preventDefault();
		axios({
		 	method: 'delete',
		    url: 'https://wristo-platform-backend-stg.herokuapp.com/api/v1/groups/' + this.props.id,
		    headers: {'X-Requested-With': 'XMLHttpRequest', 'accept': 'application/json', 'content-type': 'application/json', 
	        'uid': 'boretskairuna23@gmail.com', 'client': 'ldhWd6MKE0QI-pn39bcuag', 'access-token': 'NOoEY1SGJa_Sy_TVwq_jYA'},
		    responseType: 'json'
		}).then(res => {
			console.log("success  !!")
	 		this.props.reloadgroup();
	 		this.props.onchangestate("delete");	
        }).catch(function (error) {
            console.log(error);
        })
	}
  render() {
    return (
      <div className="backdrop">
        <div className="modal-rename">
        <p>Delete group</p>
          {this.props.children}
          <div className="message">Do you realy want to delete group {this.props.todelete}.</div>
          <div className="footer">
            <button onClick={this.renamegroup.bind(this)}>
              cancel
            </button>
            <button onClick={this.delete.bind(this)}>
              accept
            </button>
          </div>
        </div>
      </div>
    );
  }
}
class Duplicate extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			newGroup: ""
		}
		this.makecopy = this.makecopy.bind(this);
	}
	renamegroup(){
		this.props.onchangestate("duplicate");
	}
	makecopy(data){
		for(let i = 0; i < data.length; i++){
			axios({
		 	method: 'post',
		    url: 'https://wristo-platform-backend-stg.herokuapp.com/api/v1/groups/{group_id}/wearers ',
		    headers: {'X-Requested-With': 'XMLHttpRequest', 'accept': 'application/json', 'content-type': 'application/json', 
	        'uid': 'boretskairuna23@gmail.com', 'client': 'ldhWd6MKE0QI-pn39bcuag', 'access-token': 'NOoEY1SGJa_Sy_TVwq_jYA'},
		    responseType: 'json',
		    data: 
		    {
			  "wearer_id": data[i].id,
			  "group_id": this.state.newGroup
			}
		}).catch(error => {
			console.log(error);
		})
		}
	}
	duplicate(e){
		e.preventDefault();
		axios({
		 	method: 'post',
		    url: 'https://wristo-platform-backend-stg.herokuapp.com/api/v1/groups',
		    headers: {'X-Requested-With': 'XMLHttpRequest', 'accept': 'application/json', 'content-type': 'application/json', 
	        'uid': 'boretskairuna23@gmail.com', 'client': 'ldhWd6MKE0QI-pn39bcuag', 'access-token': 'NOoEY1SGJa_Sy_TVwq_jYA'},
		    responseType: 'json',
		    data: {"name": this.props.todelete}
		}).then(response => {
	 		this.props.reloadgroup();
	 		this.props.onchangestate("duplicate");
	 		console.log("response", response.data.id);
	 		this.state.newGroup = response.data.id;
        }).then(response => {
        	axios({
		    method: 'get',
		    url: 'https://wristo-platform-backend-stg.herokuapp.com/api/v1/groups/' + this.props.id + '/wearers',
		    headers: {'X-Requested-With': 'XMLHttpRequest', 'accept': 'application/json', 'content-type': 'application/json', 
	      	'uid': 'boretskairuna23@gmail.com', 'client': 'ldhWd6MKE0QI-pn39bcuag', 'access-token': 'NOoEY1SGJa_Sy_TVwq_jYA'},
		    responseType: 'json'
		   	}).then(response => {
		   		console.log(response)
		   		this.makecopy(response.data)
		    }).catch((error) => { 
		        console.log(error);
		    });
        }).catch(function (error) {
            console.log(error);
        })
	}
  render() {
    return (
      <div className="backdrop">
        <div className="modal-rename">
        <p>Duplicate group</p>
          {this.props.children}
          <div className="message">Do you realy want to duplicate group {this.props.todelete}.</div>
          <div className="footer">
            <button onClick={this.renamegroup.bind(this)}>
              cancel
            </button>
            <button onClick={this.duplicate.bind(this)}>
              accept
            </button>
          </div>
        </div>
      </div>
    );
  }
}
class NewGroup extends React.Component {
	constructor(props){
		super(props);
		this.setName = this.setName.bind(this);
		this.state = {
			newname: ""
		}
	}
	renamegroup(){
		this.props.onchangestate("new");
	}
	setName(){
		this.state.newname = this.textInput.value;
	}
	componentDidMount(){
		this.textInput.focus();
	}
	changename(e){
		e.preventDefault();
		axios({
		 	method: 'post',
		    url: 'https://wristo-platform-backend-stg.herokuapp.com/api/v1/groups/',
		    headers: {'X-Requested-With': 'XMLHttpRequest', 'accept': 'application/json', 'content-type': 'application/json', 
	        'uid': 'boretskairuna23@gmail.com', 'client': 'ldhWd6MKE0QI-pn39bcuag', 'access-token': 'NOoEY1SGJa_Sy_TVwq_jYA'},
		    responseType: 'json',
		    data: {"name": this.state.newname}
	 	}).then(res => {
	 		this.props.reloadgroup();
	 		this.props.onchangestate("new");	
        }).catch(function (error) {
            console.log(error);
        })
	}
  render() {
    return (
      <div className="backdrop">
        <div className="modal-rename">
        <p>New Group</p>
          {this.props.children}
          <div className="message">Please enter  name of new group.</div>
          <form onSubmit={this.changename.bind(this)}>
          	<input type="text"  ref={(input) => { this.textInput = input; }} onChange={this.setName}/>
          </form>	
          <div className="footer">
            <button onClick={this.renamegroup.bind(this)}>
              cancel
            </button>
            <button onClick={this.changename.bind(this)}>
              accept
            </button>
          </div>
        </div>
      </div>
    );
  }
}
