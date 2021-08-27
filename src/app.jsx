import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import ApplicantTable from "./components/ApplicantTable";
import { store } from "./redux/store";
import "./styles.less";

function init(el, initialState) {
  ReactDOM.render(
    <Provider store={store}>
      <header className="header">My Pipeline</header>
      <ApplicantTable />
    </Provider>,
    el
  );
}

export { init };

