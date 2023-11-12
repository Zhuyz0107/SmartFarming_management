/*
 * @Description: 生猪出栏后台接口api
 * @Author: Ronda
 * @Date: 2022-04-02 09:25:08
 * @LastEditors: Ronda
 * @LastEditTime: 2022-04-02 09:26:33
 */

import { get, postJSON } from '@/utils/request'
/**
 * @description: 根据动物过程状态查询动物基本信息以及对应批次信息，填已检疫
 * @param {*}
 * @return {*}
 */
export function findByOption() {
  return get(`/outCircle/query`, { aStatus: '已检疫' })
}

/**
 * @description: 插入生猪出栏信息
 * @param {*} data
 * @return {*}
 */
export function saveOrUpdate(data) {
  return postJSON(`/outCircle/saveOrUpdate`, data)
}
