package com.carTrading.repository;

import com.carTrading.entity.ConfirmCar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author tanlixin
 * @description
 * @since 2019-04-28
 */
@Repository
public interface ConfirmCarRepository extends JpaRepository<ConfirmCar,Long>{
    /**管理员查询支付成功的结果*/
    @Query(value="select distinct  c.owner_id,tr.user_id,tr.id as tr_id,c.state, tr.price,tr.create_time, c.id,ti.deposit,ti.auction_time,ti.start_price ,c.brand,c.product_date ,c.transmission ,c.discharge,c.type " +
            "from transaction_record as tr ,car_info as c,transaction_info as ti " +
            "where  tr.car_id =c.id and ti.car_id=c.id " +
            "and c.state=3  limit :pageIndex , :pageSize ",nativeQuery = true)
    List<ConfirmCar> findResult(@Param("pageIndex")Integer pageIndex, @Param("pageSize")Integer pageSize );

}
