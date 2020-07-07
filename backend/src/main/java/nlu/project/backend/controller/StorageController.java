package nlu.project.backend.controller;

import nlu.project.backend.business.FileBusiness;
import nlu.project.backend.exception.custom.InternalException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;

@RestController
@RequestMapping("/storage")
public class StorageController {
    @Autowired
    FileBusiness fileBusiness;

    @GetMapping("/{name}")
    public void getImg(@PathVariable String name, HttpServletResponse response) {
        File file = fileBusiness.get(name);
        if (file != null) {
            try {
                response.addHeader("Cache-Control", "max-age=600");
                response.setHeader("Content-Type", "image/jpg");
                Files.copy(file.toPath(), response.getOutputStream());
            } catch (IOException ex) {
                throw new InternalException("Load file failed!");
            }
        }
    }
}
