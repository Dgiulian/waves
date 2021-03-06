import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  LOGOUT_USER,
  ADD_TO_CART,
  GET_CART_ITEMS,
  REMOVE_CART_ITEM,
  ON_SUCCESS_BUY,
  UPDATE_PROFILE,
  CLEAR_UPDATE_PROFILE
} from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loginSuccess: action.payload };
    case REGISTER_USER: {
      return { ...state, register: action.payload };
    }
    case AUTH_USER: {
      return { ...state, userData: action.payload };
    }
    case LOGOUT_USER: {
      return { ...state, userData: {} };
    }
    case ADD_TO_CART:
      return {
        ...state,
        userData: { ...state.userData, cart: action.payload.cart }
      };
    case GET_CART_ITEMS:
      return { ...state, cartDetail: action.payload };
    case REMOVE_CART_ITEM:
      return { ...state, cartDetail: action.payload };
    case ON_SUCCESS_BUY:
      return {
        ...state,
        successBuy: action.payload.success,
        userData: { ...state.userData, cart: action.payload.cart },
        cartDetail: action.payload.cartDetail
      };
    case UPDATE_PROFILE:
      return { ...state, updateProfile: action.payload };
    case CLEAR_UPDATE_PROFILE:
      return { ...state, updateProfile: action.payload };

    default:
      return state;
  }
}
