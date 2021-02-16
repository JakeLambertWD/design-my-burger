import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import './ContactData.css';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Form/Input';

class ContactData extends Component {
	state = {
		orderForm: {
			name: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Your Name'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			street: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Street'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			zipCode: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'ZIP Code'
				},
				value: '',
				validation: {
					required: true,
					minLength: 5,
					maxLength: 5
				},
				valid: false,
				touched: false
			},
			country: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Country'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'Your E-Mail'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			deliveryMethod: {
				elementType: 'select',
				elementConfig: {
					options: [
						{ value: 'fastest', displayValue: 'Fastest' },
						{ value: 'cheapest', displayValue: 'Cheapest' }
					]
				},
				value: 'Fastest',
				validation: {},
				valid: true,
				touched: false
			}
		},
		formIsValid: false,
		loading: false
	};

	// 1. Form submit event handler
	orderHandler = event => {
		event.preventDefault();
		// load spinner
		this.setState({ loading: true });
		const formData = {};
		// get the contact form data
		for (let target in this.state.orderForm) {
			formData[target] = this.state.orderForm[target].value;
		}
		// get the details for the whole order
		const order = {
			ingredients: this.props.ingredients,
			price: this.props.totalPrice,
			orderData: formData
		};
		// post to firebase
		axios
			.post('/orders.json', order)
			.then(response => {
				this.setState({ loading: false });
				this.props.history.push('/');
			})
			.catch(error => {
				this.setState({ loading: false });
			});
	};

	// 2. Validate form fields
	checkValidity(value, rules) {
		let isValid = true;

		// Check the field is not blank
		if (rules.required) {
			// trim any white space
			isValid = value.trim() !== '' && isValid;
		}

		// Check minimum length
		if (rules.minLength) {
			isValid = value.length >= rules.minLength && isValid;
		}

		// Check maximum length
		if (rules.maxLength) {
			isValid = value.length <= rules.maxLength && isValid;
		}

		return isValid;
	}

	// 3. onChange event handler
	inputChangedHandler = (event, inputIdentifier) => {
		// order form
		const updatedOrderForm = {
			...this.state.orderForm
		};
		// single form element
		const updatedFormElement = {
			...updatedOrderForm[inputIdentifier]
		};
		// value of single form element
		updatedFormElement.value = event.target.value;

		// Validation
		updatedFormElement.valid = this.checkValidity(
			// value
			updatedFormElement.value,
			// validation rules
			updatedFormElement.validation
		);
		// input field has been touched (used)
		updatedFormElement.touched = true;

		// update form element
		updatedOrderForm[inputIdentifier] = updatedFormElement;

		// disable button when form isn't valid
		let formIsValid = true;
		for (let target in updatedOrderForm) {
			formIsValid = updatedOrderForm[target].valid && formIsValid;
		}

		// update the whole form in the state
		this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
	};

	render() {
		// Form elements
		const formElementsArray = [];
		for (let key in this.state.orderForm) {
			formElementsArray.push({
				id: key,
				config: this.state.orderForm[key]
			});
		}

		// Form
		let form = (
			<form onSubmit={this.orderHandler}>
				{/* Form elements */}
				{formElementsArray.map(formElement => (
					<Input
						key={formElement.id}
						elementType={formElement.config.elementType}
						elementConfig={formElement.config.elementConfig}
						value={formElement.config.value}
						invalid={!formElement.config.valid}
						shouldValidate={formElement.config.validation.required}
						touched={formElement.config.touched}
						valueType={formElement.id}
						changed={event => this.inputChangedHandler(event, formElement.id)}
					/>
				))}
				{/* Button */}
				<Button btnType='Success' disabled={!this.state.formIsValid}>
					ORDER
				</Button>
			</form>
		);

		// Spinner
		if (this.state.loading) {
			form = <Spinner />;
		}

		// JSX
		return (
			<div className='ContactData'>
				<h4>Enter your Contact Data</h4>
				{form}
			</div>
		);
	}
}

export default ContactData;
