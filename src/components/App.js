import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";

import AppPage from './AppPage';
import Login from './Login';

class App extends React.Component {
	render(){
		return(
			<BrowserRouter>
				<Switch>
					<Route exact path="/" component={ Login } />
					<Route path="/App" component={ AppPage } />
				</Switch>
			</BrowserRouter>
		)
	}
}

export default App;