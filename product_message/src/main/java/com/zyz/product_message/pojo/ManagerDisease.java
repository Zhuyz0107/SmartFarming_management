package com.zyz.product_message.pojo;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

/**
 * @Auther: vanse(zyz)
 * @Date: 2023/11/2-11-02-9:23
 * @Description：com.zyz.product_message.pojo
 */
@Data
public class ManagerDisease {
    @JsonProperty("dId")
    private Integer dId;
    @JsonProperty("dName")
    private String dName;
    @JsonProperty("dDesc")
    private String dDesc;
    @JsonProperty("dType")
    private String dType;
    @JsonProperty("dEtiology")
    private String dEtiology;
    @JsonProperty("dSymptom")
    private String dSymptom;
    @JsonProperty("dPrevention")
    private String dPrevention;
}
