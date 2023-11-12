/*
 * @Author: [kangjie]
 * @Date: 2022-03-29 17:17:53
 * @LastEditors: [kangjie]
 * @LastEditTime: 2022-03-31 18:38:26
 * @Description:病症管理接口
 */
import { get, postJSON, del } from '@/utils/request'
/**
 * @Author: [kangjie]
 * @description: 批量删除病症
 * @param {*}
 * @return {*}
 */
export function deleteAllByIds(data) {
  return postJSON(`/disease/deleteByIdAll`, data)
}
/**
 * @Author: [kangjie]
 * @description: 根据id删除病症
 * @param {*}
 * @return {*}
 */
export function deleteById(dId) {
  return del(`/disease/deleteById/${dId}`,)
}
/**
 * @Author: [kangjie]
 * @description: 分页并根据条件查询病症基本信息
 * @param {*}
 * @return {*}
 */
export function query(data) {
  return get(`/disease/query`, data)
}
/**
 * @Author: [kangjie]
 * @description: 查询所有病症
 * @param {*}
 * @return {*}
 */
export function queryAll(data) {
  return get(`/disease/queryAll`, data)
}
/**
 * @Author: [kangjie]
 * @description: 保存或更新疫苗
 * @param {*}
 * @return {*}
 */
export function saveOrUpdate(data) {
  return postJSON(`/disease/saveOrUpdate`, data)
}
