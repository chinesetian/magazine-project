
import fetchAxios from 'fetch-like-axios'
// import { getCache } from "../utils/cache";
// import { message } from "antd";

const CancelToken = fetchAxios.CancelToken
const config = {
  baseURL: '/',
  timeout: 60 * 1000,
  xhrMode: 'fetch',
  headers: {
    Accept: 'application/json; charset=utf-8',
    'Content-Type': 'application/json; charset=utf-8'
  }
}

const $http = fetchAxios.create(config)

/**
 * 请求之前拦截动作
 */
$http.interceptors.request.use(
  response => response,
  error => console.error(error)
)

/**
 * 请求之后拦截动作
 */
$http.interceptors.response.use(
  response => response.data,
  function httpUtilErrorRequest(error) {
    // 对响应错误做点什么
    if (error.response && error.response.status === 401) {
      // window.BaseStore.user.logout({ isRedirect: true, isLogin: true })
    }
    if (!error.response) {
      console.error(error)
      return Promise.reject(error)
    }
    console.error(error.config, error.response)
    return Promise.reject(error.response)
  }
)

const $httpMultiPartInstance = fetchAxios.create({
  xhrMode: 'fetch',
  timeout: 10000,
  headers: {
    'Content-Type': 'multipart/form-data'
  }
})

$httpMultiPartInstance.interceptors.response.use(
  response => response.data,
  error => Promise.reject(error)
)

const $httpMultiPart = function(options = {}) {
  options.headers = Object.assign({}, {
    //  Authorization: window.Utils.getCache('token', 'session') 
    }, options.headers)
  return $httpMultiPartInstance(options)
}

const $httpInstance = fetchAxios.create(config)
export const $httpXMLInstance = function xhrRequest({ url, method = 'GET', data, headers, logInfo, isAsync = false }) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open(method, url, !isAsync)
    headers &&
      Object.keys(headers).forEach(key => {
        xhr.setRequestHeader(key, headers[key])
      })
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && (xhr.status === 200 || xhr.status === 304)) {
        let data
        try {
          data = JSON.parse(xhr.response)
        } catch (e) {
          data = xhr.response
        }
        resolve(data)
      }
      if (xhr.readyState === 4 && (xhr.status !== 200 || xhr.status !== 304)) {
        reject(xhr)
      }
    }
    xhr.send(data ? JSON.stringify(data) : null)
  })
}

export const $httpRequest = function({ url, type, data, method, headers, logInfo, cancelHttp = null }) {
  let options = {}
  // const token = window.Utils.getCache('token', 'session')
  const defaultHeader = {}
  // if (token) {
  //   defaultHeader.Authorization = token
  // }
  options.url = url
  options.method = method || 'get'
  options.headers = Object.assign(defaultHeader, headers)

  if (type === 'query') {
    options.params = data || {}
  } else {
    options.data = data || {}
  }
  if (cancelHttp) {
    options.cancelToken = new CancelToken(cancelHttp)
  }
  return $http(options)
}

export function httpRequest(component) {
  component.prototype.$http = $http
  component.prototype.$httpRequest = $httpRequest
  component.prototype.$httpMultiPart = $httpMultiPart
  component.prototype.$httpInstance = $httpInstance
  component.prototype.$httpXMLInstance = $httpXMLInstance
  return component
}
