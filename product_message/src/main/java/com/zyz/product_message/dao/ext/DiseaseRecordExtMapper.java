package com.zyz.product_message.dao.ext;

import com.zyz.product_message.pojo.ext.DiseaseRecordExt;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @Auther: vanse(zyz)
 * @Date: 2023/11/2-11-02-15:38
 * @Description：com.zyz.product_message.dao.ext
 */
@Repository
public interface DiseaseRecordExtMapper {
    List<DiseaseRecordExt> declareRecord(
                                         @Param("drStatus") String drStatus,
                                         @Param("drDId")Integer drDId);
}
