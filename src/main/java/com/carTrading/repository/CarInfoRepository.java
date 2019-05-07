package com.carTrading.repository;

import com.carTrading.entity.CarInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author tanlixin
 * @description
 * @since 2019-04-02
 */
    @Repository
    public interface CarInfoRepository extends JpaRepository<CarInfo,Long> {
    @Query(value="select * from car_info where state=1",nativeQuery = true)
     List<CarInfo> getAll();
}
