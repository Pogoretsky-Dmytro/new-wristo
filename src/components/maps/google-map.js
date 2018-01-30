import React, { Component } from 'react';
//import './maps.css'
import image from '../../assets/icons/delete.svg'
import {HeaderTwoBtn, HeaderThreeBtn, HeaderNoBtn} from '../otherComponents/header';
import { compose, withProps, withHandlers, withState } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, OverlayView} from "react-google-maps"
var mapheight = "400px";

const MyMapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyBla7cldJeOqMXD4xPNcARqmGRPB-YQOZs&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div />,
    mapElement: <div style={{height: `495px`}} />,
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
  <GoogleMap ref={props.onMapMounted} onZoomChanged={() => {props.onChange(props.zoom);props.onZoomChanged()}} 
   zoom={props.zoomprops} center={{lat: props.lan, lng: props.lng}}>
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
      zoom: 0,
      hide: false,
      width: 0,
      height: 0,
      dragableMap: false
    }
    this.getzoom = this.getzoom.bind(this);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.reduceheight = this.reduceheight.bind(this);
  }

componentWillReceiveProps(nextProps){
  this.setState({zoom: nextProps.zoom == undefined ? 8 : nextProps.zoom, lan: nextProps.coords.lat,
   lng: nextProps.coords.lng, center: {lan: nextProps.coords.lat, lng: nextProps.coords.lng}})
}
componentDidMount() {
  this.updateWindowDimensions();
  window.addEventListener('resize', this.updateWindowDimensions);
  this.setState({ width: window.innerWidth, height: window.innerHeight})
}

componentWillUnmount() {
  window.removeEventListener('resize', this.updateWindowDimensions);
}

updateWindowDimensions() {
  this.setState({ width: window.innerWidth, height: window.innerHeight });
}

getzoom(zoom){
  this.state.zoom = zoom;
}
hidelist(){
  this.setState({hide: !this.state.hide})
  this.reduceheight(this.state.hide);
}
reduceheight(hide){
  var mapheight;
 /* if(this.state.width < 825) {
    mapheight = "200px"
  } else {
    mapheight = "560px"
  }
  this.divElement.style.height = hide ? mapheight : "0px"
  this.divElement.style.transitionDuration = "2s";*/
}
reloadComponents(){
  this.forceUpdate();
}

render() {
	return (
  	<div className="map">
  		<HeaderThreeBtn onReload={this.reloadComponents.bind(this)} onChange={this.hidelist.bind(this)} header="Map"/>
      <div id="header"  ref={ (divElement) => this.divElement = divElement} >
  		<MyMapComponent hide={this.state.hide} onChange={this.getzoom} zoomprops={this.state.zoom} lan={this.state.lan} lng={this.state.lng} center={this.props.center}/>
  	</div>
  </div>
	);
	}
}
 
export default MapContainer;
