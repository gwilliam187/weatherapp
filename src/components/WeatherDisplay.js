import React from 'react';
import WeatherCard from './WeatherCard';

class WeatherDisplay extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			cityName: props.cityName,
			weather: null,
			weatherDesc: null,
			temp: null,
			minTemp: null,
			maxTemp: null
		}
	}

	componentDidMount() {
		fetch("http://api.openweathermap.org/data/2.5/weather?q=" + this.state.cityName + "," + this.state.countryCode + "&units=metric&APPID=4d7af40322905c50c7b0301437e23b21")
				.then(res => res.json())
				.then(
					(result) => {
						this.setState({
							weather: result.weather[0].main,
							weatherDesc: result.weather[0].description,
							temp: result.main.temp, 
							minTemp: result.main.temp_min, 
							maxTemp: result.main.temp_max
						});
					},
					(error) => {

					}
				)
	}

	render() {
		const eventHandler = this.props.eventHandler;

		return (
			<div className='container weather-display'>
				<div className='row header'>
					<div className='col-1 d-flex align-items-center'>
						<i className="fas fa-arrow-left fa-2x back-button" onClick={() => eventHandler()}></i>
					</div>
					<div className='col-10'>
						<h1>{this.state.cityName}</h1>
					</div>
				</div>
				<div className='row'>
					<WeatherCard type='weather' name='Weather' mainVal='Thunderstorm' secVal={this.state.weatherDesc} />
					<WeatherCard type='temp' name='Temperature' mainVal={this.state.temp} />
					<WeatherCard type='minMaxTemp' name='Min.' mainVal={this.state.minTemp} />
					<WeatherCard type='minMaxTemp' name='Max.' mainVal={this.state.maxTemp} />
				</div>
			</div>
		);
	}
}

export default WeatherDisplay;