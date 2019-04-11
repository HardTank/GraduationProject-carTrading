package com.carTrading.service;

import com.carTrading.entity.User;
import com.carTrading.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * @author tanlixin
 * @description
 * @since 2019-03-25
 */
@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    private Logger logger = LoggerFactory.getLogger(this.getClass());

    /**根据条件动态查询*/
    @Transactional(rollbackFor = Exception.class)
    public Page<User> getList(User user, int pageIndex, int pageSize) {
        logger.info("根据姓名查找用户");
        Page<User> page = null;
        User u = user;
        /**动态查询*/
        ExampleMatcher matcher = ExampleMatcher.matching() //构建对象
                .withStringMatcher(ExampleMatcher.StringMatcher.CONTAINING) //改变默认字符串匹配方式：模糊查询
                .withIgnoreCase(true); //改变默认大小写忽略方式：忽略大小写

        /**创建实例*/
        Example<User> ex = Example.of(u, matcher);
        /**排序查询*/
        Sort sort = new Sort(Sort.Direction.ASC, "id");
        /**分页查询*/
        PageRequest pageRequest = new PageRequest(pageIndex, pageSize, sort);
        page = userRepository.findAll(ex, pageRequest);
        return page;
    }

    /**更新数据*/
    @Transactional(rollbackFor = Exception.class)
    public User add(User u) {
        User user = userRepository.save(u);
        return user;
    }
    /**根据id查找用户*/
    @Transactional(rollbackFor = Exception.class)
    public  User  getUser(User user) {
        logger.info("根据id查找用户");
        user = userRepository.findOne(user.getId());
        return user;
    }

}
