package com.zyz.product_message.pojo;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class BaseAccount {
    @JsonProperty("accountId")
    private String accountId;
    @JsonProperty("username")
    private String username;
    @JsonProperty("realname")
    private String realname;
    @JsonProperty("password")
    private String password;
    @JsonProperty("photo")
    private String photo;
    @JsonProperty("email")
    private String email;
    @JsonProperty("mobile")
    private String mobile;
    @JsonProperty("status")
    private Byte status;
}