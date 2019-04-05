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

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

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
    public User show(User user,int pageIndex, int pageSize,HttpServletRequest request,HttpSession session){
        logger.info("开始运行"+user.toString()+pageIndex+pageSize);
        Page< User> users =userService.getList(user,pageIndex,pageSize);
        session.setAttribute("user",users.getContent().get(0));
        User user1=(User)session.getAttribute("user");
        System.out.println("sessionid:"+session.getId());
        logger.info("session"+user1.toString()+pageIndex+pageSize);
        return user1;
    }

    @RequestMapping(value = "/save",method = RequestMethod.GET)
    @ResponseBody
    public User saveCarInfo(){
        User u=new User("x","x","x","x","X","X","x");
        User user= userService.add(u);
        return user;
    }
    @RequestMapping(value = "/isLogin",method = RequestMethod.GET)
    public User  loginStatus( HttpSession session){
        logger.info("开始运行判断登陆状态");
       // User user=(User)session.getAttribute("user");
        //System.out.println("sessionid:"+session.getId());

          User  user = new User();
            user.setId(0L);

        logger.info("user信息"+user.toString());
        return user ;
    }
}
