package com.zyz.product_message.service;



import com.github.pagehelper.PageInfo;
import com.zyz.product_message.pojo.ManagerFenceHouse;
import com.zyz.product_message.pojo.ext.ManagerFenceHouseExt;

import java.util.List;

/**
 * @Title: ManagerFenceHouseService
 * @Author: Daphne
 * @Date: 2023-06-24-11:55
 */
public interface FenceHouseService {
    /**
     * 多条件分页查询
     * @param pageNum  当前页码
     * @param pageSize 每页大小
     * @param fhName   栏舍名称
     * @return
     */
    PageInfo<ManagerFenceHouse> findByPage(int pageNum, int pageSize, String fhName);

    /**
     * 保存或者更新
     * @param managerFenceHouse 栏舍信息对象
     */
    void saveOrUpdate(ManagerFenceHouse managerFenceHouse);

    /**
     * 通过id删除
     * @param fhId  栏舍id
     */
    void removeById(String fhId);

    /**
     * 批量删除栏舍信息
     * @param fhIds
     */
    void removeBatch(List<String> fhIds);

    /**
     * 根据id查询栏舍信息及其对应的栏圈信息
     * @param id 栏舍id
     * @return  ManagerFenceHouseExtend类型是一个自定义类型，用来实现1对多的映射。思考如何设计这个类？
     */
    ManagerFenceHouseExt findById(String id);

    /**
     * 查询所有的栏圈信息
     * @return
     */
    List<ManagerFenceHouse> findAll();
}
