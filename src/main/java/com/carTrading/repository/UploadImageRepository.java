package com.carTrading.repository;

import com.carTrading.entity.UploadImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author tanlixin
 * @description
 * @since 2019-04-25
 */
@Repository
public interface UploadImageRepository extends JpaRepository<UploadImage,Long> {
}
