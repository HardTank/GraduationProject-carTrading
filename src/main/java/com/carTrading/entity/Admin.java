package com.carTrading.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

/**
 * @author tanlixin
 * @description 管理员实体
 * @since 2019-04-01
 */
@Entity
@Table(name = "admin")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Admin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    /***/
    public String name;

    public static void main(String[] args) {
        Admin a=new Admin();
        a.name="xx";
        System.out.println(a.toString());
    }
}
