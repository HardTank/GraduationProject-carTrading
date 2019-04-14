package com.carTrading.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

/**
 * @author tanlixin
 * @description
 * @since 2019-04-01
 */
@Entity
@Table(name = "configuration_info")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ConfigurationInfo {
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
     * 车窗玻璃
     */
    private String window;
    /**
     * 座椅功能
     */
    private String seat;
    /**
     * 防抱死制动系统
     */
    private Integer abs;
    /**
     * 倒车影像
     */
    @Column(name="reversing_image")
    private Integer reversingImage;
    /**
     * 车外后视镜
     */
    @Column(name="rearview_mirror")
    private String rearviewMirror;
    /**
     * 座椅材料
     */
    @Column(name="seat_material")
    private String seatMaterial;
    /**
     * 定速巡航
     */
    @Column(name="cruise_control")
    private Integer cruiseControl;
    /**
     * 倒车雷达
     */
    private Integer radar;
    /**
     * 气囊
     */
    private Integer gasbag;
    /**
     * 轮毂
     */
    private String hub;
    /**
     * 座椅调节方式
     */
    @Column(name="seat_control")
    private String seatControl;
    /**
     * 导航
     */
    private Integer navigation;
    /**
     * 天窗
     */
    private Integer skylight;

}
