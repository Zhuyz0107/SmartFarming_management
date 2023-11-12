package com.zyz.product_message.controller;

import com.github.pagehelper.PageInfo;
import com.zyz.product_message.pojo.ext.ManagerHurdlesExt;
import com.zyz.product_message.result.Result;
import com.zyz.product_message.service.HurdlesService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

@Api(tags = "栏圈管理模块")
@RestController
@RequestMapping("/hurdle")
public class HurdleController {
    @Resource
    private HurdlesService hurdlesService;

    @ApiOperation("查询栏圈中所有的栏圈容量接口")
    @GetMapping("/queryAllMax")
    public Result queryAllMax() {
        return Result.success(hurdlesService.findAllMax());
    }

    @ApiOperation("分页多条件查询栏舍信息接口")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "pageNum",value = "当前页码", defaultValue = "1", required = true),
            @ApiImplicitParam(name = "pageSize",value = "每页大小", defaultValue = "10", required = true),
            @ApiImplicitParam(name = "hName",value = "栏圈名称"),
            @ApiImplicitParam(name = "hMax",value = "栏圈容量"),
            @ApiImplicitParam(name = "fhName",value = "栏舍名称"),
            @ApiImplicitParam(name = "hEnable",value = "是否可用")
    })
    @GetMapping
    public Result queryByConditionsAndPage(Integer pageNum,
                                           Integer pageSize,
                                           String hName,
                                           Integer hMax,
                                           String fhName,
                                           String hEnable) {
        PageInfo<ManagerHurdlesExt> pageInfo = hurdlesService.findByPage(pageNum, pageSize, hName, hMax, fhName, hEnable);
        return Result.success(pageInfo);
    }

    @ApiOperation("启用/禁用栏圈接口")
    @PutMapping("/{hId}/{hEnable}")
    public Result changeStatus(@PathVariable String hId,
                               @PathVariable String hEnable) {
        hurdlesService.modifyStatus(hId, hEnable);
        return Result.success();
    }

    @ApiOperation("批量启用/禁用栏圈接口")
    @PutMapping
    public Result changeStatusBatch(@RequestBody List<Map<String, String>> idAndStatus) {
        hurdlesService.modifyStatusBatch(idAndStatus);
        return Result.success();
    }

    @ApiOperation("查询所有未满和未禁用的栏圈信息接口")
    @GetMapping("/queryAllEnable")
    public Result getAllEnableHurdles(){
        return Result.success(hurdlesService.findAllEnable());
    }
}
