package com.carTrading.repository;

import com.carTrading.entity.CarInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author tanlixin
 * @description
 * @since 2019-04-02
 */
    @Repository
    public interface CarInfoRepository extends JpaRepository<CarInfo,Long> {
}
