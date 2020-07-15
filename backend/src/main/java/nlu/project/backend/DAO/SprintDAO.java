package nlu.project.backend.DAO;

import lombok.Data;
import lombok.NoArgsConstructor;
import nlu.project.backend.entry.filter.SprintFilterParams;
import nlu.project.backend.model.Sprint;
import nlu.project.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@NoArgsConstructor
@Data
public class SprintDAO {

    @Autowired
    ProjectRepository projectRepository;

    @Autowired
    SprintRepository sprintRepository;

    public List<Sprint> findByFilter(SprintFilterParams filter) {
        String name = (filter.name == null) ? "" : filter.name;
        if (filter.projectId != null)
            return sprintRepository.findByNameLikeAndProject(name, projectRepository.getOne(filter.projectId));
        return sprintRepository.findByNameLike(name);
    }
}
