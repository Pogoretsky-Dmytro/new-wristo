import React from 'react';
import axios from 'axios';


export default class Delete extends React.Component {
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
	        'uid': sessionStorage.getItem("uid"), 'client': sessionStorage.getItem("client"), 'access-token': sessionStorage.getItem("accesstoken")},
		    responseType: 'json'
		}).then(res => {
			console.log("success  !!")
	 		this.props.reloadgroup();
	 		this.props.onchangestate("delete");	
        }).catch(function (error) {
            console.log(error);
        })
	}
	handleClick(e){
		if(e.target.className == "backdrop") {
			this.props.onchangestate("delete");
    	}
	}
  render() {
    return (
      <div className="backdrop" onClick={this.handleClick.bind(this)}>
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