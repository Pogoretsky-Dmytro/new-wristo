import React, { Component } from 'react';
import Weeks from './weeks'
import UserEvents from './userreminder'

var weekday = new Array(7);
weekday[0] = "Monday";
weekday[1] = "Tuesday";
weekday[2] = "Wednesday";
weekday[3] = "Thursday";
weekday[4] = "Friday";
weekday[5] = "Saturday";
weekday[6] =  "Sunday";

export var month = new Array();
month[0] = "JAN";
month[1] = "FEB";
month[2] = "MAR";
month[3] = "APR";
month[4] = "MAY";
month[5] = "JUN";
month[6] = "JUL";
month[7] = "AUG";
month[8] = "SEP";
month[9] = "OCT";
month[10] = "NOV";
month[11] = "DEC";

var d = new Date();
var day = weekday[d.getDay()];
var date = d.getDate();
var n = month[d.getMonth()];
var k = month.indexOf(n);
var weekdates = [];
var year = d.getFullYear();
var numberofdays = daysInMonth((k+1),year);
var firstday, lastday;
var thismonth, nextmonth;

function daysInMonth(month,year) { return new Date(year, month, 0).getDate();}

const Par = (props) => {
   return <p>{n} {props.firstday}-{props.lastday}, {year}</p>
}

class Calendar extends React.Component{
	constructor(props){
  		super(props);
  		this.state = {
            week: "",
            arrayofweek: [],
            reminders: [],
            search: [],
            check: ""
        }
  	}
    setweek(str){
        if(str === "previous"){
            date -= 7;
            if(date < weekday.indexOf(day)){
                numberofdays = daysInMonth((k),year);
                --k;
                if(k < 0){k = 11; n = month[k]; year--;}
                n = month[k]
                firstday = numberofdays - (weekday.indexOf(day) - date) - 1;
                date = date + numberofdays;
            }
        }
        if(str === "next"){
              date += 7;
              if(date > numberofdays){
                k++;
                n = month[k]
                nextmonth = daysInMonth((k),year);
                if(k > 11){k=0;n = month[k]; year++;}
                date = date - numberofdays
            }
        }

        if(date < weekday.indexOf(day)){
            firstday = numberofdays + 1 - (weekday.indexOf(day) - date);
        } else{
            firstday = date - (weekday.indexOf(day)) + 1;
        }
        lastday = firstday + 6;
        if(firstday + 6 > numberofdays){
            lastday = Math.abs(numberofdays - (firstday + 6));
        }
        var arr1 = [];
        if (lastday > firstday){
            for(let r = firstday, d = 0; ; r++, d++){
                if(r > lastday) break;
                arr1[d] = {month: month.indexOf(n), day: r}
            }
        } else if(lastday < firstday){
             for(var b = lastday, d = 6; ; b--, d--){
                if(b < 1)break;
                arr1[d] = {month: month.indexOf(n)+1, day: b};
             }
             for(let c = numberofdays; ; c--, d--){
                if( c < firstday) break;
                arr1[d] = {month: month.indexOf(n), day: c};
             }
        }
        return [month.indexOf(n),firstday, lastday, year, arr1];
    }

	previousWeek(){
        //debugger;
		let uu = this.setweek("previous");
        this.setState({firstday: uu[1], lastday: uu[2], month: uu[0], arrayofweek: uu[4]})
    }
	nextWeek(){
        let uu = this.setweek("next");
		this.setState({firstday: uu[1], lastday: uu[2], month: uu[0], arrayofweek: uu[4]})

    }
    createweek(){
        if(date < weekday.indexOf(day)){
           this.state.firstday = numberofdays + 1 - (weekday.indexOf(day) - date);
        } else{
            this.state.firstday = date - (weekday.indexOf(day)) + 1;
        }
        this.state.lastday = this.state.firstday + 6;
        if(this.state.firstday + 6 > numberofdays){
            this.state.lastday = Math.abs(numberofdays - (this.state.firstday + 6));
        };
        this.state.month =  month.indexOf(n);
        for(let r = this.state.firstday, d = 0; r <= this.state.lastday; r++, d++){
                this.state.arrayofweek[d] = {month: month.indexOf(n), day: r}
        }
    }
    componentWillMount(){
        this.createweek();
    }
    componentWillUpdate(){
        this.createweek();
    }
    componentWillReceiveProps(nextProps){
        this.setState({wearershow: nextProps.wearershow});
        this.state.wearers = nextProps.wearers;
        this.state.reminders = nextProps.search;
        this.state.event = nextProps.event;
    }
    shouldComponentUpdate(nextProps, nextState){
       if(nextProps.rerender == true){
        return true;
       }
       return false;
    }
	render(){
    	return (<div className="calendar">
            <div className="switch-date">
    			<span onClick={this.previousWeek.bind(this)}>&#60;</span>
    				<Par firstday={this.state.firstday} lastday={this.state.lastday} />
    			<span onClick={this.nextWeek.bind(this)}>&#62;</span>
    		</div>
            <div>
                <Weeks wearershow={this.state.wearershow} weekarray={this.state.arrayofweek}/>
                <div className="user-week">
                    <UserEvents event={this.state.event} wearershow={this.state.wearershow} weekarray={this.state.arrayofweek} id={this.props.id} wearers={this.state.wearers} changedweek={this.state.week}/>
                </div>
            </div>
            </div>
        )
	}
}

export default Calendar;