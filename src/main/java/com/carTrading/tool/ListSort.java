package com.carTrading.tool;

import com.carTrading.entity.TradingInfo;

import java.text.SimpleDateFormat;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

/**
 * @author tanlixin
 * @description
 * @since 2019-05-04
 */
public class ListSort {
    public static void ListSort(List<TradingInfo> list) {
        Collections.sort(list, new Comparator<TradingInfo>() {

            public int compare(TradingInfo o1, TradingInfo o2) {
                SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:MM:SS");
                try {

                    if (o1.getAuctionTime().getTime() >o2.getAuctionTime().getTime()) {
                        return 1;
                    } else if (o1.getAuctionTime().getTime()<o2.getAuctionTime().getTime()) {
                        return -1;
                    } else {
                        return 0;
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
                return 0;
            }
        });
    }
}

