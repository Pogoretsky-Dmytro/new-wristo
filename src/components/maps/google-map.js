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
  <GoogleMap defaultZoom={11} defaultCenter={{ lat: 49.8357, lng: 24.059 }}>
    <Marker position={{ lat: props.lan, lng: props.lng }}/>
  </GoogleMap>
)

let array = [{ lat: 0, lng: 0 }]

const key = "AIzaSyBla7cldJeOqMXD4xPNcARqmGRPB-YQOZs"
const style = {
	backgroundColor: "red"
}
const pos = {lat: 40.590624,lng: -73.892191}

class MapContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lan: 0,
      lng: 0
    }
  }

componentWillReceiveProps(nextProps){
  console.log("props", nextProps.coords); 
  this.setState({lan: nextProps.coords.lat, lng: nextProps.coords.lng})
  //array[0] = this.createMarker(nextProps.lat.lat, nextProps.lat.lon);
  //console.log(array[0]);
}
// createMarker(lat, lon){
//   return { lat: lat, lng: lon }
// }

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