package com.zyz.product_message.dao;


import com.zyz.product_message.pojo.BaseAccount;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface BaseAccountMapper {
    BaseAccount selectAccountInfo(@Param("username") String username,
                                  @Param("password") String password);
    BaseAccount selectByPrimaryKey(String accountId);
}