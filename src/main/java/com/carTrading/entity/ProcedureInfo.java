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
@Table(name = "procedure_info")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProcedureInfo {
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
     * 购车发票
     */
    private String invoice;
    /**
     * 登记证 0没有 1有
     */
    private Integer registration;
    /**
     * 车船税
     */
    private Integer vehicleTax;
    /**
     * 车身铭牌 0无 1有
     */
    private Integer nameplate;
    /**
     * 备用钥匙
     */
    private Integer spareKey;
    /**
     * 行驶证
     */
    private Integer lisence;
    /**
     * 交强险有效期
     */
    private Date compulsoryInsuranceValidityDate;
    /**
     * 车牌所在地
     */
    private String plateLocation;
    /**
     * 商业保险到期时间
     */
    private Date commercialInsuranceValidityDate;
    /**
     * 年检有效期
     */
    private Date yearlyInspectionValidityDate;
    /**
     * 交强险所在地
     */
    private String compulsoryInsuranceLocation;
    /**
     * 购置税证0 无1 有
     */
    private Integer PurchaseTaxCertificate;
    /**
     * 违章记录
     */
    private Integer violationRecord;
}
