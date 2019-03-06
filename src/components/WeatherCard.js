import React from 'react';

class WeatherCard extends React.Component {

	renderConditionally() {
		if(this.props.type == 'weather') {
			let cardColor = '';
			let cardIcon = '';
			let cardVal = this.props.mainVal;
			if(this.props.mainVal == 'Clear') {
				cardColor = 'light-blue';
				cardIcon = 'fas fa-sun fa-5x';
			} else if(this.props.mainVal == 'Cloudy') {
				cardColor = 'gray';
				cardIcon = 'fas fa-cloud fa-5x';
			} else if(this.props.mainVal == 'Rain') {
				cardColor = 'dark-blue';
				cardIcon = 'fas fa-cloud-showers-heavy fa-5x'
			} else if(this.props.mainVal == 'Clouds') {
				cardColor = 'gray';
				cardIcon = 'fas fa-cloud fa-5x';
			} else if(this.props.mainVal == 'Snow') {
				cardColor = 'white-blue';
				cardIcon = 'far fa-snowflake fa-5x';
			} else if(this.props.mainVal == 'Thunderstorm') {
				cardColor = 'purple';
				cardIcon = 'fas fa-bolt fa-5x';
				cardVal = 'Storm';
			}

			return (
				<div className='col-4 weather-card'>
					<div className={`d-flex flex-column weather-card-content ${cardColor}`}>
						<div className='h5 weather-card-content-header'>{this.props.name}</div>
						<div className='d-flex'>
							<div className='weather-card-content-section'> 
								<i className={`${cardIcon}`}></i>
							</div>
							<div className='weather-card-content-section'>
								<div className='display-4'>{cardVal}</div>
								<div className='pl-1 text-secondary-custom'>{this.props.secVal}</div> 
							</div>
						</div>
					</div>
				</div>
			);
		} else if(this.props.type == 'temp') {
			return (
				<div className='col-4 weather-card'>
					<div className='d-flex flex-column weather-card-content'>
						<div className='h5 weather-card-content-header'>{this.props.name}</div>
						<div className='d-flex'>
							<div className='weather-card-content-section'>
								<div className='display-4'>{this.props.mainVal}<span className='text-muted'>&deg;C</span></div>
							</div>
						</div>
					</div>
				</div>
			);
		} else if(this.props.type == 'minMaxTemp') {
			return (
				<div className='col-2 weather-card'>
					<div className='d-flex flex-column weather-card-content'>
						<div className='h5 weather-card-content-header'>{this.props.name}</div>
						<div className='d-flex'>
							<div className='weather-card-content-section p-0'>
								<div className='display-4 text-small'>{this.props.mainVal}<span className='text-muted'>&deg;C</span></div>
							</div>
						</div>
					</div>
				</div>
			);
		}
	}

	render() {
		const html = this.renderConditionally();
		return html;
	}
}

export default WeatherCard;