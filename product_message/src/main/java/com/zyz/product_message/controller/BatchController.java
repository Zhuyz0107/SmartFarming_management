package com.zyz.product_message.controller;

import com.zyz.product_message.pojo.ManagerBatch;
import com.zyz.product_message.service.BatchService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.List;

/**
 * @Auther: vanse(zyz)
 * @Date: 2023/11/2-11-02-19:19
 * @Description：com.zyz.product_message.controller
 */
@Api(tags = "批处理模块")
@RestController
@RequestMapping("/batch")
public class BatchController {

    @Resource
    BatchService batchService;

    @ApiOperation("查询所有数据")
    @GetMapping("/queryAll")
    public List<ManagerBatch> getBatchMessage(){
        return batchService.findAll();
    }



}
