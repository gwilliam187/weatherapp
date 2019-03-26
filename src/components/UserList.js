import React, { Component } from 'react';

class UserList extends Component {
	renderList() {
		// map function
	}

	render() {
		return(
			<div>
				<select>
					{ renderList(); }
				</select>
			</div>
		);
	}
}

export default UserList;