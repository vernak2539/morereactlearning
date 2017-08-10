import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
// import PropTypes from 'prop-types';
import { Provider, connect } from 'react-redux';

// Action creators
let nextTodoId = 0;
const addTodo = text => {
	return {
		type: 'ADD_TODO',
		text,
		id: nextTodoId++
	};
};

const setVisiblityFilter = filter => {
	return {
		type: 'SET_VISIBILITY_FILTER',
		filter
	};
};

const toggleTodo = id => {
	return { type: 'TOGGLE_TODO', id };
};
// end action creators

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

const mapStateToFilterLinkProps = (state, ownProps) => {
	return {
		active: ownProps.filter === state.visibilityFilter
	};
};

const mapDispatchToFilterLinkProps = (dispatch, ownProps) => {
	return {
		onClick: () => dispatch(setVisiblityFilter(ownProps.filter))
	};
};

const FilterLink = connect(mapStateToFilterLinkProps, mapDispatchToFilterLinkProps)(Link);

const Todo = ({ onClick, completed, text }) => {
	return (
		<li onClick={onClick} style={{ textDecoration: completed ? 'line-through' : 'none' }}>
			{text}
		</li>
	);
};

const TodoList = ({ todos, onTodoClick }) => {
	return (
		<ul>
			{todos.map(todo => <Todo key={todo.id} {...todo} onClick={() => onTodoClick(todo.id)} />)}
		</ul>
	);
};

let AddTodo = ({ dispatch }) => {
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
					dispatch(addTodo(input.value));
					input.value = '';
				}}
			>
				Add Todo
			</button>
		</div>
	);
};

AddTodo = connect()(AddTodo);

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

const mapStateToTodoListProps = state => {
	return {
		todos: getVisibleTodos(state.todos, state.visibilityFilter)
	};
};

const mapDispatchToTodoListProps = dispatch => {
	return {
		onTodoClick: id => {
			dispatch(toggleTodo(id));
		}
	};
};

const VisibleTodoList = connect(mapStateToTodoListProps, mapDispatchToTodoListProps)(TodoList);

const todoApp = combineReducers({
	todos,
	visibilityFilter
});

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
