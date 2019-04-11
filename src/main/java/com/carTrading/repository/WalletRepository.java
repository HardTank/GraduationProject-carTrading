package com.carTrading.repository;

import com.carTrading.entity.Wallet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author tanlixin
 * @description
 * @since 2019-04-11
 */
@Repository
public interface WalletRepository extends JpaRepository<Wallet,Long> {
}
