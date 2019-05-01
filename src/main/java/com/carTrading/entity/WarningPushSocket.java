package com.carTrading.entity;

import com.alibaba.fastjson.JSONObject;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Component;

import javax.websocket.*;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.CopyOnWriteArraySet;

/**
 * @author tanlixin
 * @description
 * @since 2019-04-29
 */
@ServerEndpoint(value = "/client/{userId}")
@Component
public class WarningPushSocket {


        private static Logger logger = LogManager.getLogger(WarningPushSocket.class.getName());

        //静态变量，用来记录当前在线连接数。应该把它设计成线程安全的。
        private static int onlineCount = 0;

        //concurrent包的线程安全Set，用来存放每个客户端对应的MyWebSocket对象。
        private static CopyOnWriteArraySet<WarningPushSocket> wsClientMap = new CopyOnWriteArraySet<>();

        //与某个客户端的连接会话，需要通过它来给客户端发送数据
        private Session session;

        /**
         * 连接建立成功调用的方法
         * @param session 当前会话session
         */
        @OnOpen
        public void onOpen (@PathParam("userId")String userId, Session session){
            this.session = session;
            wsClientMap.add(this);
            addOnlineCount();
            logger.info(session.getId()+"有新链接加入，当前链接数为：" + wsClientMap.size());
        }

        /**
         * 连接关闭
         */
        @OnClose
        public void onClose (){
            wsClientMap.remove(this);
            subOnlineCount();
            logger.info("有一链接关闭，当前链接数为：" + wsClientMap.size());
        }

        /**
         * 收到客户端消息
         * @param message 客户端发送过来的消息
         * @param session 当前会话session
         * @throws IOException
         */
        @OnMessage
        public void onMessage (String message, Session session) throws IOException {
            logger.info("来终端的警情消息:" + message);
            Map<String, String> map = JSONObject.parseObject(message, HashMap.class);
            System.out.println(map.get("id"));
            Date currentTime = new Date();
            SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            String time = formatter.format(currentTime);
            System.out.println("time"+time);
            System.out.println(map.get("message"));
            System.out.println(map.get("text"));
            map.put("time",time);
            ObjectMapper mapper = new ObjectMapper();
            message=mapper.writeValueAsString(map);
            sendMsgToAll(message);
        }

        /**
         * 发生错误
         */
        @OnError
        public void onError(Session session, Throwable error) {
            logger.info("wsClientMap发生错误!");
            error.printStackTrace();
        }

        /**
         * 给所有客户端群发消息
         * @param message 消息内容
         * @throws IOException
         */
        public void sendMsgToAll(String message) throws IOException {
            for ( WarningPushSocket item : wsClientMap ){
                item.session.getBasicRemote().sendText(message);
            }
            logger.info("成功群送一条消息:" + wsClientMap.size());
        }

        public void sendMessage (String message) throws IOException {
            this.session.getBasicRemote().sendText(message);
            logger.info("成功发送一条消息:" + message);
        }

        public static synchronized  int getOnlineCount (){
            return WarningPushSocket.onlineCount;
        }

        public static synchronized void addOnlineCount (){
            WarningPushSocket.onlineCount++;
        }

        public static synchronized void subOnlineCount (){
            WarningPushSocket.onlineCount--;
        }

}
