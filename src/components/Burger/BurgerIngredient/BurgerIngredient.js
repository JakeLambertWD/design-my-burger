import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './BurgerIngredient.css';

// Check which ingredients parsed in and display to the DOM
class BurgerIngredient extends Component {
	render() {
		let ingredient = null;

		switch (this.props.type) {
			case 'bread-bottom':
				ingredient = <div className='BreadBottom'></div>;
				break;
			case 'bread-top':
				ingredient = (
					<div className='BreadTop'>
						<div className='Seeds1' />
						<div className='Seeds2' />
					</div>
				);
				break;
			case 'meat':
				ingredient = <div className='Meat'></div>;
				break;
			case 'cheese':
				ingredient = <div className='Cheese'></div>;
				break;
			case 'salad':
				ingredient = <div className='Salad'></div>;
				break;
			case 'bacon':
				ingredient = <div className='Bacon'></div>;
				break;
			default:
				ingredient = null;
		}

		return ingredient;
	}
}

// Prop type validation
BurgerIngredient.propTypes = {
	type: PropTypes.string.isRequired
};

export default BurgerIngredient;
