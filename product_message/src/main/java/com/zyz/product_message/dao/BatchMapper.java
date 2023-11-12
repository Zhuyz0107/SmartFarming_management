package com.zyz.product_message.dao;

import com.zyz.product_message.pojo.ManagerBatch;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @Auther: vanse(zyz)
 * @Date: 2023/11/2-11-02-19:32
 * @Description：com.zyz.product_message.dao
 */
@Repository
public interface BatchMapper {
    List<ManagerBatch> findAll();
}
