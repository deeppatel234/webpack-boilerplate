/* global NODE_ENV */
import React from 'react';
import ReactDom from 'react-dom';

import './index.css';

const App = () => {
  return <div>Hello World</div>;
};

const root = document.getElementById('root');

ReactDom.render(<App />, root);

if (NODE_ENV === 'production' && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/serviceWorker.js').then(
      registration => {
        console.log(
          'ServiceWorker registration successful with scope: ',
          registration.scope,
        );
      },
      err => {
        console.log('ServiceWorker registration failed: ', err);
      },
    );
  });
}
