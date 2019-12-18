import axios from 'axios';
import { USER_SERVER, PRODUCT_SERVER } from '../../utils/misc';
import {
  AUTH_USER,
  LOGIN_USER,
  LOGOUT_USER,
  REGISTER_USER,
  UPDATE_PROFILE,
  CLEAR_UPDATE_PROFILE,
  ADD_TO_CART,
  GET_CART_ITEMS,
  REMOVE_CART_ITEM,
  ON_SUCCESS_BUY
} from './types';

export function loginUser(dataToSubmit) {
  const request = axios
    .post(`${USER_SERVER}/login`, dataToSubmit)
    .then(response => response.data);
  return {
    type: LOGIN_USER,
    payload: request
  };
}

export function registerUser(dataToSubmit) {
  const request = axios
    .post(`${USER_SERVER}/register`, dataToSubmit)
    .then(response => response.data);
  return {
    type: REGISTER_USER,
    payload: request
  };
}
export function auth() {
  const request = axios
    .get(`${USER_SERVER}/auth`)
    .then(response => response.data);
  return {
    type: AUTH_USER,
    payload: request
  };
}

export function logoutUser() {
  const request = axios
    .get(`${USER_SERVER}/logout`)
    .then(response => response.data);
  return {
    type: LOGOUT_USER,
    payload: request
  };
}

export function addToCart(id) {
  const request = axios
    .post(`${USER_SERVER}/addtocart?productId=${id}`)
    .then(response => response.data);
  return {
    type: ADD_TO_CART,
    payload: request
  };
}

export function getCartItems(cartItems, userCart) {
  const request = axios
    .get(`${PRODUCT_SERVER}/articles_by_id?id=${cartItems}&type=array`)
    .then(response => {
      const products = response.data.products;
      products.forEach(product => {
        const cartItem = userCart.find(item => item.id === product._id);
        if (cartItem) {
          product.quantity = cartItem.quantity;
        }
      });
      return products;
    })
    .catch(error => null);
  return { type: GET_CART_ITEMS, payload: request };
}

export function removeCartItem(id) {
  const request = axios
    .post(`${USER_SERVER}/removeFromCart`, { id })
    .then(response => {
      const products = response.data.cartDetail;
      const userCart = response.data.cart;
      products.forEach(product => {
        const cartItem = userCart.find(item => item.id === product._id);
        if (cartItem) {
          product.quantity = cartItem.quantity;
        }
      });
      return products;
    });
  return { type: REMOVE_CART_ITEM, payload: request };
}

export function onSuccessBuy(data) {
  const request = axios
    .post(`${USER_SERVER}/successBuy`, data)
    .then(response => response.data);
  return { type: ON_SUCCESS_BUY, payload: request };
}

export function updateProfile(data) {
  const request = axios
    .post(`${USER_SERVER}/update_profile`, data)
    .then(response => response.data);
  return { type: UPDATE_PROFILE, payload: request };
}

export function clearUpdateProfile() {
  return { type: CLEAR_UPDATE_PROFILE, payload: '' };
}
