package com.carTrading.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.util.UUID;

/**
 * @author tanlixin
 * @description
 * @since 2019-04-17
 */
@RestController
@RequestMapping(value="/upload")
public class UploadController {
    @Value("C:/Users/DELL/Desktop/Graduation Project/carTrading/src/main/antd/src/image/carImage")
    private String location;
    private Logger logger = LoggerFactory.getLogger(this.getClass());
    @RequestMapping("/image")
    public String fun2(@RequestParam("pic") MultipartFile multipartFile, HttpServletRequest request)
            throws Exception {
        File file = new File(location);
        if (!file.exists()) {
            file.mkdirs();
        }
        String contentType = multipartFile.getContentType();
        String root_fileName = multipartFile.getOriginalFilename();
        logger.info("上传图片:name={},type={}", root_fileName, contentType);
        //处理图片
        FileInputStream fileInputStream = (FileInputStream) multipartFile.getInputStream();
        UUID uuid = UUID.randomUUID();
        String fileName =uuid.toString() + ".jpg";
        logger.info(fileName);
        BufferedOutputStream bos = new BufferedOutputStream(new FileOutputStream(location + File.separator + fileName));
        byte[] bs = new byte[1024];
        int len;
        while ((len = fileInputStream.read(bs)) != -1) {
            bos.write(bs, 0, len);
        }
        bos.flush();
        bos.close();
        //获取路径
        return "window.location.href='http://localhost:3000/#/adminCentral'";
    }
}
