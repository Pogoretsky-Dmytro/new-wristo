import React from 'react';
import expless from '../../assets/icons/expless.svg';
import close from '../../assets/icons/close.svg'
import loop from '../../assets/icons/loop.svg'
const imgStyle = {
	cursor: "pointer"
}

export class HeaderTwoBtn extends React.Component {
 constructor(props) {
    super(props);
    this.state = {
    	imgstyle: {cursor: "pointer"}
    }
    this.setstyle = this.setstyle.bind(this);
} 
setstyle(){
	if(this.state.imgstyle.transform == undefined){
		this.setState({imgstyle: {cursor: "pointer", transform: "rotate(180deg)"}})
	} else {
		this.setState({imgstyle: {cursor: "pointer"}});
	}
}
render(){
	return <div className="header">
		<p>{this.props.header}</p>
		<div className="btn">
		<img style={this.state.imgstyle} src={expless} alt="" onClick={() => {this.props.onChange(); this.setstyle()}}/>
	</div></div>
}
}
export class HeaderThreeBtn extends React.Component {
 constructor(props) {
    super(props);
    this.state = {
    	imgstyle: {cursor: "pointer"}
    }
    this.setstyle = this.setstyle.bind(this);
} 
setstyle(){
	if(this.state.imgstyle.transform == undefined){
		this.setState({imgstyle: {cursor: "pointer", transform: "rotate(180deg)"}})
	} else {
		this.setState({imgstyle: {cursor: "pointer"}});
	}
}
render(){
	return <div className="header">
			<p>{this.props.header}</p>
			<div className="btn">
			<img style={this.state.imgstyle} src={expless} alt="" onClick={() => {this.props.onChange(); this.setstyle()}}/>
		</div>
	</div>
}
}

//<img style={imgStyle} src={loop} alt="" onClick={() => this.props.onReload()}/>
//<img style={imgStyle} src={close} alt="" />