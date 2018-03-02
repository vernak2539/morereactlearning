import React from 'react';

import VisibleTodoList from './components/VisibleTodoList';
import AddTodo from './components/AddTodo';
import Footer from './components/Footer';

const TodoApp = () => {
	return (
		<div>
			<AddTodo />
			<VisibleTodoList />
			<Footer />
		</div>
	);
};

export default TodoApp;
