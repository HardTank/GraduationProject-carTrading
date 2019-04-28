package com.carTrading.controller;

import com.carTrading.entity.TransactionRecord;
import com.carTrading.service.TransactionRecordService;
import com.carTrading.tool.UpdateNotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author tanlixin
 * @description
 * @since 2019-04-28
 */
@RestController
@RequestMapping(value="transactionRecord")
public class TransactionRecordController {
    @Autowired
    TransactionRecordService transactionRecordService;
    private Logger logger = LoggerFactory.getLogger(this.getClass());

    //获取需要展示的汽车信息
    @RequestMapping(value = "/getList")
    public Page<TransactionRecord> getList(TransactionRecord car, int pageIndex, int pageSize) {
        logger.info("路径-------------------------------------");

        Page<TransactionRecord> page = transactionRecordService.getList(car, pageIndex, pageSize);
        return page;
    }

    //插入更新存储的二手车信息
    @RequestMapping("save")
    public TransactionRecord saveTransactionRecord(TransactionRecord transactionRecord, String productDates) {
        logger.info("productDate" + productDates);




        if (transactionRecord.getId() != null) {
            TransactionRecord transaction = transactionRecordService.getTransactionRecord(transactionRecord);
            logger.info("更新二手车前" + transaction.toString() + transactionRecord.toString());
            //处理null值
            UpdateNotNull.copyNonNullProperties(transactionRecord, transaction);
            logger.info("更新二手车" + transaction.toString() + transactionRecord.toString());
            transactionRecord = transactionRecordService.save(transaction);
        } else {
            logger.info("添加二手车" + transactionRecord.toString());
            transactionRecord = transactionRecordService.save(transactionRecord);

        }
        return transactionRecord;
    }
}