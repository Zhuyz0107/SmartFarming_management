package com.zyz.product_message.pojo;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Time;

/**
 * @Auther: vanse(zyz)
 * @Date: 2023/11/1-11-01-20:17
 * @Description：com.zyz.product_message.pojo
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ManagerBatch {
//    json解析格式？
    @JsonProperty("bSerialId")
    private String bSerialId;
    @JsonProperty("bDesc")
    private String bDesc;
    @JsonProperty("bQuarantine")
    private String bQuarantine;
    @JsonProperty("bQualified")
    private String bQualified;
//    json解析有时差
    @JsonProperty("bTime")
    @JsonFormat(pattern = "yyyy-MM-dd",timezone = "GMT+8")
    private Time bTime;
}
