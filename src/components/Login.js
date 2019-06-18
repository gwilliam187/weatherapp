import React from 'react'
import UserInput from './UserInput';
import RegionPicker from './RegionPicker';
import DeleteAllUsersButton from './DeleteAllUsersButton';

class Login extends React.Component{

	componentDidMount(){
		const userData = localStorage.getItem("weatherapp-username-data")
		const regionData = localStorage.getItem("weatherapp-region-data")
		if (userData===null) {
			localStorage.setItem("weatherapp-username-data", "no-user")
		}
		if (regionData===null){
			localStorage.setItem("weatherapp-region-data", "no-user")
		}
	}

	render() {
		return (
			<div className="container app">
				<div className='row flex-grow-1'>
					<div className='col-12 d-flex'>
						<div className='row flex-grow-1 align-self-center'>
							<div>Login</div>
							<UserInput />
							<div>New User</div>
							<RegionPicker />
							<DeleteAllUsersButton />
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Login;