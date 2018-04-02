import { createStore, combineReducers } from 'redux';
import { loadState, saveState } from './localStorageUtil';
import throttle from 'lodash/throttle';
import todos from './reducers/todos';

const configureStore = () => {
	const persistedState = loadState();

	const todoApp = combineReducers({
		todos
	});

	const store = createStore(todoApp, persistedState);

	store.subscribe(
		throttle(() => {
			saveState({
				todos: store.getState().todos
			});
		}, 1000)
	);

	return store;
};

export default configureStore;
