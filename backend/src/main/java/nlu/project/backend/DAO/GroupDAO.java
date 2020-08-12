package nlu.project.backend.DAO;

import lombok.Data;
import lombok.NoArgsConstructor;
import nlu.project.backend.entry.project.GroupParams;
import nlu.project.backend.exception.custom.InvalidInputException;
import nlu.project.backend.model.*;
import nlu.project.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Component
@NoArgsConstructor
@Data
public class GroupDAO {

    @Autowired
    UserRepository userRepository;

    @Autowired
    ProjectRepository projectRepository;

    @Autowired
    UserRoleRepository userRoleRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    GroupRepository groupRepository;

    @Autowired
    UserGroupRepository userGroupRepository;

    public Group save(GroupParams params, User owner) {
        Group group = new Group();
        group.setName(params.name);
        group.setOwner(owner);
        group = groupRepository.save(group);

        return group;
    }

    public UserGroup addToGroup(GroupParams params) {
        Group group = groupRepository.getOne(params.groupId);
        User user = userRepository.findByNickNameOrEmail(params.dataUser, params.dataUser);
        // check existed user
        if (user == null)
            throw new InvalidInputException("NickName or Email not existed!");
        // check user already in group
        UserGroup userGroup = userGroupRepository.findByUserAndGroup(user,group);
        if (userGroup != null)
            throw new InvalidInputException("User already existed in Group!");
        // save
        userGroup = new UserGroup();
        userGroup.setGroup(group);
        userGroup.setUser(user);
        return userGroupRepository.save(userGroup);
    }

    public GroupParams removeFromGroup(GroupParams params) {
        User user = userRepository.getOne(params.removeId);
        Group group = groupRepository.getOne(params.groupId);
        UserGroup userGroup = userGroupRepository.findByUserAndGroup(user,group);
        userGroupRepository.delete(userGroup);
        return params;
    }

    public List<Group> getGroupsByUser(User user) {
        return groupRepository.findByOwnerOrMemberContains(user, user);
    }

    public GroupParams delete(GroupParams params) {
        groupRepository.deleteById(params.groupId);
        return params;
    }
}
