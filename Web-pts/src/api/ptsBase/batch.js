/*
 * @Author: yaonan
 * @Date: 2022-03-29 10:23:00
 * @LastEditors: yaonan
 * @LastEditTime: 2022-04-01 09:37:44
 * @Description: 批次管理后台接口api
 */
import { get, postJSON, del, delJSON } from '@/utils/request.js'

/**
 * @description: 根据id删除批次
 * @param {*} serialId
 * @return {*}
 */
export function delById(bSerialId) {
    return del(`/batch/deleteById/${bSerialId}`)
}

/**
 * @description: 批量删除批次
 * @param {*} serialIds
 * @return {*}
 */
export function deleteByIdAll(bSerialIds) {
    return delJSON(`/batch/deleteByIdAll`, bSerialIds)
}

/**
 * @description: 分页并根据条件查询批次基本信息以及动物数量/状态
 * @param {*} data
 * @return {*}
 */
export function findByOption(data) {
    return get(`/batch`, data)
}

/**
 * @description: 查询所有未检疫以及检疫不合格的批次
 * @param {*} data
 * @return {*}
 */
export function findAllUnquarantined(data) {
    return get(`/batch/queryAllUnquarantined`, data)
}

/**
 * @description: 查询所有批次信息
 * @param {*} data
 * @return {*}
 */
export function findAll(data) {
    return get(`/batch/queryAll`, data)
}

/**
 * @description: 保存或更新批次
 * @param {*} data
 * @return {*}
 */
export function saveOrUpdate(data) {
    return postJSON(`/batch/saveOrUpdate`, data)
}

/**
 * @description: 根据批次编号查询批次
 * @param {*} serialId
 * @return {*}
 */
export function findById(serialId) {
    return get(`/batch/selectById/${serialId}`)
}
