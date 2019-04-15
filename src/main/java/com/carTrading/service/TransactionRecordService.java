package com.carTrading.service;

import com.carTrading.entity.TransactionRecord;
import com.carTrading.repository.TransactionRecordRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

/**
 * @author tanlixin
 * @description
 * @since 2019-04-15
 */
@Service
public class TransactionRecordService {
    @Autowired
    private TransactionRecordRepository transactionRecordRepository;
    private Logger logger = LoggerFactory.getLogger(this.getClass());
    /**
     * 动态查询
     */
    public Page<TransactionRecord> getList(TransactionRecord record, int pageIndex, int pageSize) {
        logger.info("查找订阅信息");
        Page<TransactionRecord> page = null;
        ExampleMatcher matcher = ExampleMatcher.matching() //构建对象
                .withStringMatcher(ExampleMatcher.StringMatcher.CONTAINING) //改变默认字符串匹配方式：模糊查询
                .withIgnoreCase(true); //改变默认大小写忽略方式：忽略大小写

        /**创建实例*/
        Example<TransactionRecord> ex = Example.of(record, matcher);
        /**排序查询*/
        Sort sort = new Sort(Sort.Direction.ASC, "id");
        /**分页查询*/
        PageRequest pageRequest = new PageRequest(pageIndex, pageSize, sort);
        page = transactionRecordRepository.findAll(ex, pageRequest);
        return page;
    }
}
