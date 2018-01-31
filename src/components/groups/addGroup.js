import React, { Component } from 'react';
import './groups.scss';
import group from '../../assets/icons/group.svg';
import adduser from '../../assets/icons/add.svg';

/*this.refs.drop.style.display = 'none';
this.refs.drop.style.display = 'none';
this.refs.drop.style.display = 'none';*/
class DropDownMenu extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			show: true
		}
	}
	render(){
		return <ul className="dropdown" ref="drop">
			<li onClick={() =>{this.props.onListClick("rename", this.props.item)}}>rename</li>
			<li onClick={() =>{this.props.onListClick("duplicate", this.props.item)}}>duplicate</li>
			<li onClick={() =>{this.props.onListClick("delete", this.props.item)}}>delete</li>
		</ul>
}
}

export default class AddGroup extends React.Component{
	constructor(props){
		super(props);
	}
	addGroup(item){
		let clas;
		if(this.props.active == item.id && this.props.active !== undefined) {
			clas = "active group"
		} else clas = "group"
		return <div key={item.id + 1} className={clas} onClick={() => this.props.onGroupClick(item)}>
			<div className="groupbutton"><img src={group} alt="" />
			<p>{item.name}</p></div>
			<DropDownMenu show={this.props.show} onListClick={this.props.onListClick} item={item}/>
		</div>
	}
	render(){
		let listOfGroups = this.props.groups.map(this.addGroup.bind(this))
		return <div className="add-group">
			{listOfGroups}
			<div className="addnwegroup" onClick={() => this.props.onListClick("new")}>
				<img src={adduser} alt="" />
				<p>Add New</p>
			</div>
	</div>
	}
}