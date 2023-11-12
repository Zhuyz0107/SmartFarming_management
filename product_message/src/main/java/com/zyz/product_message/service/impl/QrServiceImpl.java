package com.zyz.product_message.service.impl;

import cn.hutool.core.io.FileUtil;
import cn.hutool.extra.qrcode.QrCodeUtil;
import com.zyz.product_message.dao.QrMapper;
import com.zyz.product_message.pojo.ManagerQrcode;
import com.zyz.product_message.service.QrService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.io.File;
import java.io.IOException;
import java.util.UUID;

/**
 * @Auther: vanse(zyz)
 * @Date: 2023/11/6-11-06-14:27
 * @Description：com.zyz.product_message.service.impl
 */
@Service
public class QrServiceImpl implements QrService {
    @Resource
    private QrMapper qrMapper;

    @Override
    public void insert(String animalId) {
//        先删除绑定的二维码
        qrMapper.deleteById(animalId);
        //一个动物一个二维码
        String Path= UUID.randomUUID().toString().replaceAll("-","")+ ".jpg";
        File file = new File("img/"+Path);
        if(!file.exists()){
            try {
                file.createNewFile();
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }
//        二维码存地址，前端路径|后端路径
//        "http://172.16.14.91:9999/animal/findById?animalId="+animalId
//        "http://192.168.1.7:9527/#/qr?animalId="
//        "http://172.16.14.91:9527/#/qr?animalId="
        QrCodeUtil.generate("http://192.168.1.7:9527/#/qr?animalId="+animalId, 300, 300,
                FileUtil.file(file));

//        String url="http://localhost/static/img/"+ Path;
//        String url="http://172.16.14.91:9999/static/img/"+ Path;
        String url="http://192.168.1.7:9999/static/img/"+ Path;

        ManagerQrcode managerQrcode = ManagerQrcode.builder()
                .qAnimalId(animalId)
                .qImageUrl(url)
                .build();
        qrMapper.insert(managerQrcode);
    }
}
