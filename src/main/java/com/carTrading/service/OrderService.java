package com.carTrading.service;

import com.carTrading.entity.*;
import com.carTrading.repository.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
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
    @Autowired
    MyCarRepository myCarRepository;
    @Autowired
    MyOrderRepository myOrderRepository;
    @Autowired
    ConfirmCarRepository confirmCarRepository;
    @Autowired
   CarInfoRepository carInfoRepository ;
    @Autowired
    TransactionInfoService transactionInfoService;
    private Logger logger = LoggerFactory.getLogger(this.getClass());


    /**
     * 查找用户订阅的汽车信息
     */
    public Page<MyOrder> getList(Integer userId, int pageIndex, int pageSize, int state) {
        logger.info("查找订阅信息");
        Page<MyOrder> page = null;

        List<MyOrder> list = myOrderRepository.findById(userId, pageIndex, pageSize, state);

        TransactionRecord record = new TransactionRecord();
        record.setUserId(userId);
        record.setState(0);
        int totalNumber = (int) transactionRecordService.getList(record, 0, 1).getTotalElements();
        page = new Page(totalNumber, pageIndex, pageSize, list);
        return page;
    }

    /**
     * 查找用户订阅的汽车竞拍成功信息
     */
    public Page<MyCar> getListResult(Integer userId, int pageIndex, int pageSize) {
        logger.info("查找竞拍成功信息");
        Page<MyCar> page = null;
        List<MyCar> myList=new ArrayList<MyCar>();
        List<MyCar> list = myCarRepository.findCarResult( );

        for (int i = 0; i < list.size(); i++) {
            Date date = new Date();
            if (list.get(i).getAuctionTime().getTime() + 600000 < date.getTime()) {
                TransactionRecord t = transactionRecordService.getHigh(list.get(i).getId().intValue());

                Double price =null;
                if (t != null) {
                    //判断出最高价的人是不是本人
                    if (t.getUserId()== userId){
                        price = t.getPrice();
                        list.get(i).setPrice(price);
                        myList.add( list.get(i));
                    }

                }
            }
        }
        CarInfo car = new CarInfo();
        car.setOwnerId(userId);
        //分页操作
        int totalNumber = myList.size();
        int n=pageSize;
        pageSize=pageIndex*n+n;
        if(pageSize>totalNumber)
            pageSize=totalNumber;
        List<MyCar> lists=myList.subList(pageIndex*n,pageSize);
        page = new Page(totalNumber, pageIndex, n,lists);
        return page;
    }

    /**
     * 查找用户自己的汽车交易成功信息
     */
    public Page<OrderCar> getMyList(Integer userId, int pageIndex, int pageSize) {
        logger.info("查找订阅信息");
        Page<OrderCar> page = null;

        List<OrderCar> list = orderRepository.findMyCar(userId, pageIndex, pageSize);
        TransactionRecord record = new TransactionRecord();
        record.setUserId(userId);
        int totalNumber = (int) transactionRecordService.getList(record, 0, 1).getTotalElements();

        page = new Page(totalNumber, pageIndex, pageSize, list);
        return page;
    }

    /**
     * 管理员查找支付成功信息
     */
    public Page<ConfirmCar> getSuccess(Integer userId, int pageIndex, int pageSize) {
        logger.info("查找竞拍成功信息");
        Page<ConfirmCar> page = null;

        List<ConfirmCar> list = confirmCarRepository.findResult(pageIndex, pageSize);
        CarInfo car = new CarInfo();
        car.setOwnerId(userId);
        car.setState(3);
        int totalNumber = (int) carInfoService.getList(car, 0, 1).getTotalElements();
        page = new Page(totalNumber, pageIndex, pageSize, list);
        return page;
    }

    /**
     * 查找用户自己的汽车信息
     */
    public Page<MyCar> getAllCar(Integer userId, int pageIndex, int pageSize) {
        logger.info("查找订阅信息");
        Page<MyCar> page = null;

        List<MyCar> list = myCarRepository.findCar(userId, pageIndex, pageSize);
        for (int i = 0; i < list.size(); i++) {
            Date date = new Date();
            if(list.get(i).getAuctionTime()!=null)
            if (list.get(i).getAuctionTime().getTime() + 600000 < date.getTime()) {
                TransactionRecord t = transactionRecordService.getHigh(list.get(i).getId().intValue());
                Double price = null;
                if (t != null) {
                    price = t.getPrice();
                }
                list.get(i).setPrice(price);
            }
        }
        CarInfo car = new CarInfo();
        car.setOwnerId(userId);
        car.setDeleted(0);
        int totalNumber = (int) carInfoService.getList(car, 0, 1).getTotalElements();
        page = new Page(totalNumber, pageIndex, pageSize, list);
        return page;
    }
    /**
     * 查找所有的汽车信息
     */
    public Page<MyCar> getAllCarManage( int pageIndex, int pageSize) {
        logger.info("查找订阅信息");
        Page<MyCar> page = null;
        List<MyCar> list = myCarRepository.findAllCar(pageIndex, pageSize);
        for (int i = 0; i < list.size(); i++) {
            Date date = new Date();
            if(list.get(i).getAuctionTime()!=null)
                if (list.get(i).getAuctionTime().getTime() + 600000 < date.getTime()) {
                    TransactionRecord t = transactionRecordService.getHigh(list.get(i).getId().intValue());
                    Double price = null;
                    if (t != null) {
                        price = t.getPrice();
                    }
                    list.get(i).setPrice(price);
                }
        }

        int totalNumber = list.size();
        page = new Page(totalNumber, pageIndex, pageSize, list);
        return page;
    }
    /**
     * 查找等待审核的汽车信息
     */
    public Page<OrderCar> getAllReview(int pageIndex, int pageSize, int state) {
        logger.info("查找订阅信息");
        Page<OrderCar> page = null;

        List<OrderCar> list = orderRepository.findAllReview(pageIndex, pageSize, state);
        CarInfo car = new CarInfo();
        car.setState(state);
        int totalNumber = (int) carInfoService.getList(car, 0, 1).getTotalElements();
        page = new Page(totalNumber, pageIndex, pageSize, list);
        return page;

    }

    /**
     * 获取保证金
     */
    public Integer getDeposit(Integer userId) {
        TransactionRecord record = new TransactionRecord();
        record.setUserId(userId);
        record.setState(1);
        int totalNumber = (int) transactionRecordService.getList(record, 0, 1).getTotalElements();
        record.setState(2);
        totalNumber += (int) transactionRecordService.getList(record, 0, 1).getTotalElements();

        return totalNumber;
    }
}
