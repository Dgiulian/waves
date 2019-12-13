import React from 'react';
import Button from '../Button';
import Login from './login';

const RegisterLogin = () => {
  return (
    <div className="page_wrapper">
      <div className="container">
        <div className="register_login_container">
          <div className="left">
            <h1>New Customers</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores
              perferendis blanditiis illum consectetur dignissimos ab
              voluptates, earum atque delectus inventore quis, doloribus
              aspernatur nostrum odio.
            </p>
            <Button
              type="default"
              title="Create an account"
              linkTo="/register"
              style={{ margin: '10px 0 0 0 ' }}
            />
          </div>
          <div className="right">
            <h2>Registered customers</h2>
            <p>If you have an account please log in.</p>
            <Login />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterLogin;
