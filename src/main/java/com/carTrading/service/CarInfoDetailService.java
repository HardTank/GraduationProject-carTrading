package com.carTrading.service;

import com.carTrading.entity.*;
import com.carTrading.repository.BrandRepository;
import com.carTrading.repository.CarInfoRepository;
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
    @Autowired
    private CarInfoRepository carInfoRepository;
    /**
     * 获取汽车的完整信息
     */
    public com.carTrading.entity.Page<TradingInfo> getTradingInfo(CarInfo car, Integer userId, int pageIndex, int pageSize,String location,Double startPrice,Double endPrice) {
         car.setDeleted(0);
//        if(car.getBrand()=="all")
//            car.setBrand("");
//        if(car.getEmissionStandard()=="all")
//            car.setEmissionStandard("");

      //  org.springframework.data.domain.Page<CarInfo> page = carInfoService.getList(car, pageIndex, pageSize);
        logger.info("查询完整的交易信息");

        //List<CarInfo> clist = page.getContent();
        List<CarInfo> clist = carInfoService.getList(car);
        TradingInfo t;
        CarInfo c;
        ProcedureInfo p;
        TransactionInfo ti;
        List<TradingInfo> list = new ArrayList<TradingInfo>();
        for (int i = 0; i < clist.size(); i++) {
            Date date = new Date();
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:MM:SS");
            t = new TradingInfo();
            c = clist.get(i);
            System.out.println(c.toString());
            ti = transactionInfoService.getTransaction(c.getId());
            System.out.println(ti.toString());
            ti.getAuctionTime();
            System.out.println(c.getOwnerId()!=userId.longValue());
            System.out.println(ti.getAuctionTime().getTime()>new Date().getTime());
            if(c.getOwnerId()!=userId.longValue())
            if (ti.getAuctionTime().getTime()>new Date().getTime()) {
                p=procedureInfoService.getId(c.getId().intValue());
                System.out.println("++"+p.toString());
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
                if(location==""||p.getPlateLocation().equals(location))
                    if(endPrice==0||t.getStartPrice()>startPrice&&t.getStartPrice()<=endPrice)
                list.add(t);
            }

        }
        /**按照时间排序*/
        ListSort.ListSort(list);
        com.carTrading.entity.Page<TradingInfo> pageT = null;
        Integer total = list.size();


        int size=(pageIndex+1)*pageSize;
        if((pageIndex+1)*pageSize>list.size())
        size=list.size();
        System.out.println(total+location+"-------------------------------------"+startPrice+"/"+endPrice);
        pageT = new com.carTrading.entity.Page(total, pageIndex, pageSize, list.subList(pageIndex*pageSize,size));
        return pageT;
    }
    /**获取厂商*/
    public  List<Brand> getBrand(){
        List<Brand> list=brandRepository.findBrand();
        return list;
    }
}
