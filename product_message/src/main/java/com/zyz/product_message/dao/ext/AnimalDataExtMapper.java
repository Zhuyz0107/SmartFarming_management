package com.zyz.product_message.dao.ext;

import com.zyz.product_message.pojo.ManagerAnimal;
import com.zyz.product_message.pojo.ext.ManagerAnimalExt;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @Auther: vanse(zyz)
 * @Date: 2023/11/2-11-02-19:06
 * @Description：com.zyz.product_message.dao
 */
@Repository
public interface AnimalDataExtMapper {
    List<ManagerAnimalExt> selectAllData(@Param("aHealthy") String aHealthy,
                                         @Param("aGender") String aGender);

    ManagerAnimal selectById(String animalId);
}
