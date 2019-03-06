import React from 'react';
import CityButton from './CityButton';
import './custom-style.css';

class CityButtonWrapper extends React.Component {
	handleEvent = (cityName) => {
		this.props.eventHandler(cityName);
	}

	render() {
		return (
			<div className='container city-button-wrapper'>
				<div className='row header'>
					<div className='col-12'>
						<h1>Please choose a city</h1>
					</div>
				</div>
				<div className='row content'>
					<CityButton cityName='Berlin' countryCode='de' eventHandler={this.handleEvent} />
					<CityButton cityName='Potsdam' countryCode='de' eventHandler={this.handleEvent} />
					<CityButton cityName='Soest' countryCode='de' eventHandler={this.handleEvent} />
					<CityButton cityName='Jakarta' countryCode='id' eventHandler={this.handleEvent} />
					<CityButton cityName='Bandung' countryCode='id' eventHandler={this.handleEvent} />
					<CityButton cityName='Moscow' countryCode='ru' eventHandler={this.handleEvent} />
					<CityButton cityName='Bangkok' countryCode='th' eventHandler={this.handleEvent} />
				</div>
			</div>
		);
	}
}

export default CityButtonWrapper;