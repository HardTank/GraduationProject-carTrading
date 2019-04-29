package com.carTrading.service;

import com.carTrading.entity.TransactionInfo;
import com.carTrading.repository.TransactionInfoRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * @author tanlixin
 * @description
 * @since 2019-04-27
 */
@Service
public class TransactionInfoService {
    @Autowired
    private TransactionInfoRepository transactionInfoRepository;
    private Logger logger = LoggerFactory.getLogger(this.getClass());

    /**
     * 动态查询
     */
    public Page<TransactionInfo> getList(TransactionInfo transactionInfo, int pageIndex, int pageSize) {
        logger.info("查找竞拍信息"+transactionInfo.toString());
        Page<TransactionInfo> page = null;
        ExampleMatcher matcher = ExampleMatcher.matching() //构建对象
                .withStringMatcher(ExampleMatcher.StringMatcher.CONTAINING) //改变默认字符串匹配方式：模糊查询
                .withIgnoreCase(true); //改变默认大小写忽略方式：忽略大小写

        /**创建实例*/
        Example<TransactionInfo> ex = Example.of(transactionInfo, matcher);
        /**排序查询*/
        Sort sort = new Sort(Sort.Direction.DESC, "id");
        /**分页查询*/
        PageRequest pageRequest = new PageRequest(pageIndex, pageSize, sort);
        page = transactionInfoRepository.findAll(ex, pageRequest);
        return page;
    }

    /**
     * 更新数据
     */
    @Transactional(rollbackFor = Exception.class)
    public TransactionInfo save(TransactionInfo transactionInfo) {
        logger.info("更新竞拍信息");
        TransactionInfo tTransactionInfo = transactionInfoRepository.save(transactionInfo);
        return transactionInfo;
    }

    /**
     * 根据id获取竞拍的信息
     */
    public TransactionInfo getTransaction(TransactionInfo transactionInfo) {
        TransactionInfo t= transactionInfoRepository.findOne(transactionInfo.getId());
        return t;
    }
    /**
     * 根据id获取竞拍的信息
     */
    public TransactionInfo getTransaction(Long id) {
        TransactionInfo t= transactionInfoRepository.findByCarId(id);
        return t;
    }
}
