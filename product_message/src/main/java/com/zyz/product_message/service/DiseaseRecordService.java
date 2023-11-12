package com.zyz.product_message.service;

import com.github.pagehelper.PageInfo;
import com.zyz.product_message.pojo.DiseaseRecord;
import com.zyz.product_message.pojo.ManagerDisease;
import com.zyz.product_message.pojo.ext.DiseaseRecordExt;

import java.util.List;

/**
 * @Auther: vanse(zyz)
 * @Date: 2023/11/2-11-02-12:03
 * @Description：com.zyz.product_message.service
 */
public interface DiseaseRecordService {

    List<ManagerDisease> findAll();
    /**
     * 分页多条件查询多条病症记录，病症记录中包含病症类型信息
     * @param pageNum 当前页码
     * @param pageSize 每页大小
     * @param drStatus 治疗状态
     * @param drDId 病症类型编号
     * @return 分页数据  思考如何设计DiseaseRecordExt表实现包含病症类型信息
     */
    PageInfo<DiseaseRecordExt> declareRecord(Integer pageNum, Integer pageSize, String drStatus, Integer drDId);
}
