import React from 'react';

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

export default TodoList;
