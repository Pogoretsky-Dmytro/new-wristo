import React from 'react';
import expless from '../../assets/icons/expless.svg';
import close from '../../assets/icons/close.svg'
import loop from '../../assets/icons/loop.svg'
const imgStyle = {
	cursor: "pointer"
}

export const HeaderTwoBtn = (props) =>{
	return <div className="header">
		<p>{props.header}</p>
		<div className="btn">
		<img style={imgStyle} src={expless} alt="" onClick={() => props.onChange()}/>
		<img style={imgStyle} src={close} alt="" />
	</div></div>
}
export const HeaderThreeBtn = (props) =>{
	return <div className="header">
		<p>{props.header}</p>
		<div className="btn">
		<img style={imgStyle} src={loop} alt="" />
		<img style={imgStyle} src={expless} alt="" />
		<img style={imgStyle} src={close} alt="" />
	</div></div>
}
export const HeaderNoBtn = (props) =>{
	return <div className="header">
			<p>{props.header}</p>
		<div className="btn">
			<img alt="" />
		</div>
	</div>
}