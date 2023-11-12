/*
 * @Author: yaonan
 * @Date: 2022-03-29 21:46:59
 * @LastEditors: yaonan
 * @LastEditTime: 2022-04-01 09:24:16
 * @Description: 客户管理后台接口api
 */
import { get, postJSON, del, delJSON } from '@/utils/request.js'

export function deleteById(cId) {
  return del(`/customer/deleteById/${cId}`)
}
/**
 * @description: 批量删除客户
 * @param {*} ids
 * @return {*}
 */
export function deleteByIdAll(data) {
  return delJSON(`/customer/deleteByIdAll`, data)
}
/**
 * @description: 分页并根据条件查询客户以及销售信息
 * @param {*} data
 * @return {*}
 */
export function query(data) {
  return get(`/customer/query`, data)
}
/**
 * @description: 查询所有客户信息
 * @param {*}
 * @return {*}
 */
export function queryAll() {
  return get(`/customer/queryAll`)
}
/**
 * @description: 查询所有接待人员信息
 * @param {*}
 * @return {*}
 */
export function findAllUser() {
  return get(`/customer/queryAllUser`)
}
/**
 * @description: 保存或更新客户
 * @param {*} data
 * @return {*}
 */
export function saveOrUpdate(data) {
  return postJSON(`/customer/saveOrUpdate`, data)
}
