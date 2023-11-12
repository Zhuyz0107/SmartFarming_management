package com.zyz.product_message.service.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.sun.org.apache.regexp.internal.RE;
import com.zyz.product_message.dao.ManagerBatchMapper;
import com.zyz.product_message.dao.QuarantineRegistrationDao;
import com.zyz.product_message.exception.ServiceException;
import com.zyz.product_message.pojo.QuarantineRegisterion;
import com.zyz.product_message.result.Result;
import com.zyz.product_message.result.ResultCode;
import com.zyz.product_message.service.FenceHouseService;
import com.zyz.product_message.service.QuarantineRegistrationService;
import org.apache.ibatis.annotations.ResultType;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.MethodArgumentNotValidException;

import javax.annotation.Resource;
import java.util.List;
import java.util.UUID;

/**
 * @Auther: vanse(zyz)
 * @Date: 2023/11/1-11-01-22:36
 * @Description：com.zyz.product_message.service.impl
 */
@Service
public class QuarantineRegistrationServiceImpl implements QuarantineRegistrationService {
    @Resource
    QuarantineRegistrationDao quarantineRegistrationDao;
    @Resource
    private ManagerBatchMapper managerBatchMapper;

    @Override
    public void saveOrUpdate(QuarantineRegisterion qr) {
//        实现更新和插入信息;根据是否传入id进行判断是增加还是新增
        int result; // sql语句执行后，返回受影响的行数result
        String id= String.valueOf(qr.getGrId());
        if(!StringUtils.hasText(id)){
//            唯一的id信息
//            qr.setGrId(Integer.valueOf(UUID.randomUUID().toString()));
            result =quarantineRegistrationDao.saveQRMessage(qr);

        }else {
            result =quarantineRegistrationDao.updQRMessage(qr);
        }
        if(result==0){
            throw new ServiceException(ResultCode.FAIL);
        }
        // 修改批次表中对应批次的检疫状态和检疫合格状态
      /*  if (managerBatchMapper.updateBQuarantineAndBQualified(bQualified, grBatchId) == 0) {
            throw new ServiceException(ResultCode.FAIL);
        }*/
    }

    @Override
    public PageInfo<QuarantineRegisterion> findPageMessage(Integer pageNum, Integer pageSize, String grMechanism, String bQualified) {
//        分页情况
        PageHelper.startPage(pageNum,pageSize); // 这个语句只对后面紧接着的SQL起作用，所以紧接着的应该是分页查询的SQL，而不能是其他的。
//        分页查询
        List<QuarantineRegisterion> all = quarantineRegistrationDao.selArrMessage(grMechanism,bQualified);
        PageInfo<QuarantineRegisterion> result=new PageInfo<>(all);
        return result;
    }
}
