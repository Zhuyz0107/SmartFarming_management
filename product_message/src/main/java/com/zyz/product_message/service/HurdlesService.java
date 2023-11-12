package com.zyz.product_message.service;



import com.github.pagehelper.PageInfo;
import com.zyz.product_message.pojo.ManagerHurdles;
import com.zyz.product_message.pojo.ext.ManagerHurdlesExt;

import java.util.List;
import java.util.Map;

public interface HurdlesService {
    /**
     * 查询所有栏圈信息
     * @return 所有栏圈信息
     */
    List<ManagerHurdles> findAllEnable();

    /*批量删除*/
    List<ManagerHurdles> findByFhid(String fhId);
    /**
     * 查询所有的栏圈容量
     * @return
     */
    List<Integer> findAllMax();

    /**
     * 条件分页查询所有栏圈信息
     * @param pageNum
     * @param pageSize
     * @param hName
     * @param hMax
     * @param fhName
     * @param hEnable
     * @return
     */
    PageInfo<ManagerHurdlesExt> findByPage(Integer pageNum, Integer pageSize, String hName, Integer hMax, String fhName, String hEnable);

    /**
     * 根据栏圈编号禁用/启用栏圈
     * @param hId
     * @param hEnable
     */
    void modifyStatus(String hId, String hEnable);

    /**
     * 批量禁用/启用栏圈
     * @param idAndStatus
     */
    void modifyStatusBatch(List<Map<String, String>> idAndStatus);

}
