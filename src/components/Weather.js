import React from 'react';
import day from '../img/day.svg';
import night from '../img/night.svg';
import images from './Images';

const Weather = ({
  data: [IsDayTime, WeatherIcon, WeatherText, Temperature, EnglishName],
}) => {
  return (
    <div className="card shadow-lg rounded">
      <img
        className="time card-img-top"
        src={IsDayTime === true ? day : night}
        alt=""
      />
      <img
        className="icon bg-light mx-auto text-center"
        src={images[WeatherIcon]}
        alt="wath"
      />
      <div className="text-muted text-uppercase text-center details">
        <div className='text-muted text-uppercase text-center details'>
          <h5 className="my-3">{EnglishName}</h5>
          <span className="my-3">{WeatherText}</span>
          <div className="display-4 my-4">
            <span>{Temperature.Metric.Value} &deg;</span> <span>C</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
