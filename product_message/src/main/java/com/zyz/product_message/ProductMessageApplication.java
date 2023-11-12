package com.zyz.product_message;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("com.zyz.product_message.dao")
public class ProductMessageApplication {

    public static void main(String[] args) {
        SpringApplication.run(ProductMessageApplication.class, args);
    }

}
