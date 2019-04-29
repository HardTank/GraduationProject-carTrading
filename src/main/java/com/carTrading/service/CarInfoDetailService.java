package com.carTrading.service;

import com.carTrading.entity.CarInfo;
import com.carTrading.entity.TradingInfo;
import com.carTrading.entity.TransactionInfo;
import com.carTrading.repository.TransactionRecordRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * @author tanlixin
 * @description
 * @since 2019-04-29
 */
@Service
public class CarInfoDetailService {
    @Autowired
    private CarInfoService carInfoService;
    private Logger logger = LoggerFactory.getLogger(this.getClass());
    @Autowired
    TransactionInfoService transactionInfoService;
    @Autowired
    TransactionRecordRepository transactionRecordRepository;

    /**
     * 获取汽车的完整信息
     */
    public com.carTrading.entity.Page<TradingInfo> getTradingInfo(CarInfo car, Integer userId, int pageIndex, int pageSize) {
        org.springframework.data.domain.Page<CarInfo> page = carInfoService.getList(car, pageIndex, pageSize);
        logger.info("查询完整的交易信息");
        List<CarInfo> clist = page.getContent();
        TradingInfo t;
        CarInfo c;
        TransactionInfo ti;
        List<TradingInfo> list = new ArrayList<TradingInfo>();
        for (int i = 0; i < page.getContent().size(); i++) {
            t = new TradingInfo();
            c = clist.get(i);
            ti = transactionInfoService.getTransaction(c.getId());
            t.setId(c.getId());
            t.setBrand(c.getBrand());
            t.setProductDate(c.getProductDate());
            t.setDischarge(c.getDischarge());
            t.setMileage(c.getMileage());
            t.setTransmission(c.getTransmission());
            t.setEmissionStandard(c.getEmissionStandard());
            t.setType(c.getType());
            t.setAuctionTime(ti.getAuctionTime());
            t.setStartPrice(ti.getStartPrice());
            t.setCount(transactionRecordRepository.getNum(ti.getId()));
            t.setStatus(transactionRecordRepository.getStatus(userId.longValue(), ti.getId()));
            list.add(t);
        }
        com.carTrading.entity.Page<TradingInfo> pageT = null;
        Integer total = (int) page.getTotalElements();
        pageT = new com.carTrading.entity.Page(total, pageIndex, pageSize, list);
        return pageT;
    }
}
