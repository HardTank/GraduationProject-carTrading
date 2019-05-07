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
 * @since 2019-04-16
 */
@Repository
public interface MyCarRepository extends JpaRepository<MyCar,Long> {
    /**查询提交的汽车的状态*/
    @Query(value="select c.emission_standard,c.mileage,  c.product_date,c.transmission,c.discharge,c.type, c.id,c.brand,c.name,c.state ,ti.auction_time,ti.deposit,ti.start_price,tr.price,c.remark,p.plate_location as location " +
            " from  procedure_info as p, car_info as c LEFT JOIN  transaction_info as ti  " +
            "on  ti.car_id=c.id LEFT JOIN transaction_record as tr on tr.car_id=c.id and tr.state=2 " +
            "where p.car_id=c.id and c.deleted=0 and  c.owner_id=:userId  order by ti.auction_time limit :pageIndex , :pageSize  ",nativeQuery = true)
    List<MyCar> findCar(@Param("userId") Integer userId, @Param("pageIndex")Integer pageIndex, @Param("pageSize")Integer pageSize);
    /**查询订阅信息*/
    @Query(value="select DISTINCT  c.emission_standard,c.mileage,  c.product_date,c.transmission,c.discharge,c.type, c.id,c.brand,c.name,c.state ,ti.auction_time,ti.deposit,ti.start_price,c.remark,p.plate_location as location " +
            " from transaction_record as tr,procedure_info as p, car_info as c LEFT JOIN  transaction_info as ti on c.id=ti.car_id  " +
            "where c.deleted=0 and tr.car_id=c.id and tr.state=0 and p.car_id=c.id and c.id in ( " +
            "select tr.car_id from transaction_record as tr where  tr.state=:state and tr.user_id=:userId )" +
            " limit :pageIndex , :pageSize ",nativeQuery = true)
    List<MyOrder> findById(@Param("userId") Integer userId, @Param("pageIndex")Integer pageIndex, @Param("pageSize")Integer pageSize, @Param("state") Integer state );
//竞拍成功的汽车
    @Query(value="select c.emission_standard,c.mileage,  c.product_date,c.transmission,c.discharge,c.type, c.id,c.brand,c.name,c.state ,ti.auction_time,ti.deposit,ti.start_price,tr.price,c.remark,p.plate_location as location " +
            " from  procedure_info as p, car_info as c LEFT JOIN  transaction_info as ti  " +
            "on  ti.car_id=c.id LEFT JOIN transaction_record as tr on tr.car_id=c.id and tr.state=2 " +
            "where p.car_id=c.id and c.deleted=0 and  c.state=1 order by ti.auction_time   ",nativeQuery = true)
    List<MyCar> findCarResult(  );

    //支付成功的汽车
    @Query(value="select c.emission_standard,c.mileage,  c.product_date,c.transmission,c.discharge,c.type, c.id,c.brand,c.name,c.state ,ti.auction_time,ti.deposit,ti.start_price,tr.price,c.remark,p.plate_location as location " +
            " from  procedure_info as p, car_info as c LEFT JOIN  transaction_info as ti  " +
            "on  ti.car_id=c.id LEFT JOIN transaction_record as tr on tr.car_id=c.id and tr.state=2 " +
            "where p.car_id=c.id and c.deleted=0 and  c.state=3 order by ti.auction_time   ",nativeQuery = true)
    List<MyCar> findCarPayEnd(  );

}
