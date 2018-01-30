import React from 'react';
import axios from 'axios';
import classNames from 'classnames';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';

export const master = {
    client: sessionStorage.getItem("client"),
    accesstoken: sessionStorage.getItem("accesstoken"),
    uid: sessionStorage.getItem("uid")
}


class LogInForm extends React.Component {
  constructor(props) {
    super(props);
    this.saveInput = this.saveInput.bind(this);
    this.sendData = this.sendData.bind(this);
    this.state = {
      firstNameError: false,
      lastNameError: false,
      emailError: false,
      passError: false,
      isShowed: false,
      textValue:'Show',
      passwordType: 'password',
      isSendData: false,
      testError: false,
      loginError: false,
      accesstoken: null, 
      client: null,
      uid: null,
      isAuthenticated: false,
      redirectToMaster: false,
      password: "11111111",
      email: "myrko.ua2012@gmail.com",
      render: false,
      loading: true
    };
  }

  componentWillMount(){
    console.log("will mount")
    this.sendData();
    if(sessionStorage.getItem("client") !== null && sessionStorage.getItem("accesstoken") !== null && sessionStorage.getItem("uid") !== null ){
      this.setState({
        redirectToMaster: true
      })
    }
  }

  saveInput(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({loginError: false});
    if(name =='email') {
      this.setState({email: value});
    }else if(name =='password') {
      this.setState({password: value});
    };
 };
 isAuthenticated(){
   if(this.state.client !== null && this.state.accesstoken !== null  && this.state.uid !== null ){
     this.setState({isAuthenticated: true})
   }else {
    this.setState({isAuthenticated: false})
   }
 }
  
  sendData(event){
    this.setState({
    isSendData: true
    
    });
    var errorStatus = false;
    //event.preventDefault();
    console.log(this.state.email, this.state.password)
    axios({
            method: 'post',
            url: 'https://wristo-platform-backend-stg.herokuapp.com/api/v1/auth/sign_in',
            data: {
                email: this.state.email,
                password: this.state.password,
            }

}).then(response => {
  if(response.status === 200){
    sessionStorage.setItem('client', response.headers.client);
    sessionStorage.setItem('accesstoken', response.headers['access-token']);
    sessionStorage.setItem('uid', response.headers.uid);
    this.setState({
      isAuthenticated: true,
      accesstoken: response.headers['access-token'],
      uid: response.headers.uid,
      client: response.headers.client,
      redirectToMaster: true
    })
  }else {
    this.setState({
      isAuthenticated: false
    })
  }
  })
  .catch((error) => { 
    this.setState({
      loginError: true,
      isAuthenticated: false
    });
    console.log(error);

  });
};

  render() {
    if(!this.state.redirectToMaster){
      return <div class="loader"></div>
    } else {
       return (<div> 
      {this.state.isAuthenticated || this.state.redirectToMaster ?  <Redirect master={master} to={{pathname: '/masterpage'}}/> : <p></p>}
      </div>
    );
    }
  }
}


export default LogInForm;