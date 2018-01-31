import React from 'react';
//import logoImg from '../../assets/images/logoW.png';
import classNames from 'classnames';
import logo from '../../../assets/images/logo.png'
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Redirect,
  Link
} from 'react-router-dom';
import axios from 'axios';

class Header extends React.Component{ 
    constructor(props){
        super(props);
        this.state = {
            isLogout: false,
            isDropDown : false
        }
        this.logout = this.logout.bind(this);
        this.changeDropdown = this.changeDropdown.bind(this);
    }

    changeDropdown(){
    // master.client = null ;
    // master.accesstoken = null;
    // master.uid = null;
    this.setState({
        isDropDown: !this.state.isDropDown
    })
    }

    logout(){
        const master = {
            accesstoken: sessionStorage.getItem("accesstoken"),
            client: sessionStorage.getItem("client"),
            uid: sessionStorage.getItem("uid")}
        axios({
            method: 'delete',
            url: `https://wristo-platform-backend-stg.herokuapp.com/api/v1/auth/sign_out`,
            headers: {'X-Requested-With': 'XMLHttpRequest', 'accept': 'application/json', 'content-type': 'application/json', 
            'uid': master.uid, 'client': master.client, 'access-token': master.accesstoken},
      
          }).then(() => {
            sessionStorage.removeItem('accesstoken');
            sessionStorage.removeItem('client');
            sessionStorage.removeItem('uid');
            this.setState({
                isLogout: true 
            })
                   }
                   
      ).catch((error) => { 
              console.log(error);
            //  this.setState({error: true})
              })
    }   

    

    render(){
        return (
          <div>
          {this.state.isLogout ? <Redirect to={{
            pathname: '/'
          }}/> : 
          <div className="settings_header">
          <Link to="/masterpage" id="backgroundRedirect" exact>
          <div className="settings_header__logo">
              <img src={logo} alt=""/> 
              <span> wristo </span>
          </div>
          </Link>
            <input type="checkbox" id="nav" className="hidden"/>
            <label htmlFor="nav" className="nav-open"><i></i><i></i><i></i></label>
          <div className="settings_header__menu">
              <NavLink to="/masterpage" className="settings_header__menu__item" exact>
                  <svg className="settings_header__menu__item__icon" fill="#FFFFFF" height="29.5" viewBox="0 0 24 24" width="29.5" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 18h5v-6h-5v6zm-6 0h5V5H4v13zm12 0h5v-6h-5v6zM10 5v6h11V5H10z"/>
                  <path d="M0 0h24v24H0z" fill="none"/>
                  </svg>
                  <p className="settings_header__menu__item__link" href="#"> OVERVIEW </p>
              </NavLink>
              <NavLink to="/reminders" className="settings_header__menu__item">
                  <svg className="settings_header__menu__item__icon" fill="#FFFFFF" height="29.5" viewBox="0 0 24 24" width="29.5" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 0h24v24H0z" fill="none"/>
                  <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                  </svg>
                  <p className="settings_header__menu__item__link" href="#"> REMINDERS </p>
              </NavLink>
              <NavLink to="/settings" className="settings_header__menu__item">
                  <svg className="settings_header__menu__item__icon" fill="#FFFFFF" height="29.5" viewBox="0 0 24 24" width="29.5" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 0h24v24H0z" fill="none"/>
                  <path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"/>
                  </svg>
                  <p  className="settings_header__menu__item__link"> SETTINGS </p>
              </NavLink>
          </div>
          <div className="settings_header__profile ">
              <div className="settings_header__profile__logo">
              {this.state.isDropDown ? <div><img src='https://mir-s3-cdn-cf.behance.net/user/276/7872685.540ebc2d6eb7f.jpg' alt="" onClick={this.changeDropdown}/>
              <div id="myDropdown" className="dropdown-content">
              <a onClick={() => {this.logout(); this.props.redirectToLogin()}}>Log Out</a>
            </div></div>  : <img src="https://mir-s3-cdn-cf.behance.net/user/276/7872685.540ebc2d6eb7f.jpg" alt="" onClick={this.changeDropdown}/>}
              
              </div>
          </div>
          </div> 
        }
        </div> 
        );  
      
      }

    }


 
 
 /*
 <NavLink to="/notifications" className="settings_header__menu__item">
                  <svg className="settings_header__menu__item__icon" fill="#FFFFFF" height="24" viewBox="0 0 24 24" width="29.5" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
                  </svg>
                  <p  className="settings_header__menu__item__link"> NOTIFICATIONS </p>
              </NavLink>*/

// {logoImg}

// class Header extends React.Component{ 
//     render(){
//         return (
//         <div className="settings_header">
//             <div className="settings_header__logo">
//                 <img src={logo} alt=""/> 
//                 <span> wristo </span>
//             </div>
//              <input type="checkbox" id="nav" class="hidden"/>
//             <label for="nav" class="nav-open"><i></i><i></i><i></i></label>
//             <div className="settings_header__menu">
//                 <NavLink to="/" className="settings_header__menu__item" exact>
//                     <svg className="settings_header__menu__item__icon" fill="#FFFFFF" height="29.5" viewBox="0 0 24 24" width="29.5" xmlns="http://www.w3.org/2000/svg">
//                     <path d="M10 18h5v-6h-5v6zm-6 0h5V5H4v13zm12 0h5v-6h-5v6zM10 5v6h11V5H10z"/>
//                     <path d="M0 0h24v24H0z" fill="none"/>
//                     </svg>
//                     <p className="settings_header__menu__item__link" href="#"> OVERVIEW </p>
//                 </NavLink>
//                 <NavLink to="/reminders" className="settings_header__menu__item">
//                     <svg className="settings_header__menu__item__icon" fill="#FFFFFF" height="29.5" viewBox="0 0 24 24" width="29.5" xmlns="http://www.w3.org/2000/svg">
//                     <path d="M0 0h24v24H0z" fill="none"/>
//                     <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
//                     </svg>
//                     <p className="settings_header__menu__item__link" href="#"> REMINDERS </p>
//                 </NavLink>
//                 <NavLink to="/settings" className="settings_header__menu__item">
//                     <svg className="settings_header__menu__item__icon" fill="#FFFFFF" height="29.5" viewBox="0 0 24 24" width="29.5" xmlns="http://www.w3.org/2000/svg">
//                     <path d="M0 0h24v24H0z" fill="none"/>
//                     <path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"/>
//                     </svg>
//                     <p  className="settings_header__menu__item__link"> SETTINGS </p>
//                 </NavLink>
//             </div>
//             <div className="settings_header__profile">
//                 <div className="settings_header__profile__logo">
//                 <img src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRW4ytGaB2CQdvs-uQ5wZ3hX2Kjq3ZPRoHO47sFmyk3Qv6j_iDG" alt="" />
//                 </div>
//             </div>
//         </div>
//         );
//     }
// }




export default Header;