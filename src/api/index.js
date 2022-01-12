import axios from 'axios'


let axiosApi = axios.create({
  baseURL: 'http://todo.com',
  timeout: '20000',
  headers: {},
})


axiosApi.interceptors.request.use((config) => {
  return config
})

axiosApi.interceptors.response.use((result) => {
  if (result.data.status != '1') {
    console.log('接口处理异常')
    return Promise.reject(result)
  }
  return result.data
}, result => {
  return Promise.reject(result)
})

export default axiosApi
