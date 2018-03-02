import deepFreeze from 'deep-freeze';
import todosReducer from '../todos';

describe('todo reducer', () => {
	test('it should reduce ADD_TODO correctly', () => {
		// arrange
		const stateBefore = [];
		const action = {
			type: 'ADD_TODO',
			id: 0,
			text: 'learn redux'
		};
		const stateAfter = [
			{
				id: 0,
				text: 'learn redux',
				completed: false
			}
		];

		deepFreeze(stateAfter);
		deepFreeze(action);

		// arrange
		const result = todosReducer(stateBefore, action);

		// assert
		expect(result).toEqual(stateAfter);
	});

	test('it should reduce TOGGLE_TODO correctly', () => {
		// arrange
		const stateBefore = [
			{
				id: 0,
				text: 'learn redux',
				completed: false
			}
		];
		const action = {
			type: 'TOGGLE_TODO',
			id: 0
		};
		const stateAfter = [
			{
				id: 0,
				text: 'learn redux',
				completed: true
			}
		];

		deepFreeze(stateBefore);
		deepFreeze(stateAfter);
		deepFreeze(action);

		// arrange
		const result = todosReducer(stateBefore, action);

		// assert
		expect(result).toEqual(stateAfter);
	});

	test('')
});
