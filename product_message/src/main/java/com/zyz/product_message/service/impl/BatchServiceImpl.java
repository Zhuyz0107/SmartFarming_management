package com.zyz.product_message.service.impl;

import com.zyz.product_message.dao.BatchMapper;
import com.zyz.product_message.pojo.ManagerBatch;
import com.zyz.product_message.service.BatchService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * @Auther: vanse(zyz)
 * @Date: 2023/11/2-11-02-19:25
 * @Description：com.zyz.product_message.service.impl
 */
@Service
public class BatchServiceImpl implements BatchService {
    @Resource
    BatchMapper batchMapper;


    @Override
    public List<ManagerBatch> findAll() {
        return batchMapper.findAll();
    }
}
