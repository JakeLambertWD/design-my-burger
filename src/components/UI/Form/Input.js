import React from 'react';

import './Input.css';

const input = props => {
	let inputElement = null;

	// Switch statement to deteremine the Form Element
	switch (props.elementType) {
		case 'input':
			inputElement = (
				<input
					className='InputElement'
					{...props.elementConfig}
					value={props.value}
					onChange={props.changed}
				/>
			);
			break;
		case 'textarea':
			inputElement = (
				<textarea
					className='InputElement'
					{...props.elementConfig}
					value={props.value}
					onChange={props.changed}
				/>
			);
			break;
		case 'select':
			inputElement = (
				<select
					className='InputElement'
					value={props.value}
					onChange={props.changed}
				>
					{props.elementConfig.options.map(option => (
						<option key={option.value} value={option.value}>
							{option.displayValue}
						</option>
					))}
				</select>
			);
			break;
		default:
			inputElement = (
				<input
					className='InputElement'
					{...props.elementConfig}
					value={props.value}
					onChange={props.changed}
				/>
			);
	}

	// JSX
	return (
		<div className='Input'>
			<label className='Label'>{props.label}</label>
			{inputElement}
		</div>
	);
};

export default input;
