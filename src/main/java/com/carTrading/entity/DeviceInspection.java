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
@Table(name = "device_inspection")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DeviceInspection {
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
     * 装置
     */
    private String device;
    /**
     * 异常问题
     */
    private String abnormal;
    /**
     * 管理人员id
     */
    @Column(name="admin_id")
    private Integer adminId;
    /**
     * 创建时间
     */
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    @Column(name="create_date")
    private Date createDate;
    /**
     * 所属类别 0动力检查1车内功能检查 3外观检查4车内环境检查5泡水检查6过火检查
     */
    private Integer category;
}
