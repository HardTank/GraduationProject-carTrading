package com.carTrading.test.t2;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Scanner;

/**
 * @author tanlixin
 * @description
 * @since 2019-04-03
 */
public class Main {
    public static void main(String[] args) {
        Scanner sc=new Scanner(System.in);
        int n;
        List<Integer>A=new ArrayList<Integer>();
        List<Integer>B=new ArrayList<Integer>();

        while(sc.hasNext()){
            n=sc.nextInt();
            for (int i = 0; i <n ; i++) {
                A.add(sc.nextInt());
            }
            for (int i = 0; i <n ; i++) {
                B.add(sc.nextInt());
            }
            Collections.sort(A);
            Collections.sort(B);
            int count=n;
            int a=n-1;
            int b=n-1;

                   while(a<0||b<0) {
                       if(A.get(a)>B.get(b)){
                           a--;
                       }
                       if (A.get(a)== B.get(b)) {
                           count--;
                            a--;
                       }
                       if (A.get(a)<B.get(b)){
                           count-=2;

                       }

                       b--;
                   }
            System.out.println(count*100);
        }
    }
}
