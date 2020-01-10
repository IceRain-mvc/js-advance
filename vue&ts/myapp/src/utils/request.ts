import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
//UI


/*线上 /   线下  /api*/
let request = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? '' : '/api'
});

request.interceptors.response.use((res:AxiosResponse) => {

  return res.data;
},(error)=>{
  switch (error.state.code) {
    case 404:
      //UI.Meesgae
      break;
    case 500:
      //UI.Meesgae("服务端错误")
      break;
    default:
      return ;
  }
});

request.interceptors.request.use((req:AxiosRequestConfig) => {
  req.headers.token = localStorage.getItem("token");
  return req;
});


const get = request.get;
const post = request.post;
const deletes = request.delete;
const put = request.put;
const options = request.options;

export {
  get,
  post,
  deletes,
  put
}
