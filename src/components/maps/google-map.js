import React, { Component } from 'react';
//import './maps.css'
import image from '../../assets/icons/delete.svg'
import {HeaderTwoBtnm, HeaderThreeBtn, HeaderNoBtn} from '../otherComponents/header';
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, OverlayView} from "react-google-maps"

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
  <GoogleMap defaultZoom={13} defaultCenter={{ lat: -34.397, lng: 150.644 }}>
    {array}
  </GoogleMap>
)

let array = [
  <Marker position={{ lat: -34.397, lng: 150.644 }} />,
  <Marker position={{ lat: -34.380, lng: 150.550 }} />, 
  <Marker position={{ lat: -34.397, lng: 150.594 }} />,
  <Marker position={{ lat: -34.397, lng: 150.570 }} />,
  <Marker position={{ lat: -34.397, lng: 150.550 }} />
]


const mark = () => {
	return <div style={style}>
		hello
	</div>
}

const key = "AIzaSyBla7cldJeOqMXD4xPNcARqmGRPB-YQOZs"
const style = {
	backgroundColor: "red"
}
const pos = {lat: 40.590624,lng: -73.892191}

class MapContainer extends React.Component {

render() {
	return (
	<div className="map">
		<HeaderNoBtn header="Map"/>
		<MyMapComponent hello="lol" />
	</div>
	);
	}
}
 
export default MapContainer;