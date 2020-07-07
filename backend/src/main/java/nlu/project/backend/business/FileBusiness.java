package nlu.project.backend.business;

import org.springframework.web.multipart.MultipartFile;

import java.io.File;

public interface FileBusiness {
    String save(MultipartFile file);
    File get(String fileName);
    void delete();
}
