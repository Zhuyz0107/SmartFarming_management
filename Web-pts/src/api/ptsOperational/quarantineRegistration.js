/*
 * @Description: 检疫登记api
 * @Author: Ronda
 * @Date: 2022-04-07 15:42:46
 * @LastEditors: Ronda
 * @LastEditTime: 2022-04-08 17:33:54
 */
import { get, postJSON, del, delJSON } from '@/utils/request'

/**
 * @description: 根据id删除
 * @param {*} grId
 * @return {*}
 */
export function delById(grId) {
    return del(`/quarantineRegistration/deleteById/${grId}`)
}

/**
 * @description: 批量删除
 * @param {*} ids
 * @return {*}
 */
export function deleteByIdAll(ids) {
    return delJSON(`/quarantineRegistration/deleteByIdAll`, ids)
}

/**
 * @description: 分页并根据条件查询检疫记录以检疫人员
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
    return get(`/quarantineRegistration`, obj)
}

/**
 * @description: 查询所有检疫记录
 * @param {*}
 * @return {*}
 */
export function findAll() {
    return get(`/quarantineRegistration/queryAll`)
}

/**
 * @description: 保存或更新检疫记录
 * @param {*} data
 * @return {*}
 */
export function saveOrUpdate(data) {
    return postJSON(`/quarantineRegistration/saveOrUpdate`, data)
}

/**
 * @description: 查询所有检疫人员信息
 * @param {*}
 * @return {*}
 */
export function selectAllAccount() {
    return get(`/quarantineRegistration/queryAllUser`)
}

