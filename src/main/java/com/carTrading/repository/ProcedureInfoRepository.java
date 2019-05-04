package com.carTrading.repository;

import com.carTrading.entity.ProcedureInfo;
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
public interface ProcedureInfoRepository extends JpaRepository<ProcedureInfo,Long> {
    /**根据汽车id找到主键*/
    @Query(value="select  * from   procedure_info as p where  p.car_id=:carId  ",nativeQuery = true)
    ProcedureInfo findIdByCar(@Param("carId") Integer carId);

    /**获取所在地*/
    @Query(value="select DISTINCT  p.plate_location from procedure_info as p ",nativeQuery = true)
    List< ProcedureInfo> findLocation();

}
