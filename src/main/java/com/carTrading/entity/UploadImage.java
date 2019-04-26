package com.carTrading.entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.persistence.*;
/**
 * @author tanlixin
 * @description
 * @since 2019-04-25
 */
@Entity
@Data
@Table(name="upload_image")
@NoArgsConstructor
@AllArgsConstructor
public class UploadImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    /**主键*/
    private Long id;
    /**汽车id*/
    @Column(name="car_id")
    private Integer carId;
    /**位置*/
    private String position;
    /**路径*/
    private String src;
}
