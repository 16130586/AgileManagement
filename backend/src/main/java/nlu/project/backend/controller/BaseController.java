package nlu.project.backend.controller;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
public class BaseController {

    public UserDetails getUser(HttpServletRequest request){
        return (UserDetails) request.getAttribute("user");
    }
}
