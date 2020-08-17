package nlu.project.backend.business.impl;

import lombok.NoArgsConstructor;
import nlu.project.backend.DAO.GroupDAO;
import nlu.project.backend.business.GroupBusiness;
import nlu.project.backend.entry.project.GroupParams;
import nlu.project.backend.model.Group;
import nlu.project.backend.model.User;
import nlu.project.backend.model.UserGroup;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@NoArgsConstructor
public class GroupBusinessImp implements GroupBusiness {
    @Autowired
    GroupDAO groupDAO;

    @Override
    public Group createGroup(GroupParams groupParams, User owner) {
        return groupDAO.save(groupParams, owner);
    }

    @Override
    public UserGroup addUser(GroupParams groupParams) {
        return groupDAO.addToGroup(groupParams);
    }

    @Override
    public GroupParams removeUser(GroupParams groupParams) {
        return groupDAO.removeFromGroup(groupParams);
    }

    @Override
    public List<Group> getGroupsByUser(User user) {
        return groupDAO.getGroupsByUser(user);
    }

    @Override
    public GroupParams delete(GroupParams params) {
        return groupDAO.delete(params);
    }
}
