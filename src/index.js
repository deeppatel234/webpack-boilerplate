import React from "react";
import ReactDom from "react-dom";

import Test from "src/Test";

import "./index.scss";

const App = () => <Test />;

const root = document.getElementById("root");

ReactDom.render(<App />, root);
