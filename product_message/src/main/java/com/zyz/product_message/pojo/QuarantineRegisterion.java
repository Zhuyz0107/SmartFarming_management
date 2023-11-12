package com.zyz.product_message.pojo;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import org.springframework.stereotype.Repository;

import javax.validation.constraints.NotBlank;

/**
 * @Auther: vanse(zyz)
 * @Date: 2023/11/1-11-01-22:22
 * @Description：com.zyz.product_message.pojo
 */
@Data
public class QuarantineRegisterion {
    @JsonProperty("grId")
    private Integer grId;
    @JsonProperty("grTime")
    private String grTime;
    @JsonProperty("grImg")
    private String grImg;
    @JsonProperty("grMechanism")
    @NotBlank(message = "站点不能为空")
    private String grMechanism;
    @JsonProperty("grBatchId")
    private String grBatchId;
    @JsonProperty("bQualified")
    @NotBlank(message = "是否合格不能为空")
    private String bQualified;
}
