# 智慧农业养殖溯源项目
> 主要使用技术：MySql+SpringMVC、Spring、MyBatis+SpringBoot+Maven+PowerDesigner+Git+JWT令牌+网络穿透；
>
> 实现功能：将养殖动物信息分为各个模块信息进行管理；
>
> 亮点功能：执行数据的批量处理；存储的更新信息于一体；动物个体信息设置二维码扫描功能，可以扫描查看动物个体信息，快速检出养殖动物信息；

## 1、栏舍管理模块

### 分页+条件查询栏舍

#### 页面效果

![image-20231112184214367](E:\github\Demo\SmartFarming_management\ReadMe_img\image-20231112184214367.png)

#### 接口规范

> 请求路径：/fenceHouse
>
> 请求方式：GET
>
> 接口描述：
>
> 该接口可以实现对栏舍数据进行分页展示，并且还可以根据栏舍名称进行模糊查询

#### 请求参数

参数格式：application/x-www-form-urlencoded

| 参数名称 | 参数说明 | 请求类型 | 是否必须 | 数据类型 |
| :------- | :------- | :------- | :------- | :------- |
| fhName   | 栏舍名称 | query    | false    | string   |
| pageNum  | 当前页码 | query    | true     | integer  |
| pageSize | 每页大小 | query    | true     | integer  |

#### 响应数据

参数格式：application/json

```json
{
  "code": 200,
  "message": "操作成功",
  "data": {
    "total": 1,
    "list": [
      {
        "fhId": "caa98b63d1e64ec981cbfaa807931518",
        "fhName": "保育舍",
        "fhDesc": "用于4～10周龄的断奶仔猪，结构同高床产仔栏的地板和围栏，高度0.6米，离地20～40厘米，占地小，便于管理",
        "fhTime": "2022-04-13 00:00:00"
      }
    ],
    "pageNum": 1,
    "pageSize": 10,
    "size": 1,
    "startRow": 1,
    "endRow": 1,
    "pages": 1,
    "prePage": 0,
    "nextPage": 0,
    "isFirstPage": true,
    "isLastPage": true,
    "hasPreviousPage": false,
    "hasNextPage": false,
    "navigatePages": 8,
    "navigatepageNums": [
      1
    ],
    "navigateFirstPage": 1,
    "navigateLastPage": 1
  }
}
```

#### 功能实现

三层架构进行控制反转，依赖注入，分层解耦；

### 新增+修改栏舍

#### 页面效果

![image-20231112184321495](E:\github\Demo\SmartFarming_management\ReadMe_img\image-20231112184321495.png)

#### 接口规范

> 请求路径：/fenceHouse/saveOrUpdate
>
> 请求方式：POST
>
> 接口描述：此接口用于新增或修改栏舍信息，分为下面两种情况：
>
> 请求参数中包含栏舍ID，修改操作
>
> 请求体中不包含栏舍ID，新增操作
>
> 无论新增或者修改，栏舍名称和创建时间不能为空
>
> 栏舍名称不能与已有栏舍重复

#### 请求参数

参数格式：application/json

```json
{
    "fhId": "12e4f043910a4b7a9ad933f90fec620c", //栏舍id
    "fhName": "隔离舍", 						  //栏舍名称
    "fhDesc": "隔离病猪", 						 //栏舍描述
    "fhTime": "2023-08-15 00:00:00" 		    //栏舍创建时间
}
```

#### 响应数据

参数格式：application/json

```json
{
  "code": 200,
  "message": "操作成功",
  "data": null
}
```

### 根据栏舍编号删除栏舍

#### 页面效果

![image-20231112184444818](E:\github\Demo\SmartFarming_management\ReadMe_img\image-20231112184444818.png)

#### 接口规范

> 请求路径：/fenceHouse/{fhId}
>
> 请求方式：DELETE
>
> 接口描述：
>
> 该接口用于根据栏舍编号删除栏舍信息，如果栏舍下有栏圈信息则无法删除

#### 请求参数

参数格式：application/x-www-form-urlencoded

| 参数名称 | 参数说明 | 请求类型 | 是否必须 | 数据类型 |
| :------- | :------- | :------- | :------- | :------- |
| fhId     | 栏舍编号 | path     | true     | string   |

#### 响应数据

参数格式：application/json

```json
{
  "code": 200,
  "message": "操作成功",
  "data": null
}
```

### 批量删除栏舍

#### 页面效果

![image-20231112184521255](E:\github\Demo\SmartFarming_management\ReadMe_img\image-20231112184521255.png)

#### 接口规范

> 请求路径：/fenceHouse/deleteByIds
>
> 请求方式：DELETE
>
> 接口描述：
>
> 该接口用于批量删除栏圈信息
>
> 只要有一条栏舍信息被删除，就代表操作成功
>
> 只有要删除的栏舍信息都不存在，才响应`数据不存在或者已经删除`的错误信息
>
> 只有要删除的栏舍信息都有关联的栏圈信息，才响应`数据关联其他数据，无法删除`的错误信息

#### 请求参数

参数格式：application/json

```json
["0926307b24aa480897cecdecdcd4b347","12e4f043910a4b7a9ad933f90fec620c"]
```

#### 响应数据

参数格式：application/json

```json
{
  "code": 200,
  "message": "操作成功",
  "data": null
}
```

### 根据栏舍编号查询栏舍及其对应的栏圈

#### 页面效果

![image-20231112184632867](E:\github\Demo\SmartFarming_management\ReadMe_img\image-20231112184632867.png)

#### 接口规范

> 请求路径：/fenceHouse/{fhId}
>
> 请求方式：GET
>
> 接口描述：
>
> 该接口用于根据栏舍编号查询栏舍信息以及该栏舍信息下关联的所有栏圈信息

#### 请求参数

参数格式：application/x-www-form-urlencoded

| 参数名称 | 参数说明 | 请求类型 | 是否必须 | 数据类型 |
| :------- | :------- | :------- | :------- | :------- |
| fhId     | 栏舍编号 | path     | false    | string   |

#### 响应数据

参数格式：application/json

```json
{
  "code": 200,
  "message": "操作成功",
  "data": {
    "fhId": "caa98b63d1e64ec981cbfaa807931518",
    "fhName": "保育舍",
    "fhDesc": "用于4～10周龄的断奶仔猪，结构同高床产仔栏的地板和围栏，高度0.6米，离地20～40厘米，占地小，便于管理",
    "fhTime": "2022-04-13 00:00:00",
    "mhs": [
      {
        "hId": "94fcd94d9f544e1dbf8002d131d04256",
        "hName": "保育3号圈",
        "hDesc": "保育3号圈描述",
        "hMax": 10,
        "hSaved": 2,
        "hTime": "2022-04-13 06:34:25",
        "hEnable": "可用",
        "hFull": "未满",
        "hFenceId": "caa98b63d1e64ec981cbfaa807931518"
      },
      ……
    ]
  }
}
```

## 2、栏圈管理模块

### 查询所有的栏圈容量

#### 页面效果

![image-20231112184917856](E:\github\Demo\SmartFarming_management\ReadMe_img\image-20231112184917856.png)

#### 接口规范

> 请求路径：/hurdle/queryAllMax
>
> 请求方式：GET
>
> 接口描述：
>
> 该接口用于查询所有的栏圈容量

#### 请求参数

无

#### 响应数据

参数格式：application/json

```json
{
  "code": 200,
  "message": "操作成功",
  "data": [
    10,
    30,
    40,
    20
  ]
}
```

#### 功能实现

controller层

```java
package com.briup.product_source.controller;

@Api(tags = "栏圈管理模块")
@RestController
@RequestMapping("/hurdle")
public class HurdleController {
    @Autowired
    private HurdlesService hurdlesService;

    @ApiOperation("查询栏圈中所有的栏圈容量接口")
    @GetMapping("/queryAllMax")
    public Result queryAllMax() {
        return Result.success(hurdlesService.findAllMax());
    }
}
```

service层

```java
package com.briup.product_source.service.impl;

@Service
public class HurdlesServiceImpl implements HurdlesService {
    @Autowired
    private ManagerHurdlesMapper managerHurdlesMapper;

    @Override
    public List<Integer> findAllMax() {
        return managerHurdlesMapper.selectAllMax();
    }
}
```

dao层接口以及对应mapper文件

```java
package com.briup.product_source.dao;

@Repository
public interface ManagerHurdlesMapper {
    List<Integer> selectAllMax();
}
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.briup.product_source.dao.ManagerHurdlesMapper">
    <!--查询所有的栏圈容量-->
    <select id="selectAllMax" resultType="integer">
        select distinct h_max
        from manager_hurdles
    </select>
</mapper>
```



### 查询所有的栏舍

#### 页面效果

![image-20231112185015450](E:\github\Demo\SmartFarming_management\ReadMe_img\image-20231112185015450.png)

#### 接口规范

> 请求路径：/fenceHouse/queryAll
>
> 请求方式：GET
>
> 接口描述：
>
> 该接口用于查询所有的栏舍信息

#### 请求参数

无

#### 响应数据

参数格式：application/json

```json
{
  "code": 200,
  "message": "操作成功",
  "data": [
    {
      "fhId": "12e4f043910a4b7a9ad933f90fec620c",
      "fhName": "隔离舍",
      "fhDesc": "隔离病猪",
      "fhTime": "2023-08-15 00:00:00"
    },
    {
      "fhId": "851d58388f974d95b6c67d93189b7222",
      "fhName": "育成舍",
      "fhDesc": "即猪舍内圈与圈间以0.8～1.0米高的实体墙相隔，沿通道正面用栅栏。其集中了实体猪栏、栅栏式猪栏两者的优点，适于大小猪场。",
      "fhTime": "2022-04-13 00:00:00"
    },
    ……
  ]
}
```

### 分页+条件查询栏圈

#### 页面效果

![image-20231112185237925](E:\github\Demo\SmartFarming_management\ReadMe_img\image-20231112185237925.png)

#### 接口规范

> 请求路径：/hurdle
>
> 请求方式：GET
>
> 接口描述：
>
> 该接口可以实现对栏圈数据进行分页展示，并且还可以根据栏圈名称、栏圈容量、所属栏舍、是否可用进行查询，需要关联查询出栏圈所属的栏舍信息，按照创建时间降序排序

#### 请求参数

参数格式：application/x-www-form-urlencoded

| 参数名称 | 参数说明 | 请求类型 | 是否必须 | 数据类型 |
| :------- | :------- | :------- | :------- | :------- |
| pageNum  | 当前页码 | query    | true     | integer  |
| pageSize | 每页大小 | query    | true     | integer  |
| hName    | 栏圈名称 | query    | false    | string   |
| hMax     | 栏圈容量 | query    | false    | integer  |
| fhName   | 所属栏舍 | query    | false    | string   |
| hEnable  | 是否可用 | query    | false    | string   |

#### 响应数据

参数格式：application/json

```json
{
  "code": 200,
  "message": "操作成功",
  "data": {
    "total": 1,
    "list": [
      {
        "hId": "94fcd94d9f544e1dbf8002d131d04256",
        "hName": "保育3号圈",
        "hDesc": "保育3号圈描述",
        "hMax": 10,
        "hSaved": 2,
        "hTime": "2022-04-13 06:34:25",
        "hEnable": "可用",
        "hFull": "未满",
        "hFenceId": "caa98b63d1e64ec981cbfaa807931518",
        "managerFenceHouse": {
          "fhId": "caa98b63d1e64ec981cbfaa807931518",
          "fhName": "保育舍",
          "fhDesc": "用于4～10周龄的断奶仔猪，结构同高床产仔栏的地板和围栏，高度0.6米，离地20～40厘米，占地小，便于管理",
          "fhTime": "2022-04-13 00:00:00"
        }
      }
    ],
    "pageNum": 1,
    "pageSize": 10,
    "size": 1,
    "startRow": 1,
    "endRow": 1,
    "pages": 1,
    "prePage": 0,
    "nextPage": 0,
    "isFirstPage": true,
    "isLastPage": true,
    "hasPreviousPage": false,
    "hasNextPage": false,
    "navigatePages": 8,
    "navigatepageNums": [
      1
    ],
    "navigateFirstPage": 1,
    "navigateLastPage": 1
  }
}
```

### 根据栏圈编号禁用/启用栏圈

#### 页面效果

![image-20231112185337937](E:\github\Demo\SmartFarming_management\ReadMe_img\image-20231112185337937.png)

#### 接口规范

> 请求路径：/hurdle/{hId}/{hEnable}
>
> 请求方式：PUT
>
> 接口描述：
>
> 该接口可以实现根据栏圈编号禁用/启用栏圈

#### 请求参数

参数格式：application/x-www-form-urlencoded

| 参数名称 | 参数说明 | 请求类型 | 是否必须 | 数据类型 |
| :------- | :------- | :------- | :------- | :------- |
| hId      | 栏圈编号 | path     | true     | string   |
| hEnable  | 栏圈状态 | path     | true     | string   |

#### 响应数据

参数格式：application/json

```json
{
  "code": 200,
  "message": "操作成功",
  "data": null
}
```

### 批量禁用/启用栏圈

#### 页面效果



#### 接口规范

> 请求路径：/hurdle
>
> 请求方式：PUT
>
> 接口描述：
>
> 该接口用于批量禁用启用栏圈

#### 请求参数

参数格式：application/json

```json
[
    {
        "hId" : "429b226d6f7e43339841b44875c672f7",
        "hEnable": "禁用"
    },
    {
        "hId" : "e821e1725e12474c870e2342a30e0e94",
        "hEnable": "可用"
    }
]
```

#### 响应数据

参数格式：application/json

```json
{
  "code": 200,
  "message": "操作成功",
  "data": null
}
```

## 3、检疫登记模块

### 查询未检疫的批次

#### 页面效果



#### 接口规范

> 请求路径：/batch/queryAllUnquarantined
>
> 请求方式：GET
>
> 接口描述：
>
> 此接口用于查询出所有未检疫的批次

#### 请求参数

无

#### 响应数据

参数格式：application/json

```json
{
  "code": 200,
  "message": "操作成功",
  "data": [
    {
      "bSerialId": "920d3d09c01542a987d1ab367526bc06",
      "bDesc": "2023年4月第一批次",
      "bQuarantine": "未检疫",
      "bQualified": "",
      "bTime": "2023-04-05"
    },
    ……
  ]
}
```

### 添加/修改检疫登记信息

#### 页面效果

![image-20231112185728943](E:\github\Demo\SmartFarming_management\ReadMe_img\image-20231112185728943.png)

![image-20231112185645173](E:\github\Demo\SmartFarming_management\ReadMe_img\image-20231112185645173.png)

#### 接口规范

> 请求路径：/quarantineRegistration/saveOrUpdate
>
> 请求方式：POST
>
> 接口描述：
>
> 此接口用于新增或修改检疫记录信息，分为下面两种情况：
>
> 请求参数中包含检疫记录ID，修改操作
>
> 请求体中不包含检疫记录ID，新增操作
>
> 注意：
>
> 无论添加或者修改，批次编号、检疫机构、检疫结果、图片地址以及检疫时间不能为空
>
> 由于图片上传功能在后续的Spring高级课程中学习，此处暂时不做，传入固定的图片路径即可
>
> 同时需同步修改批次表中该批次的检疫状态

#### 请求参数

参数格式：application/json

```json
{
  "bQualified": "合格",							 //检疫结果
  "grBatchId": "f15334d5847c47cd9c0c3c2ade0846aa",//批次编号
  "grImg": "http://121.224.77.1:9527/group1/M00/00/02/rBBkoGSlNleAMZX-AAAqqi5Ykdc70.webp",								//图片路径
  "grMechanism": "防疫站",							//检疫机构
  "grTime": "2023-08-16 00:00:00"				  //检疫时间
}
```

#### 响应数据

参数格式：application/json

```json
{
  "code": 200,
  "message": "操作成功",
  "data": null
}
```

## 4、病症记录模块

### 添加/修改病症记录信息

#### 页面效果

![image-20231112185822393](E:\github\Demo\SmartFarming_management\ReadMe_img\image-20231112185822393.png)

![image-20231112185910174](E:\github\Demo\SmartFarming_management\ReadMe_img\image-20231112185910174.png)

#### 接口规范

> 请求路径：/diseaseRecord/saveOrUpdate
>
> 请求方式：POST
>
> 接口描述：
>
> 此接口用于新增或修改病症记录信息，分为下面两种情况：
>
> 请求参数中包含病症记录ID，修改操作
>
> 请求体中不包含病症记录ID，新增操作
>
> 注意：
>
> 无论新增或者修改，动物编号、病症、上报时间和病症描述不能为空
>
> 只有养殖中的动物能够添加病症记录
>
> 添加时未传诊疗状态，默认为未治疗
>
> 如果添加或者修改的病症记录，该动物为未治疗或者治疗中，则需同步修改动物的健康状态为生病，该动物的诊疗状态为已治疗，则需同步修改动物的健康状态为健康。

#### 请求参数

参数格式：application/json

```json
{
  "drAnimalId": "caa6b482bbd84db2bd473db13c562330",	// 动物编号
  "drCure": "已打针",				  				  // 治疗过程描述
  "drDId": 12,										// 病症类型编号
  "drDesc": "发烧",				   				   // 病症描述
  "drId": 11,										// 病症记录编号
  "drStatus": "已治疗",  			  				  // 治疗状态
  "drTime": "2023-08-18 00:00:00"					// 上报时间
}
```

#### 响应数据

参数格式：application/json

```json
{
  "code": 200,
  "message": "操作成功",
  "data": null
}
```

## 5、动物管理模块

### 分页+条件查询动物

#### 页面效果1：

![image-20231112190059856](E:\github\Demo\SmartFarming_management\ReadMe_img\image-20231112190059856.png)

![image-20231112190447222](E:\github\Demo\SmartFarming_management\ReadMe_img\image-20231112190447222.png)

#### 页面效果2：

二维码扫描信息页面：

![image-20231112190012504](E:\github\Demo\SmartFarming_management\ReadMe_img\image-20231112190012504.png)

![image-20231112190346650](E:\github\Demo\SmartFarming_management\ReadMe_img\image-20231112190346650.png)

#### 接口规范

> 请求路径：/animal
>
> 请求方式：GET
>
> 接口描述：
>
> 该接口可以实现对动物数据进行分页展示，并且还可以根据动物健康状态以及动物性别查询，需要关联查询出对应动物所属批次、所属栏舍栏圈以及二维码信息。

#### 请求参数

参数格式：application/x-www-form-urlencoded

| 参数名称 | 参数说明 | 请求类型 | 是否必须 | 数据类型 |
| :------- | :------- | :------- | :------- | :------- |
| pageNum  | 当前页码 | query    | true     | integer  |
| pageSize | 每页大小 | query    | true     | integer  |
| aHeathy  | 健康状态 | query    | true     | string   |
| aGender  | 动物性别 | query    | true     | string   |

#### 响应数据

参数格式：application/json

```json
{
  "code": 200,
  "message": "操作成功",
  "data": {
    "total": 9,
    "list": [
      {
        "aAnimalId": "0a4c5c17a4014232924ba1d4a1a00aa3",
        "aWeight": "18",
        "aGender": "雌性",
        "aHealthy": "健康",
        "aStatus": "养殖中",
        "aInoculate": "未接种",
        "aTime": "2022-11-01",
        "aBatchId": "977377d225ff484c8410c0f18db28ed0",
        "aHurdlesId": "8e4766be9bc1437d920458793ecf1f6d",
        "managerHurdles": "育成1号圈",
        "managerFenceHouse": "育成舍",
        "aBackup3": "http://121.224.77.1:9527/group1/M00/00/02/rBBkoGSlNgGARCX9AABzil0b0MA479.jpg",
        "managerBatch": {
          "bSerialId": "977377d225ff484c8410c0f18db28ed0",
          "bDesc": "2023年4月第二批次",
          "bQuarantine": "未检疫",
          "bQualified": "",
          "bTime": "2023-04-20"
        }
      }
    ],
    "pageNum": 1,
    "pageSize": 1,
    "size": 1,
    "startRow": 1,
    "endRow": 1,
    "pages": 9,
    "prePage": 0,
    "nextPage": 2,
    "isFirstPage": true,
    "isLastPage": false,
    "hasPreviousPage": false,
    "hasNextPage": true,
    "navigatePages": 8,
    "navigatepageNums": [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8
    ],
    "navigateFirstPage": 1,
    "navigateLastPage": 8
  }
}
```

### 查询所有未禁用以及未满的栏圈

#### 页面效果

![image-20231112190734192](E:\github\Demo\SmartFarming_management\ReadMe_img\image-20231112190734192.png)

#### 接口规范

> 请求路径：/hurdle/queryAllEnable
>
> 请求方式：GET
>
> 接口描述：
>
> 此接口用于查询所有未禁用以及未满的栏圈信息

#### 请求参数

无

#### 响应数据

参数格式：application/json

```json
{
  "code": 200,
  "message": "操作成功",
  "data": [
    {
      "hId": "4a1faf8f29d24766bc0be1a304615e04",
      "hName": "隔离2号圈",
      "hDesc": "隔离2号圈描述",
      "hMax": 30,
      "hSaved": 0,
      "hTime": "2022-04-13 06:36:55",
      "hEnable": "可用",
      "hFull": "未满",
      "hFenceId": "12e4f043910a4b7a9ad933f90fec620c"
    },
    {
      "hId": "6a82f8b27eab4b908f50ec6f090dcd20",
      "hName": "育成4号圈",
      "hDesc": "育成4号圈描述",
      "hMax": 40,
      "hSaved": 0,
      "hTime": "2022-04-13 06:37:04",
      "hEnable": "可用",
      "hFull": "未满",
      "hFenceId": "851d58388f974d95b6c67d93189b7222"
    },
    ……
  ]
}
```

### 添加/修改动物

#### 页面效果

![image-20231112190810060](E:\github\Demo\SmartFarming_management\ReadMe_img\image-20231112190810060.png)

![image-20231112190840457](E:\github\Demo\SmartFarming_management\ReadMe_img\image-20231112190840457.png)

#### 接口规范

> 请求路径：/animal/saveOrUpdate
>
> 请求方式：POST
>
> 接口描述：
>
> 此接口用于新增或修改动物信息，分为下面两种情况：
>
> 请求参数中包含动物ID，修改操作
>
> 请求体中不包含动物ID，新增操作
>
> 注意：
>
> 无论新增或者修改，初始体重、性别、健康状态、疫苗接种状态、所属批次、所属栏圈和购入时间不能为空。
>
> 添加时要根据传入的批次的检疫状态设置动物的过程状态，如果批次的检疫状态为未检疫，则动物的过程状态为养殖中；如果批次的检疫状态为已检疫，则动物的过程状态为已检疫。添加成功后，需要修改栏圈的已存数量，并根据当前数量判断栏圈是否已满，如果栏圈已满，需要修改栏圈的状态。
>
> 修改时需要先判断该动物是否存在，如果存在，则执行修改操作。修改成功后，需要判断是否修改了栏圈，如果修改了栏圈，则原栏圈的已存数量-1，新栏圈的已存数量+1，如果原栏圈为已满状态，需修改状态为未满；如果新栏圈已存数量已满，需修改状态为已满

#### 请求参数

参数格式：application/json

```json
{
  "aAnimalId": "39f14f227a02404590de5cee7583c093",  //动物编号
  "aBatchId": "ffb95f211b874a778844857ff1e5141f",	//批次编号
  "aGender": "雄性",								   //动物性别
  "aHealthy": "健康",								   //动物健康状态
  "aHurdlesId": "e821e1725e12474c870e2342a30e0e94", //栏圈编号
  "aInoculate": "已接种",							  //动物疫苗接种状态
  "aTime": "2023-08-18 00:00:00",					//购入时间
  "aWeight": "30"									//初始体重
}
```

#### 响应数据

参数格式：application/json

```json
{
  "code": 200,
  "message": "操作成功",
  "data": null
}
```

#### 功能实现

controller层

```java
package com.briup.product_source.controller;

@Api(tags = "动物管理模块")
@RestController
@RequestMapping("/animal")
public class AnimalController {
    @Autowired
    private ManagerAnimalService managerAnimalService;

    @ApiOperation("新增或修改动物接口")
    @PostMapping("/saveOrUpdate")
    public Result reviseAnimalInfo(@RequestBody ManagerAnimal animal) {
        managerAnimalService.saveOrUpdate(animal);
        return Result.success();
    }
}
```

service层

```java
package com.briup.product_source.service.impl;

@Service
public class ManagerAnimalServiceImpl implements ManagerAnimalService {
    @Autowired
    private ManagerAnimalMapper managerAnimalMapper;

    @Autowired
    private ManagerBatchMapper managerBatchMapper;

    @Autowired
    private ManagerHurdlesMapper managerHurdlesMapper;
    
    @Override
    public void saveOrUpdate(ManagerAnimal animal) {
        String aBatchId = animal.getABatchId(); // 批次编号
        String aHurdlesIdNew = animal.getAHurdlesId(); // 栏圈编号
        // 参数校验
        if (!StringUtils.hasText(animal.getAWeight()) ||
                !StringUtils.hasText(animal.getAGender()) ||
                !StringUtils.hasText(animal.getAHealthy()) ||
                !StringUtils.hasText(animal.getAInoculate()) ||
                !StringUtils.hasText(aBatchId) ||
                !StringUtils.hasText(aHurdlesIdNew) ||
                animal.getATime() == null) {
            throw new ServiceException(ResultCode.PARAM_IS_EMPTY);
        }
        // 根据栏圈编号查询栏圈信息
        ManagerHurdles managerHurdlesNew = managerHurdlesMapper.selectByPrimaryKey(aHurdlesIdNew);
        if (managerHurdlesNew == null) {
            throw new ServiceException(ResultCode.FAIL);
        }
        Integer hSavedNew = managerHurdlesNew.getHSaved(); // 栏圈已存猪的数量
        Integer hMaxNew = managerHurdlesNew.getHMax(); // 栏圈最大容量
        String hFullNew = managerHurdlesNew.getHFull(); // 栏圈是否已满

        // 添加或者修改动物信息
        String aAnimalId = animal.getAAnimalId();
        if(StringUtils.hasText(aAnimalId)){
            // 有id->更新操作
            // 根据id查询动物信息
            ManagerAnimal managerAnimal = managerAnimalMapper.selectByPrimaryKey(aAnimalId);
            if (managerAnimal == null) {
                // 动物不存在
                throw new ServiceException(ResultCode.DATA_IS_EMPTY);
            }
            // 动物存在，修改动物信息
            int result = managerAnimalMapper.updateByPrimaryKey(animal);
            if (result == 0) {
                // 修改失败
                throw new ServiceException(ResultCode.FAIL);
            }
            // 修改成功，判断是否修改了栏圈信息
            String aHurdlesIdOld = managerAnimal.getAHurdlesId();
            ManagerHurdles managerHurdlesOld = managerHurdlesMapper.selectByPrimaryKey(aHurdlesIdOld);
            if (!aHurdlesIdNew.equals(aHurdlesIdOld)) {
                // 修改新的栏圈信息
                managerHurdlesNew.setHSaved(hSavedNew + 1);
                if (hSavedNew + result == hMaxNew) {
                    managerHurdlesNew.setHFull("已满");
                }
                if (managerHurdlesMapper.updateByPrimaryKey(managerHurdlesNew) == 0) {
                    throw new ServiceException(ResultCode.FAIL);
                }

                // 修改老的栏圈信息
                managerHurdlesOld.setHSaved(managerHurdlesOld.getHSaved() - 1);
                if ("已满".equals(managerHurdlesOld.getHFull())) {
                    managerHurdlesOld.setHFull("未满");
                }
                if (managerHurdlesMapper.updateByPrimaryKey(managerHurdlesOld) == 0) {
                    throw new ServiceException(ResultCode.FAIL);
                }
            }
        }else {
            // 无id->新增操作
            // 根据批次编号查询批次信息
            ManagerBatch managerBatch = managerBatchMapper.selectByPrimaryKey(aBatchId);
            if (managerBatch == null) {
                throw new ServiceException(ResultCode.FAIL);
            }
            // 批次存在，根据批次检疫状态，动态设置动物过程状态
            if ("已检疫".equals(managerBatch.getBQuarantine())) {
                animal.setAStatus("已检疫");
            }else {
                animal.setAStatus("养殖中");
            }
            // 执行添加
            animal.setAAnimalId(UUID.randomUUID().toString().replace("-",""));
            int result = managerAnimalMapper.insert(animal);
            if (result == 0) {
                // 添加失败
                throw new ServiceException(ResultCode.FAIL);
            }
            // 添加成功，修改栏圈信息
            managerHurdlesNew.setHSaved(hSavedNew + 1);
            if (hSavedNew + result == hMaxNew) {
                // 栏圈已满，修改h_Full字段
                managerHurdlesNew.setHFull("已满");
            }
            if (managerHurdlesMapper.updateByPrimaryKey(managerHurdlesNew) == 0) {
                throw new ServiceException(ResultCode.FAIL);
            };
        }
    }
}
```

dao层接口以及对应mapper文件

```java
package com.briup.product_source.dao;

@Repository
public interface ManagerAnimalMapper {
    int insert(ManagerAnimal record);
    int updateByPrimaryKey(ManagerAnimal record);
}
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.briup.product_source.dao.ManagerAnimalMapper">
    <!--添加动物信息-->
    <insert id="insert" parameterType="managerAnimal">
        insert into manager_animal (a_animal_id, a_weight, a_gender,
                                    a_healthy, a_status, a_inoculate,
                                    a_time, a_batch_id, a_hurdles_id)
        values (#{aAnimalId}, #{aWeight}, #{aGender},
                #{aHealthy}, #{aStatus}, #{aInoculate},
                #{aTime}, #{aBatchId}, #{aHurdlesId})
    </insert>

    <!--根据编号修改动物信息-->
    <update id="updateByPrimaryKey" parameterType="managerAnimal">
        update manager_animal
        set a_weight     = #{aWeight},
            a_gender     = #{aGender},
            a_healthy    = #{aHealthy},
            a_status     = #{aStatus},
            a_inoculate  = #{aInoculate},
            a_time       = #{aTime},
            a_batch_id   = #{aBatchId},
            a_hurdles_id = #{aHurdlesId}
        where a_animal_id = #{aAnimalId}
    </update>
</mapper>
```

```java
package com.briup.product_source.dao;

@Repository
public interface ManagerAnimalMapper {
    int updateAHealthyByAAnimalId(@Param("aHealthy") String aHealthy,
                                  @Param("aAnimalId") String aAnimalId);
}
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.briup.product_source.dao.ManagerAnimalMapper">
    <!--根据编号修改动物健康状态-->
    <update id="updateAHealthyByAAnimalId">
        update manager_animal
        set a_healthy = #{aHealthy}
        where a_animal_id = #{aAnimalId}
    </update>
</mapper>
```



## 6、数据大屏

### 统计数量信息

#### 页面效果

![image-20231112183712709](E:\github\Demo\SmartFarming_management\ReadMe_img\image-20231112183712709.png)

#### 接口规范

> 请求路径：/analysis/count
>
> 请求方式：GET
>
> 接口描述：
>
> 该接口用于统计栏舍，栏圈，动物，冷库，员工的数量信息在首页大屏进行展示。

#### 请求参数

无

#### 响应数据

参数格式：application/json

响应参数样例：

```json
{
  "code": 200,
  "message": "操作成功",
  "data": {
    "name": [
      "栏舍",
      "栏圈",
      "动物",
      "冷库",
      "员工"
    ],
    "value": [
      3,
      12,
      20,
      6,
      1
    ]
  }
}
```

### 统计动物体重

#### 页面效果

![image-20231112183929851](E:\github\Demo\SmartFarming_management\ReadMe_img\image-20231112183929851.png)

#### 接口规范

> 请求路径：/analysis/indexCount
>
> 请求方式：GET
>
> 接口描述：
>
> 该接口用于统计出动物各个体重区间的动物数量在首页大屏进行展示。

#### 请求参数

无

#### 响应数据

参数格式：application/json

响应参数样例：

```json
{
  "code": 200,
  "message": "操作成功",
  "data": {
    "30以下": 12,
    "50以上": 5,
    "30~50": 3
  }
}
```

### 统计病症数量

#### 页面效果

![image-20231112184017919](E:\github\Demo\SmartFarming_management\ReadMe_img\image-20231112184017919.png)

#### 接口规范

> 请求路径：/analysis/countDisease
>
> 请求方式：GET
>
> 接口描述：
>
> 该接口用于统计出动物各个病症的动物数量在首页大屏进行展示。

#### 请求参数

无

#### 响应数据

参数格式：application/json

响应参数样例：

```json
{
  "code": 200,
  "message": "操作成功",
  "data": {
    "流行性感冒": 13,
    "传染性胃肠炎": 3,
    "维生素A缺乏症": 2
  }
}
```

### 统计年度销量

#### 页面效果

![image-20231112184052311](E:\github\Demo\SmartFarming_management\ReadMe_img\image-20231112184052311.png)

#### 接口规范

> 请求路径：/analysis/countSales
>
> 请求方式：GET
>
> 接口描述：
>
> 该接口用于首页大屏中对本年度动物销售量以曲线图更直观的展示给管理人员。

#### 请求参数

无

#### 响应数据

参数格式：application/json

响应参数样例：

```json
{
  "code": 200,
  "message": "操作成功",
  "data": {
    "name": [
      "1月",
      "2月",
      "3月",
      "4月",
      "5月",
      "6月",
      "7月",
      "8月",
      "9月",
      "10月",
      "11月",
      "12月"
    ],
    "value": [
      2,
      2,
      7,
      2,
      1,
      3,
      0,
      4,
      0,
      0,
      0,
      0
    ]
  }
}
```

