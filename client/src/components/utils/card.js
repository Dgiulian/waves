import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addToCart } from '../../store/actions/user_actions';
import Button from '../Button';

class Card extends Component {
  renderCardImage = images =>
    images.length ? images[0].url : '/images/image_not_availble.png';
  handleAddToCart = id => {
    this.props.dispatch(addToCart(id));
  };
  render() {
    const { grid = '', _id, images, brand, name, price } = this.props;
    return (
      <div className={`card_item_wrapper ${grid}`}>
        <div
          className="image"
          style={{ background: `url(${this.renderCardImage(images)})` }}
        ></div>
        <div className="action_container">
          <div className="tags">
            <div className="brand">{brand.name}</div>
            <div className="name">{name}</div>
            <div className="price">${price}</div>
          </div>
          {grid ? (
            <div className="description">
              <p>{this.props.description}</p>
            </div>
          ) : null}
          <div className="actions">
            <div className="button_wrapp">
              <Button
                type="default"
                altClass="card_link"
                title="View product"
                linkTo={`/product/${_id}`}
                style={{ marginTop: 10 }}
              />
            </div>
            <div className="button_wrapp">
              <Button
                type="bag_link"
                style={{ marginTop: 10 }}
                runAction={() => this.handleAddToCart(_id)}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({ user: state.user });
export default connect(mapStateToProps)(Card);
