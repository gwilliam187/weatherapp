import React from 'react';
import { connect } from 'react-redux';

import { selectCity } from '../actions';
import { updateCitiesErrorMessage } from '../actions';

export class CityInput extends React.Component {
	state = {
		term: ''
	};

	handleOnKeyDown = (e) => {
		if(e.key === 'Enter') {
			this.props.updateCitiesErrorMessage(null, null);
			const termList = this.state.term.split(',');
			if(termList.length === 2) {
				this.props.selectCity({
					cityName: termList[0], 
					countryCode: termList[1]
				});
			}	else {
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
			<div className='card col-12'>
				<div className='card-body'>
					<label>Add city</label>
					<input 
						type='text'
						placeholder='e.g. Berlin,de'
						value={this.state.term}
						onChange={this.handleOnChange}
						onKeyDown={this.handleOnKeyDown} 
						className='form-control form-control-lg'/>
					<div className='text-left text-danger mt-1'>
						{this.props.citiesErrorMessage}
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		citiesErrorMessage: state.citiesErrorMessage
	};
};

const mapDispatchToProps = {
	selectCity, 
	updateCitiesErrorMessage
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CityInput);