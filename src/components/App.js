import React, { Component } from 'react';
import Weather from './Weather';
import axios from 'axios';


class App extends Component {
  constructor() {
    super()
    this.key = 'KE4GgEBFGGgfsKsA0oFAg2BJpH0D80vz'
    this.weatherURI = 'http://dataservice.accuweather.com/currentconditions/v1/'
    this.cityURI = `http://dataservice.accuweather.com/locations/v1/cities/search`

    this.state = {
      searchValue: '',
      data: [
        
      ]
    }
  }

  componentDidMount() {
    //if there is a data in local storage then search city acorrding to that data
    if(localStorage.data) {
     const data = JSON.parse(localStorage.data)
     const {id, EnglishName} = data
     this.getWeather(id, EnglishName)
    }
  }

  //when form submitted this fill fire and it will get the city Key then will send it to getWeather function
  getCity =  (e) => {
    e.preventDefault()
    const query = `?apikey=${this.key}&q=${this.state.searchValue}`;
    axios.get(this.cityURI + query)
    .then(res => {
     if(res.data.length > 0 ) {
      this.getWeather(res.data[0].Key, res.data[0].EnglishName)
      //console.log(res)
    
     } else {
       throw Error('something went wrong')
     }
    })
    .catch(err => {console.log(err.message)})
    this.setState({searchValue: ''})
  }
  // this will get the weather data and send it to ui components 
  getWeather = (id, EnglishName) => {
    const query = `${id}?apikey=${this.key}`;
    axios.get(this.weatherURI + query)
      .then(res => {
       console.log(res)
        const {IsDayTime, WeatherIcon, WeatherText, Temperature} = res.data[0]
        this.setState({data: [IsDayTime, WeatherIcon, WeatherText, Temperature, EnglishName]})
        const forLocalStorage = {id, EnglishName}
        localStorage.setItem('data', JSON.stringify(forLocalStorage))
        
       //console.log(this.state.data)
      })
  }
  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  render() {
    return (

      <div className="container my-5 max-auto">
        <h1 className='text-muted text-center my-4'>Weather app</h1>
        <form className='change-location my-4 text-center text-muted' onSubmit={this.getCity}>
          <label>Enter the location for weather information</label>
          <input className='form-control p-4' required type="text" name='searchValue' value={this.state.searchValue}  onChange={this.handleChange}/>
        </form>
          {this.state.data.length > 0 && <Weather data={this.state.data} /> }
      </div>
    )
   
  }
}

export default App;
