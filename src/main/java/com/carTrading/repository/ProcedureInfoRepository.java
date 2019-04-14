package com.carTrading.repository;

import com.carTrading.entity.ProcedureInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author tanlixin
 * @description
 * @since 2019-04-14
 */
@Repository
public interface ProcedureInfoRepository extends JpaRepository<ProcedureInfo,Long> {
}
