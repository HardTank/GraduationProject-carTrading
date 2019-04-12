package com.carTrading.test;

/**
 * @author tanlixin
 * @description
 * @since 2019-03-25
 */
public class BestPrice {
    private static int []prices={7,1,5,3,6,4} ;
    protected   int maxProfit(int[] prices) {
        if(prices.length==0||prices.length==1){
            return 0;
        }
        int minprice=prices[0];int max=0;
        int maxProfit=0;int minProfit=0;
        for (int i = 1; i <prices.length; i++) {
            if(prices[i]<=minprice){
                minprice=prices[i];
            }
            else{
                 while(i<prices.length&&prices[i]>prices[i-1]){

                     i++;
                 }
                i--;
                max+=prices[i]-minprice;
                minprice=prices[i];
            }

        }
        return max;
    }
    public static  void main(String []args){
       BestPrice a=new BestPrice();
       System.out.print(a.maxProfit(prices));
    }
}
