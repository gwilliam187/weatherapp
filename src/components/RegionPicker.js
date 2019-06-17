import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { selectRegion } from '../actions/selectedRegionActions';

class RegionPicker extends Component {
	state = {
		usernameVal: '',
	};

	onChange = (e) => {
		this.props.selectRegion(e.target.value);
	}

	usernameOnChange = e => {
		this.props.setState({ usernameVal: e.target.value });
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
							<label>Username</label>
							<input 
									type='text' 
									placeholder='Enter username' 
									value={ this.state.value }
									onChange={ this.usernameOnChange }
									className='form-control form-control flex-grow-1 mb-2 mr-sm-2' />
							<label>Pick a Region</label>
							<select onChange={ this.onChange } className='form-control'>
								<option disabled hidden selected value> -- select a region -- </option>
								{ this.renderList() }
							</select>
							<div style={{ marginTop: 8 }}>
								<button className='btn btn-primary btn-block'>Register</button>
							</div>
						</div>
					</div>
				</div>
			);
		} else {
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
