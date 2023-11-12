package com.zyz.product_message.pojo;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @Auther: vanse(zyz)
 * @Date: 2023/11/2-11-02-9:24
 * @Description：com.zyz.product_message.pojo
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ManagerQrcode {
    @JsonProperty("qId")
    private Integer qId;
    @JsonProperty("qAnimalId")
    private String qAnimalId;
    @JsonProperty("qImageUrl")
    private String qImageUrl;
}
