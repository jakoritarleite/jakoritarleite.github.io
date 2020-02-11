import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Header from './components/Header';
import { Home } from './pages';

const Routes = () => (
	<BrowserRouter>
		<Header />
		<Switch>
			<Route exact path="/" component={Home} />
		</Switch>
	</BrowserRouter>
);

export default Routes;