package com.carTrading.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

/**
 * @author tanlixin
 * @description
 * @since 2019-04-01
 */
@Entity
@Table(name = "transaction_info")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TransactionInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    /**
     *主键id
     **/
    private Long id;
    /**
     * 二手车id
     */
    @Column(name="car_id")
    private Integer carId;
    /**
     * 交易用户
     */
    @Column(name="admin_id")
    private Integer adminId;
    /**
     * 保证金
     */
    private Integer deposit;
    /**起拍价*/
    @Column(name="start_price")
    private Double startPrice;
    /**
     * 拍卖时间
     */
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    @Column(name="auction_time")
    private Date auctionTime;

}
