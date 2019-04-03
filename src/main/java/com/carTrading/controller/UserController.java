package com.carTrading.controller;

import com.carTrading.entity.User;
import com.carTrading.service.UserService;
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
 * @since 2019-03-25
 */
@Controller
@RequestMapping(value = "/user")
public class UserController {
    @Autowired
    private UserService userService;
    private Logger logger = LoggerFactory.getLogger(this.getClass());
    @RequestMapping(value = "/index")
    public String index(){
        return "user/index";
    }


    @RequestMapping(value = "/show",method = RequestMethod.GET)
    @ResponseBody
    public Page< User> show(User user,int pageIndex, int pageSize){
        Page< User> users =userService.getList(user,pageIndex,pageSize);
        logger.info("开始运行");
        return users;
    }

    @RequestMapping(value = "/save",method = RequestMethod.GET)
    @ResponseBody
    public User saveCarInfo(){
        User u=new User("x","x","x","x","X","X","x");
        User user= userService.add(u);
        return user;
    }
}
