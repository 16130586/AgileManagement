package nlu.project.backend.business.impl;

import lombok.NoArgsConstructor;
import nlu.project.backend.DAO.GroupDAO;
import nlu.project.backend.business.GroupBusiness;
import nlu.project.backend.entry.project.GroupParams;
import nlu.project.backend.model.Group;
import nlu.project.backend.model.UserGroup;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@NoArgsConstructor
public class GroupBusinessImp implements GroupBusiness {
    @Autowired
    GroupDAO groupDAO;

    @Override
    public Group createGroup(GroupParams groupParams) {
        return groupDAO.save(groupParams);
    }

    @Override
    public UserGroup addUser(GroupParams groupParams) {
        return groupDAO.addToGroup(groupParams);
    }

    @Override
    public void removeUser(GroupParams groupParams) {
        groupDAO.removeFromGroup(groupParams);
    }
}
