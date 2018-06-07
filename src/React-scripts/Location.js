import React, { Component } from 'react';
import Main from './Main';
import Daily from './Daily';
import axios from 'axios';
import poweredby from '../images/poweredby.png';

class Location extends Component {
  constructor(props) {
    super(props);

    /* Binding all methods from this class */
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeUnits = this.handleChangeUnits.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleClickOnImage = this.handleClickOnImage.bind(this);

    this.state = {
      /* Setting up units(si default) */
      searchQuery: "",
      units: "si",
      si: {
        temp: "C",
        dist: "km",
        wind: "m"
      },
      us: {
        temp: "F",
        dist: "miles",
        wind: "miles"
      }
    };
  }

  /* Method to handle time from response */
  handleTime(response) {
    let hours, minutes, result;

    hours = new Date(response.data.currently.time * 1000).getHours();
    minutes = new Date(response.data.currently.time * 1000).getMinutes();
    if (minutes < 10) {
      minutes = '0' + minutes;
    }

    result = hours + ':' + minutes;

    return result;


  }

  /* Method to retrive location after app loads*/
  getLocation(){

    if (navigator.geolocation) {

      /* HTML geolocation permission asked */
      navigator.geolocation.getCurrentPosition(success.bind(this), error,);
      /* Callback on permission granted */
      function success(position) {

        /* Setting up state with latitude and longitude retrieved from browser */
        this.setState({
          location: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
        })

        /* Calling a service for reversed geocoding with specified attributes such as latitude, longitude  */
        axios.get('https://eu1.locationiq.org/v1/reverse.php?key=95464f97e39268&lat=' + this.state.location.lat + '&lon=' + this.state.location.lng + '&format=json')
          .then(response => {

            /* Setting up state with information about place such as name, latitude and longitude */
            this.setState({
              place: {
                name: response.data.address.city + ', ' + response.data.address.country,
                lat: this.state.location.lat,
                lng: this.state.location.lng
              }
            })

            /* Calling darksky to get weather conditions */
            return axios.get('https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/c511ab490cc7e36889820ef88bf36f51/' + this.state.location.lat + ',' + this.state.location.lng + '?units=' + this.state.units)
          })
            .then(response => {

              /* Setting up state with weather and time information */
              this.setState({
                time: this.handleTime(response),
                currently: this.handleDataCurrently(response),
                daily: this.handleDataDaily(response)
              });

           })

      }

      /* Callback on permission denied */
      function error(error){

        /* Calling this api to retrieve position using IP address */
        axios.get('https://ip-api.com/json')
          .then(response => {

            /* Setting up state with information about place */
            this.setState({
              place: {
                lat: response.data.lat,
                lng: response.data.lon,
                name: response.data.city + ',' + response.data.country
              }
            })

            /* Calling darksky to get weather conditions */
            return axios.get('https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/c511ab490cc7e36889820ef88bf36f51/' + this.state.place.lat + ',' + this.state.place.lng + '?units=' + this.state.units)
          })
          .then(response => {

            /* Setting up state with weather and time information */
            this.setState({
              time: this.handleTime(response),
              currently: this.handleDataCurrently(response),
              daily: this.handleDataDaily(response)
            });
         })

      }
    }
  }

  /* Simple method to handle data about location used in handleClick method */
  handleLocation(response) {
    let object ={
      lat: response.data[0].lat,
      lng: response.data[0].lon,
      name: response.data[0].display_name
    }
    return object;
  }

  /* Method to handle daily data from API request */
  handleDataDaily(response) {

    /* Preparing arrays needed for data handling */
    let count = [];
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    /* Loop to get data into a state of react component */
    for (let i = 1; i < 8; i++) {
        count[i] = {
         day: days[new Date(response.data.daily.data[i].time * 1000).getUTCDay()] + ' - ' + new Date(response.data.daily.data[i].time * 1000).getUTCDate() + '. / ' + (new Date(response.data.daily.data[i].time * 1000).getUTCMonth() + 1) + '.',
         temperature: Math.round((response.data.daily.data[i].temperatureMax + response.data.daily.data[i].temperatureMin) / 2),
         temperatureMax: Math.round(response.data.daily.data[i].temperatureMax),
         temperatureMin: Math.round(response.data.daily.data[i].temperatureMin),
         rain: Math.round((response.data.daily.data[i].precipProbability * 100)) + ' %',
         wind: response.data.daily.data[i].windSpeed,
         uvIndex: response.data.daily.data[i].uvIndex,
         dewPoint: Math.round(response.data.daily.data[i].dewPoint),
         icon: response.data.daily.data[i].icon,
         percIcon: response.data.daily.data[i].precipType,
       }
    }

    /* Updating first value of the daily array to get Today value in UI */
    count[1].day = 'Today'
    return count;
  }

  /* Method to handle current data from API request */
  handleDataCurrently(response) {

    /* Updating state with recieved data */
    let object = {};
    object = {
      temperature: Math.round(response.data.currently.temperature),
      summary: response.data.currently.summary,
      apparentTemperature: Math.round(response.data.currently.apparentTemperature),
      rain: Math.round((response.data.currently.precipProbability * 100)) + ' %',
      uvIndex: response.data.currently.uvIndex,
      wind: response.data.currently.windSpeed,
      dewPoint: Math.round(response.data.currently.dewPoint),
      ozone: response.data.currently.ozone + ' DU',
      pressure: response.data.currently.pressure + ' hPa',
      humidity: Math.round((response.data.currently.humidity * 100)) + ' %',
      visibility: response.data.currently.visibility,
      icon: response.data.currently.icon,
      percIcon: response.data.currently.precipType
    }
    return object;
  }

  /* Method called before component mount */
  componentWillMount() {

      /* Calling method to start obtaining data */
      this.getLocation();


  }

  /* Method to handle data from search input */
  handleClick() {


    if (this.state.searchQuery) {
      /* Declaring variables */
      let url, query;

      /* Search query obtained from handleChange method */
      query = this.state.searchQuery
      url = 'https://eu1.locationiq.org/v1/search.php?key=95464f97e39268&q=' + query + '&format=json';

      /* Making API request to get location */
      axios.get(url)
        .then(response => {

          /* Setting up state with place information and calling method */
          this.setState({
            place: this.handleLocation(response)
          })

          /* Firing up API request to get weather conditions dependent on passed parameters such as latitude, longitude and units */
          return axios.get('https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/c511ab490cc7e36889820ef88bf36f51/' + this.state.place.lat + ',' + this.state.place.lng + '?units=' + this.state.units)
      })
        .then(response => {

          /* Updating state with time and weather conditions */
          this.setState({
            time: this.handleTime(response),
            currently: this.handleDataCurrently(response),
            daily: this.handleDataDaily(response)
          });
       })
    }else {
      alert('Enter your location!')
    }

  }

  /* Method to handle search input changes */
  handleChange(e) {

    /* Updating state dependent on what is typed in */
    this.setState({
      searchQuery: e.target.value
    })

  }

  /* Method to handle unit's changes */
  handleChangeUnits(e) {

    /* Updating state dependent on what option is selected */
    this.setState({
      units: e.target.value
    })

    /* Calling componentWillMount method */
    this.handleClick();

  }

  /* Handle key press */
  handleKeyPress(e) {

    if (e.key === 'Enter') {
      this.handleClick();
    }
  }

  handleClickOnImage() {
    let win;

    win = window.open('https://darksky.net/poweredby/', '_blank');
    win.focus();
  }

  /* Rendering the component */
  render() {


    /* Taking care of default values before AJAX is processed */
    let currently, daily, search, units;

    /* Declaring default state of units as si */
    if (this.state.units === "si") {
      units = this.state.si;
    } else {
      units = this.state.us;
    }

    /* If AJAX is already finished passing all information to child components if not passing alternate values */
    if (this.state.currently && this.state.place.name && this.state.time) {
      currently = <Main currently={this.state.currently} name={this.state.place.name} time={this.state.time} max={this.state.daily[1]} units={units} />;
      daily = <Daily forecast={this.state.daily} units={units} />
      search = <input id="search" type="search" name="place" placeholder="Enter a city for forecast..." value={this.state.searchQuery} onChange={this.handleChange} onKeyPress={this.handleKeyPress} />
    } else {
      currently = <Main currently="NaN" name="NaN" time="NaN" max="NaN" units={units} />
      daily = <Daily forecast="NaNaNaNaN" units={units} />
      search = <input id="search" type="search" name="place" placeholder="Enter a city for forecast..." value=""/>
    }



    /* Finally returning JSX components */
    return (
      <div>
          <img id="powered_image" src={poweredby} alt="DarkSky link" onClick={this.handleClickOnImage} />
        <div>
          {search}
          <input id="sub_btn" type="submit"  name="sub_btn" value="Show"  onClick={this.handleClick} />
          <select value={this.state.units} onChange={this.handleChangeUnits} id="choose">
            <option value="si">°C</option>
            <option value="us">°F</option>
          </select>
        </div>




        <div>{currently}</div>
        <div>{daily}</div>
      </div>
    )
  }
}

export default Location;
