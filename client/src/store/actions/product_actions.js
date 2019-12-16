import axios from 'axios';

import { PRODUCT_SERVER } from '../../utils/misc';
import {
  GET_PRODUCTS_BY_SELL,
  GET_PRODUCTS_BY_ARRIVAL,
  GET_BRANDS,
  GET_WOODS,
  GET_PRODUCTS_TO_SHOP,
  ADD_PRODUCT,
  CLEAR_PRODUCT,
  ADD_BRAND,
  ADD_WOOD
} from './types';

export function getProductsBySell() {
  const request = axios
    .get(`${PRODUCT_SERVER}/articles?sortBy=sold&order=desc&limit=100`)
    .then(response => response.data.products);
  return {
    type: GET_PRODUCTS_BY_SELL,
    payload: request
  };
}

export function getProductsByArrival() {
  const request = axios
    .get(`${PRODUCT_SERVER}/articles?sortBy=createdAt&order=desc&limit=100`)
    .then(response => response.data.products);
  return {
    type: GET_PRODUCTS_BY_ARRIVAL,
    payload: request
  };
}

/* CATEGORIES */
export function getBrands() {
  const request = axios
    .get(`${PRODUCT_SERVER}/brands`)
    .then(response => response.data.brands);
  return {
    type: GET_BRANDS,
    payload: request
  };
}
export function getWoods() {
  const request = axios
    .get(`${PRODUCT_SERVER}/woods`)
    .then(response => response.data.woods);
  return {
    type: GET_WOODS,
    payload: request
  };
}

export function getProductsToShop(
  { skip, limit, filters = [] },
  previous = []
) {
  const data = { skip, limit, filters };
  const request = axios.post(`${PRODUCT_SERVER}/shop`, data).then(response => {
    const newList = [...previous, ...response.data.articles];
    console.log(newList);
    return {
      size: response.data.size,
      articles: newList
    };
  });
  return {
    type: GET_PRODUCTS_TO_SHOP,
    payload: request
  };
}

export function addProduct(data) {
  const request = axios
    .post(`${PRODUCT_SERVER}/article`, data)
    .then(response => response.data);
  return {
    type: ADD_PRODUCT,
    payload: request
  };
}

export function clearProduct() {
  return {
    type: CLEAR_PRODUCT
  };
}

export function addBrand(data, existingBrands = []) {
  const request = axios.post(`${PRODUCT_SERVER}/brand`, data).then(response => {
    const brands = [...existingBrands, response.data.brand];
    return { success: true, brands };
  });
  return {
    type: ADD_BRAND,
    payload: request
  };
}

export function addWood(data, existingWoods = []) {
  const request = axios.post(`${PRODUCT_SERVER}/wood`, data).then(response => {
    const woods = [...existingWoods, response.data.wood];
    return { success: true, woods };
  });
  return {
    type: ADD_WOOD,
    payload: request
  };
}
