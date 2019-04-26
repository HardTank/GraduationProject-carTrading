package com.carTrading.test.t2;

/**
 * @author tanlixin
 * @description
 * @since 2019-04-03
 */
public class Main {
    public static boolean isNum(char c, char[] num) {
        for (int i = 0; i < num.length; i++) {
            if (c == num[i])
                return true;
        }
        return false;
    }

    public static void main(String[] args) {
       String path=System.getProperty("user.dir");
       path= path.replace('\\','/');
        System.out.println(path);
    }
}
