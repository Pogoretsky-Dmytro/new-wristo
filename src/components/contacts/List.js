import React from 'react';
import ReactDOM from 'react-dom';
import {wearers, carers} from './contacts'
import addimg from '../../assets/icons/add.svg'
import actions from './actionsContacts'
import email from '../../assets/icons/email.svg';
import deleteelem from '../../assets/icons/delete.svg'
import {ImageRound} from '../otherComponents/images';
import axios from 'axios';
import {master} from "../../login/loginForm.js"
import logo from '../../settings/default_avatar.png'

class List extends React.Component {
 constructor(props, context) {
    super(props, context);
    this.state = {
      items: this.props.toshow,
      deletedId: "",
      isModalOpen: false
    };
    this.addElement = this.addElement.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.createTasks = this.createTasks.bind(this);
  }

  addElement(e){
   let newArray = actions.addItem(this.state.items, this._inputElement.value);
   this._inputElement.value = "";
   this.setState({items: newArray})
   e.preventDefault();
  }

  deleteUser(key){
    let filteredArray = actions.deleteItem(key, this.state.items);
    this.setState({items: filteredArray});
  }

  createTasks(item) {
    return (
      <li key={item.id}><div><ImageRound url={item.image !== undefined ? item.image.url : logo}/><p>{item.full_name}</p></div> <div> 
    <img alt="" src={email}/><img style={{display: this.props.carer ? "none" : ""}} alt="" src={deleteelem} onClick={(e) => this.props.onchangestate(item) } /></div> </li>); // this.setState({deletedId: item.id})

  }
  tooglemodal(){
    this.setState(state => ({isModalOpen: !state.isModalOpen}))
  }

  render() {
    var todoEntries = this.props.toshow;
    var listItems = todoEntries.map(this.createTasks);
    return (
      <div className="contacts">
       {this.state.isModalOpen && ReactDOM.createPortal(<AddWearer reload={this.props.reloadwearers} id={this.props.id} group={this.props.group} onClose={this.tooglemodal.bind(this)} misswearers={this.props.toshow}/>, document.getElementById("portal"))}
        <ul className="theList">
          {listItems}
        </ul>
        <div style={{display: !this.props.carer ? "flex" : "none"}} className="button" onClick={this.tooglemodal.bind(this)}><img src={addimg} /><p>Add Wearer to Group</p></div>
      </div>
    );
  }
};
 
export default List;

class AddWearer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      check: true,
      filteredwearers: [],
      activeli: [],
      rerender: false
    }
    this.filterwearers = this.filterwearers.bind(this);
    this.addclass = this.addclass.bind(this);
  }
  createlist(item){
    return <li style={{backgroundColor: this.state.activeli.includes(item.id) ? "#F5F5F5" : "white"}} key={item.id} 
      onClick={() => this.addclass(item.id)}><img src={item.image.url || logo} alt=""/><p>{item.full_name}</p></li>
  }
  addclass(i){
    let arr = this.state.activeli;
    if(!this.state.activeli.includes(i)){
      arr.push(i);
      this.setState({activeli: arr, rerender: true});
    } 
  }
  addwearertogroup(){
    console.log(this.state.activeli)
    for(let i = 0; i < this.state.activeli.length; i++){
      console.log(i, this.state.activeli.length)
      axios({
      method: 'post',
      url: `https://wristo-platform-backend-stg.herokuapp.com/api/v1/groups/${this.props.id}/wearers`,
      headers: {'X-Requested-With': 'XMLHttpRequest', 'accept': 'application/json', 'content-type': 'application/json', 
      'uid': sessionStorage.getItem("uid"), 'client': sessionStorage.getItem("client"), 'access-token': sessionStorage.getItem("accesstoken")},
      responseType: 'json',
      data: {
        "wearer_id": this.state.activeli[i],
        "group_id": this.props.id
      }
      }).then(response => {
        if((i + 1) == this.state.activeli.length){
          this.props.reload(this.props.id);
          this.props.onClose();
        }
      }).catch((error) => { 
        console.log(error);
      });
    }
  }
  filterwearers(data){
    let newarray = []
    let length = this.props.misswearers.length;
    newarray = data.filter(val => {
      for(let i = 0; i < length; i++){
        if(val.id == this.props.misswearers[i].id) {this.state.check = false;} 
      }
      if(this.state.check == true) return val;
      else{this.state.check = true}
    })
    this.setState({filteredwearers: newarray.map(this.createlist.bind(this)), rerender: false})
  }

  componentWillMount(){
    axios({
      method: 'get',
      url: 'https://wristo-platform-backend-stg.herokuapp.com/api/v1/wearers',
      headers: {'X-Requested-With': 'XMLHttpRequest', 'accept': 'application/json', 'content-type': 'application/json', 
      'uid': sessionStorage.getItem("uid"), 'client': sessionStorage.getItem("client"), 'access-token': sessionStorage.getItem("accesstoken")},
      responseType: 'json'
    }).then(response => {
      this.setState({wearers: response.data});
      this.filterwearers(response.data);
    }).catch((error) => { 
      console.log(error);
    });
  }
  handleClick(e){
    if(e.target.className == "backdrop") {
      this.props.onClose();
    }
  }
  render() {
    if(this.state.wearers && this.state.rerender == true){
        this.filterwearers(this.state.wearers)
    }
    return (
      <div className="backdrop" onClick={this.handleClick.bind(this)}>
        <div className="modal-addgroup">
        <p>Adding wearer to group</p>
          {this.props.children}
          <div className="message">Please select wearer(s) you want to add to group {this.props.group}.</div>
          <div className="list"><ul>{this.state.filteredwearers}</ul></div>
          <div className="footer">
            <button onClick={this.props.onClose}>
              cancel
            </button>
            <button onClick={() => this.addwearertogroup()}>
              accept
            </button>
          </div>
        </div>
      </div>
    );
  }
}