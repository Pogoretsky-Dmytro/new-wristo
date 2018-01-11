import React from 'react';
import axios from 'axios';

export default class Duplicate extends React.Component {
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
		    url: 'https://wristo-platform-backend-stg.herokuapp.com/api/v1/groups/'+this.state.newGroup+'/wearers ',
		    headers: {'X-Requested-With': 'XMLHttpRequest', 'accept': 'application/json', 'content-type': 'application/json', 
	        'uid': sessionStorage.getItem("uid"), 'client': sessionStorage.getItem("client"), 'access-token': sessionStorage.getItem("accesstoken")},
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
	        'uid': sessionStorage.getItem("uid"), 'client': sessionStorage.getItem("client"), 'access-token': sessionStorage.getItem("accesstoken")},
		    responseType: 'json',
		    data: {"name": this.props.todelete}
		}).then(response => {
	 		this.props.reloadgroup();
	 		this.props.onchangestate("duplicate");
	 		this.state.newGroup = response.data.id;
        }).then(response => {
        	axios({
		    method: 'get',
		    url: 'https://wristo-platform-backend-stg.herokuapp.com/api/v1/groups/' + this.props.id + '/wearers',
		    headers: {'X-Requested-With': 'XMLHttpRequest', 'accept': 'application/json', 'content-type': 'application/json', 
	      	'uid': sessionStorage.getItem("uid"), 'client': sessionStorage.getItem("client"), 'access-token': sessionStorage.getItem("accesstoken")},
		    responseType: 'json'
		   	}).then(response => {
		   		this.makecopy(response.data)
		    }).catch((error) => { 
		        console.log(error);
		    });
        }).catch(function (error) {
            console.log(error);
        })
	}
	handleClick(e){
		if(e.target.className == "backdrop") {
			this.props.onchangestate("duplicate");
    	}
	}
  render() {
    return (
      <div className="backdrop" onClick={this.handleClick.bind(this)}>
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