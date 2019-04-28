package com.carTrading.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

/**
 * @author tanlixin
 * @description 用户订阅的汽车的信息
 * @since 2019-04-15
 */
@Entity
@Data
@Table(name="order_car")
@NoArgsConstructor
@AllArgsConstructor
public class OrderCar {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    /**主键*/
    private Long id;
//    /**拥有者*/
//    @Column(name="owner_id")
//    private Integer ownerId;
    /**保证金*/
    private Integer deposit;
    /**竞拍时间*/
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    @Column(name="auction_time")
    private Date auctionTime;
    /**创建时间*/
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    @Column(name="create_time")
    private Date createTime;
    /**起拍价*/
    @Column(name="start_price")
    private  Double startPrice;
    /**厂商*/
    private String brand;
    /**生产日期*/
    @JsonFormat(pattern = "yyyy ", timezone = "GMT+8")
    @Column(name="productDate")
    private Date productDate;
    /**变速器*/
    private String transmission;
    /**排放*/
    private String discharge;
    /**类型*/
    private String type;
    /**成交价*/
    private Integer price;
    /**交易状态*/
    private Integer state;
}
