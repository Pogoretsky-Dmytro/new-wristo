import React, { Component } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';



export default class Delete extends React.Component {
	constructor(props){
		super(props);
	}
	delete(e){
		e.preventDefault();
		axios({
	      method: 'delete',
	      url: 'https://wristo-platform-backend-stg.herokuapp.com/api/v1/groups/'+this.props.gid+'/wearers/'+this.props.wid+'/reminders/'+this.props.item.id,
	      headers: {'X-Requested-With': 'XMLHttpRequest', 'accept': 'application/json', 'content-type': 'application/json', 
     	 'uid': sessionStorage.getItem("uid"), 'client': sessionStorage.getItem("client"), 'access-token': sessionStorage.getItem("accesstoken")},
	      responseType: 'json'
	   	}).then(response => {
	   		this.props.onClose(true);
	    }).catch((error) => { 
	        console.log(error);
	    });
	}
  render() {
    return (
      <div className="backdrop">
        <div className="modal-rename">
        <p>Delete reminder</p>
          {this.props.children}
          <div className="message">Do you realy want to delete reminder {this.props.item.title}.</div>
          <div className="footer">
            <button onClick={() => this.props.onClose(false)}>
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

