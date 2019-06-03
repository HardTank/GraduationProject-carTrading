package com.carTrading.service;

import com.carTrading.entity.CarInfo;
import com.carTrading.repository.CarInfoRepository;
import com.carTrading.repository.TransactionRecordRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * @author tanlixin
 * @description
 * @since 2019-04-02
 */
@Service
public class CarInfoService {

    @Autowired
    private CarInfoRepository carInfoRepository;
    private Logger logger = LoggerFactory.getLogger(this.getClass());
    @Autowired
    TransactionInfoService transactionInfoService;
    @Autowired
    TransactionRecordRepository transactionRecordRepository;

    /**
     * 动态查询
     */
    public Page<CarInfo> getList(CarInfo car, int pageIndex, int pageSize) {
        logger.info("查找二手车信息");
        Page<CarInfo> page = null;
        ExampleMatcher matcher = ExampleMatcher.matching() //构建对象
                .withStringMatcher(ExampleMatcher.StringMatcher.CONTAINING) //改变默认字符串匹配方式：模糊查询
                .withIgnoreCase(true); //改变默认大小写忽略方式：忽略大小写

        /**创建实例*/
        Example<CarInfo> ex = Example.of(car, matcher);
        /**排序查询*/
        Sort sort = new Sort(Sort.Direction.ASC, "id");
        /**分页查询*/
        PageRequest pageRequest = new PageRequest(pageIndex, pageSize, sort);
        page = carInfoRepository.findAll(ex, pageRequest);
        return page;
    }
    /**
     * 动态查询不分页
     */
    public List<CarInfo> getList(CarInfo car) {
        logger.info("查找二手车信息");
        Page<CarInfo> page = null;
        ExampleMatcher matcher = ExampleMatcher.matching() //构建对象
                .withStringMatcher(ExampleMatcher.StringMatcher.CONTAINING) //改变默认字符串匹配方式：模糊查询
                .withIgnoreCase(true); //改变默认大小写忽略方式：忽略大小写

        /**创建实例*/
        Example<CarInfo> ex = Example.of(car, matcher);
        /**排序查询*/
        Sort sort = new Sort(Sort.Direction.ASC, "id");
        /**分页查询*/
      //  PageRequest pageRequest = new PageRequest(pageIndex, pageSize, sort);
        List<CarInfo>list =carInfoRepository.findAll(ex);
        return list;
    }
    /**
     * 更新数据
     */
    @Transactional(rollbackFor = Exception.class)
    public CarInfo save(CarInfo car) {
        logger.info("更新二手车信息");
        CarInfo carInfo = carInfoRepository.save(car);
        return carInfo;
    }

    /**
     * 根据id获取汽车的信息
     */
    public CarInfo getCar(CarInfo carInfo) {
        CarInfo car = carInfoRepository.findOne(carInfo.getId());
        return car;
    }
    /**删除车辆*/
    public void  delCar(CarInfo car){
        car.setDeleted(1);
        save(car);

    }

}
