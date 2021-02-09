import React from 'react';
import './NavigationItem.css';
import { NavLink } from 'react-router-dom';

const NavigationItem = props => {
	return (
		<li className='NavigationItem'>
			{/* Navlink assigns a defualt active class */}
			<NavLink to={props.link} exact={props.exact}>
				{props.children}
			</NavLink>
		</li>
	);
};

export default NavigationItem;
