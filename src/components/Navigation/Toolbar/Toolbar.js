import React from 'react';
import Logo from '../../Logo/Logo';
import './Toolbar.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = props => (
	<header className='Toolbar'>
		{/* <div onClick={props.drawerToggleClicked}>MENU</div> */}
		<DrawerToggle clicked={props.drawerToggleClicked} />
		<div className='LogoToolbar'>
			<Logo />
		</div>
		<nav className='DesktopOnly'>
			<NavigationItems />
		</nav>
	</header>
);

export default toolbar;