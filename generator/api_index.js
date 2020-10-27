module.exports = function (name) {
  const template = `
// src/api/index.js
import axios from "axios";
import router from "../router/index";
import { Message } from "element-ui";
import config from "../global/config.js";
axios.defaults.timeout = 10000;
axios.defaults.withCredentials = true;

axios.defaults.baseURL = config.BASE_URL;

// if (process.env.NODE_ENV === "development") {
//   axios.defaults.baseURL = process.env.BASE_URL;
// } else if (process.env.NODE_ENV === "debug") {
//   axios.defaults.baseURL = "";
// } else if (process.env.NODE_ENV === "production") {
//   axios.defaults.baseURL = "";
// }

// post请求的时候，我们需要加上一个请求头，所以可以在这里进行一个默认的设置
// 即设置post的请求头为application/x-www-form-urlencoded;charset=UTF-8
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded;charset=UTF-8";

/**
 * 请求前拦截
 * 用于处理需要在请求前的操作
 */
axios.interceptors.request.use(
  (config) => {
    let YLJGDM = localStorage.getItem("YLJGDM");
    let params = [];
    if (params.length) {
      params = params.join(";");
    }
    config.headers["Authorization"] = params;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
/**
 * 请求响应拦截
 * 用于处理需要在请求返回后的操作
 */
axios.interceptors.response.use(
  (response) => {
    const responseCode = response.status;
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
    // 否则的话抛出错误
    if (responseCode === 200) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  (error) => {
    if (!error.response) {
      // 请求超时状态
      if (error.message.includes("timeout")) {
        console.log("超时了");
        Message.error("请求超时，请检查网络是否连接正常");
      } else {
        // 可以展示断网组件
        console.log("断网了");
        Message.error("请求失败，请检查网络是否已连接");
      }
    } else {
      // 服务器返回不是 2 开头的情况，会进入这个回调
      // 可以根据后端返回的状态码进行不同的操作
      // const responseCode = error.response.status;
      // switch (responseCode) {
      //   // 401：未登录
      //   case 401:
      //     // 跳转登录页
      //     router.replace({
      //       path: "/login",
      //       query: {
      //         redirect: router.currentRoute.fullPath
      //       }
      //     });
      //     break;
      //   // 403: token过期
      //   case 403:
      //     // 弹出错误信息
      //     Message({
      //       type: "error",
      //       message: "登录信息过期，请重新登录"
      //     });
      //     // 清除token
      //     localStorage.removeItem("token");
      //     // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
      //     setTimeout(() => {
      //       router.replace({
      //         path: "/login",
      //         query: {
      //           redirect: router.currentRoute.fullPath
      //         }
      //       });
      //     }, 1000);
      //     break;
      //   // 404请求不存在
      //   case 404:
      //     Message({
      //       message: "网络请求不存在",
      //       type: "error"
      //     });
      //     break;
      //   default:
      //     Message({
      //       message: error.response.data.message,
      //       type: "error"
      //     });
      // }
    }
    return Promise.reject(error);
  }
);
function errMessage() {
  Message.closeAll();
  Message({
    message: "服务异常，请检查网络或联系客服",
    type: "error",
    customClass: "pollingMsgBox",
    showClose: true,
    // onClose: this.reload,
    duration: 0,
  });
}
function getImageUrl(url) {
  return axios.defaults.baseURL + url;
}
function get(url, params = {}) {
  params = paramsDecode(params);
  url = url + params;
  return new Promise((resolve, reject) => {
    axios({ method: "get", url }).then(
      (response) => {
        let res = response.data;
        if (res.code === 0) {
          resolve(response.data);
        } else if (res.code === 1005) {
          router.push({
            path: "/login",
          });
        } else if (res.code === 1001) {
          reject(res);
          errMessage();
          console.log("status code:" + res.code, url);
        } else {
          reject(res);
        }
      },
      (reject) => {
        if (reject.status !== 0) {
          console.log("error", reject);
          errMessage();
        }
      }
    );
  });
}
function post(url, params, config = {}, options = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, params, config).then(
      (response) => {
        let res = response.data;
        if (res.code === 0) {
          resolve(response.data);
        } else if (res.code === 1005) {
          router.push({
            path: "/login",
          });
        } else if (res.code === 1001) {
          reject(res);
          errMessage();
          console.log("status code:" + res.code, url);
        } else {
          reject(res);
        }
      },
      (reject) => {
        if (reject.status !== 0) {
          console.log("error", reject);
          errMessage();
        }
      }
    );
  });
}
export { axios, get, post, getImageUrl };
    `;
  return { template, dir: "src/api", name: "index.js" };
};
