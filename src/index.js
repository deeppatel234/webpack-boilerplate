/* global NODE_ENV */
import React from 'react';
import ReactDom from 'react-dom';

import './index.css';

const App = () => {
  return <div>Hello World</div>;
};

const root = document.getElementById('root');

ReactDom.render(<App />, root);
