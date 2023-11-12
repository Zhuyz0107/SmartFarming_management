/*
 * @Description: 认证服务和登录相关API
 * @Author: Ronda
 * @Date: 2020-08-04 16:47:38
 * @LastEditors: Ronda
 * @LastEditTime: 2023-06-24 15:15:30
 */
import { post, get } from '@/utils/request'

/**
 * @description: 获取当前用户信息
 * @param {*} token
 * @return {*}
 */
export function getInfo(token) {
  // return get(`/auth/me`)
  return get(`/me`)
}

/**
 * @description: 获取当前登录用户权限信息（平铺结构）
 * @param {*}
 * @return {*}
 */
export function getAuthsMenu() {
  return get(`/current/authorities`)
}

/**
 * @description: 获取当前登录用户权限(菜单)树
 * @param {*}
 * @return {*}
 */
export function getAuthsMenuTree() {
  return get(`/current/authorityTree`)
}

/**
 * @description: 获取当前登录用户的角色信息，在getInfo内有包含，目前没使用
 * @param {*}
 * @return {*}
 */
export function getCurrentRoles() {
  return get(`/current/roles`)
}

/**
 * @description: 登录页面
 * @param {*} data 传递给后台的登录信息
 * @return {*}
 */
export function login(data) {
  return post(`/login`, data)
}

/**
 * @description: 登出，后台暂未提供登出接口
 * @param {*}
 * @return {*}
 */
export function logout() {
  return get(`/logout`)
}
