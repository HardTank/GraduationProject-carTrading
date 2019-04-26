package com.carTrading.controller;

import com.carTrading.entity.UploadImage;
import com.carTrading.service.UploadImageService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

/**
 * @author tanlixin
 * @description
 * @since 2019-04-17
 */
@RestController
@RequestMapping(value="/upload")
public class UploadController {
    //@Value("C:/Users/DELL/Desktop/Graduation Project/carTrading")
    private String location;
    @Autowired
    private UploadImageService uploadImageService;
    private Logger logger = LoggerFactory.getLogger(this.getClass());
    @RequestMapping("/image")
    @ResponseBody
    public String fun2(@RequestParam("pic") MultipartFile multipartFile,String position ,Integer carId)
            throws Exception {
        logger.info("name"+position+"caId"+carId);
        String src=uploadImageService.getImage(multipartFile,position,carId);
        UploadImage uploadImage=new UploadImage();
        uploadImage.setPosition(position);
        uploadImage.setSrc(src);
        uploadImage.setCarId(carId);
        uploadImageService.save(uploadImage);
        return "success";
    }
    //获取需要展示的图片信息
    @RequestMapping(value = "/getList")
    public Page<UploadImage> getList(UploadImage uploadImage, int pageIndex, int pageSize) {
        logger.info("路径-------------------------------------");
        Page<UploadImage> page = uploadImageService.getList(uploadImage, pageIndex, pageSize);
        return page;
    }

}
