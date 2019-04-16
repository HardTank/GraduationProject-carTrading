package com.carTrading.controller;

import com.carTrading.entity.MyCar;
import com.carTrading.entity.OrderCar;
import com.carTrading.entity.Page;
import com.carTrading.service.OrderService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author tanlixin
 * @description
 * @since 2019-04-15
 */
@RestController
@RequestMapping(value="/order")
public class OrderController {
    @Autowired
    OrderService orderService;
    private Logger logger = LoggerFactory.getLogger(this.getClass());
//    @RequestMapping(value = "/getList")
//    public Page<OrderCar> getList(OrderCar orderCar, int pageIndex, int pageSize) {
//        logger.info(orderCar.toString());
//        Page<OrderCar>page=orderService.getPage(orderCar,pageIndex,pageSize);
//        return page;
//    }
    /**获取用户订阅的汽车的信息*/
    @RequestMapping(value = "/getList")
    public Page<OrderCar> getList(Integer userId, int pageIndex, int pageSize,int state) {
       // logger.info(orderCar.toString());
        Page<OrderCar> page=orderService.getList(userId,pageIndex,pageSize,state);
        return page;
    }
    /**获取用户订阅的汽车的信息*/
    @RequestMapping(value = "/getListResult")
    public Page<OrderCar> getListResult(Integer userId, int pageIndex, int pageSize) {
        // logger.info(orderCar.toString());
        Page<OrderCar> page=orderService.getListResult(userId,pageIndex,pageSize);
        return page;
    }
    /**获取用户的汽车交易的信息*/
    @RequestMapping(value = "/getMyList")
    public Page<OrderCar> getMyList(Integer userId, int pageIndex, int pageSize) {
        // logger.info(orderCar.toString());
        Page<OrderCar> page=orderService.getMyList(userId,pageIndex,pageSize);
        return page;
    }
    /**获取用户的汽车交易成功的信息*/
    @RequestMapping(value = "/getAllList")
    public Page<MyCar> getAllList(Integer userId, int pageIndex, int pageSize) {
        // logger.info(orderCar.toString());
        Page<MyCar> page=orderService.getAllCar(userId,pageIndex,pageSize);
        return page;
    }
}
