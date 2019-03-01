package com.song.controller;

import com.song.entity.User;
import com.song.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by Song on 2017/2/15.
 * User控制层
 */
@Controller
@RequestMapping(value = "/user")
public class UserController {
    @Autowired
    private UserService userService;

    @RequestMapping(value = "/index")
    public String index(){
        return "user/index";
    }

    @RequestMapping(value = "/show",method = RequestMethod.GET)
    @ResponseBody
    public  List< User>  show(@RequestParam(value = "name")String name){
        List< User> user = userService.findUserByName(name);
        System.out.println("获取的name的值"+name);
       return user;
    }
    @RequestMapping("test")
    @ResponseBody
    public User test(User params /*List<User> usr*/){
        //User usr=new User(name,password);
       System.out.println("这个方法被调用了"+params.toString()/*params.get("name")+"password "+params.get("password")*/);
       // List<User> usr= JSONArray.parseArray( param,User.class);
        User user=new User("a","b");
        System.out.println("这个方法被调用了"/*usr.size()*/);
       return  user;
    }
}
