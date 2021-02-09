import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { Route } from 'react-router-dom';

class Checkout extends Component {
	state = {
		ingredients: null,
		totalPrice: 0
	};

	// Retreive data from query string
	componentWillMount() {
		// Extract the parameters from the query string of the URL
		const query = new URLSearchParams(this.props.location.search);
		const ingredients = {};
		let price = 0;
		// returns an array of a given object's own enumerable string-keyed property [key, value] pairs
		for (let param of query.entries()) {
			if (param[0] === 'price') {
				price = param[1];
				// ['price', '4.2']
			} else {
				ingredients[param[0]] = +param[1];
				// ['salad', '1']
			}
		}
		// Set state ingredients and total price
		this.setState({ ingredients: ingredients, totalPrice: price });
	}

	// Cancel Checkout
	checkoutCancelledHandler = () => {
		// Go back to the previous page
		this.props.history.goBack();
	};

	// Continue Checkout
	checkoutContinuedHandler = () => {
		// replace current URL
		this.props.history.replace('/checkout/contact-data');
	};

	render() {
		return (
			<div>
				<CheckoutSummary
					ingredients={this.state.ingredients}
					checkoutCancelled={this.checkoutCancelledHandler}
					checkoutContinued={this.checkoutContinuedHandler}
				/>
				{/* Nested Route */}
				<Route
					path={this.props.match.path + '/contact-data'}
					exact
					render={props => (
						<ContactData
							ingredients={this.state.ingredients}
							totalPrice={this.state.totalPrice}
							// parse over the props which include the history stack
							{...props}
						/>
					)}
				/>
			</div>
		);
	}
}

export default Checkout;
