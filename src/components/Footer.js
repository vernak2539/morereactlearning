import { NavLink } from 'react-router-dom';
import React from 'react';

const Footer = () => {
	return (
		<div>
			<p>
				Show:{' '}
				<NavLink exact to="/" activeStyle={{ textDecoration: 'none', color: 'black' }}>
					All
				</NavLink>
				{', '}
				<NavLink to="/active" activeStyle={{ textDecoration: 'none', color: 'black' }}>
					Active
				</NavLink>
				{', '}
				<NavLink to="/completed" activeStyle={{ textDecoration: 'none', color: 'black' }}>
					Completed
				</NavLink>
			</p>
		</div>
	);
};

export default Footer;
