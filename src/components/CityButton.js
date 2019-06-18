import React from 'react';
import { connect } from 'react-redux';

import { removeCity, toggleCityIsPublic } from '../actions';
import { selectCity } from '../actions/selectedCityActions';
import { updateCitiesErrorMessage } from '../actions'
import { removeCityDocument, updateCityName } from '../actions/rxdbActions';

export class CityButton extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			isEditing: false,
			nameVal: this.props.city.cityName
		};
	}
	
	// OnClick Handlers
	handleCityClick = () => {
		this.props.updateCitiesErrorMessage(null, null);
		// this.props.selectCity(this.props.city);
	};

	handleEditClick = () => {
		this.setState({ 
			isEditing: true, 
			nameVal: this.props.city.cityName 
		});
	};

	handlePublicClick = () => {
		this.props.toggleCityIsPublic(this.props.city);
		//this.props.toggleCityName(this.props.city);
	};

	handleCloseClick = () => {
		this.props.removeCityDocument(this.props.city);
	};

	handleCancelClick = () => {
		this.setState({ isEditing: false });
	};

	handleUpdateClick = () => {
		const city = {
			...this.props.city.toJSON(),
			newName: this.state.nameVal
		};
		this.props.updateCityName(city);
		this.handleCancelClick();
	};

	// onChange Handlers
	handleOnChange = e => {
		this.setState({ nameVal: e.target.value });
	};

	// onKeyDown Handlers
	handleOnKeyDown = e => {
		if(e.key === 'Enter') {
			this.handleUpdateClick();
		}
	};

	// renderPublicButton() {
	// 	const faded = this.props.city.isPublic ? '' : 'faded';
	// 	return (
	// 		<div
	// 			className={`d-flex align-items-center justify-content-center mr-2 ${faded} public-button`}
	// 			onClick={ this.handlePublicClick }>
	// 			{ this.props.city.isPublic ? "Public" : "Private" }
	// 		</div>
	// 	);
	// }

	renderEditRow() {
		return (
			<div className='d-flex flex-column border-top border-bottom city-button'>
				<div className='d-flex align-items-center pt-3'>
					<input 
							type='text' 
							value={ this.state.nameVal }
							onChange={ this.handleOnChange }
							onKeyDown={ this.handleOnKeyDown }
							className='form-control mr-2 name' />
					<i 
							className='fas fa-check mr-2 update-button' 
							onClick={ this.handleUpdateClick } />
					<i 
							className='fas fa-times cancel-button' 
							onClick={ this.handleCancelClick } />	
				</div>
				<div className='d-flex pb-3'>
					<div className='ref'>{ this.props.city._id }</div>
				</div>
			</div>
		);
	}

	renderViewRow() {
		const city = this.props.city.toJSON();
		const props = `
			${ city.country } - 
			${ city.location } - 
			${ city.region } - 
			${ city.countryCapital } - 
			${ city.currency } - 
			${ city.callingCode } -
			${ city.countrySurfaceArea } - 
			${ city.governmentType } - 
			${ city.averageMaleHeight } - 
			${ city.nationalDish } -
			${ city.population } - 
			${ city.lifeExpectancy } - 
			${ city.yearlyAverageTemperature } - 
			${ city.countryYearOfIndpendence }`;
		return (
			<div className='d-flex border-top border-bottom city-button'>
				<div 
					className='mr-auto city-button-main'
					onClick={ this.handleCityClick }>
					<div className='name'>{ /* this.state.nameVal */ city._id }</div>
					<div className='ref'>
						{ props }
					</div>
				</div>
				{  /* this.renderPublicButton() */ }
				{
					/* <div className='d-flex align-items-center justify-content-center mr-2'>
						<i 
							className='fas fa-pen close-button' 
							onClick={ this.handleEditClick } />
					</div> */
				}
				<div className='d-flex align-items-center justify-content-center'>
					<i 
						className='fas fa-times close-button' 
						onClick={ this.handleCloseClick } />
				</div>
			</div>
		);
	}

	render() {
		if(!this.state.isEditing) {
			return this.renderViewRow();
		} else {
			return this.renderEditRow();
		}
	}
}

const mapStateToProps = state => {
	return {
		cities: state.cities
	};
};

const mapDispatchToProps = {
	selectCity, 
	removeCity,
	toggleCityIsPublic,
	updateCitiesErrorMessage,
	updateCityName,
	removeCityDocument
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CityButton);