import React from 'react';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { Redirect } from 'react-router-dom';

import { createDB, setDB } from '../actions/rxdbActions';
import { loadCities, loadTrees } from '../actions';
import { fetchWeathersForSelectedCities } from '../actions/weatherActions';
import UserInput from './UserInput';
import UserBar from './UserBar';
import CityList from './CityList';
import CityInput from './CityInput';
import WeatherDisplay from './WeatherDisplay';
import DiffDisplay from './DiffDisplay';
import './custom-style.css';
import TreeList from "./TreeList";

toast.configure({
	autoClose: 3000
});

class AppPage extends React.Component {
	async componentDidMount() {
		if(this.props.selectedRegion) {
			console.log('here');
			// const db = await createDB(this.props.selectedUser)
			// this.props.setDB(db)
			// this.props.loadCities(db);
		} else {
			return (
				<Redirect to="/" />
			)
		}
	}

	componentDidUpdate() {
		// this.props.fetchWeathersForSelectedCities();
		console.log(this.props.selectedRegion);
	}

	renderSidebar() {
		if(this.props.selectedUser) {
			return (
				<div className='col-lg-4'>
					<div className='row'>
						<UserBar />
						<CityList />
						<CityInput />
					</div>
				</div>
			);
		} else {
			return (<Redirect to="/" />)
		}
	}

	renderWeatherDisplay() {
		if(this.state.cityList.length === 1) {
			return (
				<div className='row'>
					<div className='col-12 pb-3'>
						<WeatherDisplay />
					</div>
				</div>
			);
		} else if(this.state.cityList.length === 2) {
			return (
				<div className='row'>
					<div className='col-md-12 col-lg-6 pb-3'>
						<WeatherDisplay />
					</div>
					<div className='col-md-12 col-lg-6 pb-3'>
						<WeatherDisplay />
					</div>
				</div>
			);
		}
	}

	renderDiffDisplay() {
		if(this.state.tempList.length === 2) {
			return (
				<div className='row'>
					<div className='col-12'>
						<DiffDisplay tempList={this.state.tempList} windList={this.state.windList} />
					</div>
				</div>
			);
		}
	}

	render() {
		return (
			<div className="container app">
				<div className='row flex-grow-1'>
					{ this.renderSidebar() }
					<div className='col-lg-8'>
						<WeatherDisplay />
						<DiffDisplay />
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		selectedRegion: state.selectedRegion,
		// selectedCities: state.selectedCities,
		// selectedUser: state.selectedUser
	};
};

const mapDispatchToProps = {
	fetchWeathersForSelectedCities, 
	loadCities, 
	loadTrees,
	createDB,
	setDB
};

export default connect(mapStateToProps, mapDispatchToProps)(AppPage);