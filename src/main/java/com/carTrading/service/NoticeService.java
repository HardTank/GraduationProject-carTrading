package com.carTrading.service;

import com.carTrading.entity.Notice;
import com.carTrading.repository.NoticeRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;

/**
 * @author tanlixin
 * @description
 * @since 2019-05-08
 */
@Service
public class NoticeService {
    @Autowired
    NoticeRepository noticeRepository;
    private Logger logger = LoggerFactory.getLogger(this.getClass());
    //动态查询
    public Page<Notice> getList(Notice notice,Integer pageIndex,Integer pageSize){
        logger.info("查找公告信息");
        Page<Notice> page = null;
        ExampleMatcher matcher = ExampleMatcher.matching() //构建对象
                .withStringMatcher(ExampleMatcher.StringMatcher.CONTAINING) //改变默认字符串匹配方式：模糊查询
                .withIgnoreCase(true); //改变默认大小写忽略方式：忽略大小写

        /**创建实例*/
        Example<Notice> ex = Example.of(notice, matcher);
        /**排序查询*/
        Sort sort = new Sort(Sort.Direction.DESC, "createTime");
        /**分页查询*/
        PageRequest pageRequest = new PageRequest(pageIndex, pageSize, sort);
        page = noticeRepository.findAll(ex, pageRequest);
        return page;
    }
    /**
     * 更新数据
     */
    @Transactional(rollbackFor = Exception.class)
    public Notice save(Notice notice) {
        logger.info("更新二手车信息");
        notice.setCreateTime(new Date());
         notice = noticeRepository.save(notice);
        return notice;
    }
    /**
     * 根据id获取公告的信息
     */
    public Notice getNotice(Notice notice) {
         notice = noticeRepository.findOne(notice.getId());
        return notice;
    }

}
