package com.zyz.product_message.config;

import com.zyz.product_message.intrerceptor.JwtInterceptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Autowired
    private JwtInterceptor jwtInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        // 对swagger的请求不进行拦截
        String[] excludePatterns = new String[]{
                "/animal/findById/**",
                "/profile/**",
                "/common/download**",
                "/common/download/resource**",
                "/swagger-ui.html",
                "/swagger-resources/**",
                "/webjars/**",
                "/*/api-docs",
                "/favicon.ico",
                "/doc.html",
                "/error",
                "/#/qr/**",
                "/static/img/**"
        };
        registry.addInterceptor(jwtInterceptor)
                .addPathPatterns("/**")
                .excludePathPatterns(excludePatterns)
                .excludePathPatterns("/login");
                //.excludePathPatterns("/animal/findByAnimalId/**");
    }
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        //根据HTTP协议规定的预检请求的返回头信息进行设置
        registry.addMapping("/**")// 映射所有路径
//                .allowedOriginPatterns("*")// 运行所有客户端访问
                .allowedOrigins("*")//版本过低，需要将访问信息处理
                //不允许携带cookie
                .allowCredentials(false)
                //支持的方法
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                //运行所有请求头字段
                .allowedHeaders("*")
                //允许客户端缓存“预检请求”中获取的信息，3600秒
                .maxAge(3600);
    }
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
//        后端将自己的图片路径映射过来
        String target="file:E:/StudyDemoArea/SmartFarming_copy/img/";
        registry.addResourceHandler("/static/img/**")
                .addResourceLocations(target);
    }

}
