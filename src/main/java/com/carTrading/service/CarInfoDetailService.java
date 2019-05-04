package com.carTrading.service;

import com.carTrading.entity.*;
import com.carTrading.repository.BrandRepository;
import com.carTrading.repository.TransactionRecordRepository;
import com.carTrading.tool.ListSort;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
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
    @Autowired
    UploadImageService uploadImageService;
    @Autowired
    ProcedureInfoService procedureInfoService;
    @Autowired
    BrandRepository brandRepository;
    /**
     * 获取汽车的完整信息
     */
    public com.carTrading.entity.Page<TradingInfo> getTradingInfo(CarInfo car, Integer userId, int pageIndex, int pageSize) {
        org.springframework.data.domain.Page<CarInfo> page = carInfoService.getList(car, pageIndex, pageSize);
        logger.info("查询完整的交易信息");
        List<CarInfo> clist = page.getContent();
        TradingInfo t;
        CarInfo c;
        ProcedureInfo p;
        TransactionInfo ti;
        List<TradingInfo> list = new ArrayList<TradingInfo>();
        for (int i = 0; i < page.getContent().size(); i++) {
            Date date = new Date();
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:MM:SS");
            t = new TradingInfo();
            c = clist.get(i);

            ti = transactionInfoService.getTransaction(c.getId());
            if (date.before(ti.getAuctionTime())) {
                p=procedureInfoService.getId(c.getId().intValue());
                t.setLocation(p.getPlateLocation());
                t.setId(c.getId());
                t.setBrand(c.getBrand());
                t.setProductDate(c.getProductDate());
                t.setDischarge(c.getDischarge());
                t.setMileage(c.getMileage());
                t.setTransmission(c.getTransmission());
                t.setEmissionStandard(c.getEmissionStandard());
                t.setType(c.getType());
                t.setName(c.getName());
                t.setDeposit(ti.getDeposit());
                t.setAuctionTime(ti.getAuctionTime());
                t.setStartPrice(ti.getStartPrice());
                t.setCount(transactionRecordRepository.getNum(c.getId()));
                t.setStatus(transactionRecordRepository.getStatus(userId.longValue(), c.getId()));
                UploadImage img = new UploadImage();
                img.setCarId(c.getId().intValue());
                img.setPosition("left");
                t.setSrc(uploadImageService.getList(img, 0, 1).getContent().get(0).getSrc());
                list.add(t);
            }

        }
        /**按照时间排序*/
        ListSort.ListSort(list);
        com.carTrading.entity.Page<TradingInfo> pageT = null;
        Integer total = (int) page.getTotalElements();
        pageT = new com.carTrading.entity.Page(total, pageIndex, pageSize, list);
        return pageT;
    }
    /**获取厂商*/
    public  List<Brand> getBrand(){
        List<Brand> list=brandRepository.findBrand();
        return list;
    }
}
