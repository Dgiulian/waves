import React from 'react';
import { connect } from 'react-redux';
import Button from '../Button';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faTruck from '@fortawesome/fontawesome-free-solid/faTruck';
import faCheck from '@fortawesome/fontawesome-free-solid/faCheck';
import faTimes from '@fortawesome/fontawesome-free-solid/faTimes';
import { addToCart } from '../../store/actions/user_actions';

const ProdInfo = props => {
  const { detail } = props;
  const showProdTags = () => (
    <div className="product_tags">
      {detail.shipping ? (
        <div className="tag">
          <div>
            <FontAwesomeIcon icon={faTruck} />
          </div>
          <div className="tag_text">
            <div>Free Shipping</div>
            <div>And Return</div>
          </div>
        </div>
      ) : null}
      {detail.available ? (
        <div className="tag">
          <div>
            <FontAwesomeIcon icon={faCheck} />
          </div>
          <div className="tag_text">
            <div>Available </div>
            <div>in store</div>
          </div>
        </div>
      ) : (
        <div className="tag">
          <div>
            <FontAwesomeIcon icon={faTimes} />
          </div>
          <div className="tag_text">
            <div>Not Available </div>
            <div>Preorder only</div>
          </div>
        </div>
      )}
    </div>
  );
  const showProdActions = () => (
    <div className="product_actions">
      <div className="price">$ {detail.price}</div>
      <div className="cart">
        <Button
          type="add_to_cart_link"
          title="Add to cart"
          runAction={() => {
            props.dispatch(addToCart(detail._id));
          }}
        />
      </div>
    </div>
  );
  const showProdSpecifications = () => (
    <div className="product_specifications">
      <h2>specs</h2>
      <div>
        <div className="item">
          <strong>Frets: </strong> {detail.frets}
        </div>
        <div className="item">
          <strong>Wood: </strong> {detail.wood.name}
        </div>
      </div>
    </div>
  );
  return detail ? (
    <div>
      <h1>{detail.brand.name}</h1>
      <p>{detail.description}</p>
      {showProdTags()}
      {showProdActions()}
      {showProdSpecifications()}
    </div>
  ) : null;
};

export default connect()(ProdInfo);
