import React from 'react';
import { connect } from 'react-redux';

import CityInput from './CityInput';
import CityButton from './CityButton';

class CityList extends React.Component {
	renderList() {
		if(this.props.cities.length > 0) {
			return this.props.cities.map(city => {
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
			<div className='col-12 card city-list'>
				<div className='card-body'>
					<div style={ styles.headerWrapper }>
						<label>Cities</label>
						<CityInput />
						{ this.renderList() }
					</div>
				</div>
			</div>
		);
	}
}

const styles = {
	headerWrapper: {
		flexDirection: 'row',
	},
};

const mapStateToProps = state => {
	return {
		cities: state.cities
	};
};

export default connect(
	mapStateToProps,
	null
)(CityList);