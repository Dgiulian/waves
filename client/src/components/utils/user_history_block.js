import React from 'react';
import moment from 'moment';

const UserHistoryBlock = (props) => {
  const renderBlocks = () =>
    props.products
      ? props.products.map((product, i) => (
          <tr key={i}>
            <td>{moment(product.dateofPurchase).format('MM-DD-YYYY')}</td>
            <td>
              {product.brand} {product.name}
            </td>
            <td>${product.price} </td>
            <td>{product.quantity}</td>
          </tr>
        ))
      : null;
  return (
    <div className="history_blocks">
      <table>
        <thead>
          <tr>
            <td>Date of purchase</td>
            <td>Product</td>
            <td>Price</td>
            <td>Quantity</td>
          </tr>
        </thead>
        <tbody>{renderBlocks()}</tbody>
      </table>
    </div>
  );
};

export default UserHistoryBlock;
