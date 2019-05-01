package com.carTrading.controller;

import com.carTrading.entity.Comment;
import com.carTrading.service.CommentService;
import com.carTrading.tool.UpdateNotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * @author tanlixin
 * @description
 * @since 2019-04-30
 */
@RestController
@RequestMapping(value="/comment")
public class CommentController {
    @Autowired
    CommentService commentService;
    private Logger logger = LoggerFactory.getLogger(this.getClass());
    //获取评论信息
    @RequestMapping(value = "/getList")
    public Page<Comment> getList(Comment c, int pageIndex, int pageSize) {
        logger.info("评论信息");
        Page<Comment> page = commentService.getList(c , pageIndex, pageSize);
        System.out.println("最新一条评论信息"+page.getContent().get(0).toString());
        return page;
    }

    //插入更新评论信息
    @RequestMapping("/save")
    public Page<Comment> saveComment(Comment com  ,String comm ) {
       com.setComment(comm);
        logger.info("存储评论信息"+com.toString() );
        Page<Comment > comms=null;
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM");
        Date date = new Date();
        com.setCreateDate(date);
        if (com .getId() != null) {
            Comment c = commentService.getComment(com );
            logger.info("更新二手车前" + c.toString() + com .toString());
            //处理null值
            UpdateNotNull.copyNonNullProperties(com , c);
            logger.info("更新二手车" + c .toString() + com .toString());
             comms  = commentService.save(c);
        } else {
            logger.info("添加二手车" + com .toString());
             comms  = commentService.save(com );
        }

        return comms;
    }
    /**删除评论*/
    @RequestMapping(value="/delComment")
    public Boolean del(Comment comment){
        commentService.delComment(comment);
        return true;
    }
}
