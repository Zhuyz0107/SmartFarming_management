package com.zyz.product_message.service;

import com.github.pagehelper.PageInfo;
import com.zyz.product_message.pojo.QuarantineRegisterion;

/**
 * @Auther: vanse(zyz)
 * @Date: 2023/11/1-11-01-22:36
 * @Description：com.zyz.product_message.service
 */
public interface QuarantineRegistrationService {

    void saveOrUpdate(QuarantineRegisterion qr);

    PageInfo<QuarantineRegisterion> findPageMessage(
            Integer pageNum, Integer pageSize, String grMechanism, String bQualified);

}
