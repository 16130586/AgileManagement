package nlu.project.backend.entry.project;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class GroupParams {
    public int groupID;
    public int ownerID;
    public int removeID;
    public int addID;
    public String name;
    public List<Integer> listUserID;
}
