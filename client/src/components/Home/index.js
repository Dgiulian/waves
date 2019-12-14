import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  getProductsBySell,
  getProductsByArrival
} from '../../store/actions/product_actions';
import HomeSlider from './home_slider';
import HomePromotion from './home_promotion';
import CardBlock from '../utils/card_block';

class Home extends Component {
  componentDidMount() {
    this.props
      .dispatch(getProductsBySell())
    this.props
      .dispatch(getProductsByArrival())
  }
  render() {
    return (
      <div>
        <HomeSlider />
        <CardBlock list={this.props.products.bySell } title="Best selling guitars" />
        <HomePromotion />
        <CardBlock list={this.props.products.byArrival } title="New Arrivals" />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  products: state.products
});
export default connect(mapStateToProps)(Home);
