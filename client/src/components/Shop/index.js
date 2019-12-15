import React, { Component } from 'react';
import { connect } from 'react-redux';
import PageTop from '../utils/page_top';
import { getBrands, getWoods } from '../../store/actions/product_actions';
import { frets, prices } from '../../utils/fixed_categories';
import CollapseCheckBox from '../utils/CollapseCheckBox';
import CollapseRadio from '../utils/CollapseRadio';

class Shop extends Component {
  state = {
    grid: '',
    limit: 6,
    skip: 0,
    filters: {
      brand: [],
      frets: [],
      wood: [],
      price: []
    }
  };
  componentDidMount() {
    this.props.dispatch(getBrands());
    this.props.dispatch(getWoods());
  }
  handlePrice = price => {
    const data = prices;
    let array = [];
    for (let key in data) {
      if (data[key]._id === parseInt(price, 10)) {
        array = data[key].array;
      }
    }
    return array;
  };

  handleFilters = (filters, category) => {
    const newFilters = { ...this.state.filters };
    newFilters[category] = filters;
    if (category === 'price') {
      let priceValue = this.handlePrice(filters);
      newFilters[category] = priceValue;
    }
    this.setState({ filters: newFilters });
  };

  render() {
    const products = this.props.products;

    return (
      <div>
        <PageTop title="Browse products" />
        <div className="container">
          <div className="shop_wrapper">
            <div className="left">
              <CollapseCheckBox
                initState={true}
                title="brands"
                list={products.brands}
                handleFilters={filters => this.handleFilters(filters, 'brand')}
              />
              <CollapseCheckBox
                initState={false}
                title="Frets"
                list={frets}
                handleFilters={filters => this.handleFilters(filters, 'frets')}
              />

              <CollapseCheckBox
                initState={true}
                title="woods"
                list={products.woods}
                handleFilters={filters => this.handleFilters(filters, 'woods')}
              />
              <CollapseRadio
                initState={true}
                title="Prices"
                list={prices}
                handleFilters={filters => this.handleFilters(filters, 'price')}
              />
            </div>
            <div className="right">Right</div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  products: state.products
});
export default connect(mapStateToProps)(Shop);
