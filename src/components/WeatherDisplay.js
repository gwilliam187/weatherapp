import React from 'react';
import { connect } from 'react-redux';

import { fetchWeathersForSelectedCities } from '../actions';
import WeatherCard from './WeatherCard';

class WeatherDisplay extends React.Component {
	renderWeatherDisplay() {
		const weathers = this.props.weathers;

		if(weathers.length === 1) {
			return (
				<div className='row'>
					<div className='col-12 pb-3'>
						<div className='card weather-display'>
							<div className='row header'>
								<div className='col-12'>
									<h3>{weathers[0].name}</h3>
								</div>
							</div>
							<div className='row'>
								<WeatherCard type='weather' name='Weather' 
									mainVal={weathers[0].weather[0].main} secVal={weathers[0].weather[0].description} />
								<WeatherCard type='temp' name='Temperature' 
									mainVal={weathers[0].main.temp} />
								<WeatherCard type='minMaxTemp' name='Min.' 
									mainVal={weathers[0].main.temp_min} />
								<WeatherCard type='minMaxTemp' name='Max.' 
									mainVal={weathers[0].main.temp_max} />
								<WeatherCard type='wind' name='Wind' 
									mainVal={weathers[0].wind.speed} secVal={weathers[0].wind.deg} />
							</div>
						</div>
					</div>
				</div>
			);
		} else if(weathers.length === 2) {
			return (
				<div className='row'>
					<div className='col-md-12 col-lg-6 pb-3'>
						<div className='card weather-display'>
							<div className='row header'>
								<div className='col-12'>
									<h3>{weathers[0].name}</h3>
								</div>
							</div>
							<div className='row'>
								<WeatherCard type='weather' name='Weather' 
									mainVal={weathers[0].weather[0].main} secVal={weathers[0].weather[0].description} />
								<WeatherCard type='temp' name='Temperature' 
									mainVal={weathers[0].main.temp} />
								<WeatherCard type='minMaxTemp' name='Min.' 
									mainVal={weathers[0].main.temp_min} />
								<WeatherCard type='minMaxTemp' name='Max.' 
									mainVal={weathers[0].main.temp_max} />
								<WeatherCard type='wind' name='Wind' 
									mainVal={weathers[0].wind.speed} secVal={weathers[0].wind.deg} />
							</div>
						</div>
					</div>
					<div className='col-md-12 col-lg-6 pb-3'>
						<div className='card weather-display'>
							<div className='row header'>
								<div className='col-12'>
									<h3>{weathers[1].name}</h3>
								</div>
							</div>
							<div className='row'>
								<WeatherCard type='weather' name='Weather' 
									mainVal={weathers[1].weather[0].main} secVal={weathers[1].weather[0].description} />
								<WeatherCard type='temp' name='Temperature' 
									mainVal={weathers[1].main.temp} />
								<WeatherCard type='minMaxTemp' name='Min.' 
									mainVal={weathers[1].main.temp_min} />
								<WeatherCard type='minMaxTemp' name='Max.' 
									mainVal={weathers[1].main.temp_max} />
								<WeatherCard type='wind' name='Wind' 
									mainVal={weathers[1].wind.speed} secVal={weathers[1].wind.deg} />
							</div>
						</div>
					</div>
				</div>
			);
		}
	}

	render() {
		return <div>{this.renderWeatherDisplay()}</div>;
	}
}

const mapStateToProps = state => {
	return {
		weathers: state.weathers
	};
};

export default connect(
	mapStateToProps,
	{ fetchWeathersForSelectedCities }
)(WeatherDisplay);