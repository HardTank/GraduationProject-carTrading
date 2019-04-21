package com.carTrading.repository;

import com.carTrading.entity.MyCar;
import com.carTrading.entity.OrderCar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author tanlixin
 * @description
 * @since 2019-04-15
 */
@Repository
public interface OrderRepository extends JpaRepository<OrderCar, Long> {
    /**查询订阅信息*/
    @Query(value="select c.state, tr.price,tr.create_time, c.id,ti.deposit,ti.auction_time,ti.start_price ,c.brand,c.product_date ,c.transmission ,c.discharge,c.type " +
            "from transaction_record as tr ,car_info as c,transaction_info as ti " +
            "where  tr.transaction_info_id =ti.id and ti.car_id=c.id " +
            "and c.state=:state and tr.user_id=:userId limit :pageIndex , :pageSize ",nativeQuery = true)
    List<OrderCar> findById(@Param("userId") Integer userId,@Param("pageIndex")Integer pageIndex,@Param("pageSize")Integer pageSize,@Param("state") Integer state );
    /**查询竞拍成功的结果*/
    @Query(value="select distinct c.state, tr.price,tr.create_time, c.id,ti.deposit,ti.auction_time,ti.start_price ,c.brand,c.product_date ,c.transmission ,c.discharge,c.type " +
            "from transaction_record as tr ,car_info as c,transaction_info as ti " +
            "where  tr.transaction_info_id =ti.id and ti.car_id=c.id " +
            "and c.state>1 and c.state<5  and tr.user_id=:userId limit :pageIndex , :pageSize ",nativeQuery = true)
    List<OrderCar> findByIdResult(@Param("userId") Integer userId,@Param("pageIndex")Integer pageIndex,@Param("pageSize")Integer pageSize );

    /**查询用户的成交结果*/
    @Query(value="select c.state,tr.price,tr.create_time, c.id,ti.deposit,ti.auction_time,ti.start_price ,c.brand,c.product_date ,c.transmission ,c.discharge,c.type " +
            "from transaction_record as tr ,car_info as c,transaction_info as ti " +
            "where  tr.transaction_info_id =ti.id and ti.car_id=c.id " +
            " and c.owner_id=:userId limit :pageIndex , :pageSize ",nativeQuery = true)
    List<OrderCar>findMyCar(@Param("userId") Integer userId,@Param("pageIndex")Integer pageIndex,@Param("pageSize")Integer pageSize);
    /**查询待审核的汽车信息*/
    @Query(value="select c.state, tr.price,tr.create_time, c.id,ti.deposit,ti.auction_time,ti.start_price ,c.brand,c.product_date ,c.transmission ,c.discharge,c.type " +
            "from transaction_record as tr ,car_info as c,transaction_info as ti " +
            "where  tr.transaction_info_id =ti.id and ti.car_id=c.id " +
            "and c.state=:state  limit :pageIndex , :pageSize ",nativeQuery = true)
    List<OrderCar> findAllReview(@Param("pageIndex")Integer pageIndex,@Param("pageSize")Integer pageSize,@Param("state") Integer state );

}
