import React from "react";
import { Button } from "react-bootstrap";
import StripeCheckout from "react-stripe-checkout";
import { connect } from "react-redux";
import * as actions from "../actions";

class Payments extends React.Component {
  render() {
    return (
      <StripeCheckout
        name="Emaily"
        description="Rs.5 For 5 email credits"
        amount={500}
        currency="INR"
        token={(token) => this.props.handleToken(token)}
        stripeKey={process.env.REACT_APP_STRIPE_PUBLIC_KEY}
      >
        <Button variant="dark">+ Add Credits</Button>
      </StripeCheckout>
    );
  }
}

export default connect(null, actions)(Payments);
