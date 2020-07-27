package nlu.project.backend.entry.issue;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@NoArgsConstructor
public class IssueTypeParams {
    private Integer id;
    private String name;
    private String iconUrl;
    private Integer projectId;
    private Integer createByUserId;
    private MultipartFile iconFile;
}
