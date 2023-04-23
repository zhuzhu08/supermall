import axios from "axios";

// 方法一
export function request(config) {
    // 1. 创建实例
    const instance = axios.create({
            baseURL: 'http://123.207.32.32:7888/api/hy66',
            timeout: 5000
        })
        // 2.axios拦截器
        // 2.1请求拦截的作用
    instance.interceptors.request.use(config => {

        return config
    }, err => {
        // console.log(err)
    })


    // 2.2响应拦截
    instance.interceptors.response.use(res => {
        // console.log(res)
        return res.data
    }), err => {
        console.log(err)
    }

    //3.发送真正的网络请求
    return instance(config)

}