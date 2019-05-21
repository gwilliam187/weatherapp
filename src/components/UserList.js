import React, { Component } from 'react';
import { selectUser, loadCities } from '../actions';
import { connect } from 'react-redux';

class UserList extends Component {
	state = {
		value: null
	};

	handleSelectChange = (e) => {
		this.setState({ value: e.target.value })
		// const value = e.target.value;
	}

	componentDidUpdate() {
		const value = this.state.value;
		this.props.selectUser(value);
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
					<div className='form-group w-100 mb-0'>
						<label>User</label>
						<select onChange={ this.handleSelectChange } className='form-control'>
							<option disabled hidden selected value> -- select a user -- </option>
							{ this.renderList() }
						</select>
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
	{ selectUser }
)(UserList);