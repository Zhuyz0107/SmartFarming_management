package com.zyz.product_message.controller;

import com.zyz.product_message.result.Result;
import com.zyz.product_message.service.HugeScreamDataService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;


/**
 * @Auther: vanse(zyz)
 * @Date: 2023/11/2-11-02-20:24
 * @Description：com.zyz.product_message.controller
 */
@Api(tags = "数据大屏信息模块")
@RestController
@RequestMapping("/analysis")
public class HugeScreamDataController {
    @Resource
    HugeScreamDataService hugeScreamDataService;

    @ApiOperation("统计本年度12个月销售动物接口")
    @GetMapping("/countSales")
    public Result countAnnualSales(){
        Map<String, List<Object>> result = hugeScreamDataService.countSales();
        System.out.println("result = " + result);
        return Result.success(result);
    }

    @ApiOperation("统计栏舍，栏圈，动物数量，冷库数量，员工数量信息接口")
    @GetMapping("/count")
    public Result getModelData(){
        return Result.success(hugeScreamDataService.getPartData());
    }

    @ApiOperation("统计重量数据接口")
    @GetMapping("/indexCount")
    public Result getWeight(){
        return Result.success(hugeScreamDataService.getWeightNum());
    }

    @ApiOperation("统计病症信息数据接口")
    @GetMapping("/countDisease")
    public Result getDisease(){
        return Result.success(hugeScreamDataService.getDiseaseNum());
    }


}
