import React from 'react';
import WeatherCard from './WeatherCard';

class WeatherDisplay extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isValid: false,
			cityName: props.cityName,
			countryCode: props.countryCode,
			weather: null,
			weatherDesc: null,
			temp: null,
			minTemp: null,
			maxTemp: null,
			windSpeed: null,
			windDeg: null
		}
	}

	componentDidMount() {
		if(this.state.cityName !== null && this.state.countryCode !== null) {
			fetch("http://api.openweathermap.org/data/2.5/weather?q=" + this.state.cityName + "," + this.state.countryCode + "&units=metric&APPID=4d7af40322905c50c7b0301437e23b21")
					.then(res => res.json())
					.then(
						(result) => {
							if(result.cod === '404') {
								this.props.onCityNotFound(this.state.cityName);
								this.setState(prevState => ({cityName: prevState.cityName + ' not found'}));
							} else {
								try {
									result.wind.deg = result.wind.deg.toFixed(0);
								} catch {}

								this.setState({
									isValid: true,
									cityName: result.name,
									countryCode: result.country,
									weather: result.weather[0].main,
									weatherDesc: result.weather[0].description,
									temp: result.main.temp, 
									minTemp: result.main.temp_min.toFixed(1), 
									maxTemp: result.main.temp_max.toFixed(1),
									windSpeed: result.wind.speed,
									windDeg: result.wind.deg
								});

								this.props.onFetch(this.state.temp, this.state.windSpeed);
							}
						},
						(error) => {

						}
					)
		}
	}

	renderWeatherDisplay() {
		if(this.state.isValid) {
			return (
				<div className='shadow weather-display'>
					<div className='row header'>
						<div className='col-12'>
							<h3>{this.state.cityName}</h3>
						</div>
					</div>
					<div className='row'>
						<WeatherCard type='weather' name='Weather' mainVal={this.state.weather} secVal={this.state.weatherDesc} />
						<WeatherCard type='temp' name='Temperature' mainVal={this.state.temp} />
						<WeatherCard type='minMaxTemp' name='Min.' mainVal={this.state.minTemp} />
						<WeatherCard type='minMaxTemp' name='Max.' mainVal={this.state.maxTemp} />
						<WeatherCard type='wind' name='Wind' mainVal={this.state.windSpeed} secVal={this.state.windDeg} />
					</div>
				</div>
			);
		} else {
			return (
				<div className='shadow weather-display'>
					<div className='row header'>
						<div className='col-12'>
							<h3>{this.state.cityName}</h3>
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

export default WeatherDisplay;