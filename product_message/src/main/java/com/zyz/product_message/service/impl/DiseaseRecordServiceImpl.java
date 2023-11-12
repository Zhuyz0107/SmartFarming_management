package com.zyz.product_message.service.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.zyz.product_message.dao.ManagerDiseaseMapper;
import com.zyz.product_message.dao.ext.DiseaseRecordExtMapper;
import com.zyz.product_message.pojo.ManagerDisease;
import com.zyz.product_message.pojo.ext.DiseaseRecordExt;
import com.zyz.product_message.service.DiseaseRecordService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * @Auther: vanse(zyz)
 * @Date: 2023/11/2-11-02-14:09
 * @Description：com.zyz.product_message.service.impl
 */
@Service
public class DiseaseRecordServiceImpl implements DiseaseRecordService {
    @Resource
    DiseaseRecordExtMapper diseaseRecordExtMapper;
    @Resource
    ManagerDiseaseMapper managerDiseaseMapper;
    @Override
    public PageInfo<DiseaseRecordExt> declareRecord(Integer pageNum, Integer pageSize, String drStatus,Integer drDId) {
//       分页查询
        PageHelper.startPage(pageNum,pageSize);
//        分页展示信息
        List<DiseaseRecordExt> all = diseaseRecordExtMapper.declareRecord(drStatus,drDId);
        PageInfo<DiseaseRecordExt> result=new PageInfo<>(all);
        return result;
    }

    @Override
    public List<ManagerDisease> findAll() {
        return managerDiseaseMapper.findAll();
    }
}
