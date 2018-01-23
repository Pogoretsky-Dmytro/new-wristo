import React from 'react';
import './contacts.scss';
import List from './List';
import {HeaderTwoBtn} from '../otherComponents/header';
import axios from 'axios';
import actions from './actionsContacts';
import Draggable from 'react-draggable';
import Resizable from 're-resizable';

function EbsentCarers(){
	return <p className="absentcontacts">There is no wearers ...</p>
}

class Contacts extends React.Component{
constructor(props){
	super(props);
	this.state = {
		changecontent: "wearer",
		axiosData: "none",
		height: "auto",
		hide: false
};
}

showWearers(){
	this.refs.wear.style.borderBottom = "3px solid #b52f54";
	this.refs.car.style.borderBottom = "none";
	this.setState({changecontent: "wearer"});
}
showCarers(){
	this.refs.car.style.borderBottom = "3px solid #b52f54";
	this.refs.wear.style.borderBottom = "none";
	this.setState({changecontent: "carer"})
}

hidelist(){
	this.setState({hide: !this.state.hide})
}

render(){
	const content = this.state.changecontent;
	const data = this.props.usersdata;
	let button;
	if(content === "wearer" && data !== "none"){
		button = <List hide={this.state.hide} style={{backgroundColor: "red"}} reloadwearers={this.props.reloadwearers} group={this.props.group} onchangestate={this.props.onchangestate} id={this.props.id} toshow={this.props.usersdata} deleteconfirm={this.props.deleteconfirm}/>
	} else if(data !== "none" && content === "carer"){
		button = <List reloadwearers={this.props.reloadwearers} carer="carer" group={this.props.group} onchangestate={this.props.onchangestate} id={this.props.id} toshow={this.props.carers} deleteconfirm={this.props.deleteconfirm}/>
	} else if(data == "none" || data == []){
		button = <EbsentCarers />
	}
	return ( <div className="contacts-container" >
	 			<HeaderTwoBtn header="Contacts" onChange={this.hidelist.bind(this)}/>
	 			<div className="chooseUser">
					<div ref="wear" onClick={this.showWearers.bind(this)}><p>wearers</p></div>
					<div ref="car" onClick={this.showCarers.bind(this)}><p>carers</p></div>
				</div>
			{button}
			</div>

		);
	}
}
export default Contacts;