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
import ManageCategories from './components/Dashboard/Admin/manage_categories';
import ProductPage from './components/Product';
import UserCart from './components/Cart';
import UpdateProfile from './components/Dashboard/update_profile';
import ManageSite from './components/Dashboard/Admin/manage_site';
import PageNotFound from './components/utils/page_not_found';
import AddFile from './components/Dashboard/add_file';

const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/user/dashboard" exact component={Auth(Dashboard, true)} />
        <Route path="/user/cart" exact component={Auth(UserCart, true)} />
        <Route
          path="/admin/add_product"
          exact
          component={Auth(AddProduct, true)}
        />
        <Route
          path="/admin/manage_categories"
          exact
          component={Auth(ManageCategories, true)}
        />
        <Route
          path="/admin/add_file"
          exact
          component={Auth(AddFile, true)}
        />
        <Route
          path="/user/profile"
          exact
          component={Auth(UpdateProfile, true)}
        />
        <Route
          path="/admin/site_info"
          exact
          component={Auth(ManageSite, true)}
        />

        <Route path="/register" exact component={Auth(Register, false)} />
        <Route path="/product/:id" exact component={Auth(ProductPage, null)} />
        <Route
          path="/register_login"
          exact
          component={Auth(RegisterLogin, false)}
        />
        <Route path="/shop" exact component={Auth(Shop, null)} />
        <Route path="/" exact component={Auth(Home, null)} />
        <Route component={PageNotFound} />
      </Switch>
    </Layout>
  );
};

export default Routes;
