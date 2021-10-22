import React from 'react';
import ReactDOM from 'react-dom';
import composedMapFunction from './App';

ReactDOM.render(
  <React.StrictMode>
      {
          composedMapFunction()
      }
  </React.StrictMode>,
  document.getElementById('root')
);
