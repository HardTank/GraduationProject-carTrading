package com.carTrading.controller;


import com.carTrading.entity.ConfigurationInfo;
import com.carTrading.service.ConfigurationInfoService;
import com.carTrading.tool.UpdateNotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author tanlixin
 * @description
 * @since 2019-04-14
 */
@RestController
@RequestMapping(value = "/configurationInfo")
public class ConfigurationInfoController {
    @Autowired
    ConfigurationInfoService configurationInfoService;
    private Logger logger = LoggerFactory.getLogger(this.getClass());
    @RequestMapping(value = "/getList")
    public Page<ConfigurationInfo> getList(ConfigurationInfo configurationInfo, int pageIndex, int pageSize) {
        Page<ConfigurationInfo>page=configurationInfoService.getList(configurationInfo,pageIndex,pageSize);
        return page;
    }

    @RequestMapping("save")
    public ConfigurationInfo saveConfigurationInfo(ConfigurationInfo configurationInfo,String productDates) {
        logger.info("productDate"+productDates);

//        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM");
//        Date date = null;
//        try {
//            date = format.parse(productDates.replace("\"",""));
//            configurationInfo.setProductDate(date);
//        } catch (ParseException e) {
//            e.printStackTrace();
//        }
        if(configurationInfo.getId()!=null) {
            ConfigurationInfo configuration  = configurationInfoService.getconfigurationInfo(configurationInfo);
            logger.info("更新二手车配置前" + configuration.toString() + configurationInfo.toString());
            UpdateNotNull.copyNonNullProperties(configurationInfo, configuration);
            logger.info("更新二手车配置" + configuration.toString() + configurationInfo.toString());
            configurationInfo = configurationInfoService.save(configuration);
        }
        else{
            logger.info("添加二手车配置" + configurationInfo.toString());
            configurationInfo = configurationInfoService.save(configurationInfo);

        }
        return configurationInfo;
    }
}
