import React from 'react';
import axios from 'axios';

export default class Modal extends React.Component {
	constructor(props){
		super(props);
	}
	deletewearer(){
		this.props.deleteListItem();
		this.props.onchangestate();
	}
	handleClick(e){
		if(e.target.className == "backdrop") {
			this.props.onchangestate();
    	}
	}
  render() {
    return (
      <div className="backdrop" onClick={this.handleClick.bind(this)}>
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
