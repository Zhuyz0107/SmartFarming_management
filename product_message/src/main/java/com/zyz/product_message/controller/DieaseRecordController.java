package com.zyz.product_message.controller;

import com.github.pagehelper.PageInfo;
import com.zyz.product_message.pojo.ManagerDisease;
import com.zyz.product_message.pojo.ext.DiseaseRecordExt;
import com.zyz.product_message.result.Result;
import com.zyz.product_message.service.DiseaseRecordService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.List;

/**
 * @Auther: vanse(zyz)
 * @Date: 2023/11/2-11-02-11:44
 * @Description：com.zyz.product_message.controller
 */
@Api(tags = "病症记录模块")
@RestController
@RequestMapping("/diseaseRecord")
public class DieaseRecordController {
    @Resource
    private DiseaseRecordService diseaseRecordService;

    @ApiOperation("分页显示所要查询的病症信息")
    @GetMapping
    public Result declareRecord(Integer pageNum,Integer pageSize,String drStatus,Integer drDId){
        PageInfo<DiseaseRecordExt> result=diseaseRecordService.declareRecord(pageNum,pageSize,drStatus,drDId);
        return Result.success(result);
    }

    @ApiOperation("查询所有的病症信息")
    @GetMapping("/queryAllDisease")
    public Result getAllDM(){
        List<ManagerDisease> result =diseaseRecordService.findAll();
        return Result.success(result);
    }



}
