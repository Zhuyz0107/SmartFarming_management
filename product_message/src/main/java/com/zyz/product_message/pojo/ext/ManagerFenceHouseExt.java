package com.zyz.product_message.pojo.ext;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.zyz.product_message.pojo.ManagerFenceHouse;
import com.zyz.product_message.pojo.ManagerHurdles;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
public class ManagerFenceHouseExt extends ManagerFenceHouse {
    @JsonProperty("mhs")
    private List<ManagerHurdles> mhs;
}
