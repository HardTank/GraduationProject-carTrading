package com.carTrading.controller;

import com.carTrading.entity.TransactionInfo;
import com.carTrading.service.TransactionInfoService;
import com.carTrading.tool.UpdateNotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;

/**
 * @author tanlixin
 * @description
 * @since 2019-04-27
 */
@RestController
@RequestMapping(value="/transactionInfo")
public class TransactionInfoController {
    @Autowired
    TransactionInfoService transactionInfoService;
    private Logger logger = LoggerFactory.getLogger(this.getClass());

    //获取需要展示的汽车信息
    @RequestMapping(value = "/getList")
    public Page<TransactionInfo> getList(TransactionInfo transaction, int pageIndex, int pageSize) {
        logger.info("路径-------------------------------------");
        Page<TransactionInfo> page = transactionInfoService.getList(transaction, pageIndex, pageSize);
        return page;
    }

    //插入更新存储的二手车信息
    @RequestMapping("save")

    public TransactionInfo saveTransactionInfo(TransactionInfo transactionInfo,Date time) {
        logger.info("transactionInfo" + transactionInfo.toString()+time);

       // DateFormat format = new SimpleDateFormat("YYYY-MM-DD HH:MM:SS");
           transactionInfo.setAuctionTime(time);
        logger.info("transactionInfo" + transactionInfo.toString()+time);
        if (transactionInfo.getId() != null) {
            TransactionInfo transaction = transactionInfoService.getTransaction(transactionInfo);
            logger.info("更新二手车前" + transaction.toString() + transactionInfo.toString());
            //处理null值
            UpdateNotNull.copyNonNullProperties(transactionInfo, transaction);
            logger.info("更新二手车" + transaction.toString() + transactionInfo.toString());
            transactionInfo = transactionInfoService.save(transaction);
        } else {
            logger.info("添加二手车" + transactionInfo.toString());
            transactionInfo = transactionInfoService.save(transactionInfo);
        }
        return transactionInfo;
    }
    //更加carId 获取竞拍信息
    @RequestMapping(value="/getByCarId")
    public TransactionInfo get(Integer id){
        return transactionInfoService.getTransaction(id.longValue());

    }
//    @InitBinder
//    public void initBinder(WebDataBinder binder, WebRequest request) {
//
//        //转换日期
//        DateFormat dateFormat=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//        binder.registerCustomEditor(Date.class, new CustomDateEditor(dateFormat, true));// CustomDateEditor为自定义日期编辑器
//    }


}
