import React, { Component } from 'react';
import { connect } from 'react-redux';

import { unselectUser } from '../actions/userActions';

class UserBar extends Component {
	handleOnClick = () => {
		//this.props.unselectUser();
		window.location.reload()
	};

	render() {
		return (
			<div className='col-12 card mb-3'>
				<div className='card-body'>
					<div className='form-group w-100 mb-0'>
						<label className='mb-0'>Username</label>
						<div className='form-inline'>
							<div className='flex-grow-1 mr-sm-2'>
								<h5 className='mb-0'>{ this.props.selectedUser }</h5>
							</div>							
							<button
								onClick={ this.handleOnClick } 
								className='btn btn-primary'>Logout</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		selectedUser: state.selectedUser
	};
};

const mapDispatchToProps = {
	unselectUser
};

export default connect(mapStateToProps, mapDispatchToProps)(UserBar);