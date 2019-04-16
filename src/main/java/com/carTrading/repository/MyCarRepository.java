package com.carTrading.repository;

import com.carTrading.entity.MyCar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author tanlixin
 * @description
 * @since 2019-04-16
 */
@Repository
public interface MyCarRepository extends JpaRepository<MyCar,Long> {
    /**查询提交的汽车的状态*/
    @Query(value="select  DISTINCT c.state,c.id,ti.deposit,ti.auction_time,ti.start_price ,c.brand,c.product_date ,c.transmission ,c.discharge,c.type " +
            "from   transaction_record as tr  ,car_info as c left JOIN transaction_info as ti  on ti.car_id=c.id  " +
            "where  c.owner_id=:userId limit :pageIndex , :pageSize ",nativeQuery = true)
    List<MyCar> findCar(@Param("userId") Integer userId, @Param("pageIndex")Integer pageIndex, @Param("pageSize")Integer pageSize);

}
