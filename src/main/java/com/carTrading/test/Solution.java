package com.carTrading.test;

import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

/**
 * @author tanlixin
 * @description
 * @since 2019-03-27
 */
public class Solution {

    public Boolean getBox(int x, int y, int k) {

        List<Integer> list = new ArrayList<Integer>();
        while (x % 10 != 0) {
            list.add(x % 10);
            x = x / 10;
        }
        while (y %10 != 0) {
            list.add(y % 10);
            y = y / 10;
        }
        int sum = 0;
        for (Integer i : list) {
            sum += i;
        }
        if (sum <= k)
            return true;
        else
            return false;
    }
public int count (){
    return 1;
}
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
Solution s=new Solution();
        int m, n, k;
        int x=0;
        int y=0;
        int count=0;
        while (sc.hasNext()) {
            m = sc.nextInt();
            n = sc.nextInt();
            k = sc.nextInt();

//            while(x<0||y<0||x>m||y>n){
//
//            }
//            System.out.println(s.getBox(m,n,k));
        }
    }
}
