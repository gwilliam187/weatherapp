import React from 'react';
import { connect } from 'react-redux';

import { selectCity } from '../actions';
import { updateCitiesErrorMessage } from '../actions'

export class CityButton extends React.Component {
	
	handleOnClick = () => {
		this.props.updateCitiesErrorMessage(null, null);
		this.props.selectCity({
			cityName: this.props.cityName, 
			countryCode: this.props.countryCode
		});
	}

	render() {
		return (
			<div className='py-2'>
				<button 
					className={'btn btn-outline-secondary btn-lg city-button'} 
					onClick={this.handleOnClick}>
					{this.props.cityName}
				</button>
			</div>
		);
	}
}

const mapDispatchToProps = {
	selectCity, 
	updateCitiesErrorMessage
}

export default connect(
	null,
	mapDispatchToProps
)(CityButton);