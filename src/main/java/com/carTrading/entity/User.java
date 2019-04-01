package com.carTrading.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

/**
 * @author tanlixin
 * @description  用户实体,提供二手车或参与竞拍
 * @since 2019-03-25
 */
@Entity
@Table(name = "user")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    /**
     *主键id
     **/
    private Integer id;
    /**
     * 用户姓名
     */
    private String name;
    /**
     * 登陆密码
     **/
    private String pwd;
    /**
     * 电子邮箱
     */
    private String mail;
    /**
     * 性别
     */
    private String generate;
    /**
     * 身份证号码
     */
    private String cardId;
    /**
     * 联系电话
     */
    private String phone;
    /**
     * 家庭住址
     */
    private String address;
}
