import { connect } from 'react-redux';
import { setVisiblityFilter } from '../actions/visibilityFilter';
import Link from './Link';

const mapStateToProps = (state, ownProps) => ({
	active: ownProps.filter === state.visibilityFilter
});

const mapDispatchToProps = (dispatch, ownProps) => ({
	onClick() {
		dispatch(setVisiblityFilter(ownProps.filter));
	}
});

const FilterLink = connect(mapStateToProps, mapDispatchToProps)(Link);

export default FilterLink;
