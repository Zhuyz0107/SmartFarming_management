package com.zyz.product_message.pojo;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.Value;

import java.sql.Time;
import java.util.Date;

/**
 * @Auther: vanse(zyz)
 * @Date: 2023/11/2-11-02-9:21
 * @Description：com.zyz.product_message.pojo
 */

@Data
public class BaseLog {
    @JsonProperty("logId")
    private int logId;
    @JsonProperty("logHost")
    private String logHost;
    @JsonProperty("logRequestMethod")
    private String logRequestMethod;
    @JsonProperty("logRequestUri")
    private String logRequestUri;
    @JsonProperty("logTime")
    @JsonFormat(pattern = "yyyy-MM-dd",timezone = "GMT+8")
    private Time logTime;
}
