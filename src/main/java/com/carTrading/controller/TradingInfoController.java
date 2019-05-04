package com.carTrading.controller;

import com.carTrading.entity.Brand;
import com.carTrading.entity.CarInfo;
import com.carTrading.entity.TradingInfo;
import com.carTrading.service.CarInfoDetailService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * @author tanlixin
 * @description
 * @since 2019-04-29
 */
@RestController
@RequestMapping(value="/tradingInfo")
public class TradingInfoController {
    @Autowired
    CarInfoDetailService carInfoDetailService;

    private Logger logger = LoggerFactory.getLogger(this.getClass());
    //获取详细的汽车交易信息
    @RequestMapping(value = "/getDetailList")
    public com.carTrading.entity.Page<TradingInfo> getDetailList(CarInfo car, int userId , int pageIndex, int pageSize) {
        com.carTrading.entity.Page<TradingInfo> page = carInfoDetailService.getTradingInfo(car,userId, pageIndex, pageSize);
        return page;
    }
    /**获取厂商列表*/
    @RequestMapping("brand")
    public List<Brand> getBrand(){
        List<Brand> list=carInfoDetailService.getBrand();
        return list;
    }
}
