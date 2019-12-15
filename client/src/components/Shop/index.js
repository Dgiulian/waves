import React, { Component } from 'react';
import { connect } from 'react-redux';
import PageTop from '../utils/page_top';
import {
  getBrands,
  getWoods,
  getProductsToShop
} from '../../store/actions/product_actions';
import { frets, prices } from '../../utils/fixed_categories';
import CollapseCheckBox from '../utils/CollapseCheckBox';
import CollapseRadio from '../utils/CollapseRadio';
import LoadMoreCards from './load_more_cards';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faBars from '@fortawesome/fontawesome-free-solid/faBars';
import faTh from '@fortawesome/fontawesome-free-solid/faTh';

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
    const { skip, limit, filters } = this.state;
    this.props.dispatch(getProductsToShop({ skip, limit, filters }));
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
    this.showFilteredResult(newFilters);
    this.setState({ filters: newFilters });
  };
  showFilteredResult = filters => {
    this.props
      .dispatch(
        getProductsToShop({ skip: 0, limit: this.state.limit, filters })
      )
      .then(() => this.setState({ skip: 0 }));
  };
  loadMoreCards = () => {
    const skip = this.state.skip + this.state.limit;
    this.props
      .dispatch(
        getProductsToShop(
          { skip, limit: this.state.limit, filters: this.state.filters },
          this.props.products.toShop
        )
      )
      .then(() => this.setState({ skip }));
  };
  handleGrid = () => {
    this.setState({ grid: !this.state.grid ? 'grid_bars' : '' });
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
            <div className="right">
              <div className="shop_options">
                <div className="shop_grids clear">
                  <div
                    className={`grid_btn ${this.state.grid ? '' : 'active'}`}
                    onClick={() => this.handleGrid()}
                  >
                    <FontAwesomeIcon icon={faTh} />
                  </div>
                  <div
                    className={`grid_btn ${!this.state.grid ? '' : 'active'}`}
                    onClick={() => this.handleGrid()}
                  >
                    <FontAwesomeIcon icon={faBars} />
                  </div>
                </div>
                <div>
                  <LoadMoreCards
                    grid={this.state.grid}
                    limit={this.state.limit}
                    size={products.toShopSize}
                    products={products.toShop}
                    loadMore={() => this.loadMoreCards()}
                  />
                </div>
              </div>
            </div>
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
