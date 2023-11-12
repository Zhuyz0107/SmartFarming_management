/*
 * @Description: 挂载api模块的接口
 * @Author: Ronda
 * @Date: 2022-03-10 17:35:10
 * @LastEditors: Ronda
 * @LastEditTime: 2022-03-11 14:24:39
 */

import { post } from '@/utils/request'

/**
 * @description: 通过条件查找指定api
 * @param {*} data
 * @return {*}
 */
export function findByOption(data) {
  return post(`/base/backendapi/by/condition`, data)
}

