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
@Table(name = "car_info")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CarInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    /**主键*/
    private Long id;
    /**
     * 拥有者
     */
    @Column(name="owner_id")
    private Integer ownerId;
    /**
     * 当前状态 现场确认 0未确认 1检查无误
     */
    private Integer state;
    /**
     * Vin码唯一标识
     */
    private String vin;
    /**
     * 初登日期
     */
    @Column(name="initial_date")
    @JsonFormat(pattern = "yyyy-MM-dd  ", timezone = "GMT+8")
    private Date initialDate;
    /**
     * 出厂日期
     */
    @Column(name="product_date")
    @JsonFormat(pattern = "yyyy-MM ", timezone = "GMT+8")
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
     * 使用性质
     */
    private String nature;
    /**
     * 注册地
     */
    @Column(name="register_place")
    private String registerPlace;
    /**
     * 排量
     */
    private String discharge;
    /**
     * 驱动方式
     */
    @Column(name="driving_mode")
    private String drivingMode;
    /**
     * 座位数
     */
    @Column(name="seat_num")
    private String seatNum;
    /**
     * 发动机号
     */
    @Column(name="engine_id")
    private String engineId;
    /**
     * 是否进口 1是 0否
     */
    private Integer source;
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
    @Column(name="emission_standard")
    private String emissionStandard;
    /**
     * 能源
     */
    private String energy;
    /**
     * 轮胎规格
     */
    private String tyre;
    /**
     * 过户次数
     */
    private String transfer;

}