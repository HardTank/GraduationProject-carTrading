package com.carTrading.controller;

import com.carTrading.entity.DeviceInspection;
import com.carTrading.service.DeviceInspectionService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author tanlixin
 * @description
 * @since 2019-04-22
 */
@RestController
@RequestMapping(value="/deviceInspection")
public class DeviceInspectionController {
    @Autowired
    DeviceInspectionService deviceInspectionService;
    private Logger logger = LoggerFactory.getLogger(this.getClass());

    //获取需要展示的检查信息
    @RequestMapping(value = "/getList")
    public Page<DeviceInspection> getList(DeviceInspection deviceInspection, int pageIndex, int pageSize) {
        logger.info("查询二手车检查信息"+deviceInspection.toString());
        Page<DeviceInspection> page = deviceInspectionService.getList(deviceInspection, pageIndex, pageSize);
        return page;
    }
    //添加/更新信息
    @RequestMapping(value = "/save")
    public Page<DeviceInspection> save(DeviceInspection deviceInspection){
        logger.info("更新检查信息"+deviceInspection.toString());
        deviceInspectionService.save(deviceInspection);
        DeviceInspection w=new DeviceInspection();
        w.setCarId(deviceInspection.getCarId());
        logger.info("w:"+w.toString());
        Page<DeviceInspection> wa=getList(w,0,4);
        return wa;
    }
    @RequestMapping(value = "/delete")
    public Page<DeviceInspection> delete(DeviceInspection deviceInspection){
        logger.info("删除检查信息"+deviceInspection.toString());
        deviceInspectionService.delete(deviceInspection);
        DeviceInspection w=new DeviceInspection();
        w.setCarId(deviceInspection.getCarId());
        logger.info("w:"+w.toString());
        Page<DeviceInspection> wa=getList(w,0,4);
        return wa;
    }
}
