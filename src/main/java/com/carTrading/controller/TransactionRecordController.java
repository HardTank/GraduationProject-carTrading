package com.carTrading.controller;

import com.carTrading.entity.TransactionRecord;
import com.carTrading.service.TransactionRecordService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.text.ParseException;

/**
 * @author tanlixin
 * @description
 * @since 2019-04-28
 */
@RestController
@RequestMapping(value = "transactionRecord")
public class TransactionRecordController {
    @Autowired
    TransactionRecordService transactionRecordService;
    private Logger logger = LoggerFactory.getLogger(this.getClass());

    //获取需要展示出价记录
    @RequestMapping(value = "/getList")
    public Page<TransactionRecord> getList(TransactionRecord car, int pageIndex, int pageSize) {
        logger.info("查询出价记录");

        Page<TransactionRecord> page = transactionRecordService.getList(car, pageIndex, pageSize);
        return page;
    }

    //插入更新出价记录
    @RequestMapping("save")
    public TransactionRecord saveTransactionRecord(TransactionRecord transactionRecord, String time) throws ParseException {
        logger.info("添加出价记录");

        transactionRecord = transactionRecordService.save(transactionRecord, time);

        return transactionRecord;
    }
    //获取最高价信息
    @RequestMapping("getHigh")
    public TransactionRecord getHighTransactionRecord(Integer carId)  {
        logger.info("获取最高价");

        TransactionRecord transactionRecord = transactionRecordService.getHigh(carId);

        return transactionRecord;
    }
    //退订
    @RequestMapping("delRecord")
    public Boolean getHighTransactionRecord(TransactionRecord t,Double wallet)  {
        logger.info("退订");
        Boolean bool= transactionRecordService.delRecord(t,wallet);
        return bool;
    }
}
