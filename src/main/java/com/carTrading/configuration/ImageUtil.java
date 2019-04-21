package com.carTrading.configuration;

import org.springframework.web.multipart.MultipartFile;
import java.util.UUID;
import java.io.*;

/**
 * @author tanlixin
 * @description
 * @since 2019-04-18
 */
public class ImageUtil {
    public static String saveImg(MultipartFile multipartFile, String path) throws IOException {
        File file = new File(path);
        if (!file.exists()) {
            file.mkdirs();
        }
        FileInputStream fileInputStream = (FileInputStream) multipartFile.getInputStream();
        UUID uuid = UUID.randomUUID();
        String fileName =uuid.toString() + ".png";
        BufferedOutputStream bos = new BufferedOutputStream(new FileOutputStream(path + File.separator + fileName));
        byte[] bs = new byte[1024];
        int len;
        while ((len = fileInputStream.read(bs)) != -1) {
            bos.write(bs, 0, len);
        }
        bos.flush();
        bos.close();
        return fileName;
    }

}
