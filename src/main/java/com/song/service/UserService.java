package com.song.service;

import com.song.entity.User;
import com.song.repository.UserRepositoty;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by Song on 2017/2/15.
 * User业务逻辑
 */
@Service
public class UserService {
    @Autowired
    private UserRepositoty userRepositoty;

    public User findUserByName(String name){
        User user = null;
        try{
            System.out.println("加工的name的值"+name);
            user = userRepositoty.findByUserName(name);
        }catch (Exception e){}
        return user;
    }
}
