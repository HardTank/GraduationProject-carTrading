package com.carTrading.controller;

import com.carTrading.entity.*;
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
    public Page<MyOrder> getList(Integer userId, int pageIndex, int pageSize,int state) {
       // logger.info(orderCar.toString());
        Page<MyOrder> page=orderService.getList(userId,pageIndex,pageSize,state);
        return page;
    }
    /**获取用户订阅的汽车的信息*/
    @RequestMapping(value = "/getListResult")
    public Page<MyCar> getListResult(Integer userId, int pageIndex, int pageSize) {
        // logger.info(orderCar.toString());
        Page<MyCar> page=orderService.getListResult(userId,pageIndex,pageSize);
        return page;
    }
    /**获取用户的汽车交易的信息*/
    @RequestMapping(value = "/getMyList")
    public Page<OrderCar> getMyList(Integer userId, int pageIndex, int pageSize) {
        // logger.info(orderCar.toString());
        Page<OrderCar> page=orderService.getMyList(userId,pageIndex,pageSize);
        return page;
    }
    /**管理员查找支付成功信息*/
    @RequestMapping(value = "/getPaySuccess")
    public Page<ConfirmCar> getPaySuccess(Integer userId, int pageIndex, int pageSize) {
        // logger.info(orderCar.toString());
        Page<ConfirmCar> page=orderService.getSuccess(userId,pageIndex,pageSize);
        return page;
    }
    /**获取用户的汽车交易成功的信息*/
    @RequestMapping(value = "/getAllList")
    public Page<MyCar> getAllList(Integer userId, int pageIndex, int pageSize) {
        // logger.info(orderCar.toString());
        Page<MyCar> page=orderService.getAllCar(userId,pageIndex,pageSize);
        return page;
    }
    /**获取用户的保证金*/
    @RequestMapping(value = "/getDeposit")
    public Integer getDepositt(Integer userId ) {
        // logger.info(orderCar.toString());
       Integer deposit=orderService.getDeposit(userId);
        return deposit;
    }
    /**获取所有的汽车信息*/
    @RequestMapping(value="/getAllCar")
    public Page<MyCar> getAllCarManage(int pageIndex, int pageSize){
        Page<MyCar> page=orderService.getAllCarManage(pageIndex,pageSize);
        return page;
    }
}
