package com.carTrading.service;

import com.carTrading.entity.Wallet;
import com.carTrading.repository.WalletRepository;
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
 * @since 2019-04-11
 */
@Service
public class WalletService {


        @Autowired
        private WalletRepository walletRepository;
        private Logger logger = LoggerFactory.getLogger(this.getClass());

        /**根据条件动态查询*/
        @Transactional(rollbackFor = Exception.class)
        public Page<Wallet> getList(Wallet wallet, int pageIndex, int pageSize) {
            logger.info("根据姓名查找用户");
            Page<Wallet> page = null;
            Wallet wallet1 = wallet;
            /**动态查询*/
            ExampleMatcher matcher = ExampleMatcher.matching() //构建对象
                    .withStringMatcher(ExampleMatcher.StringMatcher.CONTAINING) //改变默认字符串匹配方式：模糊查询
                    .withIgnoreCase(true); //改变默认大小写忽略方式：忽略大小写

            /**创建实例*/
            Example<Wallet> ex = Example.of(wallet1, matcher);
            /**排序查询*/
            Sort sort = new Sort(Sort.Direction.DESC, "id");
            /**分页查询*/
            PageRequest pageRequest = new PageRequest(pageIndex, pageSize, sort);
            page = walletRepository.findAll(ex, pageRequest);
            return page;
        }

        /**更新数据*/
        @Transactional(rollbackFor = Exception.class)
        public Wallet add(Wallet wallet) {
            Date date=new java.util.Date();
             wallet.setCreateTime(date);
             wallet = walletRepository.save(wallet);
            return wallet;
        }
        /**根据id查找用户*/
        @Transactional(rollbackFor = Exception.class)
        public  Wallet  getWallet(Wallet wallet) {
            logger.info("根据id查找用户");
            wallet = walletRepository.findOne(wallet.getId());
            return wallet;
        }

    }


