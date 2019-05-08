package com.carTrading.controller;

import com.carTrading.entity.Notice;
import com.carTrading.service.NoticeService;
import com.carTrading.tool.UpdateNotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * @author tanlixin
 * @description
 * @since 2019-05-08
 */
@RestController
@RequestMapping(value="/notice")
public class NoticeController {
    @Autowired
    NoticeService noticeService;
    private Logger logger = LoggerFactory.getLogger(this.getClass());

    //获取需要展示的汽车信息
    @RequestMapping(value = "/getList")
    public Page<Notice> getList(Notice notice, int pageIndex, int pageSize) {
        logger.info("查询公告");

        Page<Notice> page = noticeService.getList(notice, pageIndex, pageSize);
        return page;
    }

    //插入更新存储的二手车信息
    @RequestMapping("save")
    public Notice saveNotice(Notice notice ) {
        logger.info("插入的公告信息"+notice.toString());
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM");
        Date date = null;
        //转化日期格式
//        if (productDates != null) {
//            try {
//
//                date = format.parse(productDates.replace("\"", ""));
//                Notice.setProductDate(date);
//            } catch (ParseException e) {
//                e.printStackTrace();
//            }
//        }

        if (notice.getId() != null) {
            Notice noti = noticeService.getNotice(notice);
            //处理null值
            UpdateNotNull.copyNonNullProperties(notice, noti);
            notice = noticeService.save(noti);
        } else {
            notice = noticeService.save(notice);

        }
        return notice;
    }
    //删除汽车信息
    @RequestMapping(value = "/delNotice")
    public Page<Notice> delNotice(Notice notice) {
        logger.info("删除汽车信息");
        notice.setDeleted(1);
        saveNotice(notice);
        Page<Notice> page = noticeService.getList(notice, 0, 10);
        return page;
    }
    //根据id汽车信息
    @RequestMapping(value = "/getNotice")
    public  Notice getNotice(Notice notice) {
        logger.info("获取汽车信息");
        notice.setDeleted(0);
        Notice c = noticeService.getNotice(notice);
        return c;
    }
}
