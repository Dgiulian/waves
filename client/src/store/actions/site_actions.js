import axios from 'axios';
import { SITE_SERVER } from '../../utils/misc';
import { GET_SITE_DATA, UPDATE_SITE_DATA } from './types';

export function getSiteData() {
  const request = axios.get(`${SITE_SERVER}`).then(response => response.data.site);
  return {
    type: GET_SITE_DATA,
    payload: request
  };
}
export function updateSite(data) {
  const request = axios
    .post(`${SITE_SERVER}`, data)
    .then(response => response.data.site);
  return {
    type: UPDATE_SITE_DATA,
    payload: request
  };
}
