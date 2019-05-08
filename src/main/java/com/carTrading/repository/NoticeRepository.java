package com.carTrading.repository;

import com.carTrading.entity.Notice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author tanlixin
 * @description
 * @since 2019-05-08
 */
@Repository
public interface NoticeRepository  extends JpaRepository<Notice,Long>{
}
