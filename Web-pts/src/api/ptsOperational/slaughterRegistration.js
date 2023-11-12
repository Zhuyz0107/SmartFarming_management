/*
 * @Description: 屠宰登记api
 * @Author: Ronda
 * @Date: 2022-04-07 15:09:13
 * @LastEditors: Ronda
 * @LastEditTime: 2022-04-07 15:12:31
 */
import { get, postJSON } from '@/utils/request'

/**
 * @description: 根据动物过程状态查询动物基本信息以及对应批次信息，填已出栏
 * @param {*}
 * @return {*}
 */
export function findByOption() {
  return get(`/slaughterRegistration/query`, { aStatus: '已出栏' })
}

/**
 * @description: 插入屠宰登记信息
 * @param {*} data
 * @return {*}
 */
export function saveOrUpdate(data) {
  return postJSON(`/slaughterRegistration/saveOrUpdate`, data)
}

