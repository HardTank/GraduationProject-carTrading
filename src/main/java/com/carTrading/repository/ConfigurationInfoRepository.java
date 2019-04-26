package com.carTrading.repository;

import com.carTrading.entity.ConfigurationInfo;
import com.carTrading.entity.MyCar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author tanlixin
 * @description
 * @since 2019-04-14
 */
@Repository
public interface ConfigurationInfoRepository extends JpaRepository<ConfigurationInfo,Long> {

    /**根据汽车id找到主键*/
    @Query(value="select  * from   configuration_info as c where  c.car_id=:carId  ",nativeQuery = true)
    ConfigurationInfo  findIdByCar(@Param("carId") Integer carId);


}
