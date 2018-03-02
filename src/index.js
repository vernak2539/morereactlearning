import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import todos from './reducers/todos';
import visibilityFilter from './reducers/visibilityFilter';

import TodoApp from './App';

const todoApp = combineReducers({
	todos,
	visibilityFilter
});

const store = createStore(todoApp);

ReactDOM.render(
	<Provider store={store}>
		<TodoApp />
	</Provider>,
	document.getElementById('root')
);

registerServiceWorker();
