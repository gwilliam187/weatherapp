import React, { Component } from 'react';
import { connect } from 'react-redux';

class UserBar extends Component {
	render() {
		return (
			<div className='col-12 card mb-3'>
				<div className='card-body'>
					<div className='form-group w-100 mb-0'>
						<label className='mb-0'>Username</label>
						<div className='form-inline'>
							<div className='flex-grow-1 mb-2 mr-sm-2'><h5 className='mb-0'>Bob</h5></div>							
							<button
								onClick={ this.handleOnClick } 
								className='btn btn-primary mb-2'>Logout</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default UserBar;