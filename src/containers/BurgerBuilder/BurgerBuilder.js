import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

// DATA: Prices
const TOPPING_PRICES = {
	salad: 0.2,
	bacon: 1,
	cheese: 0.3,
	meat: 1.4
};

export default class BurgerBuilder extends Component {
	// DATA
	state = {
		ingredients: {
			salad: 0,
			bacon: 0,
			cheese: 0,
			meat: 0
		},
		totalPrice: 4,
		purchasable: false,
		purchasing: false
	};

	// PURCHASE BUTTON DISABLED - true or false
	updatePurchaseState(currentIngredients) {
		const sum = Object.keys(currentIngredients) // [salad, bacon, cheese, meat]
			.map(igKey => {
				return currentIngredients[igKey]; // [0, 0, 0, 1];
			})
			// The reduce() method reduces the array to a single value.
			.reduce((sum, el) => {
				return sum + el;
			}, 0);
		// returns a boolean
		this.setState({ purchasable: sum > 0 });
	}

	// ADD INGREDIENT
	addIngredientHandler = type => {
		// get current value
		const oldCount = this.state.ingredients[type];
		// add 1 to the current value
		const updatedCount = oldCount + 1;
		// make a copy of the current ingredients object
		const updatedIngredients = {
			...this.state.ingredients
		};
		// update the value
		updatedIngredients[type] = updatedCount;
		// get the price of ingredient
		const priceAddition = TOPPING_PRICES[type];
		// get the current total price
		const oldPrice = this.state.totalPrice;
		// add price of the ingredient to the total price
		const newPrice = oldPrice + priceAddition;
		// update state to the new values
		this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
		this.updatePurchaseState(updatedIngredients);
	};

	// REMOVE INGREDIENT
	removeIngredientHandler = type => {
		// similar to addEventHandler
		const oldCount = this.state.ingredients[type];
		if (oldCount <= 0) {
			return;
		}
		const updatedCount = oldCount - 1;
		const updatedIngredients = {
			...this.state.ingredients
		};
		updatedIngredients[type] = updatedCount;
		const priceDeduction = TOPPING_PRICES[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice - priceDeduction;
		this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
		this.updatePurchaseState(updatedIngredients);
	};

	// TOGGLE MODAL
	purchaseHandler = () => {
		this.setState({ purchasing: true });
	};

	// CLOSE MODAL
	purchaseCancelHandler = () => {
		this.setState({ purchasing: false });
	};

	// CONTINUE ORDER
	purchaseContinueHandler = () => {
		alert('Continue');
	};

	render() {
		// DISABLE LESS BUTTON
		const disabledInfo = {
			...this.state.ingredients
		};
		// loop through all the keys in our object
		for (let key in disabledInfo) {
			// check if the values of our keys are true
			disabledInfo[key] = disabledInfo[key] <= 0;
			// expected outcome - {salad: true, bacon: false, ...}
		}

		return (
			<>
				<Modal
					show={this.state.purchasing}
					modalClosed={this.purchaseCancelHandler}
				>
					<OrderSummary
						ingredients={this.state.ingredients}
						price={this.state.totalPrice}
						purchaseCancelled={this.purchaseCancelHandler}
						purchaseContinued={this.purchaseContinueHandler}
					/>
				</Modal>
				<Burger ingredients={this.state.ingredients} />
				<BuildControls
					ingredientAdded={this.addIngredientHandler}
					ingredientRemoved={this.removeIngredientHandler}
					disabled={disabledInfo}
					price={this.state.totalPrice}
					purchasable={this.state.purchasable}
					ordered={this.purchaseHandler}
				/>
			</>
		);
	}
}
