package com.zyz.product_message.service;


import com.zyz.product_message.pojo.BaseAccount;

public interface AccountService {
    /**
     * 根据用户名和密码返回JWT字符串
     * @param username
     * @param password
     * @return
     */
    String login(String username,String password);

    /**
     * 根据token字符串获取账号信息
     * @param token
     * @return
     */
    BaseAccount findLoginUser(String token);


    ///**
    // * 修改用户密码
    // * @param oldPwd
    // * @param newPwd
    // * @param rePasswd
    // * @param request
    // */
    //void updateUserPassword(String oldPwd, String newPwd, String rePasswd, String request);
}
