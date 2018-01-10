import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import addbtn from '../../assets/icons/add.svg';
import AddReminder from './addreminder';

export default class AddEvent extends React.Component{
	constructor(props){
		super(props);
    this.tooglemodal = this.tooglemodal.bind(this);
	  this.state = {
		Modal: false,
		alerts: "",
		type: ""
	}
  }
  tooglemodal(boo, plus, add){
  	if(plus == true){
  		console.log("trigged plus");
  		this.setState(state => ({Modal: !state.Modal}))
	    if(boo == true) {
	    	this.props.onChange();
	    	boo = false;
	    }
  	} else {console.log("false")};
  	}
	render(){
		let style
		if(this.props.wearershow == "All wearers" || this.props.wearershow === 0){
			style = {display: "none"}; 
		}else {
			style = {display: "flex"};
		}
		return <div style={style} className="add-reminder" onClick={() => this.tooglemodal(false, true)}>
		<img src={addbtn} />
		{this.state.Modal && ReactDOM.createPortal(<AddReminder time={this.props.time} wid={this.props.id} gid={this.props.groupid} item={this.props.item}
       name={this.props.firstname} onClose={this.tooglemodal}/>, document.getElementById("portal"))}
	</div>
	}
}