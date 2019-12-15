import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Layout from './hoc/layout';
import RegisterLogin from './components/RegisterLogin';
import Register from './components/RegisterLogin/register';
import Dashboard from './components/Dashboard';
import Auth from './hoc/auth';
import Shop from './components/Shop';
import AddProduct from './components/Dashboard/Admin/add_product';

const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/user/dashboard" component={Auth(Dashboard, true)} />
        <Route path="/admin/add_product" component={Auth(AddProduct, true)} />
        <Route path="/register" exact component={Auth(Register, false)} />
        <Route
          path="/register_login"
          exact
          component={Auth(RegisterLogin, false)}
        />
        <Route path="/shop" component={Auth(Shop, null)} />
        <Route path="/" exact component={Auth(Home, null)} />
      </Switch>
    </Layout>
  );
};

export default Routes;
