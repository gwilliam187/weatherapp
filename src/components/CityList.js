import React from 'react';
import { connect } from 'react-redux';
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

import CityInput from './CityInput';
import CityButton from './CityButton';
import CityListSyncSpinner from './CityListSyncSpinner';
import CityListSpinner from './CityListSpinner';

class CityList extends React.Component {
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
						<div>
							<strong style={ styles.title }>Cities</strong>
						</div>
						<div style={ styles.spinnerWrapper }>
							<CityListSpinner />
						</div>
						<div style={ styles.syncSpinnerWrapper }>
							<CityListSyncSpinner />
						</div>
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
		display: 'flex',
		flexDirection: 'row',
		marginBottom: 16,
	},
	title: {
		fontSize: '1.2em',
	},
	listWrapper: {
		height: '100%',
	},
	spinnerWrapper: {
		display: 'flex',
		marginLeft: 'auto',
		marginRight: 16,
	},
	syncSpinnerWrapper: {

	}
};

const mapStateToProps = state => {
	return {
		cities: state.cities,
	};
};

export default connect(
	mapStateToProps,
	null
)(CityList);