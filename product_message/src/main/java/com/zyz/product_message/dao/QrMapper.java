package com.zyz.product_message.dao;

import com.zyz.product_message.pojo.ManagerQrcode;

/**
 * @Auther: vanse(zyz)
 * @Date: 2023/11/6-11-06-14:31
 * @Description：com.zyz.product_message.dao
 */
public interface QrMapper {

    void deleteById(String animalId);

    void insert(ManagerQrcode managerQrcode);
}
