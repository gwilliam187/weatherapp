import React from 'react';
import { connect } from 'react-redux';

import CityButton from './CityButton';

class CityList extends React.Component {
	renderList() {
		if(this.props.cities.length > 0) {
			// console.log(this.props.cities);
			return this.props.cities.map(city => {
				// console.log(city);
				return (
					<CityButton city={ city } key={ city._id } />
				);
			});
		} else {
			return (
				<div className='default'>City list empty</div>
			);
		}
	}

	render() {
		return (
			<div className='col-12 card mb-3 city-list'>
				<div className='card-body'>
					<label>Cities</label>
					{ this.renderList() }
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		cities: state.cities
	};
};

export default connect(
	mapStateToProps,
	null
)(CityList);