package com.zyz.product_message.util;

import cn.hutool.core.io.FileUtil;
import cn.hutool.extra.qrcode.QrCodeUtil;
import java.io.File;

/**
 * @Auther: vanse(zyz)
 * @Date: 2023/11/6-11-06-14:07
 * @Description：com.zyz.product_message.util
 */

public class QrUtil {
    public static void main(String[] args) {
        // 生成指定url对应的二维码到文件，宽和高都是300像素
        // 二维码内容 二维宽高  二维码保存的位置
        // 普通文字 扫描就是普通文字
        // 网络地址 扫描会自动跳转地址
        File file = new File("img/qrcode.jpg");
        String url="E:\\学习项目库\\SmartFarming_copy\\img";
        QrCodeUtil.generate(url, 300, 300,
                FileUtil.file(file));

    }
}
