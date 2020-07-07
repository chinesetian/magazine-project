import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Provider } from "mobx-react";
import { ConfigProvider } from "antd";
import zh_CN from "antd/lib/locale-provider/zh_CN";
import Store from './store'
import Service from './api';
import Dict from './dict'


// import Login from "./pages/login";
import HomeComponent from "./pages/AppHome";
import TestPage from "./pages/test";
import DetailHomeComponent from "./pages/DetailHome";


import "./App.less";

window.Service = Service;
window.Dict = Dict;

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      flag: false,
    }
  }

  async UNSAFE_componentWillMount() {
    this.setState({flag: false})
    const [dictType, dictData, ] = await this.fetchInit({});
    Dict.append(dictData.data, dictType.data)
    this.setState({flag: true})
  }

  fetchInit(){
    return Promise.all([
      Service.base.dictType(),
      Service.base.dictData(), 
    ]);
  }

  render() {
    let { flag } = this.state;
    if(!flag){
      return null
    }
    return (
      <ConfigProvider locale={zh_CN}>
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
      </ConfigProvider>
    );
  }
}

export default App;
