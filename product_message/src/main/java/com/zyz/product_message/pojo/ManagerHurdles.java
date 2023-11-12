package com.zyz.product_message.pojo;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.Date;

@Data
public class ManagerHurdles {
    @JsonProperty("hId")
    private String hId;
    @JsonProperty("hName")
    private String hName;
    @JsonProperty("hDesc")
    private String hDesc;
    @JsonProperty("hMax")
    private Integer hMax;
    @JsonProperty("hSaved")
    private Integer hSaved;
    @JsonProperty("hTime")
    private Date hTime;
    @JsonProperty("hEnable")
    private String hEnable;
    @JsonProperty("hFull")
    private String hFull;
    @JsonProperty("hFenceId")
    private String hFenceId;
}