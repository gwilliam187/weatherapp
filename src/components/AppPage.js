import React from 'react';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { Redirect } from 'react-router-dom';

import { createDB, setDB } from '../actions/rxdbActions';
import { loadCities, loadTrees } from '../actions';
import { fetchWeathersForSelectedCities } from '../actions/weatherActions';
import { selectObject } from '../actions/selectedObjectActions';
import RegionBar from './RegionBar';
import UserInput from './UserInput';
import UserBar from './UserBar';
import CityList from './CityList';
import CityInput from './CityInput';
import WeatherDisplay from './WeatherDisplay';
import DiffDisplay from './DiffDisplay';
import TreeList from "./TreeList";
import './custom-style.css';

toast.configure({
	autoClose: 3000
});

class AppPage extends React.Component {
	async componentDidMount() {
		if(this.props.selectedRegion) {
			// const db = await createDB(this.props.selectedUser, this.props.selectedRegion)
			// this.props.setDB(db)
			// this.props.loadCities(db);
			// this.props.loadTrees(db);
		}
	}

	componentDidUpdate() {
		// this.props.fetchWeathersForSelectedCities();
	}

	renderSidebar() {
		return (
			<div className='col-lg-4'>
				<div className='row'>
					<CityList />
					<TreeList />
					<CityInput />
				</div>
			</div>
		);
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

	renderCityDisplay() {
		return (
			<CityList />
		);
	}

	renderTreeDisplay() {
		return (
			<TreeList />
		);
	}

	renderDisplay() {
		if(this.props.selectedObject === 'cities') { return this.renderCityDisplay() }
		else if(this.props.selectedObject === 'trees') return this.renderTreeDisplay()
		else return <div></div>
	}

	getCityNavClass() {
		let css = 'btn btn-link nav-link ';
		if(this.props.selectedObject === 'cities') {
			css += 'active';
		}
		return css;
	}

	getTreeNavClass() {
		let css = 'btn btn-link nav-link ';
		if(this.props.selectedObject === 'trees') {
			css += 'active';
		}
		return css;
	}

	render() {
		if(this.props.selectedRegion) {
			return (
				<div className="container app align-items-start">
					<div className='row flex-grow-1'>
						<RegionBar />
						<div className='col-12 nav nav-pills mb-2'>
							<li className='nav-item'>
								<button 
										onClick={() => { this.props.selectObject('cities') }} 
										className={ this.getCityNavClass() }>Cities</button>
							</li>
							<li className='nav-item'>
								<button 
										onClick={() => { this.props.selectObject('trees') }}
										className={ this.getTreeNavClass() }>Trees</button>
							</li>
						</div>
						{ this.renderDisplay() }
					</div>
				</div>
			);
		} else {
			return <Redirect to='/' />;
		}
	}
}

const mapStateToProps = state => {
	return {
		selectedRegion: state.selectedRegion,
		selectedObject: state.selectedObject,
	};
};

const mapDispatchToProps = {
	fetchWeathersForSelectedCities, 
	loadCities, 
	loadTrees,
	createDB,
	setDB,
	selectObject,
};

export default connect(mapStateToProps, mapDispatchToProps)(AppPage);