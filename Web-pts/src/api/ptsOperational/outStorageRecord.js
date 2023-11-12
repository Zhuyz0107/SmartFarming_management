/*
 * @Description:出库登记后台pai
 * @Author: Ronda
 * @Date: 2022-04-02 11:07:23
 * @LastEditors: Ronda
 * @LastEditTime: 2022-04-02 11:09:04
 */

import { post, postJSON } from '@/utils/request'

/**
 * @description: 获取冷库以及冷库中动物信息
 * @param {*}
 * @return {*}
 */
export function queryAll() {
  return post(`/coldStorageRecord/queryAll`)
}

/**
 * @description: 更新出库登记信息
 * @param {*} data
 * @return {*}
 */
export function saveOrUpdate(data) {
  return postJSON(`/coldStorageRecord/updateStorageRecord`, data)
}

