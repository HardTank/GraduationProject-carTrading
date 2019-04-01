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
@Table(name = "transaction_record")
@Data
@NoArgsConstructor
@AllArgsConstructor

public class TransactionRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    /**
     *主键id
     **/
    private Integer id;
    /**
     * 交易信息
     */
    private Integer transactionInfo;
    /**
     * 用户id
     */
    private Integer userId;
    /**
     * 出价
     */
    private Float price;
    /**
     * 创建时间
     */
    private Date createTime;
    /**
     * 当前状态
     */
    private Integer state;
}
