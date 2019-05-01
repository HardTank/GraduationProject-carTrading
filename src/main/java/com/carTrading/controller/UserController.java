package com.carTrading.controller;

import com.carTrading.entity.User;
import com.carTrading.service.UserService;
import com.carTrading.tool.UpdateNotNull;
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
    public String index() {
        return "user/index";
    }

    @RequestMapping(value = "/show", method = RequestMethod.GET)
    @ResponseBody
    public Page<User> show(User user, int pageIndex, int pageSize, HttpServletRequest request, HttpSession session) {
        logger.info("开始运行" + user.toString() + pageIndex + pageSize);
        Page<User> users = userService.getList(user, pageIndex, pageSize);
        //  user=users.

        return users;
    }

    @RequestMapping(value = "/save", method = RequestMethod.GET)
    @ResponseBody
    public User save(User u) {
        if (u.getId() != null) {
            User user = userService.getUser(u);
            logger.info("更新用户前" + user.toString() + u.toString());
            UpdateNotNull.copyNonNullProperties(u, user);
            logger.info("更新用户" + user.toString() + u.toString());
            user = userService.add(user);
            return user;
        } else {
            logger.info("添加用户" + u.toString());
            u = userService.add(u);
            return u;
        }

    }

    /**
     * 更新余额
     */
    @RequestMapping(value = "/saveMoney", method = RequestMethod.GET)
    @ResponseBody
    public User saveMoney(User u) {
        u = userService.saveUserWallet(u.getId(), u.getWallet());
        return u;

    }

    @RequestMapping(value = "/login", method = RequestMethod.GET)
    @ResponseBody
    public User loginStatus(User user) {
        logger.info("开始运行判断登陆状态");
        // User user=(User)session.getAttribute("user");
        //System.out.println("sessionid:"+session.getId());
        Page<User> users = userService.getList(user, 0, 1);
        user = users.getContent().get(0);

        logger.info("user信息" + user.toString());
        return user;
    }
    @RequestMapping(value="/getName")
    @ResponseBody
    public User getName(User user){
        user=userService.getUser(user);
        return user;
    }
}
