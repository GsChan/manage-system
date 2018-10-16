import Axios from 'axios'
import Qs from 'qs'
import ApiUrl from './url'

Axios.defaults.timeout = 5000
Axios.defaults.baseURL = ApiUrl.baseURL
// Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
Axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
Axios.defaults.withCredentials = true

// http request 拦截器
Axios.interceptors.request.use(
  config => {
    config.headers = {
      'Content-Type': 'application/json'
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

// http response 拦截器
// ajax请求回调之前拦截 对请求返回的信息做统一处理 比如error为401无权限则跳转到登陆界面
Axios.interceptors.response.use(
  response => {
    switch (response.data.error) {
      case 401:
        response.data.msg = '未授权，请登录'
        break
      default:
        break
    }
    return response
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

export default Axios // 这句千万不能漏下！！！

/**
 * post 方法封装
 * @param url
 * @param data
 * @returns {Promise}
 */
export function post (url, data = {}) {
  return new Promise((resolve, reject) => {
    Axios.post(url, data)
      .then(response => {
        resolve(response.data)
      }, err => {
          console.log(err);
        reject(err)
      })
  })
}
/**
 * get 方法封装
 * @param url
 * @param data
 * @returns {Promise}
 */
export function get (url, data = {}) {
  return new Promise((resolve, reject) => {
    Axios.get(url, {params: data})
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
  })
}
