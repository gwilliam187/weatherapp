import React from 'react';
import { connect } from 'react-redux';

class DiffDisplay extends React.Component {
	renderConditionally() {
		const weathers = this.props.weathers;

		if(weathers.length < 2) {
			return null;
		} else {
			return (
				<div className='mb-3 p-4 card diff-display'>
					<div className='text-center'><h4>Difference</h4></div>
					<div className='row'>
						<div className='col-6'>
							<div className='display-6 text-center'>
								{Math.abs(weathers[0].main.temp - weathers[1].main.temp).toFixed(2)}
								<span className='text-muted'>&deg;C</span>
							</div>
							<div className='text-muted text-center'>Temperature</div>
						</div>
						<div className='col-6'>
							<div className='display-6 text-center'>
								{Math.abs(weathers[0].wind.speed - weathers[1].wind.speed).toFixed(2)}
								<span className='text-muted'>m/s</span>
							</div>
							<div className='text-muted text-center'>Wind</div>
						</div>
					</div>
				</div>
			);
		}
	}

	render() {
		return <div>{this.renderConditionally()}</div>;
	}
}

const mapStateToProps = state => {
	return {
		weathers: state.weathers
	};
};

export default connect(
	mapStateToProps,
	null
)(DiffDisplay);