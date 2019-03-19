import React from 'react';
import { connect } from 'react-redux';

import CityButton from './CityButton';

class CityList extends React.Component {
	renderList() {
		return this.props.cities.map(city => {
			return (
				<CityButton cityName={city.cityName} countryCode={city.countryCode} key={city.cityName} />
			);
		});
	}

	render() {
		return (
			<div className='col-12'>
				{this.renderList()}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		cities: state.cities
	};
}

export default connect(
	mapStateToProps,
	null
)(CityList);