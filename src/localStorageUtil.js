export const loadState = () => {
	try {
		const sersialisedState = localStorage.getItem('state');
		if (sersialisedState === null) {
			return undefined;
		}
		return JSON.parse(sersialisedState);
	} catch (err) {
		return undefined;
	}
};

export const saveState = state => {
	try {
		const sersialisedState = JSON.stringify(state);
		localStorage.setItem('state', sersialisedState);
	} catch (err) {
		//z
	}
};
