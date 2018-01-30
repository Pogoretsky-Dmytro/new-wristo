import React, { Component } from 'react';

class Weeks extends React.Component{
	constructor(props){
		super(props);
		this.state = {}
	}
	render(){
		console.log(this.props.weekarray)
		let clas;
		if(this.props.wearershow == "All wearers" || this.props.wearershow == 0){
			clas = "allwearers";
		} else {
			clas = "one-wearer";
		}
		return (
			<div className="change-week">
				<div style={{display: this.props.wearershow == "All wearers" || this.props.wearershow == 0 ? "flex" : "none"}}> <p>Wearers list</p></div>
				<div className={clas} > <p>Monday {this.props.weekarray[0].month+1}/{this.props.weekarray[0].day}</p></div>
				<div className={clas} > <p>Tuesday {this.props.weekarray[1].month+1}/{this.props.weekarray[1].day}</p></div>
				<div className={clas} > <p>Wednesday {this.props.weekarray[2].month+1}/{this.props.weekarray[2].day}</p></div>
				<div className={clas} > <p>Thurstday {this.props.weekarray[3].month+1}/{this.props.weekarray[3].day}</p></div>
				<div className={clas} > <p>Friday {this.props.weekarray[4].month+1}/{this.props.weekarray[4].day}</p></div>
				<div className={clas} > <p>Saturday {this.props.weekarray[5].month+1}/{this.props.weekarray[5].day}</p></div>
				<div className={clas} > <p>Sunday {this.props.weekarray[6].month+1}/{this.props.weekarray[6].day}</p></div>
			</div>
		)
	}
}

export default Weeks;