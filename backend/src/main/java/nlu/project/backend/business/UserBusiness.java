package nlu.project.backend.business;

import nlu.project.backend.entry.user.LoginParams;
import nlu.project.backend.entry.user.RegistryParams;
import nlu.project.backend.model.User;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserBusiness extends UserDetailsService {
    String login(LoginParams loginParams);
    User registry(RegistryParams registryParams);
    boolean checkExistsUsername(String username);
    User getUserById(int id);
    User getUserByGmail(String gmail);
    void saveUser(User user);
}
