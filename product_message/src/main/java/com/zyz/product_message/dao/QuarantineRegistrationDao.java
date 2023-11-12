package com.zyz.product_message.dao;

import com.zyz.product_message.pojo.QuarantineRegisterion;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @Auther: vanse(zyz)
 * @Date: 2023/11/1-11-01-22:44
 * @Description：com.zyz.product_message.dao
 */
@Repository
public interface QuarantineRegistrationDao {

    int saveQRMessage(QuarantineRegisterion qr);

    int updQRMessage(QuarantineRegisterion qr);

    List<QuarantineRegisterion> selArrMessage(@Param("grMechanism") String grMechanism,
                                              @Param("bQualified") String bQualified);
}
