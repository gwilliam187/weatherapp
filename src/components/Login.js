import React from 'react'
// import UserInput from './UserInput';
import RegionPicker from './RegionPicker';

class Login extends React.Component{
	render() {
		return (
			<div className="container app">
				<div className='row flex-grow-1'>
					<div className='col-12 d-flex'>
						<div className='row flex-grow-1 align-self-center'>
							<RegionPicker />
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Login;