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
    const [dictType, dictData, imgs] = await this.fetchInit({});
    Dict.append(dictData.data, dictType.data, imgs.data)
    this.setState({flag: true})
  }

  fetchInit(){
    return Promise.all([
      Service.base.dictType(), // 字典大类
      Service.base.dictData(), // 字典左右
      Service.base.image({}), // 图片
    ]);
  }

  render() {
    let { flag } = this.state;
    if(!flag){
      return null
    }
    console.log("appprops", this.props)
    return (
      <ConfigProvider locale={zh_CN}>
        <Provider {...Store}>
          <BrowserRouter>
            <Switch>
              {/* <Route exact path="/login" component={Login} /> */}
              <Route exact path="/" render={(props) => <Redirect {...props} to="/home" />} />
              <Route path="/home" component={HomeComponent} />
              <Route path="/detail/:name" component={DetailHomeComponent} />
              {/* <Route path="/detail/detailview?id" component={DetailHomeComponent} /> */}
              <Route exact path="/test" component={TestPage} />

            </Switch>
          </BrowserRouter>
        </Provider>
      </ConfigProvider>
    );
  }
}

export default App;
