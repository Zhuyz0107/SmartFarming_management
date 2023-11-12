/*
 * @Author: yaonan
 * @Date: 2022-03-25 10:30:18
 * @LastEditors: yaonan
 * @LastEditTime: 2022-03-29 14:05:35
 * @Description: 栏圈管理后台接口api
 */
import { get, postJSON, del, putJSON, put } from '@/utils/request.js'

/**
 * @description: 根据id删除栏圈
 * @param {*} hId
 * @return {*}
 */
export function delById(hId) {
    return del(`/hurdle/deleteById/${hId}`)
}

/**
 * @description: 批量删除栏圈
 * @param {*} hIds
 * @return {*}
 */
export function deleteByIdAll(hIds) {
    return postJSON(`/hurdle/deleteByIdAll`, hIds)
}

export function updateStatusById(hId, hEnable) {
    return put(`/hurdle/${hId}/${hEnable}`)
}

export function updateStatusBatch(data) {
    return putJSON(`/hurdle`, data)
}


/**
 * @description: 分页并根据条件查询栏圈基本信息以及栏舍信息
 * @param {*} data
 * @return {*}
 */
export function findByOption(data) {
    return get(`/hurdle`, data)
}

/**
 * @description: 查询所有栏圈容量
 * @param {*} data
 * @return {*}
 */
export function findAllMax(data) {
    return get(`/hurdle/queryAllMax`, data)
}

/**
 * @description: 保存或更新栏舍
 * @param {*} data
 * @return {*}
 */
export function saveOrUpdate(data) {
    return postJSON(`/hurdle/saveOrUpdate`, data)
}

/**
 * @description: 查询所有未禁用以及未满的栏圈
 * @param {*} data
 * @return {*}
 */
export function findAll(data) {
    return get(`/hurdle/queryAllEnable`, data)
}

/**
 * @description: 根据id更新以存量
 * @param {*} hId
 * @return {*}
 */
export function updateById(hId) {
    return get(`/hurdle/updateByIdSaved/${hId}`)
}

