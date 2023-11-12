package com.zyz.product_message.util;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTDecodeException;
import com.auth0.jwt.exceptions.JWTVerificationException;

import java.util.Calendar;
import java.util.Date;
import java.util.Map;

/**
 * @Title: JwtUtil
 * @Author: Daphne
 * @Date: 2023-06-21-20:38
 */

public class JwtUtil {
    /**
     * 过期时间，单位：分钟
     * 但token字符串超时后，无法通过验证
     */
    private static final int EXPIRE_TIME_MINUTE = 60 * 24 * 5;
    /**
     * jwt 密钥
     * 实现对数据的加密操作。通过该字符串对token字符串是否有效验证
     */
    private static final String SECRET = "briup_jwt_secret";

    /**
     * 生成JWT字符串
     *
     * @param userId 用户id
     * @param info   附带的其他信息
     *               Map的value只能存放的值的类型为：Map, List, Boolean, Integer, Long,  Double, String and Date
     *               注意，map的value如果是null的话，也会报错
     * @return jwtToken
     */
    public static String sign(String userId, Map<String, Object> info) {
        try {
            Calendar calendar = Calendar.getInstance();
            calendar.add(Calendar.MINUTE, EXPIRE_TIME_MINUTE);
            Date date = new Date(calendar.getTimeInMillis());
            Algorithm algorithm = Algorithm.HMAC256(SECRET);
            return JWT.create()
                    // 将 user id 保存到 token 里面
                    .withAudience(userId)
                    // 存放自定义数据
                    .withClaim("info", info)
                    // token过期
                    .withExpiresAt(date)
                    // token 的密钥
                    .sign(algorithm);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    /**
     * 根据token获取userId
     *
     * @param token
     * @return
     */
    public static String getUserId(String token) {
        try {
            String userId = JWT.decode(token).getAudience().get(0);
            return userId;
        } catch (JWTDecodeException e) {
            return null;
        }
    }

    /**
     * 根据token获取自定义数据info
     *
     * @param token
     * @return
     */
    public static Map<String, Object> getInfo(String token) {
        try {
            return JWT.decode(token).getClaim("info").asMap();
        } catch (JWTDecodeException e) {
            return null;
        }
    }

    /**
     * 校验token
     * @param token
     * @return
     */
    public static boolean checkSign(String token) throws JWTVerificationException {
        Algorithm algorithm = Algorithm.HMAC256(SECRET);
        JWTVerifier verifier = JWT.require(algorithm)
                .build();
        verifier.verify(token);
        return true;
    }

}
