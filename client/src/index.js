import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './styles.css';
import Routes from './routes';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promisseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import Reducer from './store/reducers';

const createStoreWithMiddleware = applyMiddleware(
  promisseMiddleware,
  ReduxThunk
)(createStore);
const store = createStoreWithMiddleware(
  Reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </Provider>
);
ReactDOM.render(<App />, document.getElementById('root'));
