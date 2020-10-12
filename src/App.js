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
const arr = ["投稿咨询", "稿件查询", "稿件修改", "文章检测"]

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      flag: false,
    }
  }

  async UNSAFE_componentWillMount() {
    this.setState({flag: false})
    const [dictType, dictData, imgs, BSConfig] = await this.fetchInit({});
    Dict.append(dictData.data, dictType.data, imgs.data)
    window.BSConfig = BSConfig;
    

    this.renderQQ();  
    this.setState({flag: true})

  }

  fetchInit(){
    return Promise.all([
      Service.base.dictType(), // 字典大类
      Service.base.dictData(), // 字典左右
      Service.base.image({}), // 图片
      Service.base.systemConfig(),
    ]);
  }

  /**
   * 动态渲染QQ
   */
  renderQQ() {
    let { Dict } = window
    let QQ = Dict.map.system_qq;
    let target = document.getElementsByClassName("fd-qqlist")[0];
    for(var i = 0; i< QQ.length; i++){
      let tagA = document.createElement('a');
      tagA.innerHTML = QQ[i].label;
      tagA.setAttribute('href', `tencent://message/?uin=${QQ[i].dictValue}&amp;Site=www.freeforver.cn&amp;Menu=yes`);
      tagA.setAttribute('target', '_blank');
      let h3 = document.createElement('h3');
      h3.setAttribute('class', 'fd-qqfgx');
      h3.innerHTML = arr[i];
      target.appendChild(h3);
      target.appendChild(tagA);
    }
    
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
