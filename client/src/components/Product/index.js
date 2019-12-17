import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  getProductDetail,
  clearProductDetail
} from '../../store/actions/product_actions';
import PageTop from '../utils/page_top';
import ProdInfo from './prod_info';
import ProdImg from './prod_img';

class ProductPage extends Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.dispatch(getProductDetail(id)).then(response => {
      if (!this.props.products.productDetail) {
        this.props.history.push('/');
      }
    });
  }
  componentWillUnmount() {
    this.props.dispatch(clearProductDetail());
  }
  addToCartHandler = id => {};
  render() {
    return (
      <div>
        <PageTop title="Product detail" />
        <div className="container">
          {this.props.products.productDetail ? (
            <div className="product_detail_wrapper">
              <div className="left">
                <div style={{ width: '500px' }}>
                  <ProdImg detail={this.props.products.productDetail} />
                </div>
              </div>
              <div className="right">
                <ProdInfo
                  addToCart={id => this.addToCartHandler(id)}
                  detail={this.props.products.productDetail}
                />
              </div>
            </div>
          ) : (
            'Loading'
          )}
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({ products: state.products });
export default connect(mapStateToProps)(ProductPage);
