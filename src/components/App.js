import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";

import AppPage from './AppPage';
import Login from './Login';

class App extends React.Component {
	render(){
		const baseUrl = process.env.PUBLIC_URL;

		return(
			<BrowserRouter>
				<Switch>
					<Route exact path={baseUrl+"/"} component={ Login } />
					<Route path={baseUrl+"/App"} component={ AppPage } />
				</Switch>
			</BrowserRouter>
		)
	}
}

export default App;