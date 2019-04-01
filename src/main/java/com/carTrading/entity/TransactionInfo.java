package com.carTrading.entity;

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
    private Integer id;
    /**
     * 二手车id
     */
    private Integer carId;
    /**
     * 交易用户
     */
    private Integer userId;
    /**
     * 保证金
     */
    private Integer deposit;
    /**
     * 拍卖时间
     */
    private Date auctionTime;

}
