import React from 'react';
import './CheckoutSummary.css';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

const CheckoutSummary = props => {
	return (
		<div className='CheckoutSummary'>
			<h1>WOW! That Burger looks fantastic!</h1>
			<div style={{ width: '100%', margin: 'auto' }}>
				<Burger ingredients={props.ingredients} />
			</div>
			<Button btnType='Danger' clicked={props.checkoutCancelled}>
				Cancel
			</Button>
			<Button btnType='Success' clicked={props.checkoutContinued}>
				Continue
			</Button>
		</div>
	);
};

export default CheckoutSummary;
