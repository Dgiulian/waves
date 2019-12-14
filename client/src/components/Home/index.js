import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeSlider from './home_slider';
import HomePromotion from './home_promotion';
import {
  getProductsBySell,
  getProductsByArrival
} from '../../store/actions/product_actions';
class Home extends Component {
  componentDidMount() {
    this.props
      .dispatch(getProductsBySell())
  }
  render() {
    return (
      <div>
        <HomeSlider />
        <HomePromotion />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  products: state.products
});
export default connect(mapStateToProps)(Home);
