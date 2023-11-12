package com.zyz.product_message.pojo.ext;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.zyz.product_message.pojo.ManagerAnimal;
import com.zyz.product_message.pojo.ManagerBatch;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class ManagerAnimalExt extends ManagerAnimal {
    @JsonProperty("managerHurdles")
    private String managerHurdles;
    @JsonProperty("managerFenceHouse")
    private String managerFenceHouse;
    @JsonProperty("aBackup3")
    private String url;
    @JsonProperty("managerBatch")
    private ManagerBatch managerBatch;
}
