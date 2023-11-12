package com.zyz.product_message.service;

import com.zyz.product_message.pojo.ManagerBatch;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @Auther: vanse(zyz)
 * @Date: 2023/11/1-11-01-20:14
 * @Description：com.zyz.product_message.service
 */

public interface ManagerBatchService {

    List<ManagerBatch> findAllUnquarantined();
}
