package com.carTrading.repository;

import com.carTrading.entity.MyCar;
import com.carTrading.entity.MyOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author tanlixin
 * @description
 * @since 2019-05-06
 */
@Repository
public interface MyOrderRepository extends JpaRepository<MyOrder,Long> {
    /**查询订阅信息*/
    @Query(value="select DISTINCT  c.emission_standard,c.mileage,  c.product_date,c.transmission,c.discharge,c.type, c.id,c.brand,c.name,c.state ,ti.auction_time,ti.deposit,ti.start_price,c.remark,p.plate_location as location " +
            " from transaction_record as tr,procedure_info as p, car_info as c LEFT JOIN  transaction_info as ti on c.id=ti.car_id  " +
            "where c.deleted=0 and tr.car_id=c.id and tr.state=0 and p.car_id=c.id and c.id in ( " +
            "select tr.car_id from transaction_record as tr where  tr.state=:state and tr.user_id=:userId )" +
            " limit :pageIndex , :pageSize ",nativeQuery = true)
    List<MyOrder> findById(@Param("userId") Integer userId, @Param("pageIndex")Integer pageIndex, @Param("pageSize")Integer pageSize, @Param("state") Integer state );

}
