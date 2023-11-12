package com.zyz.product_message.service.impl;


import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.zyz.product_message.dao.ManagerHurdlesMapper;
import com.zyz.product_message.dao.ext.ManagerHurdlesExtMapper;
import com.zyz.product_message.exception.ServiceException;
import com.zyz.product_message.pojo.ManagerHurdles;
import com.zyz.product_message.pojo.ext.ManagerHurdlesExt;
import com.zyz.product_message.result.ResultCode;
import com.zyz.product_message.service.HurdlesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class HurdlesServiceImpl implements HurdlesService {

    @Autowired
    private ManagerHurdlesMapper managerHurdlesMapper;

    @Autowired
    private ManagerHurdlesExtMapper managerHurdlesExtMapper;

    @Override
    public List<ManagerHurdles> findAllEnable() {
        List<ManagerHurdles> allHurdles = managerHurdlesMapper.selectAllEnableHurdles();
        return allHurdles;
    }

    /*介入代码*/
    @Override
    public List<ManagerHurdles> findByFhid(String fhId) {
        return managerHurdlesMapper.findByFhid(fhId);
    }

    @Override
    public List<Integer> findAllMax() {
        return managerHurdlesMapper.selectAllMax();
    }

    @Override
    public PageInfo<ManagerHurdlesExt> findByPage(Integer pageNum, Integer pageSize, String hName, Integer hMax, String fhName, String hEnable) {
        PageHelper.startPage(pageNum, pageSize);
        List<ManagerHurdlesExt> list = managerHurdlesExtMapper.selectHurdlesAndFenceHouse(hName, hMax, fhName, hEnable);
        PageInfo<ManagerHurdlesExt> pageInfo = new PageInfo<>(list);
        return pageInfo;
    }

    @Override
    public void modifyStatus(String hId, String hEnable) {
        // 判断该栏圈信息是否存在
        if (managerHurdlesMapper.selectByPrimaryKey(hId) != null) {
            String status = "可用";
            if (status.equals(hEnable)) {
                status = "禁用";
            }
            if (managerHurdlesMapper.updateHEnable(hId, status) == 0) {
                throw new ServiceException(ResultCode.FAIL);
            }
        } else {
            throw new ServiceException(ResultCode.DATA_IS_EMPTY);
        }
    }

    @Override
    public void modifyStatusBatch(List<Map<String, String>> idAndStatus) {
        int result = 0;
        for (Map<String, String> map : idAndStatus) {
            String hId = map.get("hId");
            if (managerHurdlesMapper.selectByPrimaryKey(hId) == null) {
                // 栏圈不存在，跳过本次循环
                continue;
            }
            String hEnable = map.get("hEnable");
            String status = "可用";
            if (status.equals(hEnable)) {
                status = "禁用";
            }
            result += managerHurdlesMapper.updateHEnable(hId, status);
        }
        if (result == 0) {
            throw new ServiceException(ResultCode.FAIL);
        }
    }
}
