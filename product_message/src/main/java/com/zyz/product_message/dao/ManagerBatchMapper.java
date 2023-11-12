package com.zyz.product_message.dao;

import com.zyz.product_message.pojo.ManagerBatch;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @Auther: vanse(zyz)
 * @Date: 2023/11/1-11-01-20:28
 * @Description：com.zyz.product_message.dao
 */
@Repository
public interface ManagerBatchMapper {
    List<ManagerBatch> selectAllUnquarantined();

}
