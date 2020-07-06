package nlu.project.backend.business;

import org.springframework.web.multipart.MultipartFile;

public interface FileBusiness {
    String save(MultipartFile file);
    void delete();
}
