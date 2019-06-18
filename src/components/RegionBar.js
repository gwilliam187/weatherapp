import React, { Component } from 'react';
import { connect } from 'react-redux';

class UserBar extends Component {
	handleOnClick = () => {
		window.location.reload()
	};

	componentDidMount() {
		console.log(this.props.selectedRegion);
	}

	render() {
		return (
			<div className='col-12 card mb-3' style={{ maxHeight: '105px' }}>
				<div className='card-body'>
					<div className='form-group w-100 mb-0'>
						<label className='mb-0'>Current User</label>
						<div className='form-inline'>
							<div className='flex-grow-1 mr-sm-2'>
								<h5 className='mb-0'>{ this.props.selectedUser } in { this.props.selectedRegion }</h5>
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

const mapStateToProps = state => ({
	selectedUser: state.selectedUser,
	selectedRegion: state.selectedRegion,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(UserBar);