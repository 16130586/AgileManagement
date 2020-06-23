package nlu.project.backend.business.impl;

import com.auth0.jwt.JWT;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.interfaces.JWTVerifier;
import lombok.NoArgsConstructor;
import nlu.project.backend.business.UserBusiness;
import nlu.project.backend.entry.user.LoginParams;
import nlu.project.backend.entry.user.RegistryParams;
import nlu.project.backend.jwt.JwtProvider;
import nlu.project.backend.model.User;
import nlu.project.backend.model.security.CustomUserDetails;
import nlu.project.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@NoArgsConstructor
public class UserBusinessImp implements UserBusiness {
    @Autowired
    UserRepository userRepository;
    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    private JwtProvider tokenProvider;
    @Override
    public String login(LoginParams loginParams) {
        // Xác thực từ username và password.
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginParams.userName, loginParams.password)
        );

        // Nếu không xảy ra exception tức là thông tin hợp lệ
        // Set thông tin authentication vào Security Context
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // Trả về jwt cho người dùng.
        String jwt = tokenProvider.generateToken(((CustomUserDetails) authentication.getPrincipal()).getUsername());
        return jwt;
    }

    @Override
    public User registry(RegistryParams registryParams) {
        boolean isExisted = userRepository.existsByUserName(registryParams.userName);
        if(isExisted)
            return null;
        User toSave = new User();
        toSave.setEmail(registryParams.email);
        toSave.setUserName(registryParams.userName);
        toSave.setPassword(new BCryptPasswordEncoder().encode(registryParams.password));
        userRepository.save(toSave);
        return toSave;
    }

    @Override
    public User validateToken(String token) {
        try{
            DecodedJWT decodedJWT = tokenProvider.validateToken(token);
            String userName = tokenProvider.getUserNameFromJWT(decodedJWT);
            CustomUserDetails userDetails = (CustomUserDetails)loadUserByUsername(userName);
            User result = userDetails.getUser();
            result.setPassword(null);
            return userDetails.getUser();
        }catch (Exception e){
            return null;
        }
    }

    @Override
    public boolean checkExistsUsername(String username) {
        return false;
    }

    @Override
    public User getUserById(int id) {
        return null;
    }

    @Override
    public User getUserByGmail(String gmail) {
        return null;
    }

    @Override
    public void saveUser(User user) {

    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUserName(username);
        if (user == null) {
            System.out.println("User not found! " + username);
            throw new UsernameNotFoundException("User " + username + " was not found in the database");
        }
        return new CustomUserDetails(user);
    }
}
