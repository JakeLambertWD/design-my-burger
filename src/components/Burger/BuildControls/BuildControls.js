import React from 'react';
import './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

// CONTROL ATTRIBUTES
const controls = [
	{ label: 'Salad', type: 'salad' },
	{ label: 'Bacon', type: 'bacon' },
	{ label: 'Cheese', type: 'cheese' },
	{ label: 'Meat', type: 'meat' }
];

// Build the controls
const buildControls = props => (
	<div className='BuildControls'>
		{/* fix price to 2 decimal places  */}
		<p>
			Current Price: <strong>{props.price.toFixed(2)}</strong>
		</p>
		{/* Loop Controls */}
		{controls.map(ctrl => (
			// Display each control to the DOM
			<BuildControl
				key={ctrl.label}
				label={ctrl.label}
				// call function parsing type
				added={() => props.ingredientAdded(ctrl.type)}
				removed={() => props.ingredientRemoved(ctrl.type)}
				disabled={props.disabled[ctrl.type]}
			/>
		))}
		{/* Order button */}
		<button
			className='OrderButton'
			disabled={!props.purchasable}
			onClick={props.ordered}
		>
			ORDER NOW!
		</button>
	</div>
);

export default buildControls;
