/*
 * @Description: 日志服务api
 * @Author: Ronda
 * @Date: 2022-03-08 14:31:34
 * @LastEditors: Ronda
 * @LastEditTime: 2023-06-24 23:25:54
 */

import { get } from '@/utils/request'

/**
 * @description: 分页查找日志，可能不用
 * @param {*} data  分页数据
 * @return {*}
 */
export function findByPage(data) {
  return get(`/base/log/all`, data)
}

/**
 * @description: 分页按条件查找日志
 * @param {*} data 查询的操作项
 * @return {*}
 */
export function findByOption(data) {
  return get(`/log/page`, data)
}
