package com.carTrading.controller;

import org.slf4j.Logger;
import com.carTrading.entity.User;
import com.carTrading.service.UserService;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

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
    public  List< User>  show(@RequestParam(value = "name")String name){
        List< User> user = userService.findUserByName(name);
        System.out.println("获取的name的值"+name);
        logger.info("开始运行");
       return user;
    }
    @RequestMapping("test")
    @ResponseBody
    public User test(User params /*List<User> usr*/){
        //User usr=new User(name,password);
       System.out.println("这个方法被调用了"+params.toString()/*params.get("name")+"password "+params.get("password")*/);
       // List<User> usr= JSONArray.parseArray( param,User.class);
        User user=new User();
        System.out.println("这个方法被调用了"/*usr.size()*/);
       return  user;
    }
}
