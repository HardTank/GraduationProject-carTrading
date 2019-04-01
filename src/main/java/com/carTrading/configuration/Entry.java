package com.carTrading.configuration;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

  /**
 * @author tanlixin
 * @description 项目启动入口，配置包根路径
 * @since 2019-03-25
 */


@SpringBootApplication
@ComponentScan(basePackages = "com.carTrading")
public class Entry {
    public static void main(String[] args) throws Exception {
        SpringApplication.run(Entry.class, args);
    }
}
