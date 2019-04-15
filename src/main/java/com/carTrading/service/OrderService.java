package com.carTrading.service;

import com.carTrading.entity.CarInfo;
import com.carTrading.entity.OrderCar;
import com.carTrading.entity.Page;
import com.carTrading.entity.TransactionRecord;
import com.carTrading.repository.OrderRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author tanlixin
 * @description
 * @since 2019-04-15
 */
@Service
public class OrderService {
    @Autowired
    OrderRepository orderRepository;
    @Autowired
    TransactionRecordService transactionRecordService;
    @Autowired
    CarInfoService carInfoService;
    private Logger logger = LoggerFactory.getLogger(this.getClass());
    /**
     * 动态查询
     */
//    public Page<OrderCar> getPage(OrderCar orderCar, int pageIndex, int pageSize) {
//        logger.info("查找订阅信息");
//        Page<OrderCar> page = null;
//        ExampleMatcher matcher = ExampleMatcher.matching() //构建对象
//                .withStringMatcher(ExampleMatcher.StringMatcher.CONTAINING) //改变默认字符串匹配方式：模糊查询
//                .withIgnoreCase(true); //改变默认大小写忽略方式：忽略大小写
//
//        /**创建实例*/
//        Example<OrderCar> ex = Example.of(orderCar, matcher);
//        /**排序查询*/
//        Sort sort = new Sort(Sort.Direction.ASC, "id");
//        /**分页查询*/
//        PageRequest pageRequest = new PageRequest(pageIndex, pageSize, sort);
//        page = orderRepository.findAll(ex, pageRequest);
//        return page;
//    }
    /** 查找用户订阅的汽车信息*/
    public Page<OrderCar> getList(Integer userId, int pageIndex, int pageSize,int state) {
        logger.info("查找订阅信息");
        Page<OrderCar> page = null;

        List<OrderCar> list = orderRepository.findById(userId,pageIndex,pageSize,state);
        TransactionRecord record=new TransactionRecord();
        record.setUserId(userId);
        int totalNumber= (int)transactionRecordService.getList(record,0,1).getTotalElements();
        page=new Page(totalNumber,pageIndex,pageSize,list);
        return page;
    }
    /**查找用户自己的汽车信息*/
    public Page<OrderCar> getMyList(Integer userId, int pageIndex, int pageSize) {
        logger.info("查找订阅信息");
        Page<OrderCar> page = null;

        List<OrderCar> list = orderRepository.findMyCar(userId,pageIndex,pageSize);
        CarInfo car=new CarInfo();
        car.setOwnerId(userId);
        int totalNumber= (int)carInfoService.getList(car,0,1).getTotalElements();
        page=new Page(totalNumber,pageIndex,pageSize,list);
        return page;
    }
}
