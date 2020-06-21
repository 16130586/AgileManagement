package nlu.project.backend.middleware;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class AuthenticationEntryPointHandleException implements AuthenticationEntryPoint {
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
        try{
            response.setStatus(401);
            response.getWriter().println("Unauthorised!");
            response.flushBuffer();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (Exception e){
            throw e;
        }
    }
}
