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
    private Long id;
    /**
     * 二手车id
     */
    @Column(name="car_id")
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
    @Column(name="vehicle_tax")
    private Integer vehicleTax;
    /**
     * 车身铭牌 0无 1有
     */
    private Integer nameplate;
    /**
     * 备用钥匙
     */
    @Column(name="spare_key")
    private Integer spareKey;
    /**
     * 行驶证
     */
    private Integer license;
    /**
     * 交强险有效期
     */
    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "GMT+8")
    @Column(name="compulsory_insurance_validity_date")
    private Date compulsoryInsuranceValidityDate;
    /**
     * 车牌所在地
     */
    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "GMT+8")
    @Column(name="plate_location")
    private String plateLocation;
    /**
     * 商业保险到期时间
     */
    @Column(name="commercial_insurance_validity_date")
    private Date commercialInsuranceValidityDate;
    /**
     * 年检有效期
     */
    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "GMT+8")
    @Column(name="yearly_inspection_validity_date")
    private Date yearlyInspectionValidityDate;
    /**
     * 交强险所在地
     */
    @Column(name="compulsory_insurance_location")
    private String compulsoryInsuranceLocation;
    /**
     * 购置税证0 无1 有
     */
    @Column(name="purchase_tax_certificate")
    private Integer purchaseTaxCertificate;
    /**
     * 违章记录
     */
    @Column(name="violation_record")
    private Integer violationRecord;
}
