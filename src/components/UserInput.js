import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { login } from '../actions/';
import { selectRegion } from '../actions/selectedRegionActions';
import { Redirect } from 'react-router-dom';
import { selectUser } from '../actions/userActions';

class UserInput extends Component {
	state = {
		value: ''
	};

	handleOnChange = (e) => {
		this.setState({ value: e.target.value });
	};

	handleOnKeyDown = (e) => {
		if(e.key === 'Enter') {
			this.login();			
		}
	}

	handleOnClick = (e) => {
		this.login();
		//this.selectUser(this.state.value);
	}

	login() {
		const userData = localStorage.getItem("weatherapp-username-data")
		const regionData = localStorage.getItem("weatherapp-region-data")
		const loginName = this.state.value
		// console.log(userData)
		if (userData==='no-user'){
			toast.info("No Users! Please Register")
		} else{
			if (userData.includes(',')){
				//more than one data, parse into array
				const parsedUserData = userData.split(',')
				const parsedRegionData = regionData.split(',')
				console.log("ParsedUserData: ")
				console.log(parsedUserData)
				console.log("ParsedRegionData: ")
				console.log(parsedRegionData)
				const findIndexResponse = parsedUserData.findIndex(res=>res===loginName)
				if (findIndexResponse!==-1){
					this.props.selectRegion(parsedRegionData[findIndexResponse])
				}  else{
					toast.error("We don't know who you are")
				}
			} else{
				if (userData===loginName){
					this.props.selectRegion(regionData)
				} else{
					toast.error("We don't know who you are")
				}
			}
		}
		// const findIndexResponse = userData.findIndex(res=>res===loginName)
		//
		// if 	(userData!=='no-user'){
		// 	if (findIndexResponse!==-1){
		// 		toast.info("User exist")
		// 	}
		// }


		//console.log(`login with ${ this.state.value }`);
		
	}

	render() {
		if	(this.props.loginState===0){
			return (
				<div className='col-12 card mb-3'>
					<div className='card-body'>
						<div className='form-group w-100 mb-0'>
							<label>Username</label>
							<div className=''>
								<input 
									type='text' 
									placeholder='Enter username' 
									value={ this.state.value }
									onChange={ this.handleOnChange }
									onKeyDown={ this.handleOnKeyDown }
									className='form-control form-control flex-grow-1 mb-2 mr-sm-2' />
								<div>
									<button
										onClick={ this.handleOnClick } 
										className='btn btn-primary btn-block mb-2 px-4'>Login</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			);
		}else{
			return (<Redirect to={{pathname: '/App', state: {name:this.state.value} }} />);
		}
	}
}

const mapStateToProps = state => {
	return {
		loginState : state.loginState
	};
};

const mapDispatchToProps = {
	selectRegion,
	login
};

export default connect(
	mapStateToProps, 
	mapDispatchToProps
)(UserInput);