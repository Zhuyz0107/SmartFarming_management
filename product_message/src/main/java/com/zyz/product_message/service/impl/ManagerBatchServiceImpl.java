package com.zyz.product_message.service.impl;

import com.zyz.product_message.dao.ManagerBatchMapper;
import com.zyz.product_message.pojo.ManagerBatch;
import com.zyz.product_message.service.ManagerBatchService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * @Auther: vanse(zyz)
 * @Date: 2023/11/1-11-01-20:22
 * @Description：com.zyz.product_message.service.impl
 */

@Service
public class ManagerBatchServiceImpl implements ManagerBatchService {
    @Resource
    private ManagerBatchMapper managerBatchDao;
    @Override
    public List<ManagerBatch> findAllUnquarantined() {
        return managerBatchDao.selectAllUnquarantined();
    }
}
