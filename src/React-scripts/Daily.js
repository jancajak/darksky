import React, { Component } from 'react';

class Hourly extends Component {
  constructor(props) {
    super(props);

    /* Binding click method */
    this.handleClick = this.handleClick.bind(this);

    /* Setting up default states */
    this.state = {
      displayNot: 'none',
      display: 'block',
      number: 1
    };
  }

  /* Method to open or close daily item */
  handleClick(e) {
    this.setState({
      /* Getting the number of day what needs to be shown */
      number: parseInt(e.target.id.slice(9,10), 10),
      /* Helping parameter to fulfill condition */
      done: true
    })

    /* If item is open, updating state to make it disappear */
    if (e.target.nextSibling.nextSibling.style.display === 'block') {
      this.setState({
        disappear: true
      })
    } else {
      this.setState({
        disappear: false
      })
    }

  }

  /* Rendering component */
  render() {

    /* Basic logic to set default values */
    let dailyItem, ident, currIcon, percIcon;

    if (this.props.forecast[this.state.number].percIcon) {
        percIcon = this.props.forecast[this.state.number].percIcon;
    } else {
        percIcon = 'rain';
    }


    if (this.props.forecast[this.state.number].icon) {
      currIcon = this.props.forecast[this.state.number].icon
    }else {
      currIcon = 'error';
    }

    /* Loop to get array of jsx elements for each daily item */
    dailyItem = [];
    for (let i = 1; i < 8; i++) {

      /* Variable to identify id of buttton on which was clicked */
      ident = 'item_btn_' + i;

      /* JSX element of daily items */
      dailyItem[i] = <div className="forecast-daily-item">
          <button className='item_btn' id={ident} onClick={this.handleClick}><span>{this.props.forecast[i].day}</span></button><br/>
            <div className="displayNot">
            <img className="item-icon" src={require(`../images/${currIcon}.svg`)} alt="Forecast icon" />
              <span>{this.props.forecast[i].temperature} °{this.props.units.temp}</span><br/>
              <p>Max: {this.props.forecast[i].temperatureMax} °{this.props.units.temp} / Min: {this.props.forecast[i].temperatureMin} °{this.props.units.temp}</p>
                <p className= "rain-percipity-para-daily">{this.props.forecast[i].percIcon} precipity: {this.props.forecast[i].rain}</p>
                <img className="rain-percipity-icon" src={require(`../images/perc-${percIcon}.svg`)} alt="percIcon" />
              <p className="after-percipity"><span>Wind: {this.props.forecast[i].wind} {this.props.units.wind}/s</span></p>
              <p><span>UV index: {this.props.forecast[i].uvIndex}</span></p>
              <p><span>Dew point: {this.props.forecast[i].dewPoint} °{this.props.units.temp}</span></p>
            </div></div>


    }

    /* Condition to decide if item is to display */
    if (this.state.done) {

      /* Helping variable to avoid replacing of id of the button what was clicked with default value */
      let ident2;
      ident2 = 'item_btn_' + this.state.number

      /* JSX element of daily item which is to display */
      dailyItem[this.state.number] =<div className="forecast-daily-item">
          <button className='item_btn' id={ident2} onClick={this.handleClick}><span>{this.props.forecast[this.state.number].day}</span></button><br/>
            <div className="display">
              <img className="item-icon" src={require(`../images/${currIcon}.svg`)} alt="Forecast icon" />
              <span>{this.props.forecast[this.state.number].temperature} °{this.props.units.temp}</span><br/>
              <p>Max: {this.props.forecast[this.state.number].temperatureMax} °{this.props.units.temp} / Min: {this.props.forecast[this.state.number].temperatureMin} °{this.props.units.temp}</p>
                <p className= "rain-percipity-para-daily">{this.props.forecast[this.state.number].percIcon} precipity: {this.props.forecast[this.state.number].rain}</p>
                <img className="rain-percipity-icon" src={require(`../images/perc-${percIcon}.svg`)} alt="percIcon" />
              <p className="after-percipity"><span>Wind: {this.props.forecast[this.state.number].wind} {this.props.units.wind}/s</span></p>
              <p><span>UV index: {this.props.forecast[this.state.number].uvIndex}</span></p>
              <p><span>Dew point: {this.props.forecast[this.state.number].dewPoint} °{this.props.units.temp}</span></p>
            </div></div>
    }

    /* Condition to decide if item is to disappear */
    if (this.state.disappear === true) {

      /* Helping variable to avoid replacing of id of the button what was clicked with default value */
      let ident2;
      ident2 = 'item_btn_' + this.state.number

      /* JSX element of daily item which is to disappear */
      dailyItem[this.state.number] =<div className="forecast-daily-item">
          <button className='item_btn' id={ident2} onClick={this.handleClick}><span>{this.props.forecast[this.state.number].day}</span></button><br/>
            <div className="displayNot">
              <img className="item-icon" src={require(`../images/${currIcon}.svg`)} alt="Forecast icon" />
              <span>{this.props.forecast[this.state.number].temperature} °{this.props.units.temp}</span><br/>
              <p>Max: {this.props.forecast[this.state.number].temperatureMax} °{this.props.units.temp} / Min: {this.props.forecast[this.state.number].temperatureMin} °{this.props.units.temp}</p>
                <p className= "rain-percipity-para-daily">Rain percipity: {this.props.forecast[this.state.number].rain}</p>
                <img className="rain-percipity-icon" src={require(`../images/perc-${percIcon}.svg`)} alt="percIcon" />
              <p className="after-percipity"><span>Wind: {this.props.forecast[this.state.number].wind} {this.props.units.wind}/s</span></p>
              <p><span>UV index: {this.props.forecast[this.state.number].uvIndex}</span></p>
              <p><span>Dew point: {this.props.forecast[this.state.number].dewPoint} °{this.props.units.temp}</span></p>
            </div></div>
    }


    /* Returning JSX elements */
    return (
      <div className="forecast-daily">
        <h3>Daily Forecast</h3>
        {dailyItem[1]}
        {dailyItem[2]}
        {dailyItem[3]}
        {dailyItem[4]}
        {dailyItem[5]}
        {dailyItem[6]}
        {dailyItem[7]}
      </div>

    )

  }
}

export default Hourly;
