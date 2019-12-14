import React, { Component } from 'react';
import Button from '../Button';

class Card extends Component {
  renderCardImage = images =>
    images.length ? images[1] : '/images/image_not_availble.png';
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
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis
              quibusdam quaerat quia!
            </div>
          ) : null}
          <div className="actions">
            <div className="button_wrapp">
              <Button
                type="default"
                altClass="card_link"
                title="View product"
                linkTo={`/product_detail/${_id}`}
                style={{ marginTop: 10 }}
                />
            </div>
            <div className="button_wrapp">
              <Button
              type="bag_link"
              style={{ marginTop: 10 }}
              runAction={()=>console.log("Added to cart")} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
