package com.carTrading.controller;

import com.carTrading.entity.CarInfo;
import com.carTrading.service.CarInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author tanlixin
 * @description
 * @since 2019-04-02
 */
@RestController
@RequestMapping(value = "/carInfo")
public class CarInfoController {
    @Autowired
    CarInfoService carInfoService;

    @RequestMapping(value = "/getList")
    public Page<CarInfo> getList(CarInfo car, int pageIndex, int pageSize) {
        Page<CarInfo>page=carInfoService.getList(car,pageIndex,pageSize);
        return page;
    }

    @RequestMapping("save")
    public Boolean saveCarInfo(CarInfo carInfo) {
        Boolean result = carInfoService.save(carInfo);
        return result;
    }
}
