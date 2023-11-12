package com.zyz.product_message.dao.ext;


import com.zyz.product_message.pojo.ext.ManagerFenceHouseExt;
import org.springframework.stereotype.Repository;

/*
* @EqualsAndHashCode(callSuper = true)
* 1. 此注解会生成equals(Object other) 和 hashCode()方法。
2. 它默认使用非静态，非瞬态的属性
3. 通过参数exclude指定排除属性
4. 通过参数of指定使用的属性
5. @EqualsAndHashCode（callSuper...），callSuper默认为false，即默认不适用父类中属性判断
* */
@Repository
public interface ManagerFenceHouseExtMapper {
    ManagerFenceHouseExt selectHouseAndHurdlesById(String fhId);
}