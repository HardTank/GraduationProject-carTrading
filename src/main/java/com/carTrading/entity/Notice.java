package com.carTrading.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

/**
 * @author tanlixin
 * @description 公告
 * @since 2019-05-08
 */
@Entity
@Data
@Table(name="notice")
@NoArgsConstructor
@AllArgsConstructor
public class Notice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    /**主键*/
    private Long id;
    /**标题*/
    private String title;
    /**正文内容*/
    @Column(columnDefinition="TEXT",nullable=true)
    private String content;
    /**管理员*/
    @Column(name="admin_id")
    private Integer adminId;
    /**浏览次数*/
    private Integer view;
    @Column(name="create_time")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    /**创建时间*/
    private Date createTime;
    /**删除状态*/
    private Integer deleted;
}
