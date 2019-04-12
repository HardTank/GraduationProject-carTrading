package com.carTrading.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

/**
 * @author tanlixin
 * @description 用户实体, 提供二手车或参与竞拍
 * @since 2019-03-25
 */
@Entity
@Table(name = "user")
@Data
@DynamicUpdate(true)
@DynamicInsert(true)
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    /**
     *主键id
     **/
    private Long id;
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
    private String gender;
    /**
     * 身份证号码
     */
    @Column(name = "card_id")
    private String cardId;
    /**
     * 联系电话
     */
    private String phone;
    /**
     * 家庭住址
     */
    private String address;
    /**
     * 钱包
     */
    @Column(name = "wallet", nullable = true)
    private Double wallet;
    /**
     * 银行卡号
     */
    @Column(name = "bank_card_num")
    private String bankCardNum;
    /**
     * 开户行
     */
    @Column(name = "open_bank")
    private String openBank;
    /**
     * 省/直辖市
     */
    private String province;
    /**
     * 市
     */
    private String city;
    /**
     * 县区
     */
    private String county;

    public User(String name, String pwd, String mail, String gender, String cardId, String phone, String address, String bankCardNum, String openBank) {
        this.name = name;
        this.pwd = pwd;
        this.mail = mail;
        this.gender = gender;
        this.cardId = cardId;
        this.phone = phone;
        this.address = address;

        this.bankCardNum = bankCardNum;
        this.openBank = openBank;
    }
}
