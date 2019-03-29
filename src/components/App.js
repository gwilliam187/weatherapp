import React from 'react';
import { ToastContainer, toast, Flip } from 'react-toastify';
import { connect } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';

import { loadCities, updateCityToUser, addUser } from '../actions';
import { fetchWeathersForSelectedCities } from '../actions/weatherActions';
import UserList from './UserList';
import UserInput from './UserInput';
import UserBar from './UserBar';
import CityList from './CityList';
import CityInput from './CityInput';
import WeatherDisplay from './WeatherDisplay';
import DiffDisplay from './DiffDisplay';
import './custom-style.css';

class App extends React.Component {
	componentDidMount(){
		//this.props.addUser("steven_klarens");
		this.props.loadCities();
		// this.props.updateCityToUser();
	}

	componentDidUpdate() {
		this.props.fetchWeathersForSelectedCities();
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
			return (
				<div className='col-12 d-flex'>
					<div className='row flex-grow-1 align-self-end'>
						<UserInput />
					</div>
				</div>
			);
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
				<ToastContainer
					toastClassName='custom-toast'
					position="top-right"
					autoClose={3000}
					hideProgressBar
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnVisibilityChange
					draggable
					pauseOnHover
					transition={Flip}
				/>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		selectedCities: state.selectedCities,
		selectedUser: state.selectedUser
	};
};

const mapDispatchToProps = {
	fetchWeathersForSelectedCities, 
	loadCities, 
	updateCityToUser,
	addUser
};

export default connect(mapStateToProps, mapDispatchToProps)(App);