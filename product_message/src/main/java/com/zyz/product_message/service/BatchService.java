package com.zyz.product_message.service;

import com.zyz.product_message.pojo.ManagerBatch;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @Auther: vanse(zyz)
 * @Date: 2023/11/2-11-02-19:24
 * @Description：com.zyz.product_message.service
 */

public interface BatchService {
    List<ManagerBatch> findAll();
}
