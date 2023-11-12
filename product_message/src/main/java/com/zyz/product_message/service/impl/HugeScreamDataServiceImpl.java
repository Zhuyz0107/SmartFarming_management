package com.zyz.product_message.service.impl;

import com.zyz.product_message.dao.HugeScreamDataMapper;
import com.zyz.product_message.service.HugeScreamDataService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.*;

/**
 * @Auther: vanse(zyz)
 * @Date: 2023/11/2-11-02-20:29
 * @Description：com.zyz.product_message.service.impl
 */
@Service
public class HugeScreamDataServiceImpl implements HugeScreamDataService {
    @Resource
    HugeScreamDataMapper hugeScreamDataMapper;
    @Override
    public Map<String, List<Object>> getPartData() {
//        作为数组元素存储
        List<Object> resourceList = Arrays.asList("栏舍", "栏圈", "动物", "冷库", "员工");
        List<Object> totalNum = hugeScreamDataMapper.totalPartNum();
        HashMap<String,List<Object>> map= new HashMap<>();
        map.put("name",resourceList);
        map.put("value",totalNum);
        return map;
    }

    @Override
    public Map<String, Integer> getWeightNum() {
        Map<String, Integer> map = hugeScreamDataMapper.selectWeight();
        return map;
    }

//    病症信息查询统计的参数需要的是名称和数据量（long的长度更大）
    @Override
    public Map<String, Long> getDiseaseNum() {
        List<Map<String, Object>> maps = hugeScreamDataMapper.selectDiseasePart();
        HashMap<String,Long> map= new HashMap<>();
        maps.forEach(e-> {
//            传入map集合的参数，遍历表数据查询数据项
            map.put(String.valueOf(e.get("d_name")),(Long)e.get("sum"));
        });
        return map;
    }

    @Override
    public Map<String, List<Object>> countSales() {
// 月份列表
        String[] month = {"1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"};
        List<Object> monthList = Arrays.asList(month);
        // 对应销售总数列表
        Integer[] sales = new Integer[12];
        // 初始化：全0填充
        Arrays.fill(sales, 0);

        List<Object> salesList=Arrays.asList(sales);

        List<Map<String, Integer>> baseData = hugeScreamDataMapper.selectAllPage();
        baseData.forEach(e ->
                salesList.set(e.get("月份") - 1, Integer.parseInt(String.valueOf(e.get("销售总数"))))
        );
        // 创建总结果集map
        HashMap<String, List<Object>> map = new HashMap<>();
        map.put("name", monthList);
        map.put("value", salesList);
        return map;
    }
}
