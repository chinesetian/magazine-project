import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Provider } from "mobx-react";
import { LocaleProvider } from "antd";
import zh_CN from "antd/lib/locale-provider/zh_CN";
import Store from './store'


// import Login from "./pages/login";
import HomeComponent from "./pages/AppHome";
import TestPage from "./pages/test";
import DetailHomeComponent from "./pages/DetailHome";


import "./App.css";

class App extends Component {
  render() {
    return (
      <LocaleProvider locale={zh_CN}>
        <Provider {...Store}>
          <BrowserRouter>
            <Switch>
              {/* <Route exact path="/login" component={Login} /> */}
              <Route path="/home" component={HomeComponent} />
              <Route exact path="/" render={(props) => <Redirect {...props} to="/home" />} />
              <Route exact path="/test" component={TestPage} />
              <Route path="/detail" component={DetailHomeComponent} />
            </Switch>
          </BrowserRouter>
        </Provider>
      </LocaleProvider>
    );
  }
}

export default App;
