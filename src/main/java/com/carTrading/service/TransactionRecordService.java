package com.carTrading.service;

import com.carTrading.entity.TransactionRecord;
import com.carTrading.repository.TransactionRecordRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

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
        Sort sort = new Sort(Sort.Direction.DESC, "price");
        /**分页查询*/
        PageRequest pageRequest = new PageRequest(pageIndex, pageSize, sort);
        page = transactionRecordRepository.findAll(ex, pageRequest);
        return page;
    }

    /**
     * 根据id获取竞拍的信息
     */
    public TransactionRecord getTransactionRecord(TransactionRecord transactionRecord) {
        TransactionRecord t = transactionRecordRepository.findOne(transactionRecord.getId());
        return t;
    }

    /**
     * 更新数据
     */
    @Transactional(rollbackFor = Exception.class)
    public TransactionRecord save(TransactionRecord t,String time) throws ParseException {

        logger.info("更新竞拍息" + t.toString());
        if(time!=null) {
            SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            Date date = formatter.parse(time);
            t.setCreateTime(date);
        }
        else{
            t.setCreateTime(new Date());
        }
        Page<TransactionRecord> page=getList(t,0,1);
        if(page.getContent().size()==0)
         t = transactionRecordRepository.save(t);
        return t;
    }
}
