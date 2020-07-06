package nlu.project.backend.business.impl;

import nlu.project.backend.business.FileBusiness;
import nlu.project.backend.exception.custom.InternalException;
import nlu.project.backend.util.StringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

@Service
public class FileBusinessImpl implements FileBusiness {
    @Value("${upload.project.image.absolute.path}")
    private String ABSOLUTE_PATH_IMAGE_STORAGE = (new File("src/main/upload")).getAbsolutePath();


    @Override
    public String save(MultipartFile file) {
        if (file.isEmpty())
            return "";
        File directory = new File(ABSOLUTE_PATH_IMAGE_STORAGE);
        if (!directory.exists()) {
            directory.mkdirs();
        }
        String fileName = StringUtils.randomString() + "_" + System.currentTimeMillis() + ".jpg";
        String path = ABSOLUTE_PATH_IMAGE_STORAGE + File.separator + fileName;
        File serverFile = new File(path);
        try {
            BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(serverFile));
            stream.write(file.getBytes());
            stream.close();
        } catch (IOException ex) {
            throw new InternalException("Upload file error!");
        }
        return fileName;
    }

    @Override
    public void delete() {
        // TBD
    }
}
