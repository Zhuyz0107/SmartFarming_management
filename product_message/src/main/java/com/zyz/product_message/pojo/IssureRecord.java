package com.zyz.product_message.pojo;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.Date;

/**
 * @Auther: vanse(zyz)
 * @Date: 2023/11/2-11-02-9:22
 * @Description：com.zyz.product_message.pojo
 *
 *@JsonProperty 保障属性唯一性
 *
 */
@Data
public class IssureRecord {
    @JsonProperty("isrId")
    private Integer isrId;
    @JsonProperty("isrTime")
    private Date isrTime;
    @JsonProperty("isrNum")
    private Integer isrNum;
    @JsonProperty("isrPrice")
    private Double isrPrice;
    @JsonProperty("isrDeliver")
    private Date isrDeliver;
    @JsonProperty("isrStatus")
    private String isrStatus;
    @JsonProperty("isrCustomerId")
    private Integer isrCustomerId;
}
