import React, { Component } from 'react';
import './ContactData.css';
import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
	state = {
		name: '',
		email: '',
		address: {
			street: '',
			postalCode: ''
		},
		loading: false
	};

	// Submit order
	orderHandler = e => {
		// Prevent form default request
		e.preventDefault();

		// Load Spinner
		this.setState({ loading: true });
		// Order
		const order = {
			ingredients: this.props.ingredients,
			price: this.props.totalPrice,
			customer: {
				name: 'max',
				address: {
					street: 'teststreet1',
					postcode: 'n1 2bh',
					country: 'England'
				},
				email: 'test@test.com'
			},
			deliveryMethod: 'Fastest'
		};
		// POST request to Firebase
		axios
			.post('/orders.json', order)
			.then(res => {
				// Remove Spinner & Modal
				this.setState({ loading: false });
				// redirect to home page
				this.props.history.push('/');
			})
			.catch(err => {
				// Remove Spinner & Modal
				this.setState({ loading: false });
			});
	};

	render() {
		let form = (
			<form>
				<input
					className='Input'
					type='text'
					name='name'
					placeholder='Your name'
				/>
				<input
					className='Input'
					type='email'
					name='email'
					placeholder='Your email'
				/>
				<input
					className='Input'
					type='text'
					name='street'
					placeholder='Street'
				/>
				<input
					className='Input'
					type='text'
					name='postal'
					placeholder='Postal code'
				/>
				<Button btnType='Success' clicked={this.orderHandler}>
					Order
				</Button>
			</form>
		);
		if (this.state.loading) form = <Spinner />;

		return (
			<div className='ContactData'>
				<h4>Enter your contact details</h4>
				{form}
			</div>
		);
	}
}

export default ContactData;
