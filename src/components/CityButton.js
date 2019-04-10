import React from 'react';
import { connect } from 'react-redux';

import { removeCity, toggleCityIsPublic, toggleCityName } from '../actions';
import { selectCity } from '../actions/selectedCityActions';
import { updateCitiesErrorMessage } from '../actions'
import { removeCityDocument } from '../actions/rxdbActions';

export class CityButton extends React.Component {
	
	handleCityClick = () => {
		this.props.updateCitiesErrorMessage(null, null);
		this.props.selectCity(this.props.city);
	};

	handlePublicClick = () => {
		this.props.toggleCityIsPublic(this.props.city);
		//this.props.toggleCityName(this.props.city);
	};

	handleCloseClick = () => {
		this.props.removeCityDocument(this.props.city);
	};

	renderPublicButton() {
		const faded = this.props.city.isPublic ? '' : 'faded';
		return (
			<div 
				className={`d-flex align-items-center justify-content-center mr-4 ${faded} public-button`}
				onClick={ this.handlePublicClick }>
				{ this.props.city.isPublic ? "Public" : "Private" }
			</div>
		);
	}

	render() {
		return (
			<div className='d-flex border-top border-bottom city-button'>
				<div 
					className='mr-auto city-button-main'
					onClick={ this.handleCityClick }>
					<div className='name'>{ this.props.city.cityName }</div>
					<div className='ref'>{ this.props.city._id }</div>
				</div>
				{ this.renderPublicButton() }
				<div className='d-flex align-items-center justify-content-center'>
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
	removeCity,
	toggleCityIsPublic,
	updateCitiesErrorMessage,
	removeCityDocument
}

export default connect(
	null,
	mapDispatchToProps
)(CityButton);