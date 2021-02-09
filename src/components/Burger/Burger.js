import React from 'react';
import './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = props => {
	// Display each ingredient to the DOM
	let transformedIngredients = Object.keys(props.ingredients)
		.map(ingKey => {
			// Array will constructed if it contains an integer (greater than 0)
			return [...Array(props.ingredients[ingKey])].map((_, i) => {
				return <BurgerIngredient key={ingKey + i} type={ingKey} />;
			});
		})
		.reduce((arr, el) => {
			return arr.concat(el);
		}, []);

	// Error handling if no ingredients
	if (transformedIngredients.length === 0) {
		transformedIngredients = <p>Please start adding ingredients</p>;
	}

	// Display Burger to the DOM
	return (
		<div className='Burger'>
			<BurgerIngredient type='bread-top' />
			{transformedIngredients}
			<BurgerIngredient type='bread-bottom' />
		</div>
	);
};

export default burger;
