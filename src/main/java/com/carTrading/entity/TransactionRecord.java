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
    private Long id;
    /**
     * 交易信息
     */
    @Column(name="transaction_info_id")
    private Integer transactionInfoId;
    /**
     * 用户id
     */
    @Column(name="user_id")
    private Integer userId;
    /**
     * 出价
     */
    private Double price;
    /**
     * 创建时间
     */
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    @Column(name="create_time")
    private Date createTime;
    /**
     * 当前状态
     */
    private Integer state;
}
