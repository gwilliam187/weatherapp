import React from 'react';
import { connect } from 'react-redux';

import { selectCity } from '../actions';
import { updateCitiesErrorMessage } from '../actions'

class CityButton extends React.Component {
	render() {
		return (
			<div className='py-2'>
				<button 
					className={'btn btn-outline-secondary btn-lg city-button'} 
					onClick={() => {
						this.props.updateCitiesErrorMessage(null, null);
						this.props.selectCity({
							cityName: this.props.cityName, 
							countryCode: this.props.countryCode
						});
					}}>
					{this.props.cityName}
				</button>
			</div>
		);
	}
}

export default connect(
	null,
	{ selectCity, updateCitiesErrorMessage }
)(CityButton);