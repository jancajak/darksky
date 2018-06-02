import React, { Component } from 'react';




class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  /* Rendering the component */
  render() {

    /* Taking care of default icons before AJAX */
    let currIcon, percIcon;
    if (this.props.currently.percIcon) {
      percIcon = this.props.currently.percIcon;
    } else {
      percIcon = 'rain';
    }
    if (this.props.currently.icon) {
      currIcon = this.props.currently.icon;
    }else {
      currIcon = 'error';
    }




    return (
      <div>
        <div className="forecast-body">
          <h3>Current Forecast</h3>
          <p>{this.props.name}</p>
          <p>{this.props.time}</p>
          <div className="temperature-div">
            <p id="temperature">{this.props.currently.temperature} °{this.props.units.temp}</p>
            <img id="forecast-body-icon" src={require(`../images/${currIcon}.svg`)} alt="SVG Icon"/>          </div>
          <div id="after-temperature">
            <p id="description">{this.props.currently.summary}</p>
            <p>Apparent temperature: {this.props.currently.apparentTemperature} °{this.props.units.temp}</p>
            <div>
              <p className="rain-percipity-para-current">{this.props.currently.percIcon} precipity: {this.props.currently.rain}</p>
              <img className="rain-percipity-icon" src={require(`../images/perc-${percIcon}.svg`)} alt="percIcon" />
            </div>
            <p className="after-percipity">{"Today's max:"} {this.props.max.temperatureMax} °{this.props.units.temp} / min: {this.props.max.temperatureMin} °{this.props.units.temp}</p>
            <p>UV Index: {this.props.currently.uvIndex}</p>
          </div>
        </div>
          <div className="forecast-detailed">
            <p>Wind bearing: {this.props.currently.wind} {this.props.units.wind}/s</p>
            <p>Dew point: {this.props.currently.dewPoint} °{this.props.units.temp}</p>
            <p>Ozone: {this.props.currently.ozone}</p>
            <p>Pressure: {this.props.currently.pressure}</p>
            <p>Humidity: {this.props.currently.humidity}</p>
            <p>Visibility: {this.props.currently.visibility} {this.props.units.dist}</p>
          </div>
      </div>


    )
  }
}

export default Main;
