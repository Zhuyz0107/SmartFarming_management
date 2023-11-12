package com.zyz.product_message.controller;

import com.zyz.product_message.pojo.ManagerBatch;
import com.zyz.product_message.result.Result;
import com.zyz.product_message.service.ManagerBatchService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.List;

/**
 * @Auther: vanse(zyz)
 * @Date: 2023/11/1-11-01-19:47
 * @Description：com.zyz.product_message.controller
 */

@Api(tags = "检查未检疫批次")
@RestController
@RequestMapping("/batch")
public class CheckNoPageController {
    @Resource
    private ManagerBatchService managerBatchService;

    @ApiOperation("查询未检测的所有信息")
    @GetMapping("/queryAllUnquarantined")
    public Result queryAllUnquarantined(){
        List<ManagerBatch> all = managerBatchService.findAllUnquarantined();
        return Result.success(all);
    }



}
