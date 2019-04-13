package com.carTrading.controller;

import com.carTrading.entity.Wallet;
import com.carTrading.service.WalletService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * @author tanlixin
 * @description
 * @since 2019-04-11
 */
@Controller
@RequestMapping(value = "/wallet")
public class WalletController {
    @Autowired
    private WalletService walletService;
    private Logger logger = LoggerFactory.getLogger(this.getClass());
    /**查询流水*/
    @RequestMapping(value = "/show",method = RequestMethod.GET)
    @ResponseBody
    public Page<Wallet> show(Wallet wallet, int pageIndex, int pageSize){
        logger.info("开始运行查询流水"+wallet.toString()+pageIndex+pageSize);
        Page< Wallet> page =walletService.getList(wallet,pageIndex,pageSize);
        //  user=users.
        logger.info("操作数据"+page.getContent().get(0).getAmount());
        return page;
    }
    @RequestMapping(value = "/save",method = RequestMethod.GET)
    @ResponseBody
    public Page<Wallet> save(Wallet wallet){
        logger.info("当前流水"+wallet.toString());

        walletService.add(wallet);
        Wallet w=new Wallet();
        w.setUserId(wallet.getUserId());
        logger.info("w:"+w.toString());
        Page<Wallet> wa=show(w,0,4);
        return wa;
    }
}
