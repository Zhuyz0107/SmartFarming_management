package com.zyz.product_message.service;

import java.util.List;
import java.util.Map;

/**
 * @Auther: vanse(zyz)
 * @Date: 2023/11/2-11-02-20:28
 * @Description：com.zyz.product_message.service
 */
public interface HugeScreamDataService {
    Map<String, List<Object>> getPartData();

    Map<String,Integer> getWeightNum();

    Map<String, Long> getDiseaseNum();

    Map<String, List<Object>> countSales();
}
