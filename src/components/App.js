import React from 'react';
import CityButtonWrapper from './CityButtonWrapper';
import WeatherDisplay from './WeatherDisplay';

class App extends React.Component {
	state = {
		cityIsSelected: false,
		currCity: null
	};

	handleCitySelectionEvent = (cityName) => {
		this.setState({cityIsSelected: true, currCity: cityName});
	};

	handleWeatherDisplayBackEvent = () => {
		this.setState({cityIsSelected: false, currCity: null});
	};

	componentDidUpdate() {

	}

	renderConditionally() {
		if(!this.state.cityIsSelected) {
			return <CityButtonWrapper eventHandler={this.handleCitySelectionEvent} />;
		} else {
			return <WeatherDisplay cityName={this.state.currCity} eventHandler={this.handleWeatherDisplayBackEvent} />;
		}
	}

	render() {
		return (
			<div className="app">
				{this.renderConditionally()}
			</div>
		);
	}
}

export default App;