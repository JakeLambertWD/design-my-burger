import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Layout from './containers/Layout/Layout';
import Checkout from './containers/Checkout/Checkout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Orders from './containers/Checkout/Orders/Orders';

class App extends Component {
	render() {
		return (
			<div>
				<Layout>
					{/* Routes */}
					<Route path='/checkout' component={Checkout} />
					<Route path='/orders' component={Orders} />
					<Route path='/' exact component={BurgerBuilder} />
				</Layout>
			</div>
		);
	}
}

export default App;
