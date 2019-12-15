import React from 'react';
import Card from '../utils/card';

const CardBlockShop = ({ list = [], grid }) => {
  const renderCards = cards =>
    cards
      ? cards.map(card => <Card key={card._id} {...card} grid={grid} />)
      : null;

  return (
    <div className="card_block_shop">
      <div>
        <div>
          {list.length === 0 ? (
            <div className="no_result">Sorry, no results</div>
          ) : (
            renderCards(list)
          )}
        </div>
      </div>
    </div>
  );
};

export default CardBlockShop;
