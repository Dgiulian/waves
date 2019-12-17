import React, { Component } from 'react';
import PaypalExpressBtn from 'react-paypal-express-checkout';

class Paypal extends Component {
  render() {
    const onSuccess = payment => {
      this.props.onSuccess(payment)      
    };
    const onCancel = data => {
      this.props.onCancel(data)            
    };
    const onError = err => {
      this.props.onError(err)            
    };
    let env = 'sandbox';
    let currency = 'USD';
    let total = this.props;
    const client = {
      sandbox:
        'AV6t-uUW9jNiX_TXk56YNtdHdTE2_YhCfWiuMfkaLAViOJbTqapj8u-Avomz706T01-HtCxzOK0zK6Be',
      production: ''
    };
    return (
      <div>
        <PaypalExpressBtn
          env={env}
          client={client}
          currency={currency}
          total={total}
          onError={onError}
          onSuccess={onSuccess}
          onCancel={onCancel}
          style={{
            size: 'large',
            color: 'blue',
            shape: 'rect',
            label: 'checkout'
          }}
        />
      </div>
    );
  }
}

export default Paypal;
