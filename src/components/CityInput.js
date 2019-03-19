import React from 'react';
import { connect } from 'react-redux';

import { selectCity } from '../actions';
import { updateCitiesErrorMessage } from '../actions';

class CityInput extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			term: '',
			errorMessage: ''
		}
	}

	onKeyDown = (e) => {
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

	onChange = (e) => {
		this.setState({term: e.target.value});
	};

	render() {
		return(
			<div className='col-12 py-2'>
				<input 
					type='text'
					placeholder='e.g. Berlin,de'
					value={this.state.term}
					onChange={this.onChange}
					onKeyDown={this.onKeyDown} 
					className='form-control form-control-lg'/>
				<div className='text-left text-danger mt-1'>
					{this.props.citiesErrorMessage}
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

export default connect(
	mapStateToProps,
	{ selectCity, updateCitiesErrorMessage}
)(CityInput);