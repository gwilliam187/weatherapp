import React from 'react';
import { connect } from 'react-redux';

import CityButton from './CityButton';

class CityList extends React.Component {
	renderList() {
		return this.props.cities.map(city => {
			return (
				<CityButton city={ city } key={ city.cityRef } />
			);
		});
	}

	render() {
		return (
			<div className='col-12 card mb-3 city-list'>
				<div className='card-body'>
					{this.renderList()}
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