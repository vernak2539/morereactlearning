import deepFreeze from 'deep-freeze';
import visibilityFilter from '../visibilityFilter';

describe('visibility filter reducer', () => {
	test('it should reduce visibilty filter correctly', () => {
		const stateBefore = 'SHOW_ALL';
		const action = {
			type: 'SET_VISIBILITY_FILTER',
			filter: 'WHATEVER'
		};
		const stateAfter = 'WHATEVER';

		deepFreeze(action);
		deepFreeze(stateBefore);
		deepFreeze(stateAfter);

		const result = visibilityFilter(stateBefore, action);

		expect(result).toEqual(stateAfter);
	});
});
