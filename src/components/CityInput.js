import React from 'react';
import { connect } from 'react-redux';

import { addCity } from '../actions/cityActions';
import {addCityDocument} from '../actions/rxdbActions';
import { updateCitiesErrorMessage } from '../actions';

export class CityInput extends React.Component {
	state = {
		term: ''
	};

	handleOnKeyDown = (e) => {
		if(e.key === 'Enter') {
			// this.props.updateCitiesErrorMessage(null, null);
			// const termList = this.state.term.split(',');
			// if(termList.length === 2) {
			// 	this.props.selectCity({
			// 		cityName: termList[0], 
			// 		countryCode: termList[1]
			// 	});
			// }	else {
			// 	this.props.updateCitiesErrorMessage(null, 'INVALID_INPUT');
			// }
			const termList = this.state.term.split(',');
			if(termList.length === 2) {
				let cityName = termList[0];
				cityName = cityName.toLowerCase();
				cityName = cityName.replace(cityName[0], cityName[0].toUpperCase());
				const city = {
					"_id" : this.state.term.toLowerCase(),
					"cityName": cityName,
					"isPublic": true,
					"fromBackend": false
				};
				this.props.addCity(city);
				this.props.addCityDocument(city);
				// console.log(city);
			} else {
				this.props.updateCitiesErrorMessage(null, 'INVALID_INPUT');
			}
			this.setState({term: ''});
		}
	};

	handleOnChange = (e) => {
		this.setState({term: e.target.value});
	};

	render() {
		return(
			<div className='form-inline' style={ styles.wrapper }>
				<div style={ styles.inputWrapper }>
					<input 
						type='text'
						placeholder='e.g. Berlin,de'
						value={this.state.term}
						onChange={this.handleOnChange}
						onKeyDown={this.handleOnKeyDown} 
						className='form-control'
						style={ styles.input } />
				</div>
				<div style={ styles.buttonWrapper }>
					<button className='btn btn-primary'>Add City</button>
				</div>
			</div>
		);
	}
}

const styles = {
	inputWrapper: {
		flex: 1,
		paddingRight: 8,
	},
	input: {
		width: '100%',
	},
	buttonWrapper: {
		display: 'flex',
		flexBasis: 'auto',
	},
};

const mapStateToProps = state => {
	return {
		citiesErrorMessage: state.citiesErrorMessage
	};
};

const mapDispatchToProps = {
	addCity, 
	updateCitiesErrorMessage,
	addCityDocument
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CityInput);