import React from 'react';
import { connect } from 'react-redux';

import { selectCity } from '../actions';
import { updateCitiesErrorMessage } from '../actions'

export class CityButton extends React.Component {
	
	handleCityClick = () => {
		this.props.updateCitiesErrorMessage(null, null);
		this.props.selectCity(this.props.cityRef);
	};

	handlePublicClick = () => {
		
	};

	handleCloseClick = () => {
		
	};

	render() {
		return (
			<div className='d-flex border-top border-bottom city-button'>
				<div 
					className='mr-auto city-button-main'
					onClick={ this.handleCityClick }>
					{ this.props.cityName }
				</div>
				<div 
					className='d-flex align-items-center justify-content-center mr-4 public-button'
					onClick={ this.handlePublicClick }>
					Public
				</div>
				<div
					className='d-flex align-items-center justify-content-center'>
					<i 
						className='fas fa-times close-button' 
						onClick={ this.handleCloseClick } />
				</div>
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