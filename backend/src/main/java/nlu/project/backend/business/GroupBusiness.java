package nlu.project.backend.business;

import nlu.project.backend.entry.project.GroupParams;
import nlu.project.backend.model.Group;
import nlu.project.backend.model.UserGroup;

public interface GroupBusiness {
    Group createGroup(GroupParams groupParams);
    UserGroup addUser(GroupParams groupParams);
    void removeUser(GroupParams groupParams);
}
