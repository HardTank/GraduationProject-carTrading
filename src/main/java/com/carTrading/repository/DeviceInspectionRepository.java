package com.carTrading.repository;

import com.carTrading.entity.DeviceInspection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author tanlixin
 * @description
 * @since 2019-04-22
 */
@Repository
public interface DeviceInspectionRepository extends JpaRepository<DeviceInspection,Long> {
}
