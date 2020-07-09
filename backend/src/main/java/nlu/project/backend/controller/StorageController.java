package nlu.project.backend.controller;

import nlu.project.backend.business.FileBusiness;
import nlu.project.backend.exception.custom.InternalException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.TimeZone;

@RestController
@RequestMapping("/storage")
public class StorageController {
    @Autowired
    FileBusiness fileBusiness;

    private String lastModifiedDatePattern = "EE, dd MMM yyyy HH:mm:ss z";
    private SimpleDateFormat formatter = new SimpleDateFormat(lastModifiedDatePattern);

    @GetMapping("/{name}")
    public void getImg(@PathVariable String name, HttpServletRequest request, HttpServletResponse response) throws ParseException {
        // in this case - we will make browser cache forever if it's firstly request is success
        String ifModifiedSinceAsString = request.getHeader("If-Modified-Since"); // as ICT time
        long currentTime = Calendar.getInstance(TimeZone.getTimeZone("ICT")).getTimeInMillis();
        long ifModifiedSinceAsLong = 0;

        if (ifModifiedSinceAsString == null) {
            ifModifiedSinceAsLong = Calendar.getInstance(TimeZone.getTimeZone("ICT")).getTimeInMillis();
        } else {
            try {
                Calendar c = Calendar.getInstance();
                c.setTime(formatter.parse(ifModifiedSinceAsString));
                ifModifiedSinceAsLong = c.getTimeInMillis();
                c.getTimeInMillis();
            } catch (Exception e) {
                ifModifiedSinceAsLong = Calendar.getInstance(TimeZone.getTimeZone("ICT")).getTimeInMillis();
            }

        }
        if (ifModifiedSinceAsLong <= currentTime) {
            response.setStatus(304);
            return;
        }
        File file = fileBusiness.get(name);
        boolean isLoaded = true;
        if (file != null) {
            try {
                // response.addHeader("Cache-Control", "public, max-age=525600, immutable");
                response.addHeader("Cache-Control", "public, max-age=15, immutable");
                response.setHeader("Content-Type", "image/jpg");
                response.addHeader("Last-Modified", formatter.format(Calendar.getInstance(TimeZone.getTimeZone("GMT")).getTime()));
                response.setStatus(200);
                Files.copy(file.toPath(), response.getOutputStream());
            } catch (IOException ex) {
                isLoaded = false;
            }
        }
        if (!isLoaded) {
            response.setStatus(404);
        }
    }
}
