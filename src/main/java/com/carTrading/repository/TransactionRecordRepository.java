package com.carTrading.repository;

import com.carTrading.entity.TransactionRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author tanlixin
 * @description
 * @since 2019-04-15
 */
@Repository
public interface TransactionRecordRepository extends JpaRepository<TransactionRecord,Long>
{

}
