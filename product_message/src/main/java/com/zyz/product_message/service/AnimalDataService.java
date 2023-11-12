package com.zyz.product_message.service;

import com.github.pagehelper.PageInfo;
import com.zyz.product_message.pojo.ManagerAnimal;
import com.zyz.product_message.pojo.ext.ManagerAnimalExt;
import org.springframework.stereotype.Service;

/**
 * @Auther: vanse(zyz)
 * @Date: 2023/11/2-11-02-19:02
 * @Description：com.zyz.product_message.service
 */

public interface AnimalDataService {
    PageInfo<ManagerAnimalExt> findAllData(Integer pageNum, Integer pageSize, String aHealthy, String aGender);

    ManagerAnimal findById(String animalId);
}
