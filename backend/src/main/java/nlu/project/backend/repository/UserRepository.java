package nlu.project.backend.repository;


import nlu.project.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    User findByUserName(String username);
    boolean existsByUserName(String username);
    User findByEmail(String email);
}