package nlu.project.backend.interceptor;

import com.auth0.jwt.interfaces.DecodedJWT;
import nlu.project.backend.exception.custom.UnauthorizedException;
import nlu.project.backend.jwt.JwtProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class CheckLoginInterceptor extends HandlerInterceptorAdapter {
    @Autowired
    JwtProvider jwtProvider;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String token = request.getHeader("Authorization");
        if (token == null)
            throw new UnauthorizedException("Unauthorized!");
        DecodedJWT decodedJWT = jwtProvider.validateToken(token);
        request.setAttribute("username", jwtProvider.getUserNameFromJWT(decodedJWT));
        return true;
    }
}
