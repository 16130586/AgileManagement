package nlu.project.backend.middleware;

import com.fasterxml.jackson.databind.ObjectMapper;
import nlu.project.backend.model.response.ApiResponse;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.OutputStream;

public class AccessDeniedHandleException implements AccessDeniedHandler {
    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException accessDeniedException) throws IOException, ServletException {
        try{
            response.setStatus(403);
            response.getWriter().println("Access denied!");
            response.flushBuffer();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (Exception e){
            throw e;
        }
    }
}
