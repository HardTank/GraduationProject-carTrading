package com.carTrading.service;

import com.carTrading.entity.DeviceInspection;
import com.carTrading.repository.DeviceInspectionRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;

/**
 * @author tanlixin
 * @description
 * @since 2019-04-22
 */
@Service
public class DeviceInspectionService {
    @Autowired
    DeviceInspectionRepository deviceInspectionRepository;
    private Logger logger = LoggerFactory.getLogger(this.getClass());

    /**
     * 动态查询
     */
    public Page<DeviceInspection> getList(DeviceInspection deviceInspection, int pageIndex, int pageSize) {
        logger.info("查找检查信息");
        Page<DeviceInspection> page = null;
        ExampleMatcher matcher = ExampleMatcher.matching() //构建对象
                .withStringMatcher(ExampleMatcher.StringMatcher.CONTAINING) //改变默认字符串匹配方式：模糊查询
                .withIgnoreCase(true); //改变默认大小写忽略方式：忽略大小写

        /**创建实例*/
        Example<DeviceInspection> ex = Example.of(deviceInspection, matcher);
        /**排序查询*/
        Sort sort = new Sort(Sort.Direction.ASC, "id");
        /**分页查询*/
        PageRequest pageRequest = new PageRequest(pageIndex, pageSize, sort);
        page = deviceInspectionRepository.findAll(ex, pageRequest);
        return page;
    }
    /**
     * 更新数据
     */
    @Transactional(rollbackFor = Exception.class)
    public  DeviceInspection  save(DeviceInspection deviceInspection) {
        logger.info("更新二手车信息");
        Date date=new java.util.Date();
        deviceInspection.setCreateDate(date);
        deviceInspection = deviceInspectionRepository.save(deviceInspection);
        return deviceInspection;
    }
}
