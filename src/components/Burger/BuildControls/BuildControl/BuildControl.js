import React from 'react';
import './BuildControl.css';

const buildControl = props => (
	<div className='BuildControl'>
		<div className='Label'>{props.label}</div>
		<button
			className='Less'
			onClick={props.removed}
			// disabled is a default property we can set on a HTML button
			// if true, it will disable button
			disabled={props.disabled}
		>
			Less
		</button>
		<button className='More' onClick={props.added}>
			More
		</button>
	</div>
);

export default buildControl;
