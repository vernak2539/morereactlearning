import uuid from 'uuid/v1';

const addTodo = value => {
	return {
		type: 'ADD_TODO',
		text: value,
		id: uuid()
	};
};

export default addTodo;
