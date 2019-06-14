import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { selectRegion } from '../actions/selectedRegionActions';

class RegionPicker extends Component {
	onChange = (e) => {
		this.props.selectRegion(e.target.value);
	}

	componentDidMount() {
		console.log('why am i remounted');
	}

	renderList() {
		return this.props.regions.map(region => {
			return (
				<option key={ region } value={ region }>{ region }</option>
			);
		});
	}

	render() {
		if(!this.props.selectedRegion) {
			return (
				<div className='col-12 card mb-3'>
					<div className='card-body'>
						<div className='form-group w-100 mb-0'>
							<label>Pick a Region</label>
							<select onChange={ this.onChange } className='form-control'>
								<option disabled hidden selected value> -- select a region -- </option>
								{ this.renderList() }
							</select>
						</div>
					</div>
				</div>
			);
		} else {
			console.log(this.props.selectedRegion);
			return <Redirect to="/App" />;
		}
	}
}

const mapStateToProps = state => ({
	regions: state.regions,
	selectedRegion: state.selectedRegion,
});

const mapDispatchToProps = {
	selectRegion,
};

export default connect(mapStateToProps, mapDispatchToProps)(RegionPicker)
