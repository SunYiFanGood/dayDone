import axios from 'axios';
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false });

// 所有错误对象
const messages = {
  401: '未授权',
  403: '禁止访问',
  404: '资源找不到',
  500: '服务器内部错误'
}

// 创建一个axios的实例
// 这个request功能和axios基本一致
const requestMock = axios.create({
  baseURL: '/mock', // 基础路径：公共请求地址前缀
  headers: {},
  // xhr.abort() 中断请求
  timeout: 10000, // 请求的超时时间，请求超过10000ms没有返回响应，就会自动中断请求
})

/*
  设置拦截器

  发送请求工作流程：(上一步的返回值会自动传递给下一步)
    触发请求拦截器的回调（接受参数：config，返回值：config）
      设置公共的请求参数
    发送请求（接受参数：config，返回值：response）
      发送请求的配置对象由请求拦截器的回调返回值指定
    触发响应拦截器的回调（接受参数：response，返回值：response.data.data）
      处理响应结果
    触发then/catch的回调（接受参数：response.data.data）
      then接收到的参数由上一步的返回值的指定
*/

// 请求拦截器
requestMock.interceptors.request.use((config) => {
  // 成功的回调
  // console.log('111');

  // 添加请求头参数
  // config.headers.token = 'xxx'
  NProgress.start();
  // config是请求的配置对象，将来发送请求的配置都是从config中读取的
  return config
},
  // () => {
  //   // 失败的回调，默认不会触发的
  //   console.log('222');
  // }
)

// 响应拦截器
requestMock.interceptors.response.use((response) => {
  // 响应成功/请求成功
  // console.log('333');
  NProgress.done();
  // 请求成功并不代表功能成功
  if (response.data.code === 200) {
    // 功能成功
    // 返回成功的状态，和数据
    return response.data.data
  } else {
    // 功能失败
    // 返回失败的状态，和错误原因
    return Promise.reject(response.data.message || '未知错误，请联系管理员')
  }

}, (error) => {
  NProgress.done();
  // 响应失败/请求失败
  let message = '未知错误，请联系管理员'
  console.dir(error);
  /*
    错误分为两种情况：
      1. 响应回来了，但是是失败的（此时error.response才会有值）
        响应状态码是 4xx 5xx
          判断error.response.status的值来判断到底是什么错误
      2. 响应没有回来（此时error.response是undefinded）
        网络超时
        断网了
          判断error.message的内容来判断到底是什么情况
  */

  if (error.response) {
    // 响应回来了
    message = messages[error.response.status];

    // if (error.response.status === 401) {
    //   message = '未授权'
    // }
    // else if (error.response.status === 403) {
    //   message = '禁止访问'
    // }
    // else if (error.response.status === 404) {
    //   message = '资源找不到'
    // }
    // else if (error.response.status === 500) {
    //   message = '服务器内部错误'
    // }
  } else {
    // 响应没有回来
    if (error.message.indexOf('timeout') > -1) {
      message = '网络超时，请连接WIFI试试'
    } else if (error.message.indexOf('Network') > -1) {
      message = '断网了，请打开网络链接试试'
    }
  }

  return Promise.reject(message)
})

export default requestMock