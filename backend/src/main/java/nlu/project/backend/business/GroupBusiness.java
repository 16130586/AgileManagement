package nlu.project.backend.business;

import nlu.project.backend.entry.project.GroupParams;
import nlu.project.backend.model.Group;
import nlu.project.backend.model.User;
import nlu.project.backend.model.UserGroup;

import java.util.List;

public interface GroupBusiness {
    Group createGroup(GroupParams groupParams, User owner);
    UserGroup addUser(GroupParams groupParams);
    GroupParams removeUser(GroupParams groupParams);
    List<Group> getGroupsByUser(User user);
    Object delete(GroupParams params);
}
