import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
// import './App.css';
// import { createStore } from 'redux';
import PropTypes from 'prop-types';

import expect from 'expect';
import deepFreeze from 'deep-freeze';

const visibilityFilter = (state = 'SHOW_ALL', action) => {
	switch (action.type) {
		case 'SET_VISIBILITY_FILTER':
			return action.filter;
		default:
			return state;
	}
};

const todo = (state, action) => {
	switch (action.type) {
		case 'ADD_TODO':
			return {
				id: action.id,
				text: action.text,
				completed: false
			};
		case 'TOGGLE_TODO':
			if (state.id !== action.id) {
				return state;
			}
			return {
				...state,
				completed: !state.completed
			};
		default:
			return state;
	}
};

const todos = (state = [], action) => {
	switch (action.type) {
		case 'ADD_TODO':
			return [...state, todo(undefined, action)];
		case 'TOGGLE_TODO':
			return state.map(t => todo(t, action));
		default:
			return state;
	}
};

const getVisibleTodos = (todos, filter) => {
	switch (filter) {
		case 'SHOW_ALL':
			return todos;
		case 'SHOW_ACTIVE':
			return todos.filter(todo => !todo.completed);
		case 'SHOW_COMPLETED':
			return todos.filter(todo => todo.completed);
	}
};

const Link = ({ active, children, onClick }) => {
	if (active) {
		return (
			<span>
				{children}
			</span>
		);
	}
	return (
		<a
			href="#"
			onClick={e => {
				e.preventDefault();
				onClick();
			}}
		>
			{children}
		</a>
	);
};

class FilterLink extends Component {
	componentDidMount() {
		const { store } = this.context;
		this.unsubscribe = store.subscribe(() => {
			this.forceUpdate();
		});
	}
	componentWillUnmount() {
		this.unsubscribe();
	}
	render() {
		const props = this.props;
		const { store } = this.context;
		const state = store.getState();

		return (
			<Link
				active={props.filter === state.visibilityFilter}
				onClick={() => {
					store.dispatch({ type: 'SET_VISIBILITY_FILTER', filter: props.filter });
				}}
			>
				{props.children}
			</Link>
		);
	}
}
FilterLink.contextTypes = {
	store: PropTypes.object
};

const Todo = ({ onClick, completed, text }) => {
	return (
		<li onClick={onClick} style={{ textDecoration: completed ? 'line-through' : 'none' }}>
			{text}
		</li>
	);
};

class VisibleTodoList extends Component {
	componentDidMount() {
		const { store } = this.context;
		this.unsubscribe = store.subscribe(() => {
			this.forceUpdate();
		});
	}
	componentWillUnmount() {
		this.unsubscribe();
	}
	render() {
		const props = this.props;
		const { store } = this.context;
		const state = store.getState();

		return (
			<TodoList
				todos={getVisibleTodos(state.todos, state.visibilityFilter)}
				onTodoClick={id => store.dispatch({ type: 'TOGGLE_TODO', id })}
			/>
		);
	}
}
VisibleTodoList.contextTypes = {
	store: PropTypes.object
};

const TodoList = ({ todos, onTodoClick }) => {
	return (
		<ul>
			{todos.map(todo => <Todo key={todo.id} {...todo} onClick={() => onTodoClick(todo.id)} />)}
		</ul>
	);
};

let nextTodoId = 0;
const AddTodo = (props, { store }) => {
	let input;

	return (
		<div>
			<input
				ref={node => {
					input = node;
				}}
			/>
			<button
				onClick={() => {
					store.dispatch({
						type: 'ADD_TODO',
						text: input.value,
						id: nextTodoId++
					});
					input.value = '';
				}}
			>
				Add Todo
			</button>
		</div>
	);
};
AddTodo.contextTypes = {
	store: PropTypes.object
};

const Footer = () => {
	return (
		<div>
			<p>
				Show: <FilterLink filter="SHOW_ALL">All</FilterLink> <FilterLink filter="SHOW_ACTIVE">Active</FilterLink>{' '}
				<FilterLink filter="SHOW_COMPLETED">Completed</FilterLink>
			</p>
		</div>
	);
};

const todoApp = combineReducers({
	todos,
	visibilityFilter
});

class Provider extends Component {
	getChildContext() {
		return {
			store: this.props.store
		};
	}
	render() {
		return this.props.children;
	}
}
Provider.childContextTypes = {
	store: PropTypes.object
};

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
	<Provider store={createStore(todoApp)}>
		<TodoApp />
	</Provider>,
	document.getElementById('root')
);
