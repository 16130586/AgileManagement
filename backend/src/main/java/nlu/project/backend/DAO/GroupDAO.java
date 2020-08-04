package nlu.project.backend.DAO;

import lombok.Data;
import lombok.NoArgsConstructor;
import nlu.project.backend.entry.project.GroupParams;
import nlu.project.backend.model.*;
import nlu.project.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

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

    @Transactional(propagation = Propagation.REQUIRES_NEW , rollbackFor = IllegalArgumentException.class)
    public Group save(GroupParams params) {
        Group group = new Group();
        group.setName(params.name);
        group.setOwner(userRepository.getOne(params.ownerID));
        group = groupRepository.save(group);

        UserGroup userGroup;
        for(int userID : params.listUserID) {
            userGroup = new UserGroup();
            userGroup.setUser(userRepository.getOne(userID));
            userGroup.setGroup(group);
            userGroupRepository.save(userGroup);
        }

        return group;
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW , rollbackFor = IllegalArgumentException.class)
    public UserGroup addToGroup(GroupParams params) {
        UserGroup userGroup = new UserGroup();
        userGroup.setGroup(groupRepository.getOne(params.groupID));
        userGroup.setUser(userRepository.getOne(params.addID));
        return userGroupRepository.save(userGroup);
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW , rollbackFor = IllegalArgumentException.class)
    public void removeFromGroup(GroupParams params) {
        User user = userRepository.getOne(params.removeID);
        Group group = groupRepository.getOne(params.groupID);
        UserGroup userGroup = userGroupRepository.findByUserAndGroup(user,group);
        userGroupRepository.delete(userGroup);
    }
}
