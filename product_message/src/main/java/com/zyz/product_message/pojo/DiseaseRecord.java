package com.zyz.product_message.pojo;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.Date;

/**
 * @Auther: vanse(zyz)
 * @Date: 2023/11/2-11-02-9:21
 * @Description：com.zyz.product_message.pojo
 */
@Data
public class DiseaseRecord {
    @JsonProperty("drId")
    private Integer drId;
    @JsonProperty("drAnimalId")
    private String drAnimalId;
    @JsonProperty("drDesc")
    private String drDesc;
    @JsonProperty("drCure")
    private String drCure;
    @JsonProperty("drTime")
    private Date drTime;
    @JsonProperty("drStatus")
    private String drStatus;
    @JsonProperty("drDId")
    private Integer drDId;
}
