/*
 * @Description: 入库记录后台接口api
 * @Author: Ronda
 * @Date: 2022-04-02 11:04:25
 * @LastEditors: Ronda
 * @LastEditTime: 2022-04-02 11:06:13
 */
import { get, postJSON } from '@/utils/request'

/**
 * @description: 根据动物过程状态查询动物基本信息以及对应批次信息,状态填已屠宰
 * @param {*}
 * @return {*}
 */
export function findByOption() {
  return get(`/coldStorageRecord/query`, { aStatus: '已屠宰' })
}

/**
 * @description: 插入入库登记信息
 * @param {*} data
 * @return {*}
 */
export function saveOrUpdate(data) {
  return postJSON(`/coldStorageRecord/saveOrUpdate`, data)
}
