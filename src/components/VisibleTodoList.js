import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/todos';
import { withRouter } from 'react-router-dom';
import TodoList from './TodoList';
import { getVisibleTodos } from '../reducers';

class VisibleTodoList extends Component {
	componentDidMount() {
		this.fetchData();
	}
	componentDidUpdate(prevProps, prevState) {
		if (this.props.filter !== prevProps.filter) {
			this.fetchData();
		}
	}
	fetchData() {
		const { filter, fetchTodos } = this.props;
		fetchTodos(filter);
	}
	render() {
		const { toggleTodo, ...rest } = this.props;

		return <TodoList {...rest} onTodoClick={toggleTodo} />;
	}
}

const mapStateToProps = (state, { match }) => {
	const filter = match.params.filter || 'all';
	return {
		todos: getVisibleTodos(state, filter),
		filter
	};
};

VisibleTodoList = withRouter(connect(mapStateToProps, actions)(VisibleTodoList));

export default VisibleTodoList;
