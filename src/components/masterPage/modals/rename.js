import React from 'react';
import axios from 'axios';

export default class RenameGroup extends React.Component {
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
	        'uid': sessionStorage.getItem("uid"), 'client': sessionStorage.getItem("client"), 'access-token': sessionStorage.getItem("accesstoken")},
		    responseType: 'json',
		    data: {"name": this.state.newname}
	 	}).then(res => {
	 		//this.props.onchange(this.state.newname)
	 		this.props.reloadgroup();
	 		this.props.onchangestate("rename");	
        }).catch(function (error) {
            console.log(error);
        })
	}
	handleClick(e){
		if(e.target.className == "backdrop") {
			this.props.onchangestate("rename");
    	}
	}
  render() {
    return (
      <div className="backdrop" onClick={this.handleClick.bind(this)}>
        <div className="modal-rename">
        <p>Rename Group</p>
          {this.props.children}
          <div className="message">Please enter new name of group {this.props.torename}.</div>
          <form onSubmit={this.changename.bind(this)}>
          	<input type="text" maxLength="30" ref={(input) => { this.textInput = input; }} onChange={this.setName}/>
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