package com.zyz.product_message.controller;

import com.github.pagehelper.PageInfo;
import com.zyz.product_message.pojo.QuarantineRegisterion;
import com.zyz.product_message.result.Result;
import com.zyz.product_message.service.QuarantineRegistrationService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.validation.Valid;

/**
 * @Auther: vanse(zyz)
 * @Date: 2023/11/1-11-01-22:29
 * @Description：com.zyz.product_message.controller
 */
/*检疫登录模块*/
    @Api(tags = "检疫登录模块")
    @RestController
    @RequestMapping("/quarantineRegistration")
public class CheckAndLoginController {
        @Resource
        QuarantineRegistrationService quarantineRegistrationService;

//        展示分页信息（界面信息展示：get请求）
    @ApiOperation("分页多条件查询检疫信息记录")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "pageNum",value = "当前页面"),
            @ApiImplicitParam(name = "pageSize",value = "页面数量"),
            @ApiImplicitParam(name = "grMechanism",value = "检疫机构"),
            @ApiImplicitParam(name = "bQualified",value = "检疫结果")
    })
    @GetMapping
    public Result findPageMessage(Integer pageNum,Integer pageSize,String grMechanism,String bQualified){
        PageInfo<QuarantineRegisterion> result=
                quarantineRegistrationService.findPageMessage(pageNum,pageSize,grMechanism,bQualified);
        return Result.success(result);
    }





    //    @Valid错误信息集中处理
        @ApiOperation("新增或更新检疫记录接口")
        @PostMapping("/saveOrUpdate")
        public Result quarantineRegistration(@RequestBody @Valid QuarantineRegisterion qr){
            quarantineRegistrationService.saveOrUpdate(qr);
            return Result.success();
        }


}
