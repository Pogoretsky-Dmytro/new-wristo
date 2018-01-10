import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import group from '../../assets/icons/grouprem.svg';
import crB from '../../assets/icons/crB.svg';
import crY from '../../assets/icons/crY.svg';
import Delete from './deletereminder.js';

export default class Event extends React.Component{
	constructor(props){
		super(props);
		this.tooglemodal = this.tooglemodal.bind(this);
		this.state = {
		isModal: false,
		alerts: "",
		type: "", 
		icon: ""
	}
	}
	tooglemodal(boo){
	    this.setState(state => ({isModal: !state.isModal}))
	    if(boo == true) {
	    	this.props.onChange();
	    	boo = false;
	    }
	}
	render(){
		let icon, cross = {};
		this.props.icon == "s" ? icon = group 
		: icon = "http://www.iconsplace.com/icons/preview/blue/pill-256.png";
		this.props.cros == "y" ? this.state.icon = crY : this.state.icon = crB;
		return (
			<div className="dayevents" style={{backgroundColor: this.props.color}}>
				<img src={icon} alt="" />
				<p>{this.props.title}<br/>{this.props.time}</p>	
				<img onClick={this.tooglemodal} className="delete-event" src={this.state.icon}/>
				{this.state.isModal && ReactDOM.createPortal(<Delete wid={this.props.item.wearer_id} 
          gid={this.props.gid} item={this.props.item} name={this.props.firstname} onClose={this.tooglemodal}/>, document.getElementById("portal"))}
			</div>
		)
	}
};