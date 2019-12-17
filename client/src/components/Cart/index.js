import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserLayout from '../../hoc/userlayout';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faFrown from '@fortawesome/fontawesome-free-solid/faFrown';
import faSmile from '@fortawesome/fontawesome-free-solid/faSmile';
import { getCartItems } from '../../store/actions/user_actions';
import UserProductBlock from '../utils/user_product_block';

class UserCart extends Component {
  state = { loading: false, total: 0, showSuccess: false, showTotal: false };
  componentDidMount() {
    let cartItems = [];
    let user = this.props.user;
    if (user.userData.cart) {
      const cart = user.userData.cart;
      if (cart.length) {
        cart.forEach(item => cartItems.push(item.id));
        this.props.dispatch(getCartItems(cartItems, cart)).then(() => {});
      }
    }
  }
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
        </div>
      </UserLayout>
    );
  }
}
const mapStateToProps = state => ({ user: state.user });
export default connect(mapStateToProps)(UserCart);
