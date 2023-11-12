package com.zyz.product_message.intrerceptor;

import com.auth0.jwt.exceptions.TokenExpiredException;
import com.zyz.product_message.exception.ServiceException;
import com.zyz.product_message.result.ResultCode;
import com.zyz.product_message.util.JwtUtil;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Component
public class JwtInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        // 当请求方式预检请求时，不需要进行token验证
        String method = request.getMethod();
        if(method.equals("OPTIONS")){
            return true;//通过拦截
        }

        // 1.获取请求头信息token
        String token = request.getHeader("token");

        // 2.对token字符串进行验证
        if(token == null) {  //直接浏览器访问，没有token
            throw new ServiceException(ResultCode.USER_NOT_LOGIN);
        }
        // 当提交了token
        try {
            JwtUtil.checkSign(token);
        }catch (Exception ex) {
            // 扩展：可以根据不同的异常类型 提供用户不同的错误内容
            if(ex instanceof TokenExpiredException) {
                throw new ServiceException(ResultCode.TOKEN_TIMEOUT);
            }
            // 添加多个类型的异常判断
            throw new ServiceException(ResultCode.TOKEN_VALIDATE_ERROR);
        }

        return true;
    }
}
