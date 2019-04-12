package com.carTrading.test;

/**
 * @author tanlixin
 * @description
 * @since 2019-03-25
 */
public class Test {
    public int []prices={7,1,5,3,6,4};

    public static void main(){
        int []prices={7,1,5,3,6,4};
        BestPrice a=new BestPrice();
        a.maxProfit(prices);
    }
}
