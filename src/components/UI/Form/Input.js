import React from 'react';

import './Input.css';

const input = props => {
	let inputElement = null;
	const inputClasses = ['InputElement'];

	// Dynamically add the invalid class
	if (props.invalid && props.shouldValidate && props.touched) {
		inputClasses.push('Invalid');
	}

	// Switch statement to deteremine the Form Element
	switch (props.elementType) {
		case 'input':
			inputElement = (
				<input
					className={inputClasses.join(' ')}
					{...props.elementConfig}
					value={props.value}
					onChange={props.changed}
				/>
			);
			break;
		case 'textarea':
			inputElement = (
				<textarea
					className={inputClasses.join(' ')}
					{...props.elementConfig}
					value={props.value}
					onChange={props.changed}
				/>
			);
			break;
		case 'select':
			inputElement = (
				<select
					className={inputClasses.join(' ')}
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
					className={inputClasses.join(' ')}
					{...props.elementConfig}
					value={props.value}
					onChange={props.changed}
				/>
			);
	}

	// Invalid error message
	let validationError = null;
	if (props.invalid && props.touched) {
		validationError = `Please enter a valid ${props.valueType}`;
	}

	// JSX
	return (
		<div className='Input'>
			{inputElement}
			<p className='ErrorMsg'>{validationError}</p>
		</div>
	);
};

export default input;
