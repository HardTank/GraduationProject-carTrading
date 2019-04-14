package com.carTrading.controller;

import com.carTrading.entity.ProcedureInfo;
import com.carTrading.service.ProcedureInfoService;
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
 * @since 2019-04-14
 */
@RestController
@RequestMapping(value="/procedureInfo")
public class ProcedureInfoController {
    @Autowired
    ProcedureInfoService procedureInfoService;
    private Logger logger = LoggerFactory.getLogger(this.getClass());
    @RequestMapping(value = "/getList")
    public Page<ProcedureInfo> getList(ProcedureInfo car, int pageIndex, int pageSize) {
        Page<ProcedureInfo>page=procedureInfoService.getList(car,pageIndex,pageSize);
        return page;
    }

    @RequestMapping("save")
    public ProcedureInfo saveProcedureInfo(ProcedureInfo procedureInfo,
                                           String  commercialDate,
                                           String  compulsoryDate,
                                           String  yearlyDate) {
        logger.info("增加手续信息"+"commercialInsuranceValidityDate"+commercialDate );

        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-DD");
        Date date = null;
        try {
            /**商业保险到期时间*/
            date = format.parse(commercialDate.replace("\"",""));
            procedureInfo.setCommercialInsuranceValidityDate(date);
            /**交强险有效期  */
            date = format.parse(compulsoryDate.replace("\"",""));
            procedureInfo.setCompulsoryInsuranceValidityDate(date);
            /**年检有效期*/
            date = format.parse(yearlyDate.replace("\"",""));
            procedureInfo.setYearlyInspectionValidityDate(date);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        if(procedureInfo.getId()!=null) {
            ProcedureInfo car = procedureInfoService.getProcedure(procedureInfo);
            logger.info("更新二手车前" + car.toString() + procedureInfo.toString());
            UpdateNotNull.copyNonNullProperties(procedureInfo, car);
            logger.info("更新二手车" + car.toString() + procedureInfo.toString());
            procedureInfo = procedureInfoService.save(car);
        }
        else{
            logger.info("添加二手车" + procedureInfo.toString());
            procedureInfo = procedureInfoService.save(procedureInfo);

        }

        return procedureInfo;
    }
}
