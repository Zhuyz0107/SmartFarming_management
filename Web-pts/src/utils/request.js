/*
 * @Description: axios的处理
 * @Author: Ronda
 * @Date: 2021-12-30 14:18:56
 * @LastEditors: Ronda
 * @LastEditTime: 2022-04-01 20:25:50
 */

import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import router from '@/router'
import { getToken } from '@/utils/auth'
import qs from 'qs'
// create an axios instance
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 10000 // request timeout
})

// 请求拦截器
service.interceptors.request.use(
    config => {
        // 请求发送之前的操作
        if (store.getters.token) {
            // 获取token设置到请求头
            config.headers['token'] = getToken()
        }
        return config
    },
    error => {
        // do something with request error
        console.log(error) // for debug
        return Promise.reject(error)
    }
)

// 响应拦截器
service.interceptors.response.use(
    response => {
        // res就是后端返回来的结果， {code:200,status:'ok',message:'成功',data:{} }
        const res = response.data

        // 如果是二进制流，直接下载
        if (res instanceof Blob) {
            return res
        }

        // if the custom code is not 200, it is judged as an error.
        if (res.code !== 200) {
            // 错误提示
            if (res.code === 0) {
                Message({ message: res.message, type: 'error', duration: 5 * 1000 })
            }

            // 消息弹框
            if (res.code === 500) {
                Message({ message: res.message, type: 'error', duration: 5 * 1000 })
            }

            // 用户不存在
            if (res.code === 1001) {
                Message({ message: res.message, type: 'error', duration: 5 * 1000 })
            }

            // 密码错误
            if (res.code === 1002) {
                Message({ message: res.message, type: 'error', duration: 5 * 1000 })
            }

            // 用户未登录
            if (res.code === 1003) {
                Message({ message: res.message, type: 'error', duration: 5 * 1000 })
            }

            // token过期
            if (res.code === 1004) {
                Message({ message: res.message, type: 'error', duration: 5 * 1000 })
                logout()
            }

            // token验证未通过
            if (res.code === 1005) {
                Message({ message: res.message, type: 'error', duration: 5 * 1000 })
            }

            // 参数为空
            if (res.code === 1006) {
                Message({ message: res.message, type: 'error', duration: 5 * 1000 })
            }

            // 数据不存在或者已删除
            if (res.code === 1007) {
                Message({ message: res.message, type: 'error', duration: 5 * 1000 })
            }

            // 数据关联其他数据，无法删除
            if (res.code === 1008) {
                Message({ message: res.message, type: 'error', duration: 5 * 1000 })
            }

            // 栏舍名称已存在
            if (res.code === 2001) {
                Message({ message: res.message, type: 'error', duration: 5 * 1000 })
            }

            // 动物不在养殖中
            if (res.code === 4001) {
                Message({ message: res.message, type: 'error', duration: 5 * 1000 })
            }

            // 账户禁用
            //if (res.code === 2005) {
            //    Message({ message: res.message, type: 'error', duration: 5 * 1000 })
            //}
            //// 没有权限
            //if (res.code === 2006) {
            //    Message({ message: res.message, type: 'error', duration: 5 * 1000 })
            //}
            //// 数据错误
            //if (res.code === 5001) {
            //    Message({ message: res.message, type: 'error', duration: 5 * 1000 })
            //}
            //// 数据已存在
            //if (res.code === 5003) {
            //    Message({ message: res.message, type: 'error', duration: 5 * 1000 })
            //}
            // 返回承诺失败对象
            return Promise.reject(new Error(res.message || 'Error'))
        } else {
            return res
        }
    },
    error => {
        console.log('err' + error) // for debug
        Message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
)

export function download(url, params) {
    return service.get(url, {
        params,
        responseType: 'blob'
    }).then(data => {
        // console.log(data)
        // 假设 data 是返回来的二进制数据
        const url = window.URL.createObjectURL(
            new Blob([data], {
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            })
        )
        const link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.setAttribute('download', 'excel.xlsx')
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    })
}

export function downloadWord(url, params, name = 'document') {
    return service.get(url, {
        params,
        responseType: 'blob'
    }).then(data => {
        // 假设 data 是返回来的二进制数据
        const url = window.URL.createObjectURL(
            new Blob([data], {
                type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
            })
        )
        const link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.setAttribute('download', name + '.docx')
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    })
}

export function get(url, params) {
    return service.get(url, {
        params, // get 请求时带的参数
        timeout: 10000,
        headers: {
            'X-Requested-With': 'XMLHttpRequest'
        }
    })
}

export function del(url, params) {
    return service.delete(url, {
        params, // get 请求时带的参数
        timeout: 10000,
        headers: {
            'X-Requested-With': 'XMLHttpRequest'
        }
    })
}

export function delJSON(url, params) {
    return service.delete(url, {
        data: params, // get 请求时带的参数
        timeout: 10000,
        headers: {
            'X-Requested-With': 'XMLHttpRequest'
        }
    })
}

// 自定义post
export function post(url, data) {
    return service.post(url, qs.stringify(data, { arrayFormat: 'repeat' }), {
        timeout: 10000,
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    })
}

// postJson
export function postJSON(url, data) {
    return service.post(url, data, {
        timeout: 10000
    })
}

// put
export function put(url, data) {
    return service.put(url, qs.stringify(data, { arrayFormat: 'repeat' }), {
        timeout: 10000,
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    })
}

export function putJSON(url, data) {
    return service.put(url, data, {
        timeout: 10000
    })
}

// 退出
async function logout() {
    // await store.dispatch('user/logout')
    router.push(`/login`)
}

export default service
