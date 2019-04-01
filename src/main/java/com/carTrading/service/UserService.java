package com.carTrading.service;

import com.carTrading.entity.User;
import com.carTrading.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author tanlixin
 * @description
 * @since 2019-03-25
 */
@Service
public class UserService {
    @Autowired
    private UserRepository userRepositoty;
    private Logger logger = LoggerFactory.getLogger(this.getClass());
    public List< User> findUserByName(String name){
        logger.info("根据姓名查找用户");
        List< User>  user = null;
        try{

            user=userRepositoty.findAll();
        }catch (Exception e){}
        return user;
    }
    public List< User> findUser(User user){
        List< User>  list = null;
        try{


        }catch (Exception e){}
        return list;
    }
}
