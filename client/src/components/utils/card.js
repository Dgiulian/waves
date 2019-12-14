import React, { Component } from 'react';

class Card extends Component {
  renderCardImage = images =>
    images.length ? images[1] : '/images/image_not_availble.png';
  render() {
    const { grid, images, brand, name, price } = this.props;
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
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis
              quibusdam quaerat quia!
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default Card;
