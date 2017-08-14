import { createStore, applyMiddleware } from 'redux';
import todoApp from './reducers';
import reduxPromise from 'redux-promise';
import { createLogger } from 'redux-logger';

const configureStore = () => {
	const middlewares = [reduxPromise];

	if (process.env.NODE_ENV !== 'production') {
		middlewares.push(createLogger());
	}

	return createStore(todoApp, applyMiddleware(...middlewares));
};

export default configureStore;
