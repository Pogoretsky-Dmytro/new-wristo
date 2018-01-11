import React, { Component } from 'react';
import delet from '../../assets/icons/delete.svg';
import calendarimg from '../../assets/icons/today.svg';
import addbtn from '../../assets/icons/add.svg';
import Calendar from 'react-datetime';
import axios from 'axios';


var month = new Array();
month[0] = "JAN";
month[1] = "FEB";
month[2] = "MAR";
month[3] = "APR";
month[4] = "MAY";
month[5] = "JUN";
month[6] = "JUL";
month[7] = "AUG";
month[8] = "SEP";
month[9] = "OCT";
month[10] = "NOV";
month[11] = "DEC";

export default class AddReminder extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    	reminder: "",
    	openstart: "calendarnone",
    	openend: "calendarnone",
    	alerts: []
    }
    this.onchangeday = this.onchangeday.bind(this);
    this.changeclassstart = this.changeclassstart.bind(this);
    this.changeclasend = this.changeclasend.bind(this);
    this.alerttime = this.alerttime.bind(this);
    this.changetype = this.changetype.bind(this);
  }
  setReminder(){
  	this.setState({reminder: this.refs.reminder.value})
  }
  changeclassstart(){
  	if(this.state.openstart == "calendarnone"){
  		this.setState({openstart: ""})
  	}else {
  		this.setState({openstart: "calendarnone"})
  	}
  }
  changeclasend(){
  	if(this.state.openend == "calendarnone"){
  		this.setState({openend: ""})
  	}else {
  		this.setState({openend: "calendarnone"})
  	}
  }
  onchangeday(day, type){
  	if(type === "start"){
  		this.setState({openstart: "calendarnone",daystart: day.getDate(), monthstart: day.getMonth(), yearstart: day.getFullYear()});
  	}else{
  		this.setState({openend: "calendarnone", dayend: day.getDate(), monthend: day.getMonth(), yearend: day.getFullYear()});
  	}
  }
  alerttime(){
  	let arr = this.state.alerts;
  	arr.push(this.refs.addtime.value);
  	this.setState({alerts: arr});

  }
  createalert(item){
  	return <p>{item}</p>
  }
  changetype(type){
  	this.setState({type: type});
  }
  addreminder(){
    console.log("sent request")
  	let date;
  	for(let i = 0; i < this.state.alerts.length; i++){
		date = `${this.state.yearstart}` + "-" + `${this.state.monthstart+1}` + "-" + `${this.state.daystart}`+"T"+this.state.alerts[i];
  		axios({
	      method: 'post',
	      url: 'https://wristo-platform-backend-stg.herokuapp.com/api/v1/groups/'+this.props.gid+'/wearers/'+this.props.wid+'/reminders',
	      headers: {'X-Requested-With': 'XMLHttpRequest', 'accept': 'application/json', 'content-type': 'application/json', 
     	 'uid': sessionStorage.getItem("uid"), 'client': sessionStorage.getItem("client"), 'access-token': sessionStorage.getItem("accesstoken")},
	      responseType: 'json',
	      data: {
			  "reminder": {
			    "title": this.state.reminder,
			    "category": this.state.type,
			    "start_date": date,
			    "end_date": date
			  }
			}
	   	}).then(resp => {
	   		if((i + 1) == this.state.alerts.length){
  				this.props.onClose(true, true, true);
  		}
	   	}).catch((error) => { 
	        console.log("error", error);
	    });
  	}
  }
  clearfields(){
  	this.refs.reminder.value = "";
  	this.setState({daystart: "", monthstart: "", yearstart: "", dayend: "", monthend: "", yearend: "", alerts: [], type: ""})
  }
   componentWillMount(){
    if(this.props.time){
      this.setState({daystart: this.props.time.day, monthstart: this.props.time.month, yearstart: 2018,
      dayend: this.props.time.day, monthend: this.props.time.month, yearend: 2018});
    }
  }
  render() {
  	let alert = this.state.alerts.map(this.createalert.bind(this));
    return (
      <div className="backdrop">
        <div className="modal-edit" onClick={() => this.props.onClose(false, true, false)}>
        <p>Add reminder to {this.props.name}</p>
          {this.props.children}
        <div className="edit-reminder">  
        	<p>Reminder</p>
        	<input ref="reminder" onChange={this.setReminder.bind(this)}/>
        </div>
        <div className="setdate">
        	<div className="start">
        		<p>{month[this.state.monthstart]} {this.state.daystart} {this.state.yearstart}</p>
        		<img onClick={this.changeclassstart} src={calendarimg}/>
        		
        	</div>
        		<Calendar className={'calstart ' + this.state.openstart} type="start" onchangeday={this.onchangeday}/>
        	<div className="end">
        		<p>{month[this.state.monthend]} {this.state.dayend} {this.state.yearend}</p>
        		<img onClick={this.changeclasend} src={calendarimg}/>
        	</div>
        		<Calendar className={'calend ' + this.state.openend} type="end" onchangeday={this.onchangeday}/>
        </div>
        <div className="addtime">
       		{alert}
        	<div>
        		<input ref="addtime" id="time" type="time"/>
        		<img src={addbtn} onClick={this.alerttime}/>
        	</div>
        </div>
        <div className="reminder-type">
        	<p>Type of reminder</p>
        	<div className="combobox">
				<button className="dropbtn">{this.state.type}</button>
				<ul className="dropdown-content">
					<li key="1" onClick={() => this.changetype("medical")}>Medical</li>
					<li key="2" onClick={() => this.changetype("social")}>Social</li>
				</ul>
			</div>
        </div>
	    <div className="footer">
		    <div className="clearfields">
	            <img src={delet} onClick={this.clearfields.bind(this)} />
	        </div>
            <div>
	            <button onClick={() => this.props.onClose(false, true, true)}>
	              cancel
	            </button>
	            <button onClick={this.addreminder.bind(this)}>
	              save
	            </button>
            </div>
        </div>
        </div>
      </div>
    );
  }
}