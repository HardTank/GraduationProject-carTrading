package com.carTrading.repository;

import com.carTrading.entity.TransactionInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author tanlixin
 * @description
 * @since 2019-04-27
 */
@Repository
public interface TransactionInfoRepository extends JpaRepository<TransactionInfo,Long>{

    public  TransactionInfo findByCarId(Long carId);
}
