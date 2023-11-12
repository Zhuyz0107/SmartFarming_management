package com.zyz.product_message;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.zyz.product_message.result.Result;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.HashMap;
import java.util.Map;

@SpringBootTest
class ProductMessageApplicationTests {

    @Test
    void contextLoads() throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String,Integer> map = new HashMap<>();
        map.put("1卷",10);
        map.put("2卷",20);
        Result success = Result.success(map);
        String s1 = objectMapper.writeValueAsString(success);
        System.out.println("success = " + s1);
        String s = objectMapper.writeValueAsString(map);
        System.out.println("s = " + s);
    }

}
