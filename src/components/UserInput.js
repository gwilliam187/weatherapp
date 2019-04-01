import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../actions/';
import { Redirect } from 'react-router-dom';

class UserInput extends Component {
	state = {
		value: '',
		screenState: 0
	};

	handleOnChange = (e) => {
		this.setState({ value: e.target.value });
	};

	handleOnKeyDown = (e) => {
		if(e.key === 'Enter') {
			this.login();
			if	(this.props.selectedUser)
				this.setState({screenState: 1});
		}
	}

	handleOnClick = (e) => {
		this.login();
		if	(this.props.selectedUser)
			this.setState({screenState: 1});
	}

	login() {
		this.props.login(this.state.value);
		console.log(`login with ${ this.state.value }`);
	}

	render() {
		if	(this.state.screenState===0){
			return (
				<div className='col-12 card mb-3'>
					<div className='card-body'>
						<div className='form-group w-100 mb-0'>
							<label>Username</label>
							<div className='form-inline'>
								<input 
									type='text' 
									placeholder='Enter username' 
									value={ this.state.value }
									onChange={ this.handleOnChange }
									onKeyDown={ this.handleOnKeyDown }
									className='form-control form-control-lg flex-grow-1 mb-2 mr-sm-2' />
								<button
									onClick={ this.handleOnClick } 
									className='btn btn-primary btn-lg mb-2 px-4'>Login</button>
							</div>
						</div>
					</div>
				</div>
			);
		}else{
			return (<Redirect to="/App" />);
		}
	}
}

const mapStateToProps = state => {
	return {
		selectedUser: state.selectedUser
	};
};

export default connect(
	mapStateToProps, 
	{ login }
)(UserInput);