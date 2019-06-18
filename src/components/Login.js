import React from 'react'
import UserInput from './UserInput';
import RegionPicker from './RegionPicker';

class Login extends React.Component{

	// React.useEffect(()=>{
	// 	const userData = React.useState(localStorage.getItem("weatherapp-user-data"))
	// 	if (userData===null){
	// 		React.useEffect(()=>{
	// 			localStorage.setItem("weatherapp-user-data", JSON.stringify([]))
	// 		})
	// 	}
	// })

	componentDidMount(){
		const userData = localStorage.getItem("weatherapp-username-data")
		const regionData = localStorage.getItem("weatherapp-region-data")
		if (userData===null) {
			localStorage.setItem("weatherapp-username-data", "[]")
		}
		if (regionData===null){
			localStorage.setItem("weatherapp-region-data", "[]")
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
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Login;