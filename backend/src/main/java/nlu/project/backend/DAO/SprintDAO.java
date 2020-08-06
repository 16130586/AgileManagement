package nlu.project.backend.DAO;

import lombok.Data;
import lombok.NoArgsConstructor;
import nlu.project.backend.entry.filter.SprintFilterParams;
import nlu.project.backend.model.Sprint;
import nlu.project.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;

@Component
@NoArgsConstructor
@Data
public class SprintDAO {

    @Autowired
    ProjectRepository projectRepository;

    @Autowired
    SprintRepository sprintRepository;

    public Sprint update(Sprint sprint){return sprintRepository.saveAndFlush(sprint);}
    public Sprint getOne(Integer sprintId){
        return sprintRepository.getOne(sprintId);
    }

    public List<Sprint> findByProjectId(Integer projectId) {return sprintRepository.findByProjectId(projectId);}
    public List<Sprint> findByFilter(SprintFilterParams filter) {
        String name = (filter.name == null) ? "" : filter.name;
        return sprintRepository.findByNameContainingIgnoreCaseAndProjectIdAndStatus(name, filter.projectId, filter.status);
    }
    public Sprint add(Sprint sprint){
        try{
            sprintRepository.saveAndFlush(sprint);
            return sprint;
        }catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }
    public String getNextName(int projectId){

        try{
            List<Sprint> result = sprintRepository.findByProjectId(projectId);
            return "Sprint " + (result.size() + 1);
        }catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }

    public List<Sprint> findWorkingSprints(Integer projectId){
        try{
            List<Sprint> result = sprintRepository.findWorkingSprints(projectId);
            return result;
        }catch (Exception e){
            e.printStackTrace();
        }
        return Collections.emptyList();
    }

}
