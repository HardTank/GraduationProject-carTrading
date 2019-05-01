package com.carTrading.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

/**
 * @author tanlixin
 * @description
 * @since 2019-04-30
 */
@Entity
@Table(name ="comment")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    /**主键*/
    private Long id;
    /**
     * 用户
     */
    @Column(name = "user_id")
    private Integer userId;
    /**
     * 汽车id
     */
    @Column(name = "car_Id")
    private Integer carId;
    /**
     * 创建时间
     */
    @Column(name = "create_date")

    private Date createDate;
    /**
     * 评论内容
     */
    private String comment;
    /**用户名*/
    private  String userName;

}
