/*
 * @Author: yaonan
 * @Date: 2022-04-01 09:57:45
 * @LastEditors: yaonan
 * @LastEditTime: 2022-04-02 10:20:16
 * @Description: 移圈管理后台接口API
 */
import { get, postJSON, del, delJSON } from '@/utils/request.js'
/**
 * @description: 根据id删除移圈记录
 * @param {*} scId
 * @return {*}
 */
export function delById(scId) {
  return del(`/shiftCircle/deleteById/${scId}`)
}
/**
 * @description: 批量删除移圈记录
 * @param {*} data
 * @return {*}
 */
export function delByIdAll(data) {
  return delJSON(`/shiftCircle/deleteByIdAll`, data)
}
/**
 * @description: 分页并根据条件查询移圈以及移圈人员信息
 * @param {*} data
 * @return {*}
 */
export function query(data) {
  return get(`/shiftCircle/query`, data)
}
/**
 * @description: 查询所有移圈记录
 * @param {*}
 * @return {*}
 */
export function findAll() {
  return get(`/shiftCircle/queryAll`)
}
/**
 * @description: 查询所有移圈人员信息
 * @param {*}
 * @return {*}
 */
export function findAllUser() {
  return get(`/shiftCircle/queryAllUser`)
}
/**
 * @description: 保存或更新移圈记录
 * @param {*} data
 * @return {*}
 */
export function saveOrUpdate(data) {
  return postJSON(`/shiftCircle/saveOrUpdate`, data)
}

