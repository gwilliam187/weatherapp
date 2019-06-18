import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

import { destroyDB } from '../actions/rxdbActions';
import { selectRegion } from '../actions/selectedRegionActions';
import { selectUser } from '../actions/userActions';

class RegionPicker extends Component {
	state = {
		usernameVal: '',
		region: ''
	};

	onChange = (e) => {
		this.setState({region: e.target.value});
	}

	usernameOnChange = e => {
		this.setState({ usernameVal: e.target.value });
	}

	register(){
		const newUser = this.state.usernameVal
		const newRegion = this.state.region

		const userData = localStorage.getItem("weatherapp-username-data")
		const regionData = localStorage.getItem("weatherapp-region-data")

		if (userData==='no-user' && regionData==='no-user'){
			localStorage.setItem("weatherapp-username-data", newUser)
			localStorage.setItem("weatherapp-region-data", newRegion)
			this.props.selectUser(newUser)
			this.props.selectRegion(newRegion)
		} else{
			if (userData.includes(',')){
				const parsedUserData = userData.split(',')
				const parsedRegionData = regionData.split(',')
				if (parsedUserData.includes(newUser)){
					toast.error("User Already Exist: Use login instead")
				} else{
					const userDataPush = [...parsedUserData, newUser]
					const regionDataPush = [...parsedRegionData, newRegion]

					localStorage.setItem("weatherapp-username-data", userDataPush.toString())
					localStorage.setItem("weatherapp-region-data", regionDataPush.toString())
					this.props.selectUser(newUser)
					this.props.selectRegion(newRegion)
				}
			}else{
				if (userData==='no-user') {
					if (userData !== newUser) {
						localStorage.setItem("weatherapp-username-data", newUser)
						localStorage.setItem("weatherapp-region-data", newRegion)
						this.props.selectUser(newUser)
						this.props.selectRegion(newRegion)
					} else {
						toast.error("User Already Exist: Use login instead")
					}
				}else{
					if (userData !== newUser) {
						localStorage.setItem("weatherapp-username-data", userData+','+newUser)
						localStorage.setItem("weatherapp-region-data", regionData+','+newRegion)
						this.props.selectUser(newUser)
						this.props.selectRegion(newRegion)
					} else {
						toast.error("User Already Exist: Use login instead")
					}
				}
			}
		}
	}

	async handleClearAllUsers(){
		const response = window.confirm("Are you sure you want to clear all user data?");
		if (response) {
			const userData = localStorage.getItem("weatherapp-username-data")
			if (userData!=='no-user'){
				if (userData.includes(',')){
					// more than one data therefore, parse into array
					const parsedUserData = userData.split(',')
					parsedUserData.forEach(async user=>{
						await destroyDB(user)
					})
				} else{
					// single data immediately delete
					await destroyDB(userData)
				}
			}

			localStorage.clear();
			window.location.reload()
		}
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
								<button className='btn btn-primary btn-block' onClick={()=>this.register()}>Register</button>
							</div>
							<hr />
							<div style={{ marginTop: 40, textAlign: 'center'  }}>
								<button className='btn btn-danger' onClick={()=>{this.handleClearAllUsers()}}>Clear All User</button>
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
	selectUser
};

export default connect(mapStateToProps, mapDispatchToProps)(RegionPicker)
