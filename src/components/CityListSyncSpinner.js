import React, { Component } from 'react';
import { connect } from 'react-redux';

class CityListSyncSpinner extends Component {
	render() {
		if(this.props.citiesSync.isSyncing) {
			return (
				<div>
					<div className="spinner-border spinner-border-sm mr-2" role="status">
					</div>
					Syncing
				</div>
			);
		} else {
			return <div></div>
		}
	}
};

const mapStateToProps = state => ({
	citiesSync: state.citiesSync
});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(CityListSyncSpinner);