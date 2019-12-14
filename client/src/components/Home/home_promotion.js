import React from 'react';
import Button from '../Button';

const HomePromotion = () => {
  const promotion = {
    img: '/images/featured/featured_home_3.jpg',
    lineOne: 'Up to 40% off',
    lineTwo: 'In second hand guitars',
    linkTitle: 'Shop now',
    linkTo: '/shop'
  };
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false
  };
  const renderPromotion = () =>
    promotion ? (
      <div
        className="home_promotion_img"
        style={{
          background: `url(${promotion.img})`
        }}
      >
        <div className="tag title">{promotion.lineOne}</div>
        <div className="tag low_title">{promotion.lineTwo}</div>
        <Button
          type="default"
          title={promotion.linkTitle}
          linkTo={promotion.linkTo}
          style={{ marginTop: '10px' }}
        />
      </div>
    ) : null;
  return <div className="home_promotion">{renderPromotion()}</div>;
};

export default HomePromotion;
