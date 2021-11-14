import React from "react"
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {store} from './store'
import {Provider} from 'react-redux'

import reportWebVitals from "./reportWebVitals";
import Router from "./pages/popup";

import "./index.css";

store.then(store => {
  ReactDOM.render(
    <Provider store={store}>
      <React.StrictMode>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </React.StrictMode>
    </Provider>,
    document.getElementById("root")
  )
})


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
