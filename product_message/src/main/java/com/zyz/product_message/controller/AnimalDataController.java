package com.zyz.product_message.controller;

import com.github.pagehelper.PageInfo;
import com.zyz.product_message.pojo.ManagerAnimal;
import com.zyz.product_message.pojo.ext.ManagerAnimalExt;
import com.zyz.product_message.result.Result;
import com.zyz.product_message.service.AnimalDataService;
import com.zyz.product_message.service.QrService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

/**
 * @Auther: vanse(zyz)
 * @Date: 2023/11/2-11-02-18:42
 * @Description：com.zyz.product_message.controller
 */
@Api(tags = "动物管理")
@RestController
@RequestMapping("/animal")
public class AnimalDataController {

    @Resource
    AnimalDataService animalDataService;

    @ApiOperation("显示分页的相关信息")
    @GetMapping
    public Result declarePage(Integer pageNum,Integer pageSize,String aHealthy,String aGender){
        PageInfo<ManagerAnimalExt> result = animalDataService.findAllData(pageNum,pageSize,aHealthy,aGender);
        return Result.success(result);
    }

    @Autowired
    private QrService qrService;

    @GetMapping("/QRcode")
    public Result qR(String animalId){
//        二维码的表
        qrService.insert(animalId);
        return Result.success();
    }

    @GetMapping("findById")
    public Result findById(String animalId) {
        ManagerAnimal managerAnimal = animalDataService.findById(animalId);
        return Result.success(managerAnimal);
    }


}
