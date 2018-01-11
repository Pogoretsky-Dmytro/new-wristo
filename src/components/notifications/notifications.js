import React from 'react';
import './notifications.scss'
import {HeaderNoBtn} from '../otherComponents/header';



function AddEvent(props){
	return <div className="addEvent">
				<img src={props.link} alt="" />
				<div>
					<h3>{props.name}<span>&bull;</span><span>{props.time}</span></h3>
					<p>{props.event}</p>
				</div>
			</div>
}

class Notifications extends React.Component{

render(){
	return (
		<div className="notifications">
			<HeaderNoBtn header="Notifications"/>
			<div className="events">
				<AddEvent event="Emergency button activated." time="2 mins ago" name="ostap" link="https://wristoapp.s3.amazonaws.com/staging/uploads/wearer/image/150/image.png"/>
				<AddEvent event="Emergency button activated." time="9:15 AM" name="DartvEIDER" link="https://wristoapp.s3.amazonaws.com/staging/uploads/wearer/image/151/image.png"/>
				<AddEvent event="Fall sensor activated." time=" 8:25 AM" name="nastya" link="https://wristoapp.s3.amazonaws.com/staging/uploads/wearer/image/75/image.png"/>
				<AddEvent event="Fall sensor activated." time=" 10:30 PM" name="vika" link="https://wristoapp.s3.amazonaws.com/staging/uploads/wearer/image/80/image.jpeg"/>
			</div>
			<div className="showAll">
					<p>see all</p>
			</div>
		</div>
	)
}
}
export default Notifications;