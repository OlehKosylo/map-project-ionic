import React from 'react';
import ReactDOM from 'react-dom';
import composedMapFunction from './App';

import {createStore} from "redux";
import { Provider } from "react-redux";
import {reducers} from "./redux/reducers";

export const store = createStore(
    reducers,
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      {
          composedMapFunction()
      }
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
