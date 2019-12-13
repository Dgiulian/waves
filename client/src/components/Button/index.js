import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({ type, title, style, linkTo }) => {
  const buttons = () => {
    let template = ``;
    switch (type) {
      case "default": {
        template = <Link className="link_default" to={linkTo} style={{...style}}>{title}</Link>
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
