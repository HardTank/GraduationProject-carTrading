package com.carTrading.repository;

import com.carTrading.entity.Brand;
import com.carTrading.entity.Location;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author tanlixin
 * @description
 * @since 2019-05-04
 */
@Repository
public interface BrandRepository extends JpaRepository<Brand,String> {
    /**获取厂商*/
    @Query(value="select DISTINCT brand from car_info ",nativeQuery = true)
    List<Brand> findBrand();
}
