package com.zyz.product_message.pojo.ext;


import com.fasterxml.jackson.annotation.JsonProperty;
import com.zyz.product_message.pojo.ManagerFenceHouse;
import com.zyz.product_message.pojo.ManagerHurdles;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class ManagerHurdlesExt extends ManagerHurdles {
    @JsonProperty("managerFenceHouse")
    private ManagerFenceHouse managerFenceHouse;
}
