/*
 * @Description: 疫苗管理
 * @Author: Ronda
 * @Date: 2022-03-30 11:12:33
 * @LastEditors: Ronda
 * @LastEditTime: 2022-03-30 15:01:05
 */

import { get, postJSON, del } from '@/utils/request.js'

/**
 * @description: 根据id删除疫苗信息
 * @param {*} vVaccinesId
 * @return {*}
 */
export function delById(vVaccinesId) {
  return del(`/vaccines/deleteById/${vVaccinesId}`)
}

/**
 * @description: 批量删除疫苗信息
 * @param {*} vIds
 * @return {*}
 */
export function deleteByIdAll(vIds) {
  return postJSON(`/vaccines/deleteByIdAll`, vIds)
}

/**
 * @description: 分页并根据条件查询疫苗基本信息以及负责人信息
 * @param {*} data  查询的参数
 * @return {*}
 */
export function findByOption(data) {
  const obj = { ...data }
  for (const key in obj) {
    if (!obj[key]) {
      delete obj[key]
    }
  }
  return get(`/vaccines/query`, obj)
}

/**
 * @description: 保存或更新疫苗
 * @param {*}
 * @return {*}
 */
export function findAll() {
  return get(`/vaccines/queryAll`)
}

/**
 * @description: 保存或更新疫苗
 * @param {*} data
 * @return {*}
 */
export function saveOrUpdate(data) {
  return postJSON(`/vaccines/saveOrUpdate`, data)
}

/**
 * @description: 根据疫苗编号查询疫苗
 * @param {*} vVaccinesId
 * @return {*}
 */
export function findById(vVaccinesId) {
  return get(`/vaccines/selectById/${vVaccinesId}`)
}

