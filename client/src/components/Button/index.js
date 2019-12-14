import React from 'react';
import { Link } from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faShoppingBag from '@fortawesome/fontawesome-free-solid/faShoppingBag';

const Button = ({ type, title, style, linkTo, altClass, runAction }) => {
  const buttons = () => {
    let template = ``;
    switch (type) {
      case 'default': {
        template = (
          <Link
            className={altClass ? altClass : 'link_default'}
            to={linkTo}
            style={{ ...style }}
          >
            {title}
          </Link>
        );
        break;
      }
      case 'bag_link': {
        template = (
          <div className="bag_link" style={{ ...style }} onClick={() => runAction()}>
            <FontAwesomeIcon icon={faShoppingBag} />
          </div>
        );
        break;
      }
      default:
        template = null;
    }
    return template;
  };
  return <div className="my_link">{buttons()}</div>;
};

export default Button;
