import React, { Component } from 'react';
import { connect } from 'react-redux';

class CityListSpinner extends Component {
	render() {
		if(this.props.citiesFetcher.isFetching) {
			return (
				<div className='text-primary'>
					<div className="spinner-border spinner-border-sm text-primary mr-2" role="status"></div>
					Fetching
				</div>
			);
		} else {
			return <div></div>
		}
	}
};

const mapStateToProps = state => ({
	citiesFetcher: state.citiesFetcher,
});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(CityListSpinner);