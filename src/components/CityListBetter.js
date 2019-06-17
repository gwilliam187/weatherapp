import React from 'react';
import { connect } from 'react-redux';
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

import CityInput from './CityInput';
import CityButton from './CityButton';

class CityListBetter extends React.Component {
	renderRow = ({ index, style }) => {
		const city = this.props.cities[index];

		return <div style={style}><CityButton city={ city } key={ city._id } /></div>
	}

	renderList() {
		if(this.props.cities.length > 0) {
			return (
				<AutoSizer>
					{({ height, width }) => (
						<List
								height={ height }
								width={ width }
								itemCount={ this.props.cities.length }
								itemSize={ 70 }>
							{ this.renderRow }	
						</List>
					)}
				</AutoSizer>
			);
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
					</div>
					<div style={ styles.listWrapper }>
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
	listWrapper: {
		height: '100%',
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
)(CityListBetter);