package com.zyz.product_message.pojo.ext;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.zyz.product_message.pojo.DiseaseRecord;
import com.zyz.product_message.pojo.ManagerDisease;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class DiseaseRecordExt extends DiseaseRecord {
    @JsonProperty("disease")
    private ManagerDisease disease;
}
