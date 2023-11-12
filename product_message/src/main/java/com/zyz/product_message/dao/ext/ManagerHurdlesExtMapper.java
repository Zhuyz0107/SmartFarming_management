package com.zyz.product_message.dao.ext;


import com.zyz.product_message.pojo.ext.ManagerHurdlesExt;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface ManagerHurdlesExtMapper {
    List<ManagerHurdlesExt> selectHurdlesAndFenceHouse(@Param("hName") String hName,
                                                       @Param("hMax") Integer hMax,
                                                       @Param("fhName") String fhName,
                                                       @Param("hEnable") String hEnable);
}
