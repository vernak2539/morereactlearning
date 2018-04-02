import React from 'react';
import { Provider } from 'react-redux';
import TodoApp from './App';
import PropTypes from 'prop-types';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const Root = ({ store }) => (
	<Provider store={store}>
		<BrowserRouter>
			<Switch>
				<Route exact path="/" component={TodoApp} />
				<Route path="/:filter" component={TodoApp} />
			</Switch>
		</BrowserRouter>
	</Provider>
);

Root.propTypes = {
	store: PropTypes.object.isRequired
};

export default Root;
