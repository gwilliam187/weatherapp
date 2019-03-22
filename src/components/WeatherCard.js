import React from 'react';

class WeatherCard extends React.Component {

	renderConditionally() {
		if(this.props.type === 'weather') {
			let cardColor = '';
			let cardIcon = '';
			let cardVal = this.props.mainVal;
			if(this.props.mainVal === 'Clear') {
				cardColor = 'light-blue';
				cardIcon = 'fas fa-sun fa-4x';
			} else if(this.props.mainVal === 'Cloudy') {
				cardColor = 'gray';
				cardIcon = 'fas fa-cloud fa-4x';
			} else if(this.props.mainVal === 'Rain') {
				cardColor = 'dark-blue';
				cardIcon = 'fas fa-cloud-showers-heavy fa-4x'
			} else if(this.props.mainVal === 'Clouds') {
				cardColor = 'gray';
				cardIcon = 'fas fa-cloud fa-4x';
			} else if(this.props.mainVal === 'Snow') {
				cardColor = 'white-blue';
				cardIcon = 'far fa-snowflake fa-4x';
			} else if(this.props.mainVal === 'Thunderstorm') {
				cardColor = 'purple';
				cardIcon = 'fas fa-bolt fa-4x';
				cardVal = 'Storm';
			}

			return (
				<div className='col-12 weather-card'>
					<div className={`d-flex flex-column weather-card-content ${cardColor} big`}>
						<div className='h4 text-center weather-card-content-header'>{this.props.name}</div>
						<div className='d-flex align-items-center justify-content-center'>
							<div className='weather-card-content-section'> 
								<i className={`${cardIcon}`}></i>
							</div>
							<div className='weather-card-content-section'>
								<div className='display-5'>{cardVal}</div>
								<div className='pl-1 weather-desc'>{this.props.secVal}</div> 
							</div>
						</div>
					</div>
				</div>
			);
		} else if(this.props.type === 'temp') {
			return (
				<div className='col-12 weather-card'>
					<div className='d-flex flex-column weather-card-content'>
						<div className='h5 mb-0 weather-card-content-header'>{this.props.name}</div>
						<div className='d-flex'>
							<div className='weather-card-content-section p-0'>
								<div className='display-6'>{this.props.mainVal}<span className='text-muted'>&deg;C</span></div>
							</div>
						</div>
					</div>
				</div>
			);
		} else if(this.props.type === 'minMaxTemp') {
			return (
				<div className='col-lg-6 weather-card'>
					<div className='d-flex flex-column weather-card-content'>
						<div className='h5 mb-0 weather-card-content-header'>{this.props.name}</div>
						<div className='d-flex'>
							<div className='weather-card-content-section p-0'>
								<div className='display-6'>{this.props.mainVal}<span className='text-muted'>&deg;C</span></div>
							</div>
						</div>
					</div>
				</div>
			);
		} else if(this.props.type === 'wind') {
			return (
				<div className='col-12 weather-card'>
					<div className='d-flex flex-column weather-card-content'>
						<div className='h5 mb-0 weather-card-content-header'>{this.props.name}</div>
						<div className='d-flex'>
							<div className='weather-card-content-section p-0 w-60'>
								<div className='display-6'>{this.props.mainVal}<span className='text-muted'> m/s</span></div>
							</div>
							{(() => {
								if(this.props.secVal != null) {
									return (
										<div className='weather-card-content-section w-40 border-left-2'>
											<div className='display-6'>{this.props.secVal}<span className='text-muted'>&deg;</span></div>
										</div>
									);
								}
								return null;
							})()}
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