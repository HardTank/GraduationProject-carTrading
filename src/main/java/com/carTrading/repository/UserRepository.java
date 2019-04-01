package com.carTrading.repository;

import com.carTrading.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author tanlixin
 * @description
 * @since 2019-03-25
 */
@Repository
public interface UserRepository extends JpaRepository<User,Long>{

    @Query("select t from User t where t.name !=:name ")
    List<User> findByUserName(@Param("name") String name);
}
