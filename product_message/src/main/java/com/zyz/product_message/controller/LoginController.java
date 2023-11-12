package com.zyz.product_message.controller;

import com.zyz.product_message.result.Result;
import com.zyz.product_message.service.AccountService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;
import springfox.documentation.annotations.ApiIgnore;

import javax.annotation.Resource;
import java.util.HashMap;

@Api(tags = "登录模块")
@RestController
public class LoginController {

    @Resource
    private AccountService accountService;

    @ApiOperation("用户登录接口")
    @PostMapping(value = "/login", consumes = "application/x-www-form-urlencoded")
    public Result login(String username, String password) {
        String loginToken = accountService.login(username, password);
        HashMap<String, String> result = new HashMap<>();
        result.put("token", loginToken);
        return Result.success(result);
    }

    @ApiOperation("获取当前用户信息")
    @GetMapping("/me")
    public Result getUserDetail(@ApiIgnore @RequestHeader String token) {
        return Result.success(accountService.findLoginUser(token));
    }

    @ApiOperation("退出登录接口")
    @GetMapping("/logout")
    public Result logout() {
        return Result.success("退出登录成功");
    }
}
