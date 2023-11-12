package com.zyz.product_message.dao;


import com.zyz.product_message.pojo.ManagerFenceHouse;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ManagerFenceHouseMapper {
    List<ManagerFenceHouse> queryAllHouses(String fhName);
    ManagerFenceHouse selectByFhName(String fhName);
    int updateByPrimaryKey(ManagerFenceHouse record);
    int insert(ManagerFenceHouse record);
    ManagerFenceHouse selectByPrimaryKey(String fhId);
    int deleteByPrimaryKey(String fhId);
    int deleteBatchByIds(List<String> ids);
    List<ManagerFenceHouse> selectAll();
    List<Object> countAllResources();

}