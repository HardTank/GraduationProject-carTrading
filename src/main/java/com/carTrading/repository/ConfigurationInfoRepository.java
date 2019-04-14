package com.carTrading.repository;

import com.carTrading.entity.ConfigurationInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author tanlixin
 * @description
 * @since 2019-04-14
 */
@Repository
public interface ConfigurationInfoRepository extends JpaRepository<ConfigurationInfo,Long> {
}
