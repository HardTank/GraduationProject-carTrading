package com.carTrading.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * @author tanlixin
 * @description
 * @since 2019-05-04
 */
@Entity
@Data
@Table(name="order_car")
@NoArgsConstructor
@AllArgsConstructor
public class Brand {
    @Id
    //  @GeneratedValue(strategy = GenerationType.IDENTITY)
    /**主键*/
    // private Long id=1L;
    private String brand;
}
