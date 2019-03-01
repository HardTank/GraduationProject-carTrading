package com.song.entity;

import lombok.Data;

import javax.persistence.*;

/**
 * Created by Song on 2017/2/15.
 * Model 用户
 */
@Entity
@Table(name = "user")
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String name;

    private String password;

    public User(String name, String password) {
        this.name = name;
        this.password = password;
    }
    public User(){}
}
