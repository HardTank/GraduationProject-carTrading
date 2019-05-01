package com.carTrading.test;

import java.text.ParsePosition;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * @author tanlixin
 * @description
 * @since 2019-03-25
 */
public class Test {
    public int []prices={7,1,5,3,6,4};

    public static void main(String []args){
        Date currentTime = new Date();
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String dateString = formatter.format(currentTime);
        ParsePosition pos = new ParsePosition(8);
        Date currentTime_2 = formatter.parse(dateString, pos);
        System.out.println(dateString);
        System.out.println(currentTime_2);
    }
}
