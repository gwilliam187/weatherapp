import React, { Component } from 'react';

import { destroyDB } from '../actions/rxdbActions';

class DeleteAllUsersButton extends Component {
	async handleClearAllUsers(){
		const response = window.confirm("Are you sure you want to clear all user data?");
		if (response) {
			const userData = localStorage.getItem("weatherapp-username-data")
			if (userData!=='no-user'){
				if (userData.includes(',')){
					// more than one data therefore, parse into array
					const parsedUserData = userData.split(',')
					parsedUserData.forEach(async user=>{
						await destroyDB(user)
					})
				} else{
					// single data immediately delete
					await destroyDB(userData)
				}
			}

			localStorage.clear();
			window.location.reload()
		}
	}

	render() {
		return (
			<div style={ styles.wrapper }>
				<button className='btn btn-danger' onClick={()=>{this.handleClearAllUsers()}}>Clear All Users</button>
			</div>
		);
	}
}

const styles = {
	wrapper: {
		marginLeft: 'auto',
	},
};

export default DeleteAllUsersButton;