package nlu.project.backend.entry.project;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@NoArgsConstructor
public class ProjectParams {
    public Integer id;
    public String name;
    public String key;
    public String description;
    public Integer leader;
    public Integer productOwner;
    public MultipartFile file;
    public String imgUrl;


}
