import React, { Component, Fragment } from 'react';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
	return class extends Component {
		state = {
			error: null
		};

		componentWillMount() {
			// reset the error message in the state to null
			this.reqInterceptor = axios.interceptors.request.use(req => {
				this.setState({ error: null });
				return req;
			});
			// get the error message response and set it to the state
			this.resInterceptor = axios.interceptors.response.use(
				res => res,
				error => {
					this.setState({ error: error });
				}
			);
		}

		componentWillUnmount() {
			axios.interceptors.request.eject(this.reqInterceptor);
			axios.interceptors.response.eject(this.resInterceptor);
		}

		// this is a method that sets the error in our state to null
		errorConfirmedHandler = () => {
			this.setState({ error: null });
		};

		render() {
			return (
				<Fragment>
					<Modal
						/* show if there is an error set in our state */
						show={this.state.error}
						modalClosed={this.errorConfirmedHandler}
					>
						{/* show error message if it is set in our state */}
						{this.state.error ? this.state.error.message : null}
					</Modal>
					<WrappedComponent {...this.props} />
				</Fragment>
			);
		}
	};
};

export default withErrorHandler;
