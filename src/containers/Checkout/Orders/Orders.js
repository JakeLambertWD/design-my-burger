import React, { Component } from "react";
import Order from "../../../components/Order/Order";

class Orders extends Component {
  state = {
    orders: [],
    loading: true,
  };

  componentDidMount() {
    this.setState({ loading: false });
  }

  render() {
    return (
      <div>
        {this.state.orders.map((order) => (
          <Order
            key={order.id}
            ingredients={order.ingredients}
            price={+order.price}
          />
        ))}
      </div>
    );
  }
}

export default Orders;
