import React, { Component } from 'react';
import '../reminder.scss';
import edit from '../../assets/icons/pensil.png';
import axios from 'axios';
import ReactDOM from 'react-dom';
import social from '../../assets/icons/group.svg';
import addbtn from '../../assets/icons/add.svg';
import defaulticon from '../../settings/default_avatar.png';
import Delete from './deletereminder';
import AddReminder from './addreminder'

export class UserName extends React.Component{
	constructor(props){
    super(props);
    this.tooglemodal = this.tooglemodal.bind(this);
    this.state = {
		isModalOpen: false,
		alerts: "",
		type: ""
	}
  }
  tooglemodal(boo, i, b = true){
    if(b == true){
    this.setState({isModalOpen: !this.state.isModalOpen})
      if(boo == true) {
        this.props.onChange();
        boo = false;
      }
    }
  }

  render(){
	return (
		<div className="user-name" style={this.props.style}>
			<div><img src={this.props.url ? this.props.url : defaulticon} alt=""/><p>{this.props.firstname}<br/>{this.props.lastname}</p></div>	
			<div><img className="edit" src={edit} alt="" onClick={this.tooglemodal}/></div>
			{this.state.isModalOpen && ReactDOM.createPortal(<AddReminder wid={this.props.id} gid={this.props.groupid} item={this.props.item}
       name={this.props.firstname} onClose={this.tooglemodal}/>, document.getElementById("portal"))}
		</div>
	)
}
};