import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

// DATA: Prices
const TOPPING_PRICES = {
	salad: 0.2,
	bacon: 1,
	cheese: 0.3,
	meat: 1.4
};

class BurgerBuilder extends Component {
	// STATE
	state = {
		ingredients: null,
		totalPrice: 4,
		purchasable: false,
		purchasing: false,
		loading: false,
		error: false
	};

	// Retreive Firebase data
	componentDidMount() {
		axios
			.get(
				'https://create-my-burger-e2081-default-rtdb.firebaseio.com/ingredients.json'
			)
			.then(res => {
				this.setState({ ingredients: res.data });
			})
			.catch(err => {
				this.setState({ error: true });
			});
	}

	// PURCHASE BUTTON DISABLED
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
		// Encodes a URI component
		const queryParams = [];
		// ingredients
		for (let i in this.state.ingredients) {
			queryParams.push(
				encodeURIComponent(i) +
					'=' +
					encodeURIComponent(this.state.ingredients[i]) // [bacon=3,cheese=0,meat=1,salad=0]
			);
		}
		// price
		queryParams.push('price=' + this.state.totalPrice); // [bacon=3,cheese=0,meat=1,salad=0,price=4.2]

		// Join array with & symbol and converts to a string
		const queryString = queryParams.join('&');
		// Custom entry into the history stack
		this.props.history.push({
			pathname: '/checkout',
			search: '?' + queryString
		}); // /checkout?bacon=0&cheese=0&meat=0&salad=3&price=5.2
	};

	render() {
		// DISABLE LESS BUTTON
		const disabledInfo = {
			...this.state.ingredients
		};
		// loop through all the keys in our object
		for (let key in disabledInfo) {
			// check if the values of our keys are a positive number
			disabledInfo[key] = disabledInfo[key] <= 0;
			// expected outcome - {salad: true, bacon: false, ...}
		}

		let orderSummary = null;
		// Set Burger to the Spinner
		let burger = this.state.error ? <p>Can't load ingredients</p> : <Spinner />;
		// Check Ingredients are True
		if (this.state.ingredients) {
			// Display Burger & Build Controls to the UI
			burger = (
				<>
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
			// Display Order Summary to the UI
			orderSummary = (
				<OrderSummary
					ingredients={this.state.ingredients}
					price={this.state.totalPrice}
					purchaseCancelled={this.purchaseCancelHandler}
					purchaseContinued={this.purchaseContinueHandler}
				/>
			);
		}
		// set Order Summary to Spinner
		if (this.state.loading) {
			orderSummary = <Spinner />;
		}

		return (
			<>
				{/* prettier-ignore */}
				<Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
					{orderSummary}
				</Modal>
				{burger}
			</>
		);
	}
}

export default withErrorHandler(BurgerBuilder, axios);
