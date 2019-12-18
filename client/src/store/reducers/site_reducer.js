import { UPDATE_SITE_DATA, GET_SITE_DATA } from '../actions/types.js';

export default function(state = {}, action) {
  switch (action.type) {
    case GET_SITE_DATA:
      return { ...state, siteData: action.payload };
    case UPDATE_SITE_DATA:
      return { ...state, siteData: action.payload.siteInfo };
    default:
      return state;
  }
}
