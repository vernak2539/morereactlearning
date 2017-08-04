import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import './App.css';

import expect from 'expect';
import deepFreeze from 'deep-freeze';

const todos = (state = [], action) => {};

const testAddTodo = () => {
	const stateBefore = [];
	const action = {
		type: 'ADD_TODO',
		id: 0,
		text: 'Learn Redux'
	};
	const stateAfter = [
		{
			completed: false,
			id: 0,
			text: 'Learn Redux'
		}
	];
	deepFreeze(stateBefore)
	deepFreeze(action)

	expect(todos(stateBefore, action)).toEqual(stateAfter)
};

testAddTodo();
console.log('tests passed')
