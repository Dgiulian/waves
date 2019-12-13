import React from 'react';
import { Link } from 'react-router-dom';
const links = [
  { name: 'My Account', linkTo: '/user/dashboard' },
  {
    name: 'User information',
    linkTo: '/user/user_profile'
  },
  {
    name: 'My Cart',
    linkTo: '/user/cart'
  }
];
const UserLayout = ({ children }) => {
  const generateLinks = links =>
    links.map((item, i) => (
      <Link key={i} to={item.linkTo}>
        {item.name}
      </Link>
    ));
  return (
    <div className="container">
      <div className="user_container">
        <div className="user_left_nav">
          <h2>My Account</h2>
          <div className="links">{generateLinks(links)}</div>
        </div>
        <div className="user_right">{children}</div>
      </div>
    </div>
  );
};

export default UserLayout;