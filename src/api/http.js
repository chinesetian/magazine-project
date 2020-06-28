import fetchAxios from "@huangjingjing/axios-fetch";
import { getCache } from "../utils/cache";
import { message } from "antd";

const config = {
  // baseURL: "/",
  timeout: 60 * 1000,
  // xhrMode: "fetch",
  headers: {
    Accept: "*/*", //application/json; charset=utf-8",
    "Content-Type": "application/json" //charset=utf-8
  }
};

const $http = fetchAxios.create(config);

/**
 * 请求之前拦截动作
 */
$http.interceptors.request.use(
  response => {
    return response;
  },
  error => {
    console.error(error);
  }
);

/**
 * 请求之后拦截动作
 */
$http.interceptors.response.use(response => {
    return response;
    // if (response.status == 200) {
    //   return response.data;
    // } else {
    //   return Promise.reject(response.data);
    // }
    
  },
      // 对响应错误做点什么
  function httpUtilErrorRequest(error) {
    // message.error('系统异常');
    const result = error.response.data;
    if (error.response && error.response.status === 401) {
      message.warn(result ? '登录信息验证失败或已失效' : error.response.status);
      let token = getCache("Nessus.token", "local");
      if(token && token.length > 0){
        setTimeout(() => {
          window.Store.UserStore.logout();
        },1000)
      }
      // message.warn("用户名或密码错误！");
    } else if(error.response && error.response.status === 500){
        message.warn("服务器内部错误!");
    } else if(error.response && error.response.status === 400){
        message.warn("数据验证不通过!");
    } else if(error.response && error.response.status === 400){
        message.warn("服务异常!");
    }
    return Promise.reject(error.response);
  }
);

const $httpMultiPartInstance = fetchAxios.create({
  // xhrMode: "fetch",
  timeout: 30000,
  headers: {
    // "Content-Type": "multipart/form-data",
    Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3"
  }
});

$httpMultiPartInstance.interceptors.response.use(response => {
    return response.data;
  },
  error => {
    // 对响应错误做点什么
    message.warn("服务器内部错误!");
    // message.error('系统异常');
    return Promise.reject(error);
  }
);

const $httpMultiPart = function(options = {}) {
  options.headers = Object.assign({}, { 
    // Authorization: getCache("token", "session"),
    "Upgrade-Insecure-Requests": 1,
  }, options.headers);
  return $httpMultiPartInstance(options);
};

export const $httpRequest = function({ url, type, data, method, headers }) {
  let options = {};
  options.url = url;
  options.method = method || "get";
  options.headers = Object.assign(
    {
      "X-API-Token": `${getCache("apiToken", "local")}`, //'8e0a2c11-86e2-46fa-aaeb-424d584e81c0', //'e835344c-aa0f-4358-ad27-f3f5c1014fa3',  //192.168.101.183:8834
      "X-Cookie": `token=${getCache("Nessus.token", "local")}`, //getCache("token", "session")
    },
    headers
  );

  if (type === "query") {
    options.params = data || {};
  } else {
    options.data = data || {};
  }
  return $http(options);
};

export function httpRequest(component) {
  component.prototype.$http = $http;
  component.prototype.$httpRequest = $httpRequest;
  component.prototype.$httpMultiPart = $httpMultiPart;
  return component;
}
