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
 * @since 2019-04-29
 */
@Entity
@Data

@NoArgsConstructor
@AllArgsConstructor
public class TradingInfo {

    /**
     * 主键
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    /**主键*/
    private Long id;
    /**
     * 拥有者
     */
    @Column(name = "owner_id")
    private Integer ownerId;
    /**
     * 当前状态 现场确认 0未确认 1检查无误
     */
    private Integer state;
    /**
     * Vin码唯一标识
     */

    /**
     * 出厂日期
     */
    @Column(name = "product_date")
    @JsonFormat(pattern = "yyyy ", timezone = "GMT+8")
    private Date productDate;
    /**
     * 厂商
     */
    private String brand;
    /**
     * 款式
     */
    private String type;
    /**
     * 颜色
     */
    private String color;

    /**
     * 所在地
     */

    private String location;
    /**
     * 排量
     */
    private String discharge;
    /**
     * 驱动方式
     */
    @Column(name = "driving_mode")
    private String drivingMode;
    /**名称*/
   private String name;

    /**
     * 表显里程
     */
    private String mileage;
    /**
     * 变速器
     */
    private String transmission;
    /**
     * 排放标准
     */
    @Column(name = "emission_standard")
    private String emissionStandard;
    /**
     * 能源
     */
    private String energy;


    /**
     * 备注说明
     */
    private String remark;

    /**
     * 订阅数量
     */
    private Integer count;
    /**
     * 订阅状态
     */
    private Integer status;
    @Column(name = "admin_id")
    private Integer adminId;
    /**
     * 保证金
     */
    private Integer deposit;
    /**
     * 起拍价
     */
    @Column(name = "start_price")
    private Double startPrice;
    /**
     * 拍卖时间
     */
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    @Column(name = "auction_time")
    private Date auctionTime;
    /**left 图片地址*/
    private  String src;
}
