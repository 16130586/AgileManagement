package nlu.project.backend.controller;

import nlu.project.backend.business.UserBusiness;
import nlu.project.backend.entry.user.LoginParams;
import nlu.project.backend.entry.user.RegistryParams;
import nlu.project.backend.model.response.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
    public ApiResponse validateToken(@RequestBody String token) {
        boolean validateResult = userBusiness.validateToken(token);
        if(!validateResult)
            return ApiResponse.OnBadRequest("Token expired!");
        return ApiResponse.OnSuccess(token , "Token is valid!");
    }
}
