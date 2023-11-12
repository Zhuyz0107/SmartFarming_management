package com.zyz.product_message.pojo;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.Date;

/**
 * @Auther: vanse(zyz)
 * @Date: 2023/11/2-11-02-9:22
 * @Description：com.zyz.product_message.pojo
 */
@Data
public class IndexRecord {
    @JsonProperty("irdId")
    private Integer irdId;
    @JsonProperty("irdWeight")
    private String irdWeight;
    @JsonProperty("irdTime")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss",timezone = "GMT+8")
    private Date irdTime;
    @JsonProperty("irdHealthy")
    private String irdHealthy;
    @JsonProperty("irdTemperature")
    private String irdTemperature;
    @JsonProperty("irdBreathing")
    private String irdBreathing;
    @JsonProperty("irdHeartRate")
    private String irdHeartRate;
    @JsonProperty("irdAnimalId")
    private String irdAnimalId;
}
