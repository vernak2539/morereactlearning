import React from 'react';
import { connect } from 'react-redux';
import toggleTodo from '../actions/toggleTodo';
import { withRouter } from 'react-router-dom';

const Todo = ({ onClick, text, completed }) => (
	<li style={{ textDecoration: completed ? 'line-through' : 'none' }} onClick={onClick}>
		{text}
	</li>
);

const TodoList = ({ todos, onTodoClick }) => (
	<ul>{todos.map(todo => <Todo key={todo.id} {...todo} onClick={() => onTodoClick(todo.id)} />)}</ul>
);

const getVisibleTodos = (todos, filter) => {
	switch (filter) {
		case 'all':
			return todos;
		case 'active':
			return todos.filter(t => !t.completed);
		case 'completed':
			return todos.filter(t => t.completed);
		default:
			return todos;
	}
};

const mapStateToProps = (state, { match }) => ({
	todos: getVisibleTodos(state.todos, match.params.filter || 'all')
});

const VisibleTodoList = withRouter(connect(mapStateToProps, { onTodoClick: toggleTodo })(TodoList));

export default VisibleTodoList;
