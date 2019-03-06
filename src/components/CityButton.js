import React from 'react';

class CityButton extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const eventHandler = this.props.eventHandler;
		
		return (
			<div className='col-3 py-2'>
				<button className='btn btn-outline-secondary btn-lg city-button' onClick={() => eventHandler(this.props.cityName)}>{this.props.cityName}</button>
			</div>
		);
	}
}

export default CityButton