import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import { UserContext, users } from './UserContext';

import { Fetch } from './views/fetch'
import { FetchUser } from './views/fetchUser'
import { Undo } from './views/undo'

import './App.css';

function App() {

	return(
		<div id="app">
			<Router>
				<Switch>
					<Redirect exact from="/" to="/fetch" />
					<Route exact path="/fetch" render={() => <Fetch />} />
					<Route exact path="/fetch/:uuid" render={() => <FetchUser />} />
					<Route exact path="/undo" render={() => <Undo />} />
				</Switch>
			</Router>
		</div>
	)

}

export { App }
