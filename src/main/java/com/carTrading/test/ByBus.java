package com.carTrading.test;

import java.util.Scanner;

/**
 * @author tanlixin
 * @description
 * @since 2019-03-25
 */
public class ByBus {
    public static  void main(String []args){
        int memberCount, carCount;
        Scanner sc=new Scanner(System.in);
        while(sc.hasNext()){
           memberCount=sc.nextInt();

            String[]members=new String[memberCount];
            for (int i = 0; i <memberCount ; i++) {
                members[i]=sc.next();
            }
            int k=memberCount/3;

            for (int i = 0; i <memberCount ; i++) {

                for (int j =k; j >0; j++) {
                    System.out.print(members[i]);
                    System.out.print("-");

                }
            }
        }
    }
}
