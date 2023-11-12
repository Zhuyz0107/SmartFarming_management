/*
 * @Description:首页统计分析后台接口api
 * @Author: Ronda
 * @Date: 2022-04-14 16:07:10
 * @LastEditors: Ronda
 * @LastEditTime: 2023-06-24 19:22:00
 */

import { get } from '@/utils/request'

/**
 * @description: 展示栏舍数量，栏圈数量，动物数量，冷库数量，员工数量
 * @param {*}
 * @return {*}
 */
export function findCount() {
  return get(`/analysis/count`)
}

/**
 * @description: 统计病症出现情况
 * @param {*}
 * @return {*}
 */
export function findCountDisease() {
  return get(`/analysis/countDisease`)
}

/**
 * @description: 根据年获取1~12月的销售数量
 * @param {*}
 * @return {*}
 */
export function findCountSales(year) {
  return get(`/analysis/countSales`)
}

/**
 * @description: 获取例如0-30 猪的数量，30-50斤的猪数量，50斤以上的数量
 * @param {*}
 * @return {*}
 */
export function findIndexCount() {
  return get(`/analysis/indexCount`)
}
