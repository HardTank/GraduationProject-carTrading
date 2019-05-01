package com.carTrading.repository;

import com.carTrading.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author tanlixin
 * @description
 * @since 2019-04-30
 */
@Repository
public interface CommentRepository extends JpaRepository<Comment,Long> {
}
