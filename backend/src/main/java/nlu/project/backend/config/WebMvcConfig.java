package nlu.project.backend.config;

import nlu.project.backend.interceptor.CheckLoginInterceptor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    @Bean
    CheckLoginInterceptor checkLoginInterceptor() {
        return new CheckLoginInterceptor();
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(checkLoginInterceptor()).addPathPatterns("/**/auth/**");
    }
}
