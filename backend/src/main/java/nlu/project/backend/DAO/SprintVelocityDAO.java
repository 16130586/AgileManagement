package nlu.project.backend.DAO;

import lombok.Data;
import lombok.NoArgsConstructor;
import nlu.project.backend.model.SprintVelocity;
import nlu.project.backend.repository.SprintVelocityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;

@Component
@NoArgsConstructor
@Data
public class SprintVelocityDAO  {
    @Autowired
    SprintVelocityRepository sprintVelocityRepository;
    public SprintVelocity save(SprintVelocity velocity){
        try{
            return sprintVelocityRepository.saveAndFlush(velocity);
        }catch (Exception e){
            return null;
        }
    }

    public List<SprintVelocity> getVelocities(Integer projectId) {
        try{
            return sprintVelocityRepository.findByProjectId(projectId);
        }catch (Exception e){
            return Collections.emptyList();
        }
    }
}
