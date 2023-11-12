/*
 * @Description: 病症记录api
 * @Author: Ronda
 * @Date: 2022-04-12 11:34:44
 * @LastEditors: Ronda
 * @LastEditTime: 2022-04-12 11:40:12
 */

import { get, postJSON, del, delJSON } from '@/utils/request'

/**
 * @description: 根据id删除病症记录
 * @param {*} drId
 * @return {*}
 */
export function delById(drId) {
    return del(`/diseaseRecord/deleteById/${drId}`)
}

/**
 * @description: 批量删除病症记录
 * @param {*} drIds
 * @return {*}
 */
export function deleteByIdAll(drIds) {
    return delJSON(`/diseaseRecord/deleteByIdAll`, drIds)
}

/**
 * @description: 分页并根据条件查询病症记录
 * @param {*} data
 * @return {*}
 */
export function findByOption(data) {
    const obj = { ...data }
    for (const key in obj) {
        if (!obj[key]) {
            delete obj[key]
        }
    }
    return get(`/diseaseRecord`, obj)
}

/**
 * @description: 查询所有病症记录
 * @param {*}
 * @return {*}
 */
export function findAll() {
    return get(`/diseaseRecord/queryAll`)
}

/**
 * @description: 查询所有病症信息
 * @param {*}
 * @return {*}
 */
export function findAllDisease() {
    return get(`/diseaseRecord/queryAllDisease`)
}

/**
 * @description: 查询所有已存在的医护人员信息
 * @param {*}
 * @return {*}
 */
export function findAllRecordAccount() {
    return get(`/diseaseRecord/queryAllUser`)
}

/**
 * @description: 保存或更新病症记录
 * @param {*} data
 * @return {*}
 */
export function saveOrUpdate(data) {
    return postJSON(`/diseaseRecord/saveOrUpdate`, data)
}
