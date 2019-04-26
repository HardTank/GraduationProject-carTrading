package com.carTrading.service;

import com.carTrading.entity.ConfigurationInfo;
import com.carTrading.repository.ConfigurationInfoRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * @author tanlixin
 * @description
 * @since 2019-04-14
 */
@Service
public class ConfigurationInfoService {
    @Autowired
    private ConfigurationInfoRepository configurationInfoRepository;
    private Logger logger = LoggerFactory.getLogger(this.getClass());

    /**
     * 动态查询
     */
    public Page<ConfigurationInfo> getList(ConfigurationInfo configurationInfo, int pageIndex, int pageSize) {
        logger.info("查找二手车配置信息");
        Page<ConfigurationInfo> page = null;
        ExampleMatcher matcher = ExampleMatcher.matching() //构建对象
                .withStringMatcher(ExampleMatcher.StringMatcher.CONTAINING) //改变默认字符串匹配方式：模糊查询
                .withIgnoreCase(true); //改变默认大小写忽略方式：忽略大小写

        /**创建实例*/
        Example<ConfigurationInfo> ex = Example.of(configurationInfo, matcher);
        /**排序查询*/
        Sort sort = new Sort(Sort.Direction.ASC, "id");
        /**分页查询*/
        PageRequest pageRequest = new PageRequest(pageIndex, pageSize, sort);
        page = configurationInfoRepository.findAll(ex, pageRequest);
        return page;
    }

    /**
     * 更新数据
     */
    @Transactional(rollbackFor = Exception.class)
    public ConfigurationInfo save(ConfigurationInfo configurationInfo) {
        logger.info("更新二手车配置信息");
        ConfigurationInfo configuration = configurationInfoRepository.save(configurationInfo);
        return configuration;
    }

    /**
     * 根据id获取配置的信息
     */
    public ConfigurationInfo getconfigurationInfo(ConfigurationInfo configurationInfo) {
        ConfigurationInfo configuration  = configurationInfoRepository.findOne(configurationInfo.getId());
        return configuration ;
    }
    /**根据carId找到主键*/
    public ConfigurationInfo getId(Integer carId){
        ConfigurationInfo c=configurationInfoRepository.findIdByCar(carId);
        return c;
    }

}
