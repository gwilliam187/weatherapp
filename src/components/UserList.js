import React, { Component } from 'react';
import { selectUser, loadCityForSelectedUser } from '../actions';
import { connect } from 'react-redux';

class UserList extends Component {
	handleSelectChange(e){
		const value = e.target;
		selectUser(value); 
		loadCityForSelectedUser();
	}

	renderList() {
		return this.props.users.map(user => {
			return (
				<option key={ user } value={ user }>{ user }</option>
			);
		});
	}

	render() {
		return(
			<div className='col-12 card mb-3'>
				<div className='card-body'>
					<div className='form-inline'>
						<div className='form-group w-100 mb-0'>
							<div className='text-left w-25'><label className='d-inline'>User</label></div>
							<select onChange={handleSelectChange} className='form-control w-75'>
								<option disabled hidden selected value> -- select a user -- </option>
								{ this.renderList() }
							</select>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		users: state.users
	};
};

export default connect(
	mapStateToProps, 
	null
)(UserList);