import { Provider } from 'react-redux';
import React from 'react';
import App from './App';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const Root = ({ store }) =>
	<Provider store={store}>
		<BrowserRouter>
			<Switch>
				<Route exact path="/" component={App} />
				<Route path="/:filter" component={App} />
			</Switch>
		</BrowserRouter>
	</Provider>;

export default Root;
