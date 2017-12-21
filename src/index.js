import css from './app.scss';
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';
import { HashRouter } from 'react-router-dom'
import ReactDOM from 'react-dom';
import Header from './settings/wearer-settings/header/header'
import SignUp from './signup/signUp';
import LogIn from './login/login';
import Reminder from '../src/reminder/reminder';
import MasterPage from './components/masterPage/masterpage';
import SettingsPage from './settings/wearer-settings/wearers-configuration-page/wearerSettingsPage.js'

ReactDOM.render(
  <HashRouter >
    <div>
      <Route path="/signup" component={SignUp}/>
      <Route path="/masterpage" component={MasterPage}/>
      <Route path="/settings" component={SettingsPage}/>
      <Route path="/reminders" component={Reminder}/>
      <Route exact path="/" component={LogIn} />
    </div>
  </HashRouter >,
  document.getElementById('root')
); 

// <Route exact path="/" component={MasterPage}/>