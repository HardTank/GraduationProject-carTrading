package com.carTrading.service;

import com.carTrading.entity.Comment;
import com.carTrading.repository.CommentRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * @author tanlixin
 * @description
 * @since 2019-04-30
 */
@Service
public class CommentService {
    @Autowired
    CommentRepository commentRepository;
    private Logger logger = LoggerFactory.getLogger(this.getClass());
    /**
     * 动态查询
     */
    public Page<Comment> getList(Comment car, int pageIndex, int pageSize) {
        logger.info("查找评论信息");
        Page<Comment> page = null;
        ExampleMatcher matcher = ExampleMatcher.matching() //构建对象
                .withStringMatcher(ExampleMatcher.StringMatcher.CONTAINING) //改变默认字符串匹配方式：模糊查询
                .withIgnoreCase(true); //改变默认大小写忽略方式：忽略大小写

        /**创建实例*/
        Example<Comment> ex = Example.of(car, matcher);
        /**排序查询*/
        Sort sort = new Sort(Sort.Direction.DESC, "id");
        /**分页查询*/
        PageRequest pageRequest = new PageRequest(pageIndex, pageSize, sort);
        page = commentRepository.findAll(ex, pageRequest);

        return page;
    }

    /**
     * 更新数据
     */
    @Transactional(rollbackFor = Exception.class)
    public Page<Comment >save(Comment c) {
        logger.info("更新评论信息");
        commentRepository.save(c);
        Comment comment = new Comment();
        comment.setCarId(c.getCarId());

        return  getList(comment,0,8);
    }
    /**根据id获取*/
    public   Comment getComment(Comment comment){
       comment= commentRepository.findOne(comment.getId());
        return comment;
    }
    /***/
    public void delComment(Comment comment){
        commentRepository.delete(comment);
        //return commentRepository.
    }

}
