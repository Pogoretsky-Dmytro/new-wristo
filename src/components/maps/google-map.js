import React, { Component } from 'react';
//import './maps.css'
import image from '../../assets/icons/delete.svg'
import {HeaderTwoBtnm, HeaderThreeBtn, HeaderNoBtn} from '../otherComponents/header';
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, OverlayView} from "react-google-maps"

import {latArray} from '../masterPage/masterpage';


const MyMapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyBla7cldJeOqMXD4xPNcARqmGRPB-YQOZs&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap defaultZoom={8} defaultCenter={{ lat: 49.83, lng: 24.05 }}>
    <Marker position={{ lat: props.lan, lng: props.lng }}/>
  </GoogleMap>
)

let array = [{ lat: 0, lng: 0 }]

const key = "AIzaSyBla7cldJeOqMXD4xPNcARqmGRPB-YQOZs"
const style = {
	backgroundColor: "red"
}
let pos = {lat: 40.590624, lng: -73.892191}

class MapContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lan: 0,
      lng: 0
    }
  }

componentWillReceiveProps(nextProps){
  pos = {lat: nextProps.coords.lat, lng: nextProps.coords.lng};
  console.log(pos);
  this.setState({lan: nextProps.coords.lat, lng: nextProps.coords.lng})
}

render() {
	return (
	<div className="map">
		<HeaderNoBtn header="Map"/>
		<MyMapComponent lan={this.state.lan} lng={this.state.lng}/>
	</div>
	);
	}
}
 
export default MapContainer;