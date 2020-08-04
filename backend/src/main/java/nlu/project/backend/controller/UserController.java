package nlu.project.backend.controller;

import nlu.project.backend.business.UserBusiness;
import nlu.project.backend.entry.ValidateTokenParams;
import nlu.project.backend.entry.project.GroupParams;
import nlu.project.backend.entry.user.LoginParams;
import nlu.project.backend.entry.user.RegistryParams;
import nlu.project.backend.model.Group;
import nlu.project.backend.model.User;
import nlu.project.backend.model.response.ApiResponse;
import nlu.project.backend.model.security.CustomUserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    UserBusiness userBusiness;
    @PostMapping("/registry")
    public ApiResponse registry( @RequestBody RegistryParams registryParams) {
        Object registryResult = userBusiness.registry(registryParams);
        if(registryResult == null)
            return ApiResponse.OnBadRequest("Username is existed!");
        return ApiResponse.OnCreatedSuccess(registryResult);
    }
    @PostMapping("/login")
    public ApiResponse login(@RequestBody LoginParams loginParams) {
        Object loginResult = userBusiness.login(loginParams);
        if(loginParams == null)
            return ApiResponse.OnBadRequest("Username or password is incorrect!");
        return ApiResponse.OnSuccess(loginResult , "Login sucess!");
    }

    @PostMapping("/validateToken")
    public ApiResponse validateToken(@RequestBody ValidateTokenParams validateTokenParams) {
        User validateResult = userBusiness.validateToken(validateTokenParams.token);
        if(validateResult == null)
            return ApiResponse.OnBadRequest("Token expired!");
        return ApiResponse.OnSuccess(validateResult, "Token is valid!");
    }

    @GetMapping("/me")
    @Secured("ROLE_USER")
    public ApiResponse myInfo(HttpServletRequest request) {
        CustomUserDetails userDetails = (CustomUserDetails) request.getAttribute("user");
        return ApiResponse.OnSuccess(userDetails.getUser(), "Get info success!");
    }

}
