package com.zyz.product_message.service.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.zyz.product_message.dao.ext.AnimalDataExtMapper;
import com.zyz.product_message.pojo.ManagerAnimal;
import com.zyz.product_message.pojo.ext.ManagerAnimalExt;
import com.zyz.product_message.service.AnimalDataService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * @Auther: vanse(zyz)
 * @Date: 2023/11/2-11-02-19:03
 * @Description：com.zyz.product_message.service.impl
 */
@Service
public class AnimalDataServiceImpl implements AnimalDataService {
    @Resource
    AnimalDataExtMapper animalDataExtMapper;

    @Override
    public PageInfo<ManagerAnimalExt> findAllData(Integer pageNum, Integer pageSize, String aHealthy, String aGender) {
//        分页信息
        PageHelper.startPage(pageNum,pageSize);
//        分页处理
        List<ManagerAnimalExt> resultMD = animalDataExtMapper.selectAllData(aHealthy, aGender);
        PageInfo<ManagerAnimalExt> result=new PageInfo<>(resultMD);
        return result;
    }

    @Override
    public ManagerAnimal findById(String animalId) {
        ManagerAnimal managerAnimal = animalDataExtMapper.selectById(animalId);
        return managerAnimal;
    }
}
