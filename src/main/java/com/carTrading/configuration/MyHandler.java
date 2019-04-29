package com.carTrading.configuration;

import com.alibaba.fastjson.JSONObject;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.HashMap;
import java.util.Map;

/**
 * @author tanlixin
 * @description
 * @since 2019-04-29
 */
public class MyHandler extends TextWebSocketHandler {
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        String payload = message.getPayload();
        Map<String, String> map = JSONObject.parseObject(payload, HashMap.class);
        System.out.println("=====接受到的数据"+map);
        System.out.println("=====接受到的数据"+map.get("id"));
        System.out.println("=====接受到的数据"+map.get("message"));
        System.out.println("=====接受到的数据"+map.get("text"));
        session.sendMessage(new TextMessage("服务器返回收到的信息," + payload));
    }
}
