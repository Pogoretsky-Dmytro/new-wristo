import React, { Component } from 'react';
//import './maps.css'
import image from '../../assets/icons/delete.svg'
import {HeaderTwoBtnm, HeaderThreeBtn, HeaderNoBtn} from '../otherComponents/header';
import { compose, withProps, withHandlers, withState } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, OverlayView} from "react-google-maps"

import {latArray} from '../masterPage/masterpage';


const MyMapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyBla7cldJeOqMXD4xPNcARqmGRPB-YQOZs&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withState('zoom', 'onZoomChange', 8),
   withHandlers(() => {
    const refs = {
      map: undefined,
    }

    return {
      onMapMounted: () => ref => {
        refs.map = ref
      },
      onZoomChanged: ({ onZoomChange }) => () => {
       onZoomChange(refs.map.getZoom())
      }
    }
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap ref={props.onMapMounted} onZoomChanged={props.onZoomChanged} onClick={() => props.onChange(props.zoom)} zoom={props.zoomprops} center={{lat: props.lan, lng: props.lng}}>
    <Marker position={{ lat: props.lan, lng: props.lng }}/>
  </GoogleMap>
)

const key = "AIzaSyBla7cldJeOqMXD4xPNcARqmGRPB-YQOZs"

class MapContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lan: 0,
      lng: 0,
      center: {lan: 40, lng: 40},
      zoom: 0
    }
    this.getzoom = this.getzoom.bind(this);
  }

componentWillReceiveProps(nextProps){
  this.setState({zoom: nextProps.zoom == undefined ? 8 : nextProps.zoom, lan: nextProps.coords.lat,
   lng: nextProps.coords.lng, center: {lan: nextProps.coords.lat, lng: nextProps.coords.lng}})
}
getzoom(zoom){
  this.setState({zoom: zoom})
}
render() {
	return (
	<div className="map">
		<HeaderNoBtn header="Map"/>
		<MyMapComponent onChange={this.getzoom} zoomprops={this.state.zoom} lan={this.state.lan} lng={this.state.lng} center={this.props.center}/>
	</div>
	);
	}
}
 
export default MapContainer;
