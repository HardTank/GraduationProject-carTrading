package com.carTrading.service;

import com.carTrading.entity.UploadImage;
import com.carTrading.repository.UploadImageRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.util.UUID;

/**
 * @author tanlixin
 * @description
 * @since 2019-04-25
 */
@Service
public class UploadImageService {

    @Autowired
    private UploadImageRepository uploadImageRepository;
    private Logger logger = LoggerFactory.getLogger(this.getClass());

    /**
     * 动态查询
     */
    public Page<UploadImage> getList(UploadImage uploadImage, int pageIndex, int pageSize) {
        logger.info("查找二手车信息");
        Page<UploadImage> page = null;
        ExampleMatcher matcher = ExampleMatcher.matching() //构建对象
                .withStringMatcher(ExampleMatcher.StringMatcher.CONTAINING) //改变默认字符串匹配方式：模糊查询
                .withIgnoreCase(true); //改变默认大小写忽略方式：忽略大小写

        /**创建实例*/
        Example<UploadImage> ex = Example.of(uploadImage, matcher);
        /**排序查询*/
        Sort sort = new Sort(Sort.Direction.DESC, "id");
        /**分页查询*/
        PageRequest pageRequest = new PageRequest(pageIndex, pageSize, sort);
        page = uploadImageRepository.findAll(ex, pageRequest);
        return page;
    }

    /**
     * 更新数据
     */
    @Transactional(rollbackFor = Exception.class)
    public UploadImage save(UploadImage car) {
        logger.info("更新二手车信息");
        UploadImage uploadImage = uploadImageRepository.save(car);
        return uploadImage;
    }
    public String getImage( MultipartFile multipartFile, String position , Integer carId)
            throws Exception {
        logger.info("name"+position+"caId"+carId);
        String  location=System.getProperty("user.dir");
        String path="/src/main/antd/src/image/carImage";
        location=location.replace('\\','/');

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
        BufferedOutputStream bos = new BufferedOutputStream(new FileOutputStream(location +path+ File.separator + fileName));
        byte[] bs = new byte[1024];
        int len;
        while ((len = fileInputStream.read(bs)) != -1) {
            bos.write(bs, 0, len);
        }
        bos.flush();
        bos.close();
        //获取路径
        return uuid.toString();
    }
//    /**
//     * 根据id获取汽车的信息
//     */
//    public UploadImage getCar(UploadImage UploadImage) {
//        UploadImage car = UploadImageRepository.findOne(UploadImage.getId());
//        return car;
//    }
}
