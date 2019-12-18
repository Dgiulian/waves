import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserLayout from '../../hoc/userlayout';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faFrown from '@fortawesome/fontawesome-free-solid/faFrown';
import faSmile from '@fortawesome/fontawesome-free-solid/faSmile';
import {
  getCartItems,
  removeCartItem,
  onSuccessBuy
} from '../../store/actions/user_actions';
import UserProductBlock from '../utils/user_product_block';
import Paypal from '../utils/paypal';

class UserCart extends Component {
  state = { loading: false, total: 0, showSuccess: false, showTotal: false };
  calculateTotal = cartDetail => {
    let total = cartDetail.reduce(
      (acc, item) => acc + parseInt(item.price, 10) * item.quantity,
      0
    );
    this.setState({ total, showTotal: true });
  };
  componentDidMount() {
    let cartItems = [];
    let user = this.props.user;
    if (user.userData.cart) {
      const cart = user.userData.cart;
      if (cart.length) {
        cart.forEach(item => cartItems.push(item.id));
        this.props.dispatch(getCartItems(cartItems, cart)).then(() => {
          if (this.props.user.cartDetail.length) {
            this.calculateTotal(this.props.user.cartDetail);
          }
        });
      }
    }
  }
  showNoItemMessage = () => (
    <div className="cart_no_items">
      <FontAwesomeIcon icon={faFrown} />
      <div>You have items</div>
    </div>
  );
  showSuccessMessage = () => (
    <div className="cart_no_items">
      <FontAwesomeIcon icon={faSmile} />
      <div>Your order is complete </div>
    </div>
  );
  removeFromCart = id => {
    this.props.dispatch(removeCartItem(id)).then(() => {
      if (this.props.user.cartDetail.length === 0) {
        this.setState({ showTotal: false });
      } else {
        this.calculateTotal(this.props.user.cartDetail);
      }
    });
  };
  transactionError = data => {};
  transactionCanceled = data => {};
  transactionSuccess = data => {
    this.props
      .dispatch(
        onSuccessBuy({
          cartDetail: this.props.user.cartDetail,
          paymentData: data
        })
      )
      .then(() => {
        if (this.props.user.successBuy) {
          this.setState({ showTotal: false, showSuccess: true });
        }
      });
  };
  render() {
    return (
      <UserLayout>
        <h1>My Cart</h1>

        <div className="user_cart">
          <UserProductBlock
            products={this.props.user}
            type="cart"
            removeItem={id => this.removeFromCart(id)}
          />
          {this.state.showTotal ? (
            <div className="user_cart_sum">
              <div>Total amount: $ {this.state.total}</div>
            </div>
          ) : this.state.showSuccess ? (
            this.showSuccessMessage()
          ) : (
            this.showNoItemMessage()
          )}
        </div>
        {this.state.showTotal ? (
          <div className="paypal_button_container"> Paypal</div>
        ) : null}
        <Paypal
          toPay={this.state.total}
          transactionError={data => this.transactionError(data)}
          transactionCanceled={data => this.transactionCanceled(data)}
          onSuccess={data => this.transactionSuccess(data)}
        />
      </UserLayout>
    );
  }
}
const mapStateToProps = state => ({ user: state.user });
export default connect(mapStateToProps)(UserCart);
