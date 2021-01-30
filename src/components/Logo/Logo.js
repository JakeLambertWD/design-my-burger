import React from 'react';
import burgerLogo from '../../assets/images/burger-logo.png';
import './Logo.css';

const logo = props => (
	<div className='Logo'>
		<img className='Img' src={burgerLogo} alt='My burger' />
	</div>
);

export default logo;
