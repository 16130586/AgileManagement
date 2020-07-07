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
public class LocalDiskFileBusinessImpl implements FileBusiness {
    @Value("${upload.project.image.absolute.path}")
    private String ABSOLUTE_PATH_IMAGE_STORAGE;
    private final String DEFAULT_PATH_IMAGE_STORAGE = "src/main/upload";
    private final String ACTION = "/storage/";

    @Override
    public String save(MultipartFile file) {
        if(ABSOLUTE_PATH_IMAGE_STORAGE == null || ABSOLUTE_PATH_IMAGE_STORAGE.equals("") || ABSOLUTE_PATH_IMAGE_STORAGE.length() == 0){
            ABSOLUTE_PATH_IMAGE_STORAGE = (new File(DEFAULT_PATH_IMAGE_STORAGE)).getAbsolutePath();
        }

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
            stream.flush();
            stream.close();
        } catch (IOException ex) {
            throw new InternalException("Upload file error!");
        }
        return ACTION.concat(fileName);
    }

    @Override
    public File get(String fileName) {
        if(ABSOLUTE_PATH_IMAGE_STORAGE == null || ABSOLUTE_PATH_IMAGE_STORAGE.equals("") || ABSOLUTE_PATH_IMAGE_STORAGE.length() == 0){
            ABSOLUTE_PATH_IMAGE_STORAGE = (new File(DEFAULT_PATH_IMAGE_STORAGE)).getAbsolutePath();
        }
        String path = ABSOLUTE_PATH_IMAGE_STORAGE + File.separator + fileName;
        File result = new File(path);
        if (result.exists())
            return result;
        return null;
    }

    @Override
    public void delete() {
        // TBD
    }
}
