import React from 'react';
import axios from 'axios';
import classNames from 'classnames';
import Header from '../header/header.js';
import SettingsNavbar from './wearer-navbar/navbar.js';
import WearerConfiguration from './wearer-configuration-page/wearerConfiguration.js';
import WristoConfiguration from './wristo-group-configuration/wristoGroupConfiguration.js';
import WearerError from './wearer-error.js';
import WearersLoading from './wearer-loading.js';
import WearerProfile from './wearer-profile/wearerProfile.js';
import EditWearerProfile from './wearer-profile/edit-wearer-profile/Wearer-profile.js';
import Carers from './carers-data/carers.js';
import AddWearer from './wearer-profile/addWearer.js';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';
import {Test} from '../../../actions/test'
import EmptyCarer from './carers-data/emptyCarer.js';
import EmptyWristo from './wristo-group-configuration/emptyWristo.js';
import LogIn from '../../../login/login';

const toDataURL = url => fetch(url)
  .then(response => response.blob())
  .then(blob => new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(blob)
  }))



class SettingsPage extends React.Component{ 

  constructor(props) {
    super(props);
    this.handleWearerData = this.handleWearerData.bind(this);
    this.getWearers = this.getWearers.bind(this);
    this.addWearer = this.addWearer.bind(this);
    this.getWearerDevice = this.getWearerDevice.bind(this);
    this.getCarers = this.getCarers.bind(this);
    this.enableWearerEdit = this.enableWearerEdit.bind(this);
    this.resetWearerEdit = this.resetWearerEdit.bind(this);
    this.updateWearer = this.updateWearer.bind(this);
    this.handleAddWearerButton = this.handleAddWearerButton.bind(this);
    this.deleteCarer = this.deleteCarer.bind(this);
    this.addCarer = this.addCarer.bind(this);
    this.discardWearerChanges = this.discardWearerChanges.bind(this);
    this.getGroups = this.getGroups.bind(this);
    this.deleteMember = this.deleteMember.bind(this);
    this.updateCarer = this.updateCarer.bind(this);
    this.updateWearerDevices = this.updateWearerDevices.bind(this);
    this.addWearerDevices = this.addWearerDevices.bind(this);
    this.deleteWearerDevices = this.deleteWearerDevices.bind(this);
    this.redirectToLogin = this.redirectToLogin.bind(this);

    this.state = {
      // wearerId: null,
      activeWearerId: null,
      createdWearer: null,
      wearerData: [{'id': null, 'full_name': null, 'gender': null, 'age': null, 'heart_rate': null, 'weight':null, 'image': {'url': null}}],
      wearerGroupData: [],
      firstIdWearer: null,
      error: false, 
      wearerDevice: [],
      carers: [],
      addNewWearerClicked: false,
      wearersLoaded: false,
      emptyWearersLoaded: false,
      carersLoaded: false, 
      wearerDeviceLoaded: false,
      wearersEditing: false,
      carersEditing: false,
      wearerDeviceEditing: false,
      wearerAdded: false,
      newWearer: {'id': null, 'full_name': null, 'gender': null, 'age': null, 'heart_rate': null, 'weight': null, 'image': {'url': null}},
      redirectToLogin: null,
      accesstoken: null,
      uid: null,
      client: null
      // wearersUpdated: false
    }
  };




componentWillMount() {
  const master = {
    accesstoken: sessionStorage.getItem("accesstoken"),
    client: sessionStorage.getItem("client"),
    uid: sessionStorage.getItem("uid")
  }
  if( master.accesstoken !== null && master.uid !== null && master.client !== null){
  this.setState({
    accesstoken: master.accesstoken,
    uid: master.uid,
    client: master.client
  })  
  } 

} 

componentDidMount(){
  this.getWearers();
  this.getCarers();


}
    



handleAddWearerButton(){

  this.setState({
    addNewWearerClicked: true,
    wearerAdded: false
  })

}

getGroups(wearerId){

  axios({
      method: 'get',
      url: `https://wristo-platform-backend-stg.herokuapp.com/api/v1/wearers/${wearerId}/groups`,
      headers: {'X-Requested-With': 'XMLHttpRequest', 'accept': 'application/json', 'content-type': 'application/json', 

      'uid': this.state.uid, 'client': this.state.client, 'access-token': this.state.accesstoken},
      responseType: 'json'
    }).then(response => {

        this.setState({wearerGroupData: response.data});

      }).catch((error) => { 
        console.log('getGroups error ====> ', error);

        });

}



addWearer(event){
  if(event) {
  this.setState({wearerDevice: [] })}



  axios({
      method: 'post',
      url: 'https://wristo-platform-backend-stg.herokuapp.com/api/v1/wearers',
      headers: {'X-Requested-With': 'XMLHttpRequest', 'accept': 'application/json', 'content-type': 'application/json', 
      'uid': this.state.uid, 'client': this.state.client, 'access-token': this.state.accesstoken},

      data: {
        "wearer": {
          "full_name": event.full_name,
          "gender": event.gender,
          "age": event.age,
          "weight": event.weight,
          "heart_rate": event.heart_rate,
          "image": event.image

        }
      }
    }).then((response) => {

              
              
                let wearerArray = [];

                let wearer = {};
                
                if (this.state.wearerData[0].id != null){
                  this.state.wearerData.forEach(function(element){
                  wearerArray.push(Object.assign({}, element));
                });
                }
                
                

                if (response.status==201) {
                  
                  Object.assign(wearer, response.data);
                  wearer.image.url = event.image;


                  wearerArray.push(wearer);
                  this.setState({
                    wearerData: wearerArray,
                    activeWearerId: response.data.id,
                    wearerAdded: true,
                    wearerGroupData: [],
                    addNewWearerClicked: false,
                    wearersEditing: false
                  });
                  
                };


               


}).catch((error) => { 

        if (error.response.status === 404){
            this.setState({error: true})
        } 
        })
};

getWearers(event){

  axios({
      method: 'get',
      url: 'https://wristo-platform-backend-stg.herokuapp.com/api/v1/wearers',
      headers: {'X-Requested-With': 'XMLHttpRequest', 'accept': 'application/json', 'content-type': 'application/json', 
      'uid': this.state.uid, 'client': this.state.client, 'access-token': this.state.accesstoken},
      responseType: 'json'
    }).then(response => {
  //     let newRespData = response.data.map((item) => {
  //       return (
  //       toDataURL(item.image.url)
  //         .then(dataUrl => {
  //           item.image.url = dataUrl           
  // }))

  //     });
  //     console.log('RESPONSE DATA',newRespData)
            if (response.status === 200){
              this.setState({
                wearerDeviceLoaded: true,
                wearersLoaded: true,
                
                })
            };
            
            if(response.data.length !== 0) {
              
              this.setState({
                firstIdWearer: response.data[0].id, 
                // activeWearerId: toogledWearerId,
                wearerData: response.data
              })
            }; 

            if(response.status == 200){
              this.setState({
                redirectToLogin: false
              })
            }
            
            if(this.state.activeWearerId != null){
              this.getWearerDevice(this.state.activeWearerId);
              this.getGroups(this.state.activeWearerId);
            }
            else{
              this.getWearerDevice(this.state.firstIdWearer);
              this.getGroups(this.state.firstIdWearer);
            }

      },error => { 
        if(error.response.status === 401)
       this.setState({
         redirectToLogin: true
       })
 })
};

updateWearer(event){
  console.log('evwnt weaerer data', event)
  axios({
      method: 'put',
      url: `https://wristo-platform-backend-stg.herokuapp.com/api/v1/wearers/${event.id}`,
      headers: {'X-Requested-With': 'XMLHttpRequest', 'accept': 'application/json', 'content-type': 'application/json', 
      'uid': this.state.uid, 'client': this.state.client, 'access-token': this.state.accesstoken},

      data: {
        "wearer": {
          "full_name": event.full_name,
          "gender": event.gender,
          "age": event.age,
          "weight": event.weight,
          "heart_rate": event.heart_rate,
          "image": event.image

        }
      }
    }).then(resp => {
              // this.setState({addNewWearerClicked: false});

              // this.setState({activeWearerId: resp.data.id});


              let wearerArray = [];
              let wearer = {};
              Object.assign(wearer, event);
              wearer.image = {'url': event.image};

              if(resp.status===200){
                this.state.wearerData.forEach(function(element){
                if(element.id === event.id){
                 wearerArray.push(Object.assign({}, wearer));
                }
                else wearerArray.push(Object.assign({}, element));
                });

                // this.setState({createdWearer: event});
              }

              this.setState({
                wearerData: wearerArray,
                addNewWearerClicked: false,
                activeWearerId: resp.data.id,
                wearersEditing: false,
              })

             }, 
             err => console.log('updateWearer error ', err)
    )
  };

updateWearerDevices(event){
    
    let wearerID;
      if (event.id !== null){
        wearerID = event.id
      } 
      else {
        wearerID = this.state.firstIdWearer
      }

  axios({
      method: 'put',
      url: `https://wristo-platform-backend-stg.herokuapp.com/api/v1/wearers/${wearerID}/devices/${event.idDevice}`,
      headers: {'X-Requested-With': 'XMLHttpRequest', 'accept': 'application/json', 'content-type': 'application/json', 
      'uid': this.state.uid, 'client': this.state.client, 'access-token': this.state.accesstoken},

      data: {
        name: event.name,
        phone_number: event.phone_number,
        status: event.status
      }
    }).then(() => {

      //this.setState({addNewWearerClicked: false});
      this.getWearerDevice(wearerID)
              //this.setState({wearerId: event.id});
             }
             
).catch((error) => { 
        console.log(error);
      this.setState({error: true})
        })
  
};

deleteWearerDevices(event){
  let wearerID;
      if (event.id !== null){
        wearerID = event.id
      } 
      else {
        wearerID = this.state.firstIdWearer
      }

  axios({
      method: 'delete',
      url: `https://wristo-platform-backend-stg.herokuapp.com/api/v1/wearers/${wearerID}/devices/${event.idDevice}`,
      headers: {'X-Requested-With': 'XMLHttpRequest', 'accept': 'application/json', 'content-type': 'application/json', 
      'uid': this.state.uid, 'client': this.state.client, 'access-token': this.state.accesstoken},

    }).then(() => {

      //this.setState({addNewWearerClicked: false});
      this.getWearerDevice(wearerID)
              //this.setState({wearerId: event.id});
             }
             
).catch((error) => { 
        console.log(error);
      //  this.setState({error: true})
        })
  
};

addWearerDevices(event){

let wearerID;
      if (event.id !== null){
        wearerID = event.id
      } 
      else {
        wearerID = this.state.firstIdWearer
      }
  axios({
      method: 'post',
      url: `https://wristo-platform-backend-stg.herokuapp.com/api/v1/wearers/${wearerID}/devices`,
      headers: {'X-Requested-With': 'XMLHttpRequest', 'accept': 'application/json', 'content-type': 'application/json', 
      'uid': this.state.uid, 'client': this.state.client, 'access-token': this.state.accesstoken},
      data: {
          name: event.name,
          phone_number: event.phone_number,
          status: event.status
      }
    }).then((response) => {
            //  this.setState({addNewWearerClicked: false});
              this.getWearerDevice(wearerID);
             }
             
).catch((error) => { 
        console.log(error);
      //  this.setState({error: true})
      })
};



getWearerDevice(wearerId){
  
  axios({
      method: 'get',
      url: `https://wristo-platform-backend-stg.herokuapp.com/api/v1/wearers/${wearerId}/devices`,
      headers: {'X-Requested-With': 'XMLHttpRequest', 'accept': 'application/json', 'content-type': 'application/json', 
      'uid': this.state.uid, 'client': this.state.client, 'access-token': this.state.accesstoken},
      responseType: 'json'
    }).then(response => {


              this.setState({
                wearerDevice: response.data,
                // wearerDeviceLoaded: true
              })     


              if(response.status === 200 && response.data.length !== 0){
              this.setState({
                wearerDeviceLoaded: true })

             }
             
}, err => console.log(err)).catch((error) => { 
        console.log(error);
        if (error.response.status == 404){
            this.setState({error: true})
        } 
        })
};

  getCarers(){

  axios({
      method: 'get',
      url: 'https://wristo-platform-backend-stg.herokuapp.com/api/v1/carers',
      headers: {'X-Requested-With': 'XMLHttpRequest', 'accept': 'application/json', 'content-type': 'application/json', 
      'uid': this.state.uid, 'client': this.state.client, 'access-token': this.state.accesstoken},
      responseType: 'json'
    }).then(response => {

         // || response.data.length !== 0


          if(response.status === 200){
              this.setState({
                carers: response.data,
                carersLoaded: true
              })
             };

    }).catch((error) => { 
        console.log('error ====> ', error);
        if (error.response.status === 404){
            this.setState({error: true})
        } 
        });
    };

updateCarer(event){
    axios({
      method: 'put',
      url: `https://wristo-platform-backend-stg.herokuapp.com/api/v1/carers/${event.id}`,
      headers: {'X-Requested-With': 'XMLHttpRequest', 'accept': 'application/json', 'content-type': 'application/json', 
      'uid': this.state.uid, 'client': this.state.client, 'access-token': this.state.accesstoken},
      data: {
        "carer": {
          "first_name": event.first_name,
          "last_name": event.last_name,
          "email": event.email,
          "password": event.password,
          "password_confirmation": event.password

        }
      }
    }).then(response => {

      this.getCarers();
    }
              
     ).catch((error) => { 
        console.log('updateCarer error ====> ', error);
        // if (error.response.status === 404){
        //     this.setState({error: true})
        // }

        })
};

addCarer(event){

  axios({
      method: 'post',
      url: 'https://wristo-platform-backend-stg.herokuapp.com/api/v1/carers',
      headers: {'X-Requested-With': 'XMLHttpRequest', 'accept': 'application/json', 'content-type': 'application/json', 
      'uid': this.state.uid, 'client': this.state.client, 'access-token': this.state.accesstoken},
      data: {
        "carer": {
          "first_name": event.first_name,
          "last_name": event.last_name,
          "email": event.email,
          "age": event.age,
          "password": event.password,
          "password_confirmation": event.password

        }
      }
    }).then((response) => {

                this.getCarers();
              
             }
             
).catch((error) => { 

        if (error.response.status === 404){
            this.setState({error: true})
        } else this.getCarers();

        })
};


deleteCarer(event){

  axios({
      method: 'delete',
      url: `https://wristo-platform-backend-stg.herokuapp.com/api/v1/carers/${event}`,
      headers: {'X-Requested-With': 'XMLHttpRequest', 'accept': 'application/json', 'content-type': 'application/json', 
      'uid': this.state.uid, 'client': this.state.client, 'access-token': this.state.accesstoken},
      responseType: 'json'
    }).then(response => {

            this.getCarers();
      
            })
    // .catch((error) => { 
    //       console.log(error);
    //       if (error.response.status === 404){
    //         this.setState({error: true})
    //     } 
    //       });
      };

deleteMember(groups, wearerId){

    groups.forEach((group)=>{
       axios({
            method: 'delete',
            url: `https://wristo-platform-backend-stg.herokuapp.com/api/v1/groups/${group.id}/wearers/${wearerId}`,
            headers: {'X-Requested-With': 'XMLHttpRequest', 'accept': 'application/json', 'content-type': 'application/json', 
            'uid': this.state.uid, 'client': this.state.client, 'access-token': this.state.accesstoken},
            responseType: 'json'
          }).then(response => {

              if (response.status === 200){
                let groupArray = [];
                this.state.wearerGroupData.forEach(function(element){
                  if(element.id !== group.id){
                    groupArray.push(Object.assign({}, element));
                  }
                  
                })
              this.setState({wearerGroupData: groupArray});
              }
              //this.getGroups(wearerId);

            }).catch((error) => { 
              console.log('getGroups error ====> ', error);

              })

          });

   
}



  handleWearerData(event) {

    this.setState({addNewWearerClicked: false});
    this.setState({wearerId: event});
    this.setState({activeWearerId: event});
    this.setState({createdWearer: null});
   //this.getWearerDevice(event);
  };



  enableWearerEdit(){
    this.setState({wearersEditing: true});
    this.setState({addNewWearerClicked: false});
    // console.log('enableWearerEdit this.state.wearersEditing', this.state.wearersEditing);
  };

  discardWearerChanges(){
    this.setState({wearersEditing: false});
    this.setState({addNewWearerClicked: false});
  }

 resetWearerEdit(){
    this.setState({wearersEditing: false});
    console.log('enableWearerEdit this.state.wearersEditing', this.state.wearersEditing);
  };

  redirectToLogin() {          
    if( this.state.client == null && this.state.accesstoken == null && this.state.uid == null){
      this.setState({
        redirectToLogin: true
      })
    }
    };

    render(){
      let wearersDataForChildren;

      if(this.state.wearerData[0].id != null){
        const firstWearer = this.state.wearerData.find(i => i.id === this.state.firstIdWearer);
        const activeWearer = this.state.wearerData.find(i => i.id === this.state.activeWearerId);


     

          if(this.state.activeWearerId === null && this.state.firstIdWearer === null) {
            wearersDataForChildren = this.state.newWearer;
          } 
          else if (this.state.activeWearerId === null && this.state.firstIdWearer !== null) {
            wearersDataForChildren = firstWearer;
          }
          else if (this.state.createdWearer != null){
            wearersDataForChildren = this.state.createdWearer;
          }
          else wearersDataForChildren = activeWearer;
     
      }

      else {
        wearersDataForChildren = this.state.newWearer
      }

    return (

      <div>{this.state.redirectToLogin ?  <Redirect to={{
        pathname: '/'
      }}/> : this.state.redirectToLogin === false ? <div>
      <Header redirectToLogin = {this.redirectToLogin} />
      <div>
      <div className="contentWrap">
                  {
                    this.state.error ? <WearerError />
                    :
                    this.state.wearersLoaded ?
                    <SettingsNavbar addNewWearerClicked = {this.state.addNewWearerClicked} getGroups = {this.getGroups} wearersData = {this.state.wearerData} handleWearerData={this.handleWearerData} handleAddWearerButton={this.handleAddWearerButton} getWearers = {this.getWearers} getWearerDevice={this.getWearerDevice} activeWearerId = {this.state.activeWearerId} resetWearerEdit = {this.resetWearerEdit} wearerAdded = {this.state.wearerAdded}/>
                    :
                    <WearersLoading/> 
                  }

                

              <div className="wearerConfigWrap">
                    <p className="wearerConfigWrap__name">Configuration Page</p>
                    <p className="wearerConfigWrap__description">Manage information about wristo</p>
                    {
                    this.state.error ? <WearerError />
                    :

                    this.state.wearersLoaded ?
                    
                    this.state.addNewWearerClicked ?
                      <AddWearer data = {this.state.newWearer} discardWearerChanges = {this.discardWearerChanges} addWearer = {this.addWearer} />
                      :
                      this.state.wearersEditing ? 
                      <EditWearerProfile addWearer = {this.addWearer}  deleteMember = {this.deleteMember} wearerGroupData = {this.state.wearerGroupData} data = {wearersDataForChildren} discardWearerChanges = {this.discardWearerChanges} updateWearer = {this.updateWearer} getWearers = {this.getWearers}/> 
                      :

                      <WearerProfile wearerGroupData = {this.state.wearerGroupData} getGroups = {this.getGroups} wearersData = {wearersDataForChildren}  enableWearerEdit = {this.enableWearerEdit}/>
                    
                    :
                    <WearersLoading/> 
                    }

                  
                  {
                    this.state.error ? <WearerError />
                    :
                    this.state.wearerDeviceLoaded ?

                    <WristoConfiguration addNewWearerClicked={this.state.addNewWearerClicked} firstIdWearer = {this.state.firstIdWearer} getWearerDevice = {this.getWearerDevice} updateWearerDevices ={this.updateWearerDevices} deleteWearerDevices = {this.deleteWearerDevices} addWearerDevices={this.addWearerDevices} wearerID = {this.state.activeWearerId} wearerDeviceData = {this.state.wearerDevice} error = {this.state.error} />
                    :
                    <WearersLoading/>
                  }
                  
                  {
                    this.state.error ? <WearerError />
                    :
                    this.state.carersLoaded ?
                    
                    <Carers updateCarer = {this.updateCarer} carers = {this.state.carers} error = {this.state.error} deleteCarer = {this.deleteCarer} addCarer = {this.addCarer} addNewWearerClicked = {this.state.addNewWearerClicked}/>
                    :
                    <WearersLoading/>                 
                  }



              </div>

            
            </div>


       </div> 
    </div> : <WearersLoading/> }
          
  </div>
          
          
          
          
          


        );
    }
}



export default SettingsPage;

