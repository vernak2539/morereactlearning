import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import VisibleTodoList from './components/VisibleTodoList';
import AddTodo from './components/AddTodo';
import Footer from './components/Footer';

import todosReducer from './reducers/todos';
import visibilityFilterReducer from './reducers/visibilityFilter';

const todoApp = combineReducers({
	todos: todosReducer,
	visibilityFilter: visibilityFilterReducer
});

const persistedState = {
	todos: [
		{
			id: 0,
			text: 'Welcome back',
			completed: false
		}
	]
};

const store = createStore(todoApp, persistedState);
console.log(store.getState())

const TodoApp = ({ store }) => {
	return (
		<div>
			<AddTodo />
			<VisibleTodoList />
			<Footer />
		</div>
	);
};

ReactDOM.render(
	<Provider store={store}>
		<TodoApp />
	</Provider>,
	document.getElementById('root')
);
