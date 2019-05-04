package com.carTrading.repository;

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
public interface LocationRepository extends JpaRepository<Location,String> {
    /**获取所在地*/
    @Query(value="select DISTINCT  p.plate_location from procedure_info as p  ",nativeQuery = true)
    List<Location> findLocation();
}
