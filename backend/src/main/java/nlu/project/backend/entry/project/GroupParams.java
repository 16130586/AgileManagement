package nlu.project.backend.entry.project;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class GroupParams {
    public int groupId;
    public int ownerId;
    public int removeId;
    public int addId;
    public String name;
    public List<Integer> listUserID;
    public String dataUser;
}
