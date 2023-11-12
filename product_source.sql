/*
Navicat MySQL Data Transfer

Source Server         : root
Source Server Version : 80018
Source Host           : localhost:3306
Source Database       : pig

Target Server Type    : MYSQL
Target Server Version : 80018
File Encoding         : 65001

Date: 2023-11-12 19:31:31
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for base_account
-- ----------------------------
DROP TABLE IF EXISTS `base_account`;
CREATE TABLE `base_account` (
  `account_id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '主键',
  `username` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '用户登录名',
  `realname` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '用户真实名',
  `password` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '密码',
  `photo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '头像照片',
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '邮箱',
  `mobile` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '手机号',
  `status` tinyint(4) NOT NULL DEFAULT '1' COMMENT '状态  0：禁用   1：正常',
  PRIMARY KEY (`account_id`) USING BTREE,
  UNIQUE KEY `username` (`username`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC COMMENT='系统账号表';

-- ----------------------------
-- Records of base_account
-- ----------------------------
INSERT INTO `base_account` VALUES ('4bb4843e-409c-494d-ae15-5d317517ed85', 'admin', '张三', 'admin', 'http://www.qinyc.xyz/2023/05/04/f1e20c780dd14c28b85c044078036cfe.png', 'admin@briup.com', '13734211234', '1');

-- ----------------------------
-- Table structure for base_log
-- ----------------------------
DROP TABLE IF EXISTS `base_log`;
CREATE TABLE `base_log` (
  `log_id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '编号',
  `log_username` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '访问用户账号',
  `log_host` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '访问IP地址',
  `log_realname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '访问用户真实姓名',
  `log_request_method` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '请求的方式，get post delete put',
  `log_request_uri` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '请求的地址',
  `log_time` datetime DEFAULT NULL COMMENT '请求的时间',
  PRIMARY KEY (`log_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='日志信息表';

-- ----------------------------
-- Records of base_log
-- ----------------------------
INSERT INTO `base_log` VALUES ('1', 'admin', '127.0.0.1', '张三', 'GET', '/user', '2023-06-06 21:11:56');
INSERT INTO `base_log` VALUES ('2', 'admin', '192.168.1.1', '张三', 'GET', '/me', '2023-06-05 08:11:56');
INSERT INTO `base_log` VALUES ('3', 'admin', '192.168.1.2', '张三', 'PUT', '/user', '2023-06-05 21:20:56');
INSERT INTO `base_log` VALUES ('4', 'admin', '127.0.0.1', '张三', 'GET', '/me', '2023-06-04 10:11:20');
INSERT INTO `base_log` VALUES ('5', 'admin', '192.168.1.5', '张三', 'POST', '/role', '2023-06-03 21:11:29');
INSERT INTO `base_log` VALUES ('6', 'admin', '127.0.0.1', '张三', 'GET', '/product', '2023-06-01 21:18:19');
INSERT INTO `base_log` VALUES ('7', 'admin', '192.168.1.4', '张三', 'POST', '/hurdles/saveOrUpdate', '2023-06-10 21:21:34');
INSERT INTO `base_log` VALUES ('8', 'admin', '127.0.0.1', '张三', 'DELETE', '/hurdles/deleteByIdAll', '2023-06-11 21:31:27');
INSERT INTO `base_log` VALUES ('9', 'admin', '127.0.0.1', '张三', 'GET', '/hurdles/queryAllMax', '2023-06-15 21:13:09');
INSERT INTO `base_log` VALUES ('10', 'admin', '172.168.1.9', '张三', 'GET', '/hurdles/selectAllHurdles', '2023-06-15 21:21:07');

-- ----------------------------
-- Table structure for disease_record
-- ----------------------------
DROP TABLE IF EXISTS `disease_record`;
CREATE TABLE `disease_record` (
  `dr_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '记录id',
  `dr_animal_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '动物编号',
  `dr_desc` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '症状描述',
  `dr_cure` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '治疗过程描述',
  `dr_time` datetime DEFAULT NULL COMMENT '治疗时间',
  `dr_status` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT ' 未治疗,治疗中,已治疗',
  `dr_d_id` int(11) DEFAULT NULL COMMENT '病症类型id',
  PRIMARY KEY (`dr_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='疾病记录表';

-- ----------------------------
-- Records of disease_record
-- ----------------------------
INSERT INTO `disease_record` VALUES ('11', '192998856dd24f1bbfd1ede2967e8075', '食欲减退，呼吸急促', '已打针吃药，症状明显改善，已经完成治疗', '2022-04-13 15:49:50', '已治疗', '12');
INSERT INTO `disease_record` VALUES ('12', '1f0ffc9dc589403cbb6e51f5fdeaa7f3', '流感病毒引起，食欲减退，呼吸急促', '已经打针，明显改善，已经恢复正常', '2022-04-13 15:59:42', '已治疗', '12');
INSERT INTO `disease_record` VALUES ('13', '29d47c2be6a34fec9dc65858814b79a0', '猪突然呕吐，接着发生剧烈的水样腹泻', '用药，猪舍消毒，情况明显改善，已恢复正常', '2022-04-13 16:17:03', '已治疗', '14');
INSERT INTO `disease_record` VALUES ('14', 'be5ea09dc69940cb8a1fb994c7c165ec', '猪突然呕吐，接着发生剧烈的水样腹泻', '用药，猪舍消毒，情况明显改善，已恢复', '2022-04-13 16:17:03', '已治疗', '14');
INSERT INTO `disease_record` VALUES ('15', 'd35aa78c4f8b40d7bdc0084f21922930', '发烧感冒', '吃药打针', '2022-04-20 16:00:57', '已治疗', '12');
INSERT INTO `disease_record` VALUES ('16', 'cc96f6149af848749e08e5aa521edeba', '缺乏维生素导致', '补充维生素', '2022-05-04 18:46:37', '已治疗', '17');
INSERT INTO `disease_record` VALUES ('17', '600df19c428a40c694a0707957ba20d3', '肠胃问题', '用药', '2022-05-04 19:44:55', '已治疗', '14');
INSERT INTO `disease_record` VALUES ('18', 'f0abd6a068324078a447fd5acf381a02', '缺乏营养导致', '建议补充维生素 多添加青饲料', '2022-05-07 09:54:50', '已治疗', '17');
INSERT INTO `disease_record` VALUES ('19', '83e7d6561a8c4393b5ff0049dbac9c50', '发烧 食欲不振', '打针 吃药', '2022-05-07 10:42:32', '已治疗', '12');
INSERT INTO `disease_record` VALUES ('20', '3b9a9799c258417598ee04782fde33a5', '发烧 感冒', '打针', '2022-05-11 21:36:45', '已治疗', '12');
INSERT INTO `disease_record` VALUES ('21', 'b7225b29fb4a44e8b43d65fe17dc5815', '感染性病毒.', '情况尚可', '2022-06-04 17:21:49', '已治疗', '12');
INSERT INTO `disease_record` VALUES ('22', '4ea8b0b7951347b9b6e6ec1a91f90e19', '感冒发烧', '打针并喂药', '2022-06-05 22:52:31', '已治疗', '12');
INSERT INTO `disease_record` VALUES ('23', '8abe40f492de4a4a84831447fdb50174', '感冒了', '打针吃药', '2022-06-14 10:54:11', '已治疗', '12');
INSERT INTO `disease_record` VALUES ('24', 'caa6b482bbd84db2bd473db13c562330', '发烧感冒引起', '打针 吃药', '2022-06-15 23:23:24', '已治疗', '12');

-- ----------------------------
-- Table structure for index_record
-- ----------------------------
DROP TABLE IF EXISTS `index_record`;
CREATE TABLE `index_record` (
  `ird_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '记录id',
  `ird_weight` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '重量',
  `ird_time` datetime DEFAULT NULL COMMENT '记录时间',
  `ird_healthy` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '是否健康 健康,不健康',
  `ird_temperature` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '体温',
  `ird_breathing` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '呼吸频率',
  `ird_heart_rate` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '心率',
  `ird_animal_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '动物外键',
  PRIMARY KEY (`ird_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='动物指标记录表';

-- ----------------------------
-- Records of index_record
-- ----------------------------
INSERT INTO `index_record` VALUES ('7', '3.5', '2022-04-13 15:24:20', '健康', '36.5', '40', '55', '192998856dd24f1bbfd1ede2967e8075');
INSERT INTO `index_record` VALUES ('8', '3.5', '2022-04-13 15:25:12', '健康', '35', '40', '55', '192998856dd24f1bbfd1ede2967e8075');
INSERT INTO `index_record` VALUES ('9', '3.2', '2022-04-13 15:25:53', '健康', '36.5', '42', '40', '1f0ffc9dc589403cbb6e51f5fdeaa7f3');
INSERT INTO `index_record` VALUES ('10', '3.3', '2022-04-13 15:28:17', '健康', '35.5', '40', '54', '1f0ffc9dc589403cbb6e51f5fdeaa7f3');
INSERT INTO `index_record` VALUES ('11', '3.1', '2022-04-13 15:29:14', '健康', '36', '40', '55', '2796eb63b6b34c9184a962b8fa44898c');
INSERT INTO `index_record` VALUES ('12', '3', '2022-04-13 15:29:46', '健康', '36', '42', '53', '2796eb63b6b34c9184a962b8fa44898c');
INSERT INTO `index_record` VALUES ('13', '3', '2022-04-13 15:29:46', '健康', '36', '43', '55', 'be5ea09dc69940cb8a1fb994c7c165ec');
INSERT INTO `index_record` VALUES ('14', '16', '2022-04-20 15:57:09', '健康', '38.5', '35', '78', 'd35aa78c4f8b40d7bdc0084f21922930');
INSERT INTO `index_record` VALUES ('15', '60', '2022-05-04 18:50:10', '健康', '38.5', '35', '85', '63ed54c8549c46aeb9a853df6d3464c9');
INSERT INTO `index_record` VALUES ('16', '54', '2022-05-04 18:50:42', '健康', '38.6', '38', '78', 'cc96f6149af848749e08e5aa521edeba');
INSERT INTO `index_record` VALUES ('17', '12', '2022-05-04 19:41:53', '健康', '38.5', '37', '78', '08f99ec9ba904f2fba3037667a543f12');
INSERT INTO `index_record` VALUES ('18', '67', '2022-05-04 19:46:27', '健康', '38.5', '78', '36', '600df19c428a40c694a0707957ba20d3');
INSERT INTO `index_record` VALUES ('19', '56', '2022-05-07 09:51:50', '健康', '38.3', '70', '40', '08cd45f67ab044feaa5305e5137ac376');
INSERT INTO `index_record` VALUES ('20', '46', '2022-05-07 09:52:21', '健康', '38.6', '37', '79', 'f0abd6a068324078a447fd5acf381a02');
INSERT INTO `index_record` VALUES ('21', '61', '2022-05-07 09:59:04', '健康', '39', '40', '78', '83e7d6561a8c4393b5ff0049dbac9c50');
INSERT INTO `index_record` VALUES ('22', '10', '2022-06-04 17:18:36', '健康', '36.5', '20', '60', 'b7225b29fb4a44e8b43d65fe17dc5815');
INSERT INTO `index_record` VALUES ('23', '46', '2022-06-05 22:50:15', '健康', '38.4', '40', '78', '24a0eb148f1a4a1cb79cb60ab12328eb');
INSERT INTO `index_record` VALUES ('24', '56', '2022-06-05 22:50:48', '健康', '38.3', '42', '76', '4ea8b0b7951347b9b6e6ec1a91f90e19');
INSERT INTO `index_record` VALUES ('25', '23', '2022-06-14 10:49:38', '健康', '38.2', '38', '87', '7cb446b164e7476f8f9c95f408f899f8');
INSERT INTO `index_record` VALUES ('26', '67', '2022-06-14 10:55:45', '健康', '38.4', '34', '78', '8abe40f492de4a4a84831447fdb50174');
INSERT INTO `index_record` VALUES ('27', '56', '2022-06-15 23:07:54', '健康', '38.4', '38', '78', 'caa6b482bbd84db2bd473db13c562330');
INSERT INTO `index_record` VALUES ('28', '30', '2023-02-06 12:06:15', '健康', '35', '70', '98', '000cec87a71d41cebf0eabf38f6054f4');

-- ----------------------------
-- Table structure for issue_record
-- ----------------------------
DROP TABLE IF EXISTS `issue_record`;
CREATE TABLE `issue_record` (
  `isr_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '记录id',
  `isr_time` datetime DEFAULT NULL COMMENT '出单时间',
  `isr_num` int(11) DEFAULT NULL COMMENT '购买数量',
  `isr_price` double DEFAULT NULL COMMENT '单价',
  `isr_deliver` datetime DEFAULT NULL COMMENT '交付时间',
  `isr_status` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '申请中,已出库,已完成',
  `isr_customer_id` int(11) DEFAULT NULL COMMENT '客户id',
  PRIMARY KEY (`isr_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='出单记录表';

-- ----------------------------
-- Records of issue_record
-- ----------------------------
INSERT INTO `issue_record` VALUES ('10', '2023-06-23 16:29:10', '3', '10', '2023-06-23 16:29:10', '已完成', '7');
INSERT INTO `issue_record` VALUES ('11', '2023-05-01 16:07:23', '1', '12', '2023-05-01 16:07:23', '已完成', '10');
INSERT INTO `issue_record` VALUES ('12', '2023-04-01 18:53:36', '2', '13', '2023-04-01 18:53:36', '已完成', '12');
INSERT INTO `issue_record` VALUES ('13', '2023-03-03 19:48:34', '2', '14', '2023-03-03 19:48:34', '已完成', '10');
INSERT INTO `issue_record` VALUES ('15', '2023-03-19 10:47:41', '2', '14', '2023-03-19 10:47:41', '已完成', '7');
INSERT INTO `issue_record` VALUES ('17', '2023-03-10 21:41:28', '2', '12', '2023-03-10 21:41:28', '已完成', '11');
INSERT INTO `issue_record` VALUES ('19', '2023-03-01 22:56:47', '1', '12', '2023-03-01 22:56:47', '已完成', '7');
INSERT INTO `issue_record` VALUES ('20', '2023-02-25 23:08:50', '1', '11', '2023-02-25 23:08:50', '已完成', '8');
INSERT INTO `issue_record` VALUES ('21', '2023-02-17 10:58:11', '1', '13', '2023-02-17 10:58:11', '已完成', '8');
INSERT INTO `issue_record` VALUES ('22', '2023-01-26 11:02:04', '1', '14', '2023-01-26 11:02:04', '已完成', '11');
INSERT INTO `issue_record` VALUES ('23', '2023-01-07 23:57:47', '1', '13', '2023-01-07 23:57:47', '已完成', '8');
INSERT INTO `issue_record` VALUES ('24', '2022-11-17 11:27:47', '2', '13', '2022-11-01 11:27:22', '已完成', '8');
INSERT INTO `issue_record` VALUES ('25', '2023-09-01 12:34:27', '4', '13', '2023-09-01 12:34:46', '已完成', '11');

-- ----------------------------
-- Table structure for manager_animal
-- ----------------------------
DROP TABLE IF EXISTS `manager_animal`;
CREATE TABLE `manager_animal` (
  `a_animal_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '动物编号',
  `a_weight` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '动物体重',
  `a_gender` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '动物性别,雌性，雄性',
  `a_healthy` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '健康状态,健康,生病',
  `a_status` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '过程状态,养殖中，已检疫，已出栏，已屠宰，已入库，已销售',
  `a_inoculate` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '疫苗接种状态未接种,已接种',
  `a_time` datetime DEFAULT NULL COMMENT '录入时间',
  `a_batch_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '批次外键',
  `a_hurdles_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '栏圈外键',
  PRIMARY KEY (`a_animal_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='动物信息表';

-- ----------------------------
-- Records of manager_animal
-- ----------------------------
INSERT INTO `manager_animal` VALUES ('000cec87a71d41cebf0eabf38f6054f4', '30', '雄性', '健康', '养殖中', '未接种', '2023-02-03 15:47:44', 'f15334d5847c47cd9c0c3c2ade0846aa', 'd7bde20698344aedb8e1d8c1e08b35e1');
INSERT INTO `manager_animal` VALUES ('0a4c5c17a4014232924ba1d4a1a00aa3', '18', '雌性', '健康', '养殖中', '未接种', '2022-11-01 19:39:10', '977377d225ff484c8410c0f18db28ed0', '8e4766be9bc1437d920458793ecf1f6d');
INSERT INTO `manager_animal` VALUES ('1335514f030e4c73931fd6422959934a', '15', '雌性', '健康', '养殖中', '已接种', '2022-06-14 11:04:30', '920d3d09c01542a987d1ab367526bc06', 'db29118f0c7442699d328a24bccf0c9b');
INSERT INTO `manager_animal` VALUES ('192998856dd24f1bbfd1ede2967e8075', '3.5', '雄性', '健康', '养殖中', '已接种', '2022-04-13 15:08:12', '67182782d61e452184e9004f9ed3072f', '6a82f8b27eab4b908f50ec6f090dcd20');
INSERT INTO `manager_animal` VALUES ('24a0eb148f1a4a1cb79cb60ab12328eb', '46', '雄性', '健康', '已检疫', '未接种', '2022-06-05 00:00:00', '1504f25bb8c4401cbce2a06dfe8a5c51', '4a1faf8f29d24766bc0be1a304615e04');
INSERT INTO `manager_animal` VALUES ('29d47c2be6a34fec9dc65858814b79a0', '2', '雌性', '健康', '养殖中', '未接种', '2022-04-13 15:07:44', '67182782d61e452184e9004f9ed3072f', '6a82f8b27eab4b908f50ec6f090dcd20');
INSERT INTO `manager_animal` VALUES ('4dbf30597c6649bcb9e09d189f9e6017', 'sa', '雌性', '生病', '已检疫', '已接种', '2023-11-13 00:00:00', '1504f25bb8c4401cbce2a06dfe8a5c51', '6a82f8b27eab4b908f50ec6f090dcd20');
INSERT INTO `manager_animal` VALUES ('4ea8b0b7951347b9b6e6ec1a91f90e19', '56', '雌性', '健康', '已销售', '已接种', '2022-06-05 22:48:33', '1504f25bb8c4401cbce2a06dfe8a5c51', '8e4766be9bc1437d920458793ecf1f6d');
INSERT INTO `manager_animal` VALUES ('5cb9434493554c0f8f78386f35dfae0c', '3', '雌性', '健康', '已检疫', '未接种', '2022-03-01 00:00:00', '43cc01922ea04cc594804d34484ea04d', 'd7bde20698344aedb8e1d8c1e08b35e1');
INSERT INTO `manager_animal` VALUES ('7cb446b164e7476f8f9c95f408f899f8', '23', '雌性', '健康', '已检疫', '未接种', '2022-06-13 17:40:52', 'b4ae796ab47c432c8876facace20cf3e', 'db29118f0c7442699d328a24bccf0c9b');
INSERT INTO `manager_animal` VALUES ('8860e681f2424128a61463e0fa8bd0d5', '20', '雄性', '健康', '养殖中', '未接种', '2022-11-01 19:39:32', '977377d225ff484c8410c0f18db28ed0', '8e4766be9bc1437d920458793ecf1f6d');
INSERT INTO `manager_animal` VALUES ('8abe40f492de4a4a84831447fdb50174', '67', '雄性', '健康', '已检疫', '已接种', '2022-06-13 17:40:33', 'b4ae796ab47c432c8876facace20cf3e', 'db29118f0c7442699d328a24bccf0c9b');
INSERT INTO `manager_animal` VALUES ('bbf9c217da1d44b69c5d50bff4e8252f', '54', '雄性', '健康', '养殖中', '未接种', '2022-04-13 15:08:37', '67182782d61e452184e9004f9ed3072f', '6a82f8b27eab4b908f50ec6f090dcd20');
INSERT INTO `manager_animal` VALUES ('be5ea09dc69940cb8a1fb994c7c165ec', '22.22', '雌性', '健康', '已销售', '未接种', '2022-04-25 00:00:00', '244f840f31484313a1c3faf5b2882dc4', '8e4766be9bc1437d920458793ecf1f6d');
INSERT INTO `manager_animal` VALUES ('caa6b482bbd84db2bd473db13c562330', '56', '雌性', '生病', '已销售', '已接种', '2022-06-15 22:49:34', '43cc01922ea04cc594804d34484ea04d', '8e4766be9bc1437d920458793ecf1f6d');
INSERT INTO `manager_animal` VALUES ('dd8916643ea846689e2bbbae06639951', '24', '雌性', '健康', '已销售', '未接种', '2022-04-13 15:04:04', '244f840f31484313a1c3faf5b2882dc4', '8e4766be9bc1437d920458793ecf1f6d');
INSERT INTO `manager_animal` VALUES ('f07b0601439d41daa382613c0d199144', '47', '雌性', '健康', '养殖中', '未接种', '2022-04-13 15:07:21', '67182782d61e452184e9004f9ed3072f', '6a82f8b27eab4b908f50ec6f090dcd20');
INSERT INTO `manager_animal` VALUES ('f43580fc974a47969d6a371bcee27710', '61', '雄性', '健康', '已销售', '未接种', '2022-04-13 15:02:22', '244f840f31484313a1c3faf5b2882dc4', '8e4766be9bc1437d920458793ecf1f6d');
INSERT INTO `manager_animal` VALUES ('f998de73184a41d4a0a4929095db6e4d', '16', '雄性', '健康', '养殖中', '未接种', '2022-06-14 11:04:46', '920d3d09c01542a987d1ab367526bc06', 'db29118f0c7442699d328a24bccf0c9b');

-- ----------------------------
-- Table structure for manager_batch
-- ----------------------------
DROP TABLE IF EXISTS `manager_batch`;
CREATE TABLE `manager_batch` (
  `b_serial_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '批次编号',
  `b_desc` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '批次描述',
  `b_quarantine` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '检疫状态,未检疫已检疫',
  `b_qualified` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '检疫合格状态,合格不合格',
  `b_time` datetime DEFAULT NULL COMMENT '批次时间',
  PRIMARY KEY (`b_serial_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of manager_batch
-- ----------------------------
INSERT INTO `manager_batch` VALUES ('1504f25bb8c4401cbce2a06dfe8a5c51', '2022年6月第一批次', '已检疫', '合格', '2022-06-05 22:47:28');
INSERT INTO `manager_batch` VALUES ('244f840f31484313a1c3faf5b2882dc4', '2022年4月第三批次', '已检疫', '合格', '2022-04-13 14:40:30');
INSERT INTO `manager_batch` VALUES ('43cc01922ea04cc594804d34484ea04d', '2022年6月第三批次', '已检疫', '合格', '2022-06-15 22:46:22');
INSERT INTO `manager_batch` VALUES ('67182782d61e452184e9004f9ed3072f', '2022年3月第一批次', '已检疫', '合格', '2022-04-13 14:39:53');
INSERT INTO `manager_batch` VALUES ('920d3d09c01542a987d1ab367526bc06', '2022年7月第一批次', '未检疫', '合格', '2022-06-14 11:04:03');
INSERT INTO `manager_batch` VALUES ('977377d225ff484c8410c0f18db28ed0', '2022年11月第一批次', '已检疫', '合格', '2022-11-01 19:38:44');
INSERT INTO `manager_batch` VALUES ('b4ae796ab47c432c8876facace20cf3e', '2022年6月第二批', '已检疫', '合格', '2022-06-13 17:39:31');
INSERT INTO `manager_batch` VALUES ('f15334d5847c47cd9c0c3c2ade0846aa', '2023年第一批次优良肉猪', '未检疫', '合格', '2023-02-03 15:45:38');
INSERT INTO `manager_batch` VALUES ('ffb95f211b874a778844857ff1e5141f', '2022年5月份第二批', '已检疫', '合格', '2022-05-07 09:44:44');

-- ----------------------------
-- Table structure for manager_disease
-- ----------------------------
DROP TABLE IF EXISTS `manager_disease`;
CREATE TABLE `manager_disease` (
  `d_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '病症id',
  `d_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '病症名称',
  `d_desc` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '病症描述',
  `d_type` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '病症类型',
  `d_etiology` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '病源',
  `d_symptom` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '症状',
  `d_prevention` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '预防方式',
  PRIMARY KEY (`d_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='疾病类型表';

-- ----------------------------
-- Records of manager_disease
-- ----------------------------
INSERT INTO `manager_disease` VALUES ('12', '流行性感冒', '流行性感冒是由流感病毒引起的一种急性、热性、高度接触性传染病', '普通病症', '流感病毒引起', '食欲减退，呼吸急促，喷嚏咳嗽', '保持卫生清洁干燥，定期驱虫等');
INSERT INTO `manager_disease` VALUES ('14', '传染性胃肠炎', '传染性胃肠炎是有猪传染性胃肠炎病毒引起的急性、高度接触性传染病', '普通病症', '猪传染性胃肠炎病毒', '猪突然呕吐，接着发生剧烈的水样腹泻，粪便为黄绿色或灰色。有时是白色，并含有凝乳块，发恶臭', '提倡自繁自育，不从疫区引进猪，如果发现病猪，立即隔离，用百分之3氢氧化钠或者百分之20石灰水消毒猪栏、场地、用具');
INSERT INTO `manager_disease` VALUES ('15', '猪瘟', '猪瘟是由猪瘟病毒引起的一种急性、热性、拜血性传染病', '瘟疫', '猪瘟病毒', '突然发病，高热，稽留，体温能达到41度，全身痉挛，四肢抽搐，皮肤有点出血，快速死亡', '用猪瘟疫苗按免疫程序做预防注射，对新引进的猪必须坚持补防');
INSERT INTO `manager_disease` VALUES ('16', '咬尾巴', '小猪尾巴被咬掉', '意外损伤', '小猪咬别的猪的尾巴', '尾巴被咬掉', '小猪缺少维生素，在饲料里添加些许食用盐即可');
INSERT INTO `manager_disease` VALUES ('17', '维生素A缺乏症', '维生素A缺乏症就是指猪体内维生素A缺乏而引起的一种营养代谢病', '发育不良', '猪体内缺乏维生素A', '生长缓慢、夜盲症、消化不良、免疫力降低、生产繁殖功能下降', '饲料中额外补充维生素A');

-- ----------------------------
-- Table structure for manager_fence_house
-- ----------------------------
DROP TABLE IF EXISTS `manager_fence_house`;
CREATE TABLE `manager_fence_house` (
  `fh_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '栏舍id',
  `fh_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '栏舍名称',
  `fh_desc` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '栏舍描述',
  `fh_time` datetime DEFAULT NULL COMMENT '栏舍创建时间',
  PRIMARY KEY (`fh_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='栏舍信息表';

-- ----------------------------
-- Records of manager_fence_house
-- ----------------------------
INSERT INTO `manager_fence_house` VALUES ('12e4f043910a4b7a9ad933f90fec620c', '隔离舍', '隔离病猪', '2022-04-13 00:00:00');
INSERT INTO `manager_fence_house` VALUES ('72373530507043e199ce61f9507c0d1c', '打完', '上去1', '2023-11-09 00:00:00');
INSERT INTO `manager_fence_house` VALUES ('851d58388f974d95b6c67d93189b7222', '育成舍', '即猪舍内圈与圈间以0.8～1.0米高的实体墙相隔，沿通道正面用栅栏。其集中了实体猪栏、栅栏式猪栏两者的优点，适于大小猪场。', '2022-04-13 00:00:00');
INSERT INTO `manager_fence_house` VALUES ('caa98b63d1e64ec981cbfaa807931518', '保育舍', '用于4～10周龄的断奶仔猪，结构同高床产仔栏的地板和围栏，高度0.6米，离地20～40厘米，占地小，便于管理', '2022-04-13 00:00:00');
INSERT INTO `manager_fence_house` VALUES ('de5541829002491c9aba01c305b2908f', 'eq12qd', null, '2023-11-08 00:00:00');

-- ----------------------------
-- Table structure for manager_freezer
-- ----------------------------
DROP TABLE IF EXISTS `manager_freezer`;
CREATE TABLE `manager_freezer` (
  `fz_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '冷库id',
  `fz_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '冷库名称',
  `fz_num` int(11) DEFAULT NULL COMMENT '冷库总量',
  `fz_area` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '冷库面积',
  `fz_quantity` int(10) unsigned DEFAULT NULL COMMENT '冷库以存量',
  `fz_temperature` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '冷库最佳温度',
  `fz_humidity` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '冷库最佳湿度',
  PRIMARY KEY (`fz_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='冷库信息表';

-- ----------------------------
-- Records of manager_freezer
-- ----------------------------
INSERT INTO `manager_freezer` VALUES ('7', '1号冷库', '50', '100', '0', '-1', '70');
INSERT INTO `manager_freezer` VALUES ('8', '2号冷库', '50', '100', '0', '-1', '70');
INSERT INTO `manager_freezer` VALUES ('9', '3号冷库', '50', '100', '0', '-2', '70');
INSERT INTO `manager_freezer` VALUES ('10', '4号冷库', '80', '200', '0', '-2', '80');
INSERT INTO `manager_freezer` VALUES ('11', '5号冷库', '80', '200', '0', '0', '80');
INSERT INTO `manager_freezer` VALUES ('12', '6号冷库', '80', '200', '0', '0', '80');

-- ----------------------------
-- Table structure for manager_hurdles
-- ----------------------------
DROP TABLE IF EXISTS `manager_hurdles`;
CREATE TABLE `manager_hurdles` (
  `h_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '栏圈id',
  `h_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '栏圈名称',
  `h_desc` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '栏圈描述',
  `h_max` int(10) unsigned NOT NULL COMMENT '栏圈存储猪容量',
  `h_saved` int(10) unsigned NOT NULL COMMENT '栏圈存储猪已存数量',
  `h_time` datetime DEFAULT NULL COMMENT '创建时间',
  `h_enable` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '状态(可用禁用)',
  `h_full` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '状态(未满已满)',
  `h_fence_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '栏舍id外键',
  PRIMARY KEY (`h_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='栏圈信息表';

-- ----------------------------
-- Records of manager_hurdles
-- ----------------------------
INSERT INTO `manager_hurdles` VALUES ('429b226d6f7e43339841b44875c672f7', '隔离3号圈', '隔离3号圈描述', '30', '0', '2022-04-13 06:37:30', '禁用', '未满', '12e4f043910a4b7a9ad933f90fec620c');
INSERT INTO `manager_hurdles` VALUES ('4a1faf8f29d24766bc0be1a304615e04', '隔离2号圈', '隔离2号圈描述', '30', '1', '2022-04-13 06:36:55', '可用', '未满', '12e4f043910a4b7a9ad933f90fec620c');
INSERT INTO `manager_hurdles` VALUES ('6a82f8b27eab4b908f50ec6f090dcd20', '育成4号圈', '育成4号圈描述', '30', '1', '2022-04-13 06:37:04', '可用', '未满', '851d58388f974d95b6c67d93189b7222');
INSERT INTO `manager_hurdles` VALUES ('6fc69bcd72564d5d83a0f571dbf14c1b', '育成3号圈', '育成3号圈描述', '30', '0', '2022-04-13 06:36:37', '可用', '未满', '851d58388f974d95b6c67d93189b7222');
INSERT INTO `manager_hurdles` VALUES ('8e4766be9bc1437d920458793ecf1f6d', '育成1号圈', '育成1号圈描述', '30', '5', '2022-04-13 06:35:04', '可用', '未满', '851d58388f974d95b6c67d93189b7222');
INSERT INTO `manager_hurdles` VALUES ('94fcd94d9f544e1dbf8002d131d04256', '保育3号圈', '保育3号圈描述', '30', '2', '2022-04-13 06:34:25', '可用', '未满', 'caa98b63d1e64ec981cbfaa807931518');
INSERT INTO `manager_hurdles` VALUES ('d7bde20698344aedb8e1d8c1e08b35e1', '保育1号圈', '保育1号圈描述', '30', '9', '2022-04-13 06:31:55', '可用', '未满', 'caa98b63d1e64ec981cbfaa807931518');
INSERT INTO `manager_hurdles` VALUES ('d90594c0b0ae4dda92d779175665109f', '隔离1号圈', '隔离1号圈描述', '30', '0', '2022-04-13 06:36:20', '可用', '未满', '12e4f043910a4b7a9ad933f90fec620c');
INSERT INTO `manager_hurdles` VALUES ('db29118f0c7442699d328a24bccf0c9b', '育成2号圈', '育成2号圈描述', '30', '2', '2022-04-13 06:36:09', '可用', '未满', '851d58388f974d95b6c67d93189b7222');
INSERT INTO `manager_hurdles` VALUES ('e821e1725e12474c870e2342a30e0e94', '保育2号圈', '保育2号圈描述', '30', '1', '2022-04-13 06:33:54', '可用', '未满', 'caa98b63d1e64ec981cbfaa807931518');

-- ----------------------------
-- Table structure for manager_qrcode
-- ----------------------------
DROP TABLE IF EXISTS `manager_qrcode`;
CREATE TABLE `manager_qrcode` (
  `q_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `q_animal_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '动物编号',
  `q_image_url` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '二维码图片地址',
  PRIMARY KEY (`q_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=84 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='溯源二维码信息表';

-- ----------------------------
-- Records of manager_qrcode
-- ----------------------------
INSERT INTO `manager_qrcode` VALUES ('77', '0a4c5c17a4014232924ba1d4a1a00aa3', 'http://192.168.1.7:9999/static/img/436dcad2-8b90-4d72-bbc0-b845fa42b18c.jpg');
INSERT INTO `manager_qrcode` VALUES ('78', '29d47c2be6a34fec9dc65858814b79a0', 'http://192.168.1.7:9999/static/img/fd093cd6-d7e0-46ee-b45b-00ca94a1adc2.jpg');
INSERT INTO `manager_qrcode` VALUES ('79', '000cec87a71d41cebf0eabf38f6054f4', 'http://192.168.1.7:9999/static/img/f9213724301c42578011cd9d8ee8d85c.jpg');
INSERT INTO `manager_qrcode` VALUES ('80', '24a0eb148f1a4a1cb79cb60ab12328eb', 'http://192.168.1.7:9999/static/img/414cbb37873340d689f6ed23d7dcf363.jpg');
INSERT INTO `manager_qrcode` VALUES ('81', '4dbf30597c6649bcb9e09d189f9e6017', 'http://192.168.1.7:9999/static/img/b680da0ff5064d0eaea7cdd728abf63e.jpg');
INSERT INTO `manager_qrcode` VALUES ('82', '192998856dd24f1bbfd1ede2967e8075', 'http://192.168.1.7:9999/static/img/c77959c905cb4a9e9fbe3c1b26712bb5.jpg');
INSERT INTO `manager_qrcode` VALUES ('83', '1335514f030e4c73931fd6422959934a', 'http://192.168.1.7:9999/static/img/bad5c62a472744cdaeaddb6c2071c024.jpg');

-- ----------------------------
-- Table structure for quarantine_registration
-- ----------------------------
DROP TABLE IF EXISTS `quarantine_registration`;
CREATE TABLE `quarantine_registration` (
  `gr_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '记录id',
  `gr_time` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '检疫时间',
  `gr_img` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '检疫证明图片',
  `gr_mechanism` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '检疫机构',
  `gr_batch_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '批次id',
  `b_qualified` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '不合格' COMMENT '检疫结果',
  PRIMARY KEY (`gr_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='检疫登记';

-- ----------------------------
-- Records of quarantine_registration
-- ----------------------------
INSERT INTO `quarantine_registration` VALUES ('12', '2022-05-04 19:47:00', 'https://ts1.cn.mm.bing.net/th/id/R-C.d8473160d08920b85e2be6f96e497b8e?rik=F1OLDTBEmlID6g&riu=http%3a%2f%2fpic3.nipic.com%2f20090714%2f2508271_230411002_2.jpg&ehk=lX2mfLBCM1qatHwbFJnDgw50rQA36SfZJzA%2b%2fkqYfsE%3d&risl=&pid=ImgRaw&r=0', '防疫站', '36bbbeb5836e43de80c15401d206b5ce', '合格');
INSERT INTO `quarantine_registration` VALUES ('13', '2022-05-07 10:45:51', 'https://ts1.cn.mm.bing.net/th/id/R-C.d8473160d08920b85e2be6f96e497b8e?rik=F1OLDTBEmlID6g&riu=http%3a%2f%2fpic3.nipic.com%2f20090714%2f2508271_230411002_2.jpg&ehk=lX2mfLBCM1qatHwbFJnDgw50rQA36SfZJzA%2b%2fkqYfsE%3d&risl=&pid=ImgRaw&r=0', '防疫站', 'ffb95f211b874a778844857ff1e5141f', '合格');
INSERT INTO `quarantine_registration` VALUES ('14', '2022-05-11 21:39:36', 'https://img0.baidu.com/it/u=2263257828,2950842781&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=510', '防疫站', '75fa8762d655461ab90799a20ae282af', '合格');
INSERT INTO `quarantine_registration` VALUES ('15', '2022-06-05 11:18:44', 'http://121.224.77.1:9527/image/BBkoGKcII2AM6V7AARGBhJL29M790.png', '防疫站', '8c20589409c74576b175c4abd0517c3d', '合格');
INSERT INTO `quarantine_registration` VALUES ('16', '2022-06-05 11:24:12', 'http://121.224.77.1:9527/image/BBkoGKcIdmARdQvAARGBhJL29M141.png', '防疫站', '31ef98f536214865a72a774085fa775a', '合格');
INSERT INTO `quarantine_registration` VALUES ('17', '2022-06-05 22:53:56', 'http://121.224.77.1:9527/image/BBkoGNhBlSAJM80AAIURB0YdgQ991.png', '市防疫站', '1504f25bb8c4401cbce2a06dfe8a5c51', '合格');
INSERT INTO `quarantine_registration` VALUES ('19', '2022-06-15 23:36:51', 'http://127.0.0.1:8082/image/e13de6e7-0a8a-44da-af42-49119ad8c4a4-11.jpg', '市防疫站', '43cc01922ea04cc594804d34484ea04d', '合格');
INSERT INTO `quarantine_registration` VALUES ('21', '2023-06-26 23:44:55', 'http://127.0.0.1:8082/image/a4942306-936a-417a-9629-1285cf86a236-12.jpg', '奥利给', '1504f25bb8c4401cbce2a06dfe8a5c51', '合格');
INSERT INTO `quarantine_registration` VALUES ('22', '2023-11-25 00:00:00', 'https://img1.baidu.com/it/u=4049022245,514596079&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500', '防疫站', '67182782d61e452184e9004f9ed3072f', '合格');
INSERT INTO `quarantine_registration` VALUES ('23', '2023-11-29 00:00:00', 'awqrewqr', 'dwa', '977377d225ff484c8410c0f18db28ed0', '合格');
