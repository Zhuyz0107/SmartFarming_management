package com.zyz.product_message.dao;

import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

/**
 * @Auther: vanse(zyz)
 * @Date: 2023/11/3-11-03-9:50
 * @Description：com.zyz.product_message.dao
 */
@Repository
public interface HugeScreamDataMapper {
    List<Object> totalPartNum();

    Map<String, Integer> selectWeight();

    List<Map<String,Object>> selectDiseasePart();

    List<Map<String, Integer>> selectAllPage();

//    List<Map<String, Integer>> countSales();
}
