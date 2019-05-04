package com.carTrading.repository;

import com.carTrading.entity.TransactionRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * @author tanlixin
 * @description
 * @since 2019-04-15
 */
@Repository
public interface TransactionRecordRepository extends JpaRepository<TransactionRecord, Long> {
    /**
     * 查询订阅人数
     */
    @Query(value = "select  count(*) as count from transaction_record as t where t.car_id=:carId and state=0", nativeQuery = true)
      Integer getNum(@Param("carId") Long carId);
    /**
     * 查询订阅状态
     */
    @Query(value = "select  count(*) as count from transaction_record as t where t.car_id=:carId and t.user_id=:userId and state=0", nativeQuery = true)
     Integer getStatus(@Param("userId")Long userId,@Param("carId") Long carId);
}
