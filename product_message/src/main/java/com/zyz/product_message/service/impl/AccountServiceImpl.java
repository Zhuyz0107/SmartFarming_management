package com.zyz.product_message.service.impl;


import com.zyz.product_message.dao.BaseAccountMapper;
import com.zyz.product_message.exception.ServiceException;
import com.zyz.product_message.pojo.BaseAccount;
import com.zyz.product_message.result.ResultCode;
import com.zyz.product_message.service.AccountService;
import com.zyz.product_message.util.JwtUtil;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.Map;

@Service
public class AccountServiceImpl implements AccountService {

    @Resource
    private BaseAccountMapper baseAccountMapper;

    @Override
    public String login(String username, String password) {
        // 根据用户名密码查询用户信息
        BaseAccount account = baseAccountMapper.selectAccountInfo(username, password);
        String token = null;
        // 查询到该用户
        if (account != null) {
            // 检查密码是否正确
            if (account.getPassword().equals(password)) {
                Map<String, Object> userMap = new HashMap<>();
                userMap.put("userId", account.getAccountId());
                // 返回token字符串
                token = JwtUtil.sign(account.getAccountId(), userMap);
            }else {
                throw new ServiceException(ResultCode.PWD_IS_WRONG);
            }
        } else {
            throw new ServiceException(ResultCode.USER_IS_NOT_EXIST);
        }
        return token;
    }

    @Override
    public BaseAccount findLoginUser(String token) {
        return baseAccountMapper.selectByPrimaryKey(JwtUtil.getUserId(token));
    }
}
