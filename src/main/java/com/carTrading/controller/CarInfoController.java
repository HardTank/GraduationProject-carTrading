package com.carTrading.controller;

import com.carTrading.entity.CarInfo;
import com.carTrading.service.CarInfoService;
import com.carTrading.tool.UpdateNotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

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
    private Logger logger = LoggerFactory.getLogger(this.getClass());

    //获取需要展示的汽车信息
    @RequestMapping(value = "/getList")
    public Page<CarInfo> getList(CarInfo car, int pageIndex, int pageSize) {
       logger.info("路径-------------------------------------");
        Page<CarInfo> page = carInfoService.getList(car, pageIndex, pageSize);
        return page;
    }

    //插入更新存储的二手车信息
    @RequestMapping("save")
    public CarInfo saveCarInfo(CarInfo carInfo, String productDates) {
        logger.info("productDate" + productDates);

        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM");
        Date date = null;
        //转化日期格式
        if (productDates != null) {
            try {

                date = format.parse(productDates.replace("\"", ""));
                carInfo.setProductDate(date);
            } catch (ParseException e) {
                e.printStackTrace();
            }
        }

        if (carInfo.getId() != null) {
            CarInfo car = carInfoService.getCar(carInfo);
            logger.info("更新二手车前" + car.toString() + carInfo.toString());
            //处理null值
            UpdateNotNull.copyNonNullProperties(carInfo, car);
            logger.info("更新二手车" + car.toString() + carInfo.toString());
            carInfo = carInfoService.save(car);
        } else {
            logger.info("添加二手车" + carInfo.toString());
            carInfo = carInfoService.save(carInfo);

        }
        return carInfo;
    }
}
